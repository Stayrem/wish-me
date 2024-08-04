import { useGate, useUnit } from 'effector-react';
import css from './styles.module.css';
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { Button, Typography } from "antd";
import { StatusDict } from "../../models/interfaces";
import { PageWrapper } from "../../layout/PageWrapper";
import { $currentItem, bookHandlerEvent, CurrentItemGate } from "../../models/current-item";
import { LinkOutlined } from "@ant-design/icons";
import { $userInfo } from "../../models/user";
import { useMemo } from "react";

export const Item = () => {
	const params = useParams<{ id: string; itemId: string }>();
	const [ item, bookHandler, userInfo] = useUnit([$currentItem, bookHandlerEvent, $userInfo]);
	const { data, status } = item;
	useGate(CurrentItemGate, { wishlistId: params.id, itemId: params.itemId });
	const bookDisabled = useMemo(() => {
		if (status !== StatusDict.SUCCESS) {
			return true;
		}
		if (data?.bookedBy === null) {
			return false;
		}
		return userInfo.user?.id !== data?.bookedBy;
	}, [data?.bookedBy, status, userInfo.user?.id]);
	const intl = useIntl();
	return (
		<>
			<PageWrapper empty={{ isVisible: status === StatusDict.FAILED, emptyText: intl.formatMessage({ id: 'Item.Empty' }) }} title={data?.name || ''} isLoading={status === StatusDict.PENDING}>
				{status === StatusDict.SUCCESS && (
					<>
						<div className={css.img} style={{backgroundImage: `url(${data?.previewSrc})` || ''}}></div>
						<div className={css.description}>
							<Typography.Text type="secondary" className={css.listText}>{data.price}</Typography.Text>
							<Typography.Text>{data?.description}</Typography.Text>
						</div>
					</>
				)}
			</PageWrapper>
			{status === StatusDict.SUCCESS && (
				<div className={css.actionWrapper}>
					<Button type={data?.booked ? 'default' : 'primary'} disabled={bookDisabled}
									onClick={() => bookHandler({wishlistId: params.id, itemId: params.itemId, booked: !!data?.booked})}
									size="large" className={css.bookBtn}>
						{intl.formatMessage({id: data?.booked ? 'Action.UnbookItem' : 'Action.BookItem'})}
					</Button>
					<Button disabled={!data?.href} onClick={() => window.Telegram.WebApp.openLink(data?.href || '')} size="large"
									icon={<LinkOutlined/>}/>
				</div>
			)}
		</>
	)
}
