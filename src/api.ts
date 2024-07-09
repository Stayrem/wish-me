import { WishListItem } from './models/wish-lists';
import { CurrentWishList } from './models/current-wish-list';

export const getWishList = () => fetch('/mocks/wish-list.json?1').then((res) => res.json() as Promise<WishListItem[]>);
export const getCurrentWishList = () => fetch('/mocks/current-wish-list.json?3').then((res) => res.json() as Promise<CurrentWishList>);
