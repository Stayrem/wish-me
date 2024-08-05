import {WishlistItemProps, CurrentWishlist, OgData, AddItemRs} from './models/interfaces';
import {CurrentItem} from "./models/interfaces";

export interface CurrentItemPayload { wishlistId?: string; itemId?: string; }
export type CurrentItemBookPayload = { booked: boolean } & CurrentItemPayload;

export const getWishlist = () => fetch('/mocks/wish-list.json?1').then((res) => res.json() as Promise<WishlistItemProps[]>);
export const getCurrentWishlist = () => fetch('/mocks/current-wish-list.json?3').then((res) => res.json() as Promise<CurrentWishlist>);

export const getCurrentItem = (payload: CurrentItemPayload) => fetch('/mocks/current-item.json?1').then((res) => res.json() as Promise<CurrentItem>);
export const setCurrentItemBooked = (payload: CurrentItemBookPayload) => new Promise<boolean>((resolve) => resolve(!payload.booked));

export const getItemOg = (url: string) => fetch('/mocks/og.json?132').then((res) => res.json() as Promise<OgData>);
export const addItem = (data: AddItemRs) => new Promise<boolean>((resolve) => resolve(true));
