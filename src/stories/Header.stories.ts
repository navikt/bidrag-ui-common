import type { Meta, StoryObj } from "@storybook/react";

import SakHeader from "../react_components/header/SakHeader";
import { RolleType } from "../types";

const meta = {
    title: "Example/SakHeader",
    component: SakHeader,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof SakHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Forskudd: Story = {
    args: {
        saksnummer: "1234",
        roller: [
            {
                rolleType: RolleType.BIDRAGS_PLIKTIG,
                navn: "Haugen, Jacob Theodor",
                ident: "31459900198",
            },
            {
                rolleType: RolleType.BIDRAGS_MOTTAKER,
                navn: "Johnsen, Iben Iben",
                ident: "21470262629",
            },
            {
                rolleType: RolleType.BARN,
                navn: "Johnsen, Sophia Frida",
                ident: "03522150877",
            },
            {
                rolleType: RolleType.BARN,
                navn: "Johnsen, Leah Olivia",
                ident: "07512150855",
            },
            {
                rolleType: RolleType.BARN,
                navn: "Johnsen, Leah Olivia",
                ident: "03141170855",
            },
        ],
        skjermbilde: { navn: "Søknad om forskudd", referanse: `#77777` },
    },
};
