import { Button, ButtonProps, Modal } from "@navikt/ds-react";
import { ReactNode, useRef } from "react";

import { BroadcastError, SamhandlerBroadcastMessage } from "../../types";

type SamhandlerSokProps = {
    onResult: (data: SamhandlerBroadcastMessage | null) => void;
    onError?: (errorMessage: string) => void;
};
export default function SamhandlerSokButton({
    onResult,
    onError,
    ...buttonProps
}: SamhandlerSokProps & Exclude<ButtonProps, "children">): ReactNode {
    const ref = useRef<HTMLDialogElement>(null);

    const closeModal = () => {
        searchCanceled.current = true;
        ref.current?.close();
    };
    const openModal = () => ref.current?.showModal();
    const searchCanceled = useRef<boolean>(false);

    function openSamhandlerSearch() {
        openModal();
        searchCanceled.current = false;
        const openedWindow = window.openSamhandlersok();
        window
            .waitForSamhandlerSokResult()
            .then((data) => {
                if (searchCanceled.current) {
                    return;
                }
                if (!data.ok && data.error) {
                    console.error(
                        "Det skjedde en feil ved henting av samhandlerinfo",
                        (data.error as BroadcastError)?.stack
                    );
                    return;
                }
                onResult(data.payload);
            })
            .catch(onError)
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
