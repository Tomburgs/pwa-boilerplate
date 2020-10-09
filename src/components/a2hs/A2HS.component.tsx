import React, { useState, useEffect, useCallback } from 'react';
import { isMobile, browserStorage } from 'utils/browser';
import { checkMediaProperty } from 'utils/css';
import IOSInstructions from './IOSInstructions';
import Install from './Install';
import styles from './A2HS.module.scss';

// When closed, hide A2HS notification for a week.
const NOTIFICATION_IGNORE_TIME = 7 * 24 * 60 * 60 * 1000;
const A2HS_IDENTIFIER = 'A2HS-Notification';
const DISPLAY_STANDALONE = 'display-mode: standalone';

const { A2HS: A2HSWrapper, A2HSControls } = styles;

const useNotification = (): [
    boolean,
    () => void
] => {
    const [isOpen, setIsOpen] = useState(false);
    const closeNotification = useCallback(
        () => {
            setIsOpen(false);
            browserStorage.setItem(
                A2HS_IDENTIFIER,
                true,
                NOTIFICATION_IGNORE_TIME
            );
        }, [setIsOpen]
    );

    useEffect(() => {
        const isAppStandalone = checkMediaProperty(DISPLAY_STANDALONE);

        if (!isAppStandalone) {
            const isClosed = browserStorage.getItem(A2HS_IDENTIFIER);

            if (!isClosed) {
                setIsOpen(true);
            }
        }
    }, []);

    return [isOpen, closeNotification];
};

export default function A2HS(): JSX.Element | null {
    const [isOpen, closeNotification] = useNotification();

    if (!isOpen) {
        return null;
    }

    return (
        <figure className={ A2HSWrapper }>
            <figcaption>
                👋 Welcome!<br/>
                Add this app to your home screen for the best experience!
            </figcaption>
            {
                isMobile.iOS()
                    ? <IOSInstructions />
                    : <Install closeNotification={ closeNotification } />
            }
            <div className={ A2HSControls }>
                <button
                  type="button"
                  aria-label="close notice"
                  onClick={ closeNotification }
                >
                    Maybe later
                </button>
            </div>
        </figure>
    );
}
