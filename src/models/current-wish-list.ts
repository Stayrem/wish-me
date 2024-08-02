import { createStore, createEffect, sample } from 'effector';
import { StatusDict } from './interfaces';
import { WishlistItem } from './wish-lists';
import { getCurrentWishlist } from '../api';
import { createGate } from 'effector-react';

export interface CurrentWishlist extends WishlistItem {
    list: { id: string; name: string; previewSrc: string | null; price: number; }[]
}

interface CurrentWishlistFetched {
    data: CurrentWishlist;
    status: typeof StatusDict.SUCCESS;
}
interface CurrentWishlistUnFetched {
    data: null;
    status: typeof StatusDict.NONE | typeof StatusDict.FAILED | typeof StatusDict.PENDING;
}

const defaultWishlistsState: CurrentWishlistUnFetched = {
    data: null,
    status: StatusDict.NONE,
}

export const CurrentWishlistGate = createGate<string>();

export const $currentWishlist = createStore<CurrentWishlistFetched | CurrentWishlistUnFetched>(defaultWishlistsState).reset(CurrentWishlistGate.close);
const getCurrentWishlistFx = createEffect(getCurrentWishlist);
sample({
    clock: CurrentWishlistGate.open,
    target: getCurrentWishlistFx,
});

sample({
    clock: getCurrentWishlistFx.pending,
    fn: () => ({ data: null, status: StatusDict.PENDING }),
    target: $currentWishlist,
});

sample({
    clock: getCurrentWishlistFx.doneData,
    fn: (data) => ({ data, status: StatusDict.SUCCESS }),
    target: $currentWishlist,
});

sample({
    clock: getCurrentWishlistFx.fail,
    fn: () => ({ data: null, status: StatusDict.FAILED }) ,
    target: $currentWishlist,
});
