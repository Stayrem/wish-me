export const StatusDict = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    NONE: 'NONE',
    PENDING: 'PENDING'
} as const;

export interface CurrentItem { id: string; description: string; href?: string; name: string; previewSrc: string | null; price: number; bookedBy: number; booked: boolean }

export interface CurrentItemFetched {
    data: CurrentItem;
    status: typeof StatusDict.SUCCESS
}

export interface CurrentWishlist extends WishlistItemProps {
    list: CurrentItem[]
}

export interface CurrentWishlistFetched {
    data: CurrentWishlist;
    status: typeof StatusDict.SUCCESS;
}

export interface Unfetched {
    data: null;
    status: typeof StatusDict.NONE | typeof StatusDict.FAILED | typeof StatusDict.PENDING;
}

export interface WishlistItemProps {
    id: number;
    name: string;
    count: number;
    previewSrc: string | null;
    description: string | null;
    createdAt: number;
}

export interface WishlistStoreFetched {
    data: WishlistItemProps[];
    status: typeof StatusDict.SUCCESS;
}

export interface OgData {
    name?: string;
    description?: string;
    previewSrc?: string;
}

export type AddItemRs = {
    name: string;
    url: string;
    description?: string;
    price?: string;
}

export interface AddItemFetched {
    data: OgData
    status: typeof StatusDict.SUCCESS
}
