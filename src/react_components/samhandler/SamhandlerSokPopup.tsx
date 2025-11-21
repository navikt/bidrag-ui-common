import { useEffect, useRef } from "react";

import { Broadcast, BroadcastNames, SamhandlerBroadcastMessage } from "../../types";

type SamhandlerSokPopupProps = {
    windowId: string;
    onResult: (data: SamhandlerBroadcastMessage | null) => void;
    onError?: (errorMessage: string) => void;
};

const width = Math.min(1500, screen.width);
const height = Math.min(1200, screen.height);

export default function SamhandlerSokPopup({ windowId, onResult, onError }: SamhandlerSokPopupProps) {
    const popupRef = useRef<Window | null>(null);
    const resultReceivedRef = useRef<boolean>(false);
    const checkIntervalRef = useRef<number | null>(null);
    const hasCalledOnResultRef = useRef<boolean>(false);

    useEffect(() => {
        resultReceivedRef.current = false;
        hasCalledOnResultRef.current = false;

        popupRef.current = window.open(
            `/samhandler/søk/?windowId=${windowId}`,
            "_blank",
            `location=yes,height=${height},width=${width},scrollbars=yes,status=yes`
        );

        checkIntervalRef.current = window.setInterval(() => {
            if (popupRef.current?.closed && !resultReceivedRef.current && !hasCalledOnResultRef.current) {
                if (checkIntervalRef.current) {
                    clearInterval(checkIntervalRef.current);
                    checkIntervalRef.current = null;
                }

                hasCalledOnResultRef.current = true;
                resultReceivedRef.current = true;
                onResult(null);
            }
        }, 500);

        Broadcast.waitForBroadcast<SamhandlerBroadcastMessage>(BroadcastNames.SAMHANDLERSOK_RESULT_EVENT, windowId)
            .then((res) => {
                if (checkIntervalRef.current) {
                    clearInterval(checkIntervalRef.current);
                    checkIntervalRef.current = null;
                }

                if (!hasCalledOnResultRef.current) {
                    hasCalledOnResultRef.current = true;
                    resultReceivedRef.current = true;
                    onResult(res.payload);
                }
            })
            .catch((error) => {
                if (checkIntervalRef.current) {
                    clearInterval(checkIntervalRef.current);
                    checkIntervalRef.current = null;
                }

                if (!hasCalledOnResultRef.current) {
                    hasCalledOnResultRef.current = true;
                    resultReceivedRef.current = true;
                    onError?.(error);
                    onResult(null);
                }
            })
            .finally(() => {
                window.focus();
                popupRef.current?.close();
            });

        return () => {
            if (checkIntervalRef.current) {
                clearInterval(checkIntervalRef.current);
            }
            if (popupRef.current && !popupRef.current.closed) {
                popupRef.current.close();
            }
        };
    }, []); // Tomt dependency array - kjør bare én gang

    return null;
}
