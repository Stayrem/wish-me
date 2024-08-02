import { useGate, useUnit } from 'effector-react';
import { $currentWishlist, CurrentWishlistGate } from '../../models/current-wish-list';
import css from './styles.module.css';
import {useIntl} from "react-intl";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Skeleton, Typography} from "antd";
import dogIcon from "../../images/icons/dog.svg";
import {StatusDict} from "../../models/interfaces";

export const Wishlist = () => {
    const currentWishlist = useUnit($currentWishlist);
    useGate(CurrentWishlistGate);
    const intl = useIntl();
    const navigate = useNavigate();
    return (
      <>
          <div className={css.wrapper}>
              <Typography.Title className={css.title} level={3}>{currentWishlist.data?.name}</Typography.Title>
              <div className={css.scroller}>
                  {currentWishlist.status === 'SUCCESS' && currentWishlist.data.list.length === 0 && (
                    <div className={css.empty}>
                        <img src={dogIcon} width="150" alt=""/>
                        <Typography.Text>{intl.formatMessage({id: 'Wishlists.Empty'})}</Typography.Text>
                    </div>
                  )}
                  {currentWishlist.status === 'SUCCESS' && currentWishlist.data.list.length > 0 && (
                    <div className={css.list}>
                      {currentWishlist.data.list.map((it) => (
                        <NavLink className={css.listItem} to={`/wishlists/${currentWishlist.data.id}/${it.id}`}>
                          <div className={css.listImage} style={{backgroundImage: `url(${it.previewSrc})`}}/>
                          <Typography.Title className={css.listTitle} level={5}>{it.name}</Typography.Title>
                          <Typography.Text type="secondary" className={css.listText}>{it.price}</Typography.Text>
                        </NavLink>
                      ))}
                    </div>
                  )}
                  <Skeleton title={false} loading={currentWishlist.status === StatusDict.PENDING} active />
                  <Skeleton title={false} loading={currentWishlist.status === StatusDict.PENDING} active />
                  <Skeleton title={false} loading={currentWishlist.status === StatusDict.PENDING} active />
                  <Skeleton title={false} loading={currentWishlist.status === StatusDict.PENDING} active />
              </div>
          </div>
          <Button onClick={() => navigate(`/wishlists/${currentWishlist.data?.id}/create`)} size="large" className={css.createBtn}>{intl.formatMessage({ id: 'Action.AddItem' })}</Button>
      </>
    )
}
