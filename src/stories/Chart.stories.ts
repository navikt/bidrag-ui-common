import type { Meta, StoryObj } from "@storybook/react";

import { EChartLineChart } from "../react_components/e-charts/LineChart";

const meta = {
    title: "Example/Chart",
    component: EChartLineChart,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof EChartLineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LineChart: Story = {
    args: {
        option: {
            legend: {
                show: false,
            },
            tooltip: {
                trigger: "axis",
                showContent: true,
                formatter: `<p><strong>Lønn</strong>: 45000</p>`,
                backgroundColor: "rgb(230,240,255)",
                borderColor: "rgb(230,240,255)",
            },
            xAxis: {
                type: "category",
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            },
            grid: { bottom: "0px", top: "16px", left: "8px", right: "0px", containLabel: true },
            yAxis: {
                type: "value",
                min: 10000,
                max: 80000,
            },
            series: [
                {
                    name: "Lønn",
                    data: [45000, 45000, 45000, 45000, 45000, 75000, 45000, 45000, 45000, 45000, 60000, 45000],
                    type: "line",
                    smooth: true,
                },
            ],
        },
    },
};
