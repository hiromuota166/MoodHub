import Link from "next/link";
const Page = () => {
	return (
		<div>
			<Link href={"/maracas/normal"}>ノーマルマラカス</Link>
			<Link href={"/maracas/special"}>スペシャルマラカス</Link>
		</div>
	);
};

export default Page;
