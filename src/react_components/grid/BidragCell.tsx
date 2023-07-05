import { PropsWithChildren } from "react";

type GridProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type BidragCellProps = {
    xs?: number;
    sm?: number;
    lg?: number;
    md?: number;
};
export default function BidragCell({
    children,
    xs = 12,
    sm = 10,
    md = 8,
    lg = 6,
    ...otherProps
}: PropsWithChildren<GridProps & BidragCellProps>) {
    return (
        <div
            {...otherProps}
            className={`${otherProps.className} col-span-12 xs:col-span-${xs} sm:col-span-${sm} md:col-span-${md} lg:col-span-${lg}`}
        >
            {children}
        </div>
    );
}
