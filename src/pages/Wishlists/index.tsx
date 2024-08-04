import {List, Button, Typography} from 'antd';
import { useIntl } from 'react-intl';
import { useGate, useUnit } from 'effector-react';
import { $wishListsStore, WishlistsGate } from '../../models/wish-lists';
import { StatusDict } from '../../models/interfaces';
import css from './styles.module.css';
import {Link, useNavigate} from "react-router-dom";
import {PageWrapper} from "../../layout/PageWrapper";
import {WishlistItem} from "../../components/WishlistItem";
import {$sharedWishListsStore, SharedWishlistsGate} from "../../models/shared-wish-lists";

export const Wishlists = () => {
    useGate(WishlistsGate, '');
    useGate(SharedWishlistsGate, '');
    const [wishLists, sharedWishLists] = useUnit([$wishListsStore, $sharedWishListsStore]);
    const intl = useIntl();
    const navigate = useNavigate();
    return (
      <>
        <PageWrapper empty={{ isVisible: wishLists.status === 'SUCCESS' && wishLists.data.length === 0, emptyText: intl.formatMessage({id: 'Wishlists.Empty'}) }} hideBackButton={true} title={intl.formatMessage({ id: 'Title.Wishlists' })} isLoading={wishLists.status === StatusDict.PENDING}>
            {wishLists.status === 'SUCCESS' && wishLists.data.length > 0 && (
              <List
                dataSource={wishLists.data || undefined}
                renderItem={(item) => (
                  <Link to={`/wishlists/${item.id}`}>
                      <WishlistItem {...item} shared={false} />
                  </Link>
                )}
              />
            )}
            {sharedWishLists.status === 'SUCCESS' && sharedWishLists.data.length > 0 && (
              <>
                  <Typography.Title level={4}>{intl.formatMessage({ id: 'Shared.Title' })}</Typography.Title>
                  <List
                    dataSource={wishLists.data || undefined}
                    renderItem={(item) => (
                      <Link to={`/wishlists/${item.id}`}>
                          <WishlistItem {...item} shared />
                      </Link>
                    )}
                  />
              </>
            )}
        </PageWrapper>
        <Button onClick={() => navigate('/wishlists/create')} size="large" className={css.createBtn}>{intl.formatMessage({ id: 'Action.CreateWishlist' })}</Button>
      </>
    )
}
