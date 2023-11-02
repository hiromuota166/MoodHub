"use client";
import NightImg from "@/../public/night-mode.svg";
import DayImg from "@/../public/day-mode.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const NightModeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const isNightMode = theme === "dark";

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const toggleNightMode = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

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

