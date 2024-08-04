import {EditOutlined} from "@ant-design/icons";
import {Button, List} from "antd";
import css from "../../pages/Wishlists/styles.module.css";
import {useIntl} from "react-intl";
import {WishlistItemProps} from "../../models/interfaces";

export const WishlistItem = (props: WishlistItemProps & { shared: boolean }) => {
	const intl = useIntl();
	const actions = props.shared ? [<Button>{intl.formatMessage({ id: 'Shared.Action.View' })}</Button>] : [<EditOutlined />]
	return (
		<List.Item actions={actions}>
			<List.Item.Meta
				className={css.listprops}
				title={props.name}
				description={`${props.description}${props.description ? ',' : ''} ${intl.formatDate(new Date(props.createdAt))}`}
			/>
		</List.Item>
	)
}
