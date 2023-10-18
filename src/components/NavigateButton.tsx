import Link from 'next/link';

interface NavigationButtonProps {
    href: string;
    label: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavigateButton = (props: NavigationButtonProps) => {
    const { href, label, onClick } = props;
    return (
        <Link href={href} onClick={() => onClick} className='block bg-background text-font text-lg text-3xl m-4 p-8 py-10 w-fit rounded-3xl shadow-boxOut'>
            {label}
        </Link>

    )
}

export default NavigateButton;