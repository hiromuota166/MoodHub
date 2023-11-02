"use client";
import NightImg from "@/../public/night-mode.svg";
import DayImg from "@/../public/day-mode.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useCustomColorMode } from "@/customhooks/useCustomColorMode";

const NightModeSwitch = () => {
	const { colorMode, toggleColorMode } = useCustomColorMode();

	const toggleNightMode = () => {
		toggleColorMode();
	};

	return (
		<div>
			<button onClick={toggleNightMode} className='p-4 shadow-boxOut rounded-3xl bg-background'>
				{colorMode === "dark" && <Image src={NightImg} alt='夜モード画像'></Image>}
				{colorMode === "light"  && <Image src={DayImg} alt='昼モード画像'></Image>}
			</button>
		</div>
	);
};

export default NightModeSwitch;

