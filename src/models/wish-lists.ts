import {createEffect, createStore, sample} from 'effector';
import { createGate } from 'effector-react';
import { StatusDict } from './interfaces';
import { getWishList } from '../api';

export interface WishListItem {
    id: number;
    name: string;
    count: number;
    previewSrc: string | null;
    description: string | null
}

interface WishListStoreFetched {
  data: WishListItem[];
  status: typeof StatusDict.SUCCESS;
}
interface WishListStoreUnFetched {
    data: null;
    status: typeof StatusDict.NONE | typeof StatusDict.FAILED | typeof StatusDict.PENDING;
}

const defaultWishListsState: WishListStoreUnFetched = {
    data: null,
    status: StatusDict.NONE,
}

export const WishListsGate = createGate<string>();

export const $wishListsStore = createStore<WishListStoreUnFetched | WishListStoreFetched>(defaultWishListsState).reset(WishListsGate.close);
const getWishListFx = createEffect(getWishList);

sample({
    clock: WishListsGate.open,
    target: getWishListFx,
});

sample({
    clock: getWishListFx.pending,
    fn: () => ({ data: null, status: StatusDict.PENDING }),
    target: $wishListsStore,
});

sample({
    clock: getWishListFx.doneData,
    fn: (data) => ({ data, status: StatusDict.SUCCESS }),
    target: $wishListsStore,
});

sample({
    clock: getWishListFx.fail,
    fn: () => ({ data: null, status: StatusDict.FAILED }) ,
    target: $wishListsStore,
});

