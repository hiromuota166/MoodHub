import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

export const useCustomColorMode = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	useEffect(() => {
		// Chakra UIのcolorModeが変更された時にTailwindのダークモードクラスを切り替える
		const className = "dark";
		if (colorMode === "dark") {
			document.documentElement.classList.add(className);
		} else {
			document.documentElement.classList.remove(className);
		}
	}, [colorMode]);

	// Chakra UIのtoggleColorModeをそのまま使用
	return { colorMode, toggleColorMode };
};
