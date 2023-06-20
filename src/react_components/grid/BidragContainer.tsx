import { PropsWithChildren } from "react";
type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default function BidragContainer({ children, ...otherProps }: PropsWithChildren<ContainerProps>) {
    return (
        <div {...otherProps} className={`m-auto max-w-[1096px] ${otherProps.className}`}>
            {children}
        </div>
    );
}
