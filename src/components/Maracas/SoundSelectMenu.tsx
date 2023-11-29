import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";
import { AudioFile } from "@/customhooks/useSoundEvents";

interface SoundSelectMenuProps {
  audioFiles: AudioFile[];
  audioFile: AudioFile;
  setAudioFile: Dispatch<SetStateAction<AudioFile>>;
}

const SoundSelectMenu = (props: SoundSelectMenuProps) => {
  const { audioFiles, audioFile, setAudioFile } = props;
  const bg = useColorModeValue("#D6E5E3", "#183D4D");
  const fontColor = useColorModeValue("#6B7271", "#E0E0E0");


  return (
    <Menu colorScheme={bg}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        color={fontColor}
        colorScheme={bg}
        border={fontColor}
        shadow={"2px 2px 5px rgba(161, 172, 170, 0.90)"}
        borderRadius={"1.5rem"}
        height={"fit-content"}
      >
        <h2 className="py-4 px-2">{`サウンド: ${audioFile.name}`}</h2>
      </MenuButton>
      <MenuList
        color={fontColor}
        border={fontColor}
        shadow={"2px 2px 5px rgba(161, 172, 170, 0.90)"}
        borderRadius={"1.5rem"}
        background={bg}
      >
        {audioFiles.map((audio, i) => (
          <MenuItem key={i} onClick={() => setAudioFile(audio)} background={bg}>
            {audio.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SoundSelectMenu;
