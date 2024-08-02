import {createEffect, createStore, sample} from 'effector';
import { createGate } from 'effector-react';
import { StatusDict } from './interfaces';
import { getWishlist } from '../api';

export interface WishlistItem {
    id: number;
    name: string;
    count: number;
    previewSrc: string | null;
    description: string | null;
    createdAt: number;
}

interface WishlistStoreFetched {
  data: WishlistItem[];
  status: typeof StatusDict.SUCCESS;
}
interface WishlistStoreUnFetched {
    data: null;
    status: typeof StatusDict.NONE | typeof StatusDict.FAILED | typeof StatusDict.PENDING;
}

const defaultWishlistsState: WishlistStoreUnFetched = {
    data: null,
    status: StatusDict.NONE,
}

export const WishlistsGate = createGate<string>();

export const $wishListsStore = createStore<WishlistStoreUnFetched | WishlistStoreFetched>(defaultWishlistsState).reset(WishlistsGate.close);
const getWishlistFx = createEffect(getWishlist);

sample({
    clock: WishlistsGate.open,
    target: getWishlistFx,
});

sample({
    clock: getWishlistFx.pending,
    fn: () => ({ data: null, status: StatusDict.PENDING }),
    target: $wishListsStore,
});

sample({
    clock: getWishlistFx.doneData,
    fn: (data) => ({ data, status: StatusDict.SUCCESS }),
    target: $wishListsStore,
});

sample({
    clock: getWishlistFx.fail,
    fn: () => ({ data: null, status: StatusDict.FAILED }) ,
    target: $wishListsStore,
});

