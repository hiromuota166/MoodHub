import low from "@/../public/volume/down.svg";
import lowNight from "@/../public/volume/down-night.svg";
import mute from "@/../public/volume/off.svg";
import muteNight from "@/../public/volume/off-night.svg";
import high from "@/../public/volume/up.svg";
import highNight from "@/../public/volume/up-night.svg";
import Image from "next/image";
import React, { useMemo } from "react";
import { memo } from "react";

interface VolumeButtonProps {
	Volume: number;
	isMuted: boolean;
	colorMode: "dark" | "light";
	handleToggleMute: () => void;
}

// Volumeをモードに変換するヘルパー関数
const getVolumeMode = (Volume: number, isMuted: boolean) => {
	if (isMuted) return "mute";
	if (Volume === 0) return "mute";
	if (Volume < 0.5) return "low";
	return "high";
};

const VolumeButton: React.FC<VolumeButtonProps> = memo(
	function VolumeButton(props) {
		const { Volume, isMuted, handleToggleMute, colorMode } = props;
		// Volumeをモードに変換し、メモ化
		const volumeMode = useMemo(() => getVolumeMode(Volume, isMuted), [Volume, isMuted]);
		// モードに応じて画像を切り替える
		const colorModeMemo = useMemo(() => (colorMode === "dark" ? "dark" : "light"), [colorMode]);
		return (
			<button onClick={handleToggleMute} className='p-4 shadow-boxOut rounded-3xl'>
				{colorModeMemo === "dark" && (
					<>
						{volumeMode === "mute" && <Image src={muteNight} alt='消音画像'></Image>}
						{volumeMode === "low" && <Image src={lowNight} alt='小音量画像'></Image>}
						{(volumeMode === "high" || volumeMode === undefined) && <Image src={highNight} alt='大音量画像'></Image>}
					</>
				)}
				{colorModeMemo === "light" && (
					<>
						{volumeMode === "mute" && <Image src={mute} alt='消音画像'></Image>}
						{volumeMode === "low" && <Image src={low} alt='小音量画像'></Image>}
						{(volumeMode === "high" || volumeMode === undefined) && <Image src={high} alt='大音量画像'></Image>}
					</>
				)}
			</button>
		);
	},
	(prevProps, nextProps) => {
		// モードが変わった時、またはhandleToggleMuteが変わった時にのみ再レンダリング
		return (
			getVolumeMode(prevProps.Volume, prevProps.isMuted) === getVolumeMode(nextProps.Volume, prevProps.isMuted) &&
			prevProps.handleToggleMute === nextProps.handleToggleMute &&
			prevProps.colorMode === nextProps.colorMode
		);
	}
);

VolumeButton.displayName = "VolumeButton";

export default VolumeButton;
