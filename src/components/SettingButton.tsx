import SettingsImg from "@/../public/settings.svg";
import Image from "next/image";

interface SettingButtonProps {
	onOpen: () => void;
	title: string;
}

const SettingButton = (props: SettingButtonProps) => {
    const { onOpen, title } = props;
	return (
		<button onClick={onOpen} className='flex rounded-3xl shadow-boxOut p-4 gap-1 bg-background text-font'>
			<Image src={SettingsImg} alt={`${title}設定モーダルを開くアイコン`} className="m-auto " />
			<span className='hidden md:flex text-lg m-auto '>{title}</span>
		</button>
	);
};

export default SettingButton;
