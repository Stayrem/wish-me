import {PAGES} from "../../constants";
import {Button, Typography} from "antd";
import css from './styles.module.css'
import {NavLink, useLocation } from "react-router-dom";
import {useIntl} from "react-intl";
export const Menu = () => {
	const location = useLocation();
	const intl = useIntl();
	return (
		<div className={css.menu}>
			{PAGES.map((page) => (
				<NavLink className={css.menuBtn} to={page.pathname}>
					<Button size="large" type="text" icon={location.pathname.includes(page.pathname) ? page.iconActive : page.icon} />
					<Typography.Text className={css.menuName} >{intl.formatMessage({ id: page.name })}</Typography.Text>
				</NavLink>
			))}
		</div>)
}
