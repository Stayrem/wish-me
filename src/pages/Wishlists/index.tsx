import {List, Skeleton, Button, Typography} from 'antd';
import { useIntl } from 'react-intl';
import { useGate, useUnit } from 'effector-react';
import { $wishListsStore, WishlistsGate } from '../../models/wish-lists';
import { StatusDict } from '../../models/interfaces';
import css from './styles.module.css';
import {Link, useNavigate} from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import dogIcon from '../../images/icons/dog.svg';

export const Wishlists = () => {
    useGate(WishlistsGate, '');
    const wishLists = useUnit($wishListsStore);
    const intl = useIntl();
    const navigate = useNavigate();
    return (
      <>
        <div className={css.wrapper}>
          <Typography.Title className={css.title} level={3}>{intl.formatMessage({ id: 'Title.Wishlists' })}</Typography.Title>
          <div className={css.scroller}>
            {wishLists.status === 'SUCCESS' && wishLists.data.length === 0 && (
              <div className={css.empty}>
                <img src={dogIcon} width="150" alt=""/>
                <Typography.Text>{intl.formatMessage({id: 'Wishlists.Empty'})}</Typography.Text>
              </div>
            )}
            {wishLists.status === 'SUCCESS' && wishLists.data.length > 0 && (
              <List
                dataSource={wishLists.data || undefined}
                renderItem={(item) => (
                  <Link to={`/wishlist/${item.id}`}>
                    <List.Item actions={[<EditOutlined />]}>
                        <List.Item.Meta
                          className={css.listItem}
                          title={item.name}
                          description={`${item.description}${item.description ? ',' : ''} ${intl.formatDate(new Date(item.createdAt))}`}
                        />
                    </List.Item>
                  </Link>
                )}
              />
            )}
            <Skeleton title={false} loading={wishLists.status === StatusDict.PENDING} active />
            <Skeleton title={false} loading={wishLists.status === StatusDict.PENDING} active />
            <Skeleton title={false} loading={wishLists.status === StatusDict.PENDING} active />
            <Skeleton title={false} loading={wishLists.status === StatusDict.PENDING} active />
          </div>
        </div>
        <Button onClick={() => navigate('/wishlists/create')} size="large" className={css.createBtn}>{intl.formatMessage({ id: 'Action.CreateWishlist' })}</Button>
      </>
    )
}
