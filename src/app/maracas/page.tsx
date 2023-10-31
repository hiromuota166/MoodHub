"use client";
import NavigateButton from "@/components/NavigateButton";
const Page = () => {
	const navigationButtonProps = [
		{
			href: "/maracas/light",
			label: "軽量マラカス",
		},
		{
			href: "/maracas/normal",
			label: "ノーマルマラカス",
		},
		{
			href: "/maracas/special",
			label: "スペシャルマラカス",
		},
	];
	return (
		<div className='flex justify-center items-center h-[70vh]'>
			<div className='xl:flex w-fit h-fit m-auto 2xl:gap-4 gap-x-2'>
				{navigationButtonProps.map((props, i) => {
					return (
						<div key={i} className='w-fit m-auto my-4'>
							<NavigateButton href={props.href} label={props.label} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Page;
