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
} from "@chakra-ui/react";
import RangeSlider from "../RangeSlider/RangeSlider";
import VolumeButton from "./VolumeButton";

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
			<button onClick={onOpen} className='rounded-3xl shadow-boxOut p-4 px-6 bg-background'>
				マラカス設定
			</button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
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
						<VolumeButton Volume={Volume} isMuted={isMuted} handleToggleMute={toggleMute} />
						<RangeSlider
							min={0}
							max={1}
							step={0.1}
							value={Volume}
							onChange={handleVolumeChange}
							label='マラカスの音量'
							id='volumeSlider'
						/>
					</ModalBody>
					<ModalFooter>
						<button className="bg-background rounded-2xl shadow-boxOut p-4 pt-2 text-lg" onClick={onClose}>
							Close
						</button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default MaracasModal;

