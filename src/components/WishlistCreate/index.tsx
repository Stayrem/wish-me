import {Button, Input, Typography} from "antd";
import css from "./styles.module.css";
import {useIntl} from "react-intl";
import {useForm, Controller} from "react-hook-form";
import {CreateWishlistForm} from "./interface";

export const WishlistCreate = () => {
	const intl = useIntl();
	const { handleSubmit, control } = useForm<CreateWishlistForm>();
	const onSubmit = (data: CreateWishlistForm) => console.log(data);
	return (
		<div className={css.wrapper}>
			<div>
				<Typography.Title className={css.title} level={3}>{intl.formatMessage({ id: 'Title.WishlistCreate' })}</Typography.Title>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={css.field}>
					<Typography.Text className={css.label}>{intl.formatMessage({ id: 'Form.Wishlist.Title' })}</Typography.Text>
					<Controller name="title" control={control} render={(renderProps) => (
						<Input size="large" maxLength={40} showCount {...renderProps} placeholder={intl.formatMessage({ id: 'Form.Wishlist.Title.Placeholder' })} />
					)} />
				</div>
				<div className={css.field}>
					<Typography.Text className={css.label}>{intl.formatMessage({ id: 'Form.Wishlist.Description' })}</Typography.Text>
					<Controller rules={{ max: 40 }} name="description" control={control} render={(renderProps) => (
						<Input size="large" maxLength={40} showCount {...renderProps} placeholder={intl.formatMessage({ id: 'Form.Wishlist.Description.Placeholder' })} />
					)} />
				</div>
				<Button type="primary" className={css.submit} size="large">{intl.formatMessage({ id: 'Action.SaveWishlist' })}</Button>
			</form>
		</div>
	)
}
