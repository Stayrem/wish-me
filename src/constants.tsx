import { HomeOutlined, HomeFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';

export const PAGES = [
	{
		name: 'Menu.Wishlists',
		icon: <HeartOutlined />,
		iconActive: <HeartFilled />,
		pathname: '/wishlists',
	},
	{
		name: 'Menu.Profile',
		icon: <HomeOutlined />,
		iconActive: <HomeFilled />,
		pathname: '/profile',
	}
] as const;

export const BOT_URL = 'https://t.me/wishmegiftbot'
