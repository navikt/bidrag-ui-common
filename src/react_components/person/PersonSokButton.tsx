import { Button, ButtonProps, Modal } from "@navikt/ds-react";
import { ReactElement, useRef, useState } from "react";

import { BroadcastError, PersonBroadcastMessage } from "../../types/broadcast";

type PersonSokProps = {
    onResult: (data: PersonBroadcastMessage | null) => void;
    onError?: (errorMessage: string) => void;
};
export default function PersonSokButton({
    onResult,
    onError,
    ...buttonProps
}: PersonSokProps & ButtonProps): ReactElement {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const closeModal = () => {
        searchCanceled.current = true;
        setModalOpen(false);
    };
    const openModal = () => setModalOpen(true);
    const searchCanceled = useRef<boolean>(false);

    function openPersonSearch() {
        openModal();
        searchCanceled.current = false;
        const openedWindow = window.openPersonsok();
        window
            .waitForPersonSokResult()
            .then((data) => {
                if (searchCanceled.current) {
                    return;
                }
                if (!data.ok && data.error) {
                    console.error(
                        "Det skjedde en feil ved henting av personinfo",
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
            {modalOpen && (
                <Modal
                    open
                    aria-label={"personsok"}
                    onClose={(e) => {
                        setModalOpen(false);
                    }}
                    onCancel={(e) => {
                        e.preventDefault();
                    }}
                    closeOnBackdropClick={false}
                    header={{
                        heading: "Venter på resultat fra personsøk ...",
                        closeButton: false,
                    }}
                >
                    <Modal.Footer>
                        <Button size="medium" onClick={closeModal}>
                            Avbryt
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            <div className={"pdlSearchButton whitespace-nowrap self-center h-full"}>
                <Button
                    {...buttonProps}
                    variant={buttonProps.variant ?? "secondary"}
                    size={buttonProps.size ?? "small"}
                    type={"button"}
                    title="Åpne personsøk"
                    onClick={openPersonSearch}
                >
                    Personsøk
                </Button>
            </div>
        </>
    );
}
