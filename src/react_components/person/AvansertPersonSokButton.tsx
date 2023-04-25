import { Button, Heading, Modal } from "@navikt/ds-react";
import { ReactElement, useRef, useState } from "react";

import { BroadcastError, PersonBroadcastMessage } from "../../types/broadcast";

interface AvansertSokProps {
    onResult: (data: PersonBroadcastMessage | null) => void;
    onError?: (errorMessage: string) => void;
}
export default function AvansertPersonSokButton({ onResult, onError }: AvansertSokProps): ReactElement {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const closeModal = () => {
        searchCanceled.current = true;
        setModalOpen(false);
    };
    const openModal = () => setModalOpen(true);
    const searchCanceled = useRef<boolean>(false);

    function openAdvancedSearch() {
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
                    onClose={() => setModalOpen(false)}
                    shouldCloseOnEsc={false}
                    shouldCloseOnOverlayClick={false}
                    closeButton={false}
                >
                    <Modal.Content>
                        <Heading size="medium">Venter på resultat fra avansert søk ...</Heading>
                        <Button onClick={closeModal} style={{ marginTop: "1rem" }}>
                            Avbryt
                        </Button>
                    </Modal.Content>
                </Modal>
            )}

            <div
                className={"pdlSearchButton"}
                style={{ padding: "30px 10px 0px 10px", height: "min-content", alignSelf: "baseline" }}
            >
                <Button variant="tertiary" size="xsmall" type={"button"} onClick={openAdvancedSearch}>
                    Avansert søk
                </Button>
            </div>
        </>
    );
}
