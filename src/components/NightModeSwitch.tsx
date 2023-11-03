"use client";
import NightImg from "@/../public/night-mode.svg";
import DayImg from "@/../public/day-mode.svg";
import Image from "next/image";
import { useCustomColorMode } from "@/customhooks/useCustomColorMode";

interface NightModeToggleButtonProps {
	colorMode: "dark" | "light";
	onToggle: () => void;
}

export const NightModeToggleButton = (props: NightModeToggleButtonProps) => {
	const { colorMode, onToggle } = props;
	return (
		<div>
			<button onClick={onToggle} className='p-4 shadow-boxOut rounded-3xl bg-background'>
				{colorMode === "dark" && <Image src={NightImg} alt='夜モード画像' />}
				{colorMode === "light" && <Image src={DayImg} alt='昼モード画像' />}
			</button>
		</div>
	);
};

const NightModeSwitch = () => {
	const { colorMode, toggleColorMode } = useCustomColorMode();

	return <NightModeToggleButton colorMode={colorMode} onToggle={toggleColorMode} />;
};

export default NightModeSwitch;

