import { List, Skeleton, Avatar } from 'antd';
import { useGate, useUnit } from 'effector-react';
import { $wishListsStore, WishListsGate } from '../../models/wish-lists';
import { StatusDict } from '../../models/interfaces';
import css from './styles.module.css';
import {Link} from "react-router-dom";
export const Home = () => {
    useGate(WishListsGate, '');
    const wishLists = useUnit($wishListsStore);
    return (
        <div className={css.wrapper}>
            <List
                dataSource={wishLists.data || undefined}
                renderItem={(item) => (
                    <List.Item>
                        <Skeleton avatar title={false} loading={wishLists.status === StatusDict.PENDING} active>
                            <List.Item.Meta
                                className={css.listItem}
                                avatar={<Avatar src={item.previewSrc} />}
                                title={<Link to={`/wishlist/${item.id}`}>{item.name}</Link>}
                                description={item.description}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    )
}
