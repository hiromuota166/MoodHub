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
import RangeSlider from "./RangeSlider/RangeSlider";

interface MaracasModalProps {
	MaracasSensitivity: number;
	handleMaracasSensitivityChange: (value: number) => void;
	MaracasVibrationIntensity: number;
	handleMaracasVibrationIntensityChange: (value: number) => void;
	DeviceVolume: number;
	handleDeviceVolumeChange: (value: number) => void;
	handleMaracasSoundSwitch: () => void;
}
const MaracasModal = (props: MaracasModalProps) => {
	const {
		MaracasSensitivity,
		handleMaracasSensitivityChange,
		MaracasVibrationIntensity,
		handleMaracasVibrationIntensityChange,
		DeviceVolume,
		handleDeviceVolumeChange,
		handleMaracasSoundSwitch,
	} = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>設定</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<RangeSlider
							min={0}
							max={100}
							value={MaracasSensitivity}
							onChange={handleMaracasSensitivityChange}
							label='マラカスの感度設定'
							id='volumeSlider'
						/>
						<RangeSlider
							min={0}
							max={100}
							value={MaracasVibrationIntensity}
							onChange={handleMaracasVibrationIntensityChange}
							label='マラカスの振動強度設定'
							id='volumeSlider'
						/>
						<RangeSlider
							min={0}
							max={1}
							step={0.1}
							value={DeviceVolume}
							onChange={handleDeviceVolumeChange}
							label='デバイス全体の音量設定'
							id='volumeSlider'
						/>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant='ghost'>Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default MaracasModal;

