import css from "./styles.module.css";
import {Button, Skeleton, Typography} from "antd";
import {PageWrapperProps} from "./interfaces";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import dogIcon from "../../images/icons/dog.svg";

export const PageWrapper = (props: PageWrapperProps) => {
	let navigate = useNavigate();
	const { hideBackButton = false } = props;
	return (
		<>
			<div className={css.wrapper}>
				<header className={css.header}>
					{hideBackButton ? null : (
						<Button onClick={() => navigate(-1)} className={css.backBtn} size="large" type="text" icon={<ArrowLeftOutlined />} />
					)}
					<Typography.Title className={css.title} level={3}>{props.title}</Typography.Title>
				</header>
				{props.empty && props.empty.isVisible && (
					<div className={css.empty}>
						<img src={dogIcon} width="150" alt=""/>
						<Typography.Text>{props.empty.emptyText}</Typography.Text>
					</div>
				)}
				<div className={css.scroller}>
					{props.children}
					<Skeleton title={false} loading={props.isLoading} active />
					<Skeleton title={false} loading={props.isLoading} active />
					<Skeleton title={false} loading={props.isLoading} active />
					<Skeleton title={false} loading={props.isLoading} active />
				</div>
			</div>
		</>
	)
}
