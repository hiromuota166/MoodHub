import type { Meta, StoryObj } from "@storybook/react";
import CreateRoom from "../components/CreateRoom";

const meta = {
  title: "CreateRoom",
  component: CreateRoom,
} satisfies Meta<typeof CreateRoom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
