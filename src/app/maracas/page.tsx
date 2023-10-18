import Link from "next/link";
const Page = () => {
	return (
		<div>
			<Link href={"/maracas/light"}>軽量マラカス</Link>
			<Link href={"/maracas/normal"}>ノーマルマラカス</Link>
			<Link href={"/maracas/special"}>スペシャルマラカス</Link>
		</div>
	);
};

export default Page;
