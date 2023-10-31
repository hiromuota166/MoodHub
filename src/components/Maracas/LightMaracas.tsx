import Image from "next/image";

const LightMaracas = () => {
	return (
		<div className='w-[60%] h-[60%] m-auto'>
			<Image
				src={"/music_maracas.webp"}
				alt='マラカスの画像'
				width={400}
				height={382}
				layout='responsive'
				loading='eager'
			></Image>
		</div>
	);
};

export default LightMaracas;
