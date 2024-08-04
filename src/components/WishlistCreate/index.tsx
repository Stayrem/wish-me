import {Button, DatePicker, Input, Typography} from "antd";
import css from "./styles.module.css";
import {useIntl} from "react-intl";
import {useForm, Controller} from "react-hook-form";
import {CreateWishlistForm} from "./interface";
import {PageWrapper} from "../../layout/PageWrapper";

export const WishlistCreate = () => {
	const intl = useIntl();
	const { handleSubmit, control } = useForm<CreateWishlistForm>();
	const onSubmit = (data: CreateWishlistForm) => console.log({ ...data, date: data.date.unix() });
	return (
		<PageWrapper title={intl.formatMessage({id: 'Title.WishlistCreate'})} isLoading={false}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={css.field}>
					<Typography.Text className={css.label}>{intl.formatMessage({id: 'Form.Wishlist.Title'})}</Typography.Text>
					<Controller name="title" control={control} render={({ field }) => (
						<Input size="large" maxLength={40} showCount {...field}
									 placeholder={intl.formatMessage({id: 'Form.Wishlist.Title.Placeholder'})}/>
					)}/>
				</div>
				<div className={css.field}>
					<Typography.Text
						className={css.label}>{intl.formatMessage({id: 'Form.Wishlist.Description'})}</Typography.Text>
					<Controller rules={{max: 40}} name="description" control={control} render={({ field }) => (
						<Input size="large" maxLength={40} showCount {...field}
									 placeholder={intl.formatMessage({id: 'Form.Wishlist.Description.Placeholder'})}/>
					)}/>
				</div>
				<div className={css.field}>
					<Typography.Text
						className={css.label}>{intl.formatMessage({id: 'Form.Wishlist.Date'})}</Typography.Text>
					<Controller name="date" control={control} render={({ field }) => (
						<DatePicker className={css.datepicker} {...field} size="large" maxLength={40}  />
					)}/>
				</div>
				<Button htmlType="submit" type="primary" className={css.submit}
								size="large">{intl.formatMessage({id: 'Action.SaveWishlist'})}</Button>
			</form>
		</PageWrapper>
	)
}
