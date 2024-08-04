import {ReactNode} from "react";

export interface PageWrapperProps {
	title: string;
	isLoading: boolean;
	children: ReactNode;
	empty?: { isVisible: boolean; emptyText: string };
	hideBackButton?: boolean;
}
