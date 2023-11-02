import { StoryObj, Meta } from "@storybook/react";
import NightModeSwitch from "@/components/NightModeSwitch";

const meta = {
	title: "Components/NightModeSwitch",
	component: NightModeSwitch,
    args: {
        toggleNightMode: () => {},
        isNightMode: true,
    },
} satisfies Meta<typeof NightModeSwitch>;

export default meta;
type Story = StoryObj<typeof NightModeSwitch>;

export const IsDayMode: Story = {
    args: {
        isNightMode: false,
    },
};

export const IsNightMode: Story = {
    args: {
        isNightMode: true,
    },
};