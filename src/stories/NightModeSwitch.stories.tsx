import { StoryObj, Meta } from "@storybook/react";
import { NightModeToggleButton } from "@/components/NightModeSwitch";

const meta = {
	title: "Components/NightModeToggleButton",
	component: NightModeToggleButton,
	args: {
		colorMode: "light",
		onToggle: () => {},
	},
} satisfies Meta<typeof NightModeToggleButton>;

export default meta;
type Story = StoryObj<typeof NightModeToggleButton>;

export const IsDayMode: Story = {
	args: {
		colorMode: "light",
	},
};

export const IsNightMode: Story = {
	args: {
		colorMode: "dark",
	},
};

