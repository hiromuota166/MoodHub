import { StoryObj, Meta } from "@storybook/react";
import VolumeButton from "@/components/Maracas/VolumeButton";

const meta = {
	title: "Components/VolumeButton",
	component: VolumeButton,
} satisfies Meta<typeof VolumeButton>;

export default meta;
type Story = StoryObj<typeof VolumeButton>;

export const IsMuted: Story = {
    args: {
        isMuted: true,
        Volume: 0,
        handleToggleMute: () => {},
    },
};

export const IsNotMuted: Story = {
    args: {
        isMuted: false,
        Volume: 0.5,
        handleToggleMute: () => {},
    },
};

export const IsMutedAndVolume: Story = {
    args: {
        isMuted: true,
        Volume: 0.3,
        handleToggleMute: () => {},
    },
};

export const IsNotMutedAndVolume: Story = {
    args: {
        isMuted: false,
        Volume: 0.3,
        handleToggleMute: () => {},
    },
};

export const IsMutedAndVolumeMax: Story = {
    args: {
        isMuted: true,
        Volume: 1,
        handleToggleMute: () => {},
    },
};

export const IsNotMutedAndVolumeMax: Story = {
    args: {
        isMuted: false,
        Volume: 1,
        handleToggleMute: () => {},
    },
};
