import { PropsWithChildren } from "react";

type GridProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default function BidragGrid({ children, ...otherProps }: PropsWithChildren<GridProps>) {
    return (
        <div {...otherProps} className={`grid grid-cols-12 gap-6 ${otherProps.className}`}>
            {children}
        </div>
    );
}
