import { PropsWithChildren } from "react";
type GridProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default function BidragGrid({ children, ...otherProps }: PropsWithChildren<GridProps>) {
    return (
        <div {...otherProps} className={`grid md:grid-cols-auto grid-cols-autosmall gap-1 ${otherProps.className}`}>
            {children}
        </div>
    );
}
