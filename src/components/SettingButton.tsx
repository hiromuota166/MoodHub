import SettingsImg from "@/../public/settings.svg";
import SettingsImgDark from "@/../public/settings-night.svg";
import Image from "next/image";

interface SettingButtonProps {
	onOpen: () => void;
	title: string;
	colorMode: "dark" | "light";
}

const SettingButton = (props: SettingButtonProps) => {
	const { onOpen, title, colorMode } = props;
	return (
		<button onClick={onOpen} className='flex rounded-3xl shadow-boxOut p-4 gap-1'>
			{
				colorMode === "dark" ? (
					<Image src={SettingsImgDark} alt={`${title}設定モーダルを開くアイコン`} className='m-auto ' />
				) : (
					<Image src={SettingsImg} alt={`${title}設定モーダルを開くアイコン`} className='m-auto ' />
				)
			}
		</button>
	);
};

export default SettingButton;
