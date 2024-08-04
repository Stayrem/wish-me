import {CurrentItemFetched, StatusDict, Unfetched} from "./interfaces";
import {createStore, sample, createEffect, createEvent} from "effector";
import {CurrentItemBookPayload, CurrentItemPayload, getCurrentItem, setCurrentItemBooked} from "../api";
import {createGate} from "effector-react";

const defaultItemState: Unfetched = {
	data: null,
	status: StatusDict.NONE,
}
export const CurrentItemGate = createGate<CurrentItemPayload>();

export const $currentItem = createStore<CurrentItemFetched | Unfetched>(defaultItemState).reset(CurrentItemGate.close);
export const bookHandlerEvent = createEvent<CurrentItemBookPayload>();
export const bookItemFx = createEffect(setCurrentItemBooked);
export const getCurrentItemFx = createEffect(getCurrentItem);

sample({
	clock: CurrentItemGate.open,
	filter: (payload) => !!payload.wishlistId && !!payload.itemId,
	fn: (payload) => payload,
	target: getCurrentItemFx,
});

sample({
	clock: getCurrentItemFx.doneData,
	fn: () => ({ data: null, status: StatusDict.PENDING }),
	target: $currentItem,
});

sample({
	clock: getCurrentItemFx.doneData,
	fn: () => ({ data: null, status: StatusDict.FAILED }) ,
	target: $currentItem,
});

sample({
	clock: getCurrentItemFx.doneData,
	fn: (data) => ({ data, status: StatusDict.SUCCESS }),
	target: $currentItem,
});

sample({
	clock: bookHandlerEvent,
	fn: (payload) => payload,
	target: bookItemFx,
});

sample({
	clock: bookItemFx.doneData,
	source: { item: $currentItem },
	fn: ({ item }, booked) => {
		const itemTyped = item as CurrentItemFetched;
		return ({ ...itemTyped , data: { ...itemTyped.data, booked } })
	},
	target: $currentItem,
})
