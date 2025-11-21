import { Button, ButtonProps, Modal } from "@navikt/ds-react";
import { ReactNode, useRef } from "react";

import { Broadcast, BroadcastNames, SamhandlerBroadcastMessage } from "../../types";

type SamhandlerSokProps = {
    onResult: (data: SamhandlerBroadcastMessage | null) => void;
    onError?: (errorMessage: string) => void;
};
const width = Math.min(1500, screen.width);
const height = Math.min(1200, screen.height);

export default function SamhandlerSokButton({
    onResult,
    onError,
    ...buttonProps
}: SamhandlerSokProps & Exclude<ButtonProps, "children">): ReactNode {
    const ref = useRef<HTMLDialogElement>(null);
    const windowId = crypto.randomUUID();

    const closeModal = () => {
        searchCanceled.current = true;
        ref.current?.close();
    };
    const openModal = () => ref.current?.showModal();
    const searchCanceled = useRef<boolean>(false);
    const resultReceivedRef = useRef<boolean>(false);

    function openSamhandlerSearch() {
        openModal();
        searchCanceled.current = false;
        resultReceivedRef.current = false;

        const openedWindow = window.open(
            `/samhandler/søk/?windowId=${windowId}`,
            "_blank",
            `location=yes,height=${height},width=${width},scrollbars=yes,status=yes`
        );

        const checkWindowClosed = setInterval(() => {
            if (openedWindow?.closed && !resultReceivedRef.current && !searchCanceled.current) {
                clearInterval(checkWindowClosed);
                console.log("Samhandler-vindu ble lukket uten valg");
                searchCanceled.current = true;
                closeModal();
                onResult(null);
            }
        }, 500);

        Broadcast.waitForBroadcast<SamhandlerBroadcastMessage>(BroadcastNames.SAMHANDLERSOK_RESULT_EVENT, windowId)
            .then((res) => {
                clearInterval(checkWindowClosed);
                resultReceivedRef.current = true;

                if (searchCanceled.current) {
                    onResult(null);
                    return;
                }
                onResult(res.payload);
            })
            .catch((error) => {
                clearInterval(checkWindowClosed);
                resultReceivedRef.current = true;
                onError?.(error);
                onResult(null);
            })
            .finally(() => {
                closeModal();
                window.focus();
                openedWindow?.close();
            });
    }

    return (
        <>
            <Modal
                ref={ref}
                aria-label={"samhandlersok"}
                onClose={closeModal}
                onCancel={(e) => {
                    e.preventDefault();
                }}
                closeOnBackdropClick={false}
                header={{
                    heading: "Venter på resultat fra samhandlersøk ...",
                    closeButton: false,
                }}
            >
                <Modal.Footer>
                    <Button
                        size="medium"
                        type={"button"}
                        title="Avbryt"
                        onClick={() => {
                            closeModal();
                            onResult(null); // Kall onResult med null når Avbryt trykkes
                        }}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={"pdlSearchButton whitespace-nowrap self-center h-full"}>
                <Button
                    {...buttonProps}
                    variant={buttonProps.variant ?? "secondary"}
                    size={buttonProps.size ?? "small"}
                    type={"button"}
                    title="Åpne samhandlersøk"
                    onClick={openSamhandlerSearch}
                >
                    Samhandlersøk
                </Button>
            </div>
        </>
    );
}
