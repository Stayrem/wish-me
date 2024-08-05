import {createEvent, createStore, sample} from "effector";
import {AddItemFetched, AddItemRs, StatusDict, Unfetched} from "./interfaces";
import {createEffect} from "effector/effector.cjs";
import {addItem, getItemOg} from "../api";
import { debounce } from 'patronum/debounce';

const defaultState: Unfetched = { data: null, status: StatusDict.NONE };
const DEBOUNCE_TIMEOUT_IN_MS = 300;
export const $addItemStore = createStore<AddItemFetched | Unfetched>(defaultState);

export const $url = createStore<string | null>(null);
const getOgFx = createEffect(getItemOg);
const addItemFx = createEffect(addItem);

export const addItemEvent = createEvent<AddItemRs>();
export const setUrlEvent = createEvent<string>();
const debouncedSetUrl = debounce(setUrlEvent, DEBOUNCE_TIMEOUT_IN_MS);
export const isItemAdding = addItemFx.pending;

sample({
	clock: debouncedSetUrl,
	filter: (payload) => !!payload && payload.length > 0,
	fn: (payload) => payload as string,
	target: $url,
})

sample({
	clock: $url,
	filter: (payload) => !!payload && payload.length > 0,
	fn: (payload) => payload as string,
	target: getOgFx
});

sample({
	clock: getOgFx.pending,
	fn: () => ({ data: null, status: StatusDict.PENDING }),
	target: $addItemStore,
});

sample({
	clock: getOgFx.doneData,
	fn: (data) => ({ data, status: StatusDict.SUCCESS }),
	target: $addItemStore,
});

sample({
	clock: getOgFx.fail,
	fn: () => ({ data: null, status: StatusDict.FAILED }) ,
	target: $addItemStore,
});

sample({
	clock: addItemEvent,
	fn: (payload) => payload,
	target: addItemFx,
});
