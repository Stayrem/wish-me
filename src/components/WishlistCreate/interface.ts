import {Dayjs} from "dayjs";

export interface CreateWishlistForm {
	title: string;
	description: string;
	date: Dayjs;
}
