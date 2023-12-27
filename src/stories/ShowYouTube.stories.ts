import type { Meta, StoryObj } from "@storybook/react";
import ShowYouTube from "@/components/ShowSpotify";

const meta = {
  title: "Components/ShowYouTube",
  component: ShowYouTube,
  tags: ["autodocs"],
} satisfies Meta<typeof ShowYouTube>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    query: "終わりなき旅",
  },
};
