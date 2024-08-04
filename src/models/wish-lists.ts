import {createEffect, createStore, sample} from 'effector';
import { createGate } from 'effector-react';
import {StatusDict, WishlistStoreFetched, Unfetched} from './interfaces';
import { getWishlist } from '../api';

const defaultWishlistsState: Unfetched = {
    data: null,
    status: StatusDict.NONE,
}

export const WishlistsGate = createGate<string>();

export const $wishListsStore = createStore<Unfetched | WishlistStoreFetched>(defaultWishlistsState).reset(WishlistsGate.close);
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

