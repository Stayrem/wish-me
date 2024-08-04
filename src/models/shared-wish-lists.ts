import {createEffect, createStore, sample} from 'effector';
import { createGate } from 'effector-react';
import {StatusDict, WishlistStoreFetched, Unfetched} from './interfaces';
import { getWishlist } from '../api';

const defaultWishlistsState: Unfetched = {
	data: null,
	status: StatusDict.NONE,
}

export const SharedWishlistsGate = createGate<string>();

export const $sharedWishListsStore = createStore<Unfetched | WishlistStoreFetched>(defaultWishlistsState).reset(SharedWishlistsGate.close);
const getSharedWishlistFx = createEffect(getWishlist);

sample({
	clock: SharedWishlistsGate.open,
	target: getSharedWishlistFx,
});

sample({
	clock: getSharedWishlistFx.pending,
	fn: () => ({ data: null, status: StatusDict.PENDING }),
	target: $sharedWishListsStore,
});

sample({
	clock: getSharedWishlistFx.doneData,
	fn: (data) => ({ data, status: StatusDict.SUCCESS }),
	target: $sharedWishListsStore,
});

sample({
	clock: getSharedWishlistFx.fail,
	fn: () => ({ data: null, status: StatusDict.FAILED }) ,
	target: $sharedWishListsStore,
});

