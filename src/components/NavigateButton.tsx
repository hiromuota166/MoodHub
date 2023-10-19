import Link from "next/link";

interface NavigationButtonProps {
	href: string;
	label: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	linkDisabled?: boolean;
}

const NavigateButton = (props: NavigationButtonProps) => {
	const { href, label, onClick, linkDisabled } = props;
	if (linkDisabled && onClick)
		return (
			<a
				href='/'
				onClick={(e) => {
					onClick(e);
				}}
			>
				<div className='block bg-background text-font text-xl m-4 p-8 py-10 w-fit rounded-3xl shadow-boxOut'>
					{label}
				</div>
			</a>
		);
	return (
		<Link
			href={href}
			onClick={() => onClick}
			className='block bg-background text-font text-xl m-4 p-8 py-10 w-fit rounded-3xl shadow-boxOut'
			aria-disabled
		>
			{label}
		</Link>
	);
};

export default NavigateButton;
