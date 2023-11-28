import type { Meta, StoryObj } from "@storybook/react";
import RoomInButton from "../components/RoomInButton";

const meta = {
  title: "RoomInButton",
  component: RoomInButton,
} satisfies Meta<typeof RoomInButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
