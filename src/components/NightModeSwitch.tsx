import NightImg from "@/../public/night-mode.svg";
import DayImg from "@/../public/day-mode.svg";
import Image from "next/image";

interface NightModeSwitchProps {
	isNightMode: boolean;
	toggleNightMode: () => void;
}

const NightModeSwitch = (props: NightModeSwitchProps) => {
	const { isNightMode, toggleNightMode } = props;
	return (
		<div>
			<button onClick={toggleNightMode} className='p-4 shadow-boxOut rounded-3xl bg-background'>
				{isNightMode && <Image src={NightImg} alt='夜モード画像'></Image>}
				{!isNightMode && <Image src={DayImg} alt='昼モード画像'></Image>}
			</button>
		</div>
	);
};

export default NightModeSwitch;
