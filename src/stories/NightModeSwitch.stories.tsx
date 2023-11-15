import { StoryObj, Meta } from "@storybook/react";
import { NightModeSwitch } from "@/components/NightModeSwitch";

const meta = {
	title: "Components/NightModeToggleButton",
	component: NightModeSwitch,
	args: {
		colorMode: "light",
		onToggle: () => {},
	},
} satisfies Meta<typeof NightModeSwitch>;

export default meta;
type Story = StoryObj<typeof NightModeSwitch>;

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

