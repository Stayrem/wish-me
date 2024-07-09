import { Avatar, List, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useGate, useUnit } from 'effector-react';
import { $currentWishList, CurrentWishListGate } from '../../models/current-wish-list';
import css from './styles.module.css';

export const WishList = () => {
    const currentWishList = useUnit($currentWishList);
    useGate(CurrentWishListGate);
    return (
        <>
            <div className={css.header}>
                <Avatar size={100} src={currentWishList.data?.previewSrc} />
                <Typography.Text className={css.text}>{currentWishList.data?.name}</Typography.Text>
            </div>
            <Typography.Text>Список подарков</Typography.Text>
            <div className={css.wrapper}>
                <Button className={css.add_btn} type="link" icon={<PlusOutlined />}>Добавить</Button>
                <List
                    dataSource={currentWishList.data?.list || undefined}
                    renderItem={(item) => (
                        <div className={css.card}>
                            <div className={css.card_left}>
                                <img className={css.card_left__img} src={item.previewSrc || ''} alt={''}/>
                            </div>
                            <div className={css.card_right}>
                                <Typography.Text className={css.card_right__name}>{item.name}</Typography.Text>
                                <Typography.Text className={css.card_right__price}>{item.price}</Typography.Text>
                            </div>
                        </div>
                    )}
                />
            </div>

        </>
    )
}
