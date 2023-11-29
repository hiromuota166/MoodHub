/* eslint-disable no-unused-vars */
import {
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
  useColorModeValue,
} from "@chakra-ui/react";
import RangeSlider from "../RangeSlider/RangeSlider";
import SettingButton from "../SettingButton";
import { Dispatch, SetStateAction } from "react";
import { AudioFile } from "@/customhooks/useSoundEvents";
import SoundSelectMenu from "./SoundSelectMenu";

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
  colorMode: "dark" | "light";
  audioFiles: AudioFile[],
  audioFile: AudioFile,
  setAudioFile: Dispatch<SetStateAction<AudioFile>>
}
const MaracasModal = (props: MaracasModalProps) => {
  const {
    MaracasSensitivity,
    handleMaracasSensitivityChange,
    MaracasVibrationIntensity,
    handleMaracasVibrationIntensityChange,
    Volume,
    handleVolumeChange,
    colorMode,
    audioFiles,
    audioFile,
    setAudioFile,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("#D6E5E3", "#183D4D");
  const fontColor = useColorModeValue("#6B7271", "#E0E0E0");

  return (
    <>
      <SettingButton
        onOpen={onOpen}
        title="マラカス設定"
        colorMode={colorMode}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bg} color={fontColor}>
          <ModalHeader>マラカス設定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RangeSlider
              min={10}
              max={150}
              step={10}
              value={MaracasSensitivity}
              onChange={handleMaracasSensitivityChange}
              label="マラカスの感度"
              id="volumeSlider"
            />
            <RangeSlider
              min={1}
              max={30}
              value={MaracasVibrationIntensity}
              onChange={handleMaracasVibrationIntensityChange}
              label="マラカスの振動強度"
              id="volumeSlider"
            />
            <RangeSlider
              min={0}
              max={1}
              step={0.1}
              value={Volume}
              onChange={handleVolumeChange}
              label="マラカスの音量"
              id="volumeSlider"
            />
            <Box m="2">
              <Text fontSize="sm">
                音が鳴らない場合は消音モードをオフにしてください。
              </Text>
            </Box>
            <SoundSelectMenu audioFiles={audioFiles} audioFile={audioFile} setAudioFile={setAudioFile} />
          </ModalBody>
          <ModalFooter>
            <button
              className="rounded-2xl shadow-boxOut p-4 pt-2 text-lg"
              onClick={onClose}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MaracasModal;
