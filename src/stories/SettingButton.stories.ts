import { StoryObj, Meta } from "@storybook/react";
import SettingButton from "@/components/SettingButton";

const meta = {
  title: "Components/SettingButton",
  component: SettingButton,
} satisfies Meta<typeof SettingButton>;

export default meta;
type Story = StoryObj<typeof SettingButton>;

export const Normal: Story = {
  args: {
    title: "マラカス設定",
  },
};
