import { useGate, useUnit } from 'effector-react';
import { $currentWishlist, CurrentWishlistGate } from '../../models/current-wish-list';
import css from './styles.module.css';
import {useIntl} from "react-intl";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Typography} from "antd";
import telegramLogo from "../../images/icons/telegram-logo.svg";
import telegramLogoWhite from "../../images/icons/telegram-logo-white.svg";
import {StatusDict} from "../../models/interfaces";
import {PageWrapper} from "../../layout/PageWrapper";
import cn from 'classnames';
import {BOT_URL} from "../../constants";

export const Wishlist = () => {
    const currentWishlist = useUnit($currentWishlist);
    useGate(CurrentWishlistGate);
    const intl = useIntl();
    const navigate = useNavigate();
    const { data, status } = currentWishlist;
    const shareLink = `https://t.me/share/url?url=${BOT_URL}?start=share=${data?.id}&text=${intl.formatMessage({ id: 'Share.Wishlist.Text' }, { name: data?.name })}`
    const telegram = window.Telegram.WebApp.colorScheme === 'light' ? telegramLogo : telegramLogoWhite;
    return (
      <>
        <PageWrapper title={data?.name || ''} isLoading={status === StatusDict.PENDING}>
                  {status === 'SUCCESS' && data.list.length > 0 && (
                    <div className={css.list}>
                      {data.list.map((it) => (
                        <NavLink key={it.id} className={css.listItem} to={`/wishlists/${currentWishlist.data.id}/${it.id}`}>
                          <div className={cn(css.listImage, { [css.booked]: it.booked })} style={{backgroundImage: `url(${it.previewSrc})`}}/>
                          <Typography.Title className={css.listTitle} level={5}>{it.name}</Typography.Title>
                          <Typography.Text type="secondary" className={css.listText}>{it.price}</Typography.Text>
                        </NavLink>
                      ))}
                    </div>
                  )}
        </PageWrapper>
        {currentWishlist.status === 'SUCCESS' && data && data.list.length > 0 && (
          <Button size="large" className={css.createBtn} onClick={() => window.Telegram.WebApp.openLink(shareLink)}><img alt="" src={telegram} width={20} />{intl.formatMessage({ id: 'Share.Telegram' })}</Button>
        )}
        <Button onClick={() => navigate(`/wishlists/${data?.id}/create`)} size="large" className={css.createBtn}>{intl.formatMessage({ id: 'Action.AddItem' })}</Button>
      </>
    )
}
