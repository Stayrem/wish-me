import { createStore, createEffect, sample } from 'effector';
import { StatusDict } from './interfaces';
import { WishListItem } from './wish-lists';
import { getCurrentWishList } from '../api';
import { createGate } from 'effector-react';

export interface CurrentWishList extends WishListItem {
    list: { name: string; previewSrc: string | null; price: number; }[]
}

interface CurrentWishListFetched {
    data: CurrentWishList;
    status: typeof StatusDict.SUCCESS;
}
interface CurrentWishListUnFetched {
    data: null;
    status: typeof StatusDict.NONE | typeof StatusDict.FAILED | typeof StatusDict.PENDING;
}

const defaultWishListsState: CurrentWishListUnFetched = {
    data: null,
    status: StatusDict.NONE,
}

export const CurrentWishListGate = createGate<string>();

export const $currentWishList = createStore<CurrentWishListFetched | CurrentWishListUnFetched>(defaultWishListsState).reset(CurrentWishListGate.close);
const getCurrentWishListFx = createEffect(getCurrentWishList);
sample({
    clock: CurrentWishListGate.open,
    target: getCurrentWishListFx,
});

sample({
    clock: getCurrentWishListFx.pending,
    fn: () => ({ data: null, status: StatusDict.PENDING }),
    target: $currentWishList,
});

sample({
    clock: getCurrentWishListFx.doneData,
    fn: (data) => ({ data, status: StatusDict.SUCCESS }),
    target: $currentWishList,
});

sample({
    clock: getCurrentWishListFx.fail,
    fn: () => ({ data: null, status: StatusDict.FAILED }) ,
    target: $currentWishList,
});
