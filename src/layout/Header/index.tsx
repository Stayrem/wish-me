import css from './styles.module.css';
import { Avatar, Typography } from 'antd';
export const Header = () => {
    return (
        <div className={css.header}>
            <Avatar src={'/'}/>
            <Typography.Text className={css.text}>Test</Typography.Text>
        </div>
    )
}
