import { WishlistItem } from './models/wish-lists';
import { CurrentWishlist } from './models/current-wish-list';

export const getWishlist = () => fetch('/mocks/wish-list.json?1').then((res) => res.json() as Promise<WishlistItem[]>);
export const getCurrentWishlist = () => fetch('/mocks/current-wish-list.json?3').then((res) => res.json() as Promise<CurrentWishlist>);
