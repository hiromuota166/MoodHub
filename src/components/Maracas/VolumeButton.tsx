import low from "@/../public/volume/down.svg";
import mute from "@/../public/volume/off.svg";
import high from "@/../public/volume/up.svg";
import Image from "next/image";
import React, { useMemo } from "react";
import { memo } from "react";

interface VolumeButtonProps {
	Volume: number;
	isMuted: boolean;
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
		const { Volume, isMuted, handleToggleMute } = props;
		// Volumeをモードに変換し、メモ化
		const volumeMode = useMemo(() => getVolumeMode(Volume, isMuted), [Volume, isMuted]);
		return (
			<button onClick={handleToggleMute}>
				{volumeMode === "mute" && <Image src={mute} alt='消音画像'></Image>}
				{volumeMode === "low" && <Image src={low} alt='小音量画像'></Image>}
				{(volumeMode === "high" || volumeMode === undefined) && <Image src={high} alt='大音量画像'></Image>}
			</button>
		);
	},
	(prevProps, nextProps) => {
		// モードが変わった時、またはhandleToggleMuteが変わった時にのみ再レンダリング
		return (
			getVolumeMode(prevProps.Volume, prevProps.isMuted) === getVolumeMode(nextProps.Volume, prevProps.isMuted) &&
			prevProps.handleToggleMute === nextProps.handleToggleMute
		);
	}
);

VolumeButton.displayName = "VolumeButton";

export default VolumeButton;

