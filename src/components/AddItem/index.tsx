import {useIntl} from "react-intl";
import {Controller, useForm} from "react-hook-form";
import css from "../WishlistCreate/styles.module.css";
import {Button, Input, Typography} from "antd";
import {AddItemFields} from "./interfaces";
import {PageWrapper} from "../../layout/PageWrapper";

export const AddItem = () => {
	const intl = useIntl();
	const { handleSubmit, control } = useForm<AddItemFields>();
	const onSubmit = (data: AddItemFields) => console.log(data);
	return (
		<PageWrapper title={intl.formatMessage({id: 'Title.WishlistItemAdd'})} isLoading={false}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={css.field}>
					<Typography.Text className={css.label}>{intl.formatMessage({id: 'Form.Wishlist.Title'})}</Typography.Text>
					<Controller name="url" control={control} render={(renderProps) => (
						<Input size="large" maxLength={40} showCount {...renderProps}
									 placeholder={intl.formatMessage({id: 'Form.Wishlist.Title.Placeholder'})}/>
					)}/>
				</div>
				<div className={css.field}>
					<Typography.Text
						className={css.label}>{intl.formatMessage({id: 'Form.Wishlist.Description'})}</Typography.Text>
					<Controller rules={{max: 40}} name="name" control={control} render={(renderProps) => (
						<Input size="large" maxLength={40} showCount {...renderProps}
									 placeholder={intl.formatMessage({id: 'Form.Wishlist.Description.Placeholder'})}/>
					)}/>
				</div>
				<Button type="primary" className={css.submit}
								size="large">{intl.formatMessage({id: 'Action.SaveWishlist'})}</Button>
			</form>
		</PageWrapper>
	)
}
