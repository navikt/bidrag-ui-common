import { Button, ButtonProps, Modal } from "@navikt/ds-react";
import { ReactNode, useRef } from "react";

import { Broadcast, BroadcastMessage, BroadcastNames, SamhandlerBroadcastMessage } from "../../types";

type SamhandlerSokProps = {
    onResult: (data: BroadcastMessage<SamhandlerBroadcastMessage> | null) => void;
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

    function openSamhandlerSearch() {
        openModal();
        searchCanceled.current = false;
        const openedWindow = window.open(
            "/samhandler/søk",
            "_blank",
            `location=yes,height=${height},width=${width},scrollbars=yes,status=yes`
        );

        Broadcast.waitForBroadcast<SamhandlerBroadcastMessage>(
            BroadcastNames.SAMHANDLERSOK_RESULT_EVENT,
            windowId
        ).then((res) => {
            if (searchCanceled.current) {
                return;
            }
            onResult(res);
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
                    <Button size="medium" type={"button"} title="Avbryt" onClick={closeModal}>
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
