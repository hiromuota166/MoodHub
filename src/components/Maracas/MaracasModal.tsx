import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Box,
	Text,
} from "@chakra-ui/react";
import RangeSlider from "../RangeSlider/RangeSlider";
import SettingsImg from "@/../public/settings.svg";
import Image from "next/image";

interface MaracasModalProps {
	MaracasSensitivity: number;
	handleMaracasSensitivityChange: (value: number) => void;
	MaracasVibrationIntensity: number;
	handleMaracasVibrationIntensityChange: (value: number) => void;
	isMuted: boolean;
	toggleMute: () => void;
	Volume: number;
	handleVolumeChange: (value: number) => void;
	handleMaracasSoundSwitch: () => void;
}
const MaracasModal = (props: MaracasModalProps) => {
	const {
		MaracasSensitivity,
		handleMaracasSensitivityChange,
		MaracasVibrationIntensity,
		handleMaracasVibrationIntensityChange,
		isMuted,
		toggleMute,
		Volume,
		handleVolumeChange,
		handleMaracasSoundSwitch,
	} = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<button onClick={onOpen} className='rounded-3xl shadow-boxOut p-4 sm-bg-white'>
				<Image src={SettingsImg} alt="マラカス設定モーダルを開くアイコン"/><span className="hidden md-block">マラカス設定</span>
			</button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="#D6E5E3">
					<ModalHeader>マラカス設定</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<RangeSlider
							min={10}
							max={150}
							step={10}
							value={MaracasSensitivity}
							onChange={handleMaracasSensitivityChange}
							label='マラカスの感度'
							id='volumeSlider'
						/>
						<RangeSlider
							min={1}
							max={30}
							value={MaracasVibrationIntensity}
							onChange={handleMaracasVibrationIntensityChange}
							label='マラカスの振動強度'
							id='volumeSlider'
						/>
						<RangeSlider
							min={0}
							max={1}
							step={0.1}
							value={Volume}
							onChange={handleVolumeChange}
							label='マラカスの音量'
							id='volumeSlider'
						/>
						<Box m='2'>
							<Text fontSize='sm'>音が鳴らない場合は消音モードをオフにしてください。</Text>
						</Box>
					</ModalBody>
					<ModalFooter>
						<button className='bg-background rounded-2xl shadow-boxOut p-4 pt-2 text-lg' onClick={onClose}>
							Close
						</button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default MaracasModal;

