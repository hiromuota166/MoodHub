import Link from 'next/link';

interface NavigationButtonProps {
    href: string;
    label: string;
}

const NavigateButton = (props: NavigationButtonProps) => {
    const { href, label } = props;
    return (
        <Link href={href} className='block bg-background text-font text-lg text-3xl m-auto p-8 py-10 w-fit rounded-3xl shadow-boxOut'>
            {label}
        </Link>

    )
}

export default NavigateButton;