import { Button, Menu, MenuButton, MenuList, MenuItem, useColorModeValue } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";

interface MaracasSelectMenuProps {
	modeText: string;
}

const MaracasSelectMenu = (props: MaracasSelectMenuProps) => {
	const { modeText } = props;
	const [modeTextState, setModeTextState] = useState(modeText);
	const menuTextList = ["軽量", "ノーマル", "スペシャル"];
	const menuTextLink = ["light", "normal", "special"];
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
			>
				<h2 className='py-4 px-2'>{modeTextState}</h2>
			</MenuButton>
			<MenuList
				color={fontColor}
				border={fontColor}
				shadow={"2px 2px 5px rgba(161, 172, 170, 0.90)"}
				borderRadius={"1.5rem"}
				background={bg}
			>
				{menuTextList.map((text, i) => (
					<MenuItem key={i} onClick={() => setModeTextState(text)} background={bg}>
						<Link href={menuTextLink[i]}>{text}</Link>
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default MaracasSelectMenu;

