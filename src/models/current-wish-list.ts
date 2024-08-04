import { createStore, createEffect, sample } from 'effector';
import {CurrentWishlistFetched, Unfetched, StatusDict} from './interfaces';
import { getCurrentWishlist } from '../api';
import { createGate } from 'effector-react';

const defaultWishlistsState: Unfetched = {
    data: null,
    status: StatusDict.NONE,
}
export const CurrentWishlistGate = createGate<string>();

export const $currentWishlist = createStore<CurrentWishlistFetched | Unfetched>(defaultWishlistsState).reset(CurrentWishlistGate.close);
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
