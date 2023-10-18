"use client"
import Link from "next/link";
import NavigateButton from "@/components/NavigateButton";
const Page = () => {
	return (
		<div className="flex justify-center items-center h-[70vh]">
			<div className="flex w-fit h-fit m-auto gap-4">
				<NavigateButton href={"/maracas/light"} label={"軽量マラカス"} />
				<NavigateButton href={"/maracas/normal"} label={"ノーマルマラカス"} />
				<NavigateButton href={"/maracas/special"} label={"スペシャルマラカス"} />
			</div>
		</div>
	);
};

export default Page;
