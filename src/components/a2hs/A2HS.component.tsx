import React, { useState, useEffect } from 'react';
import { checkMediaProperty } from 'utils/css';
import IOSInstructions from './IOSInstructions';
import styles from './A2HS.module.scss';

const DISPLAY_STANDALONE = 'display-mode: standalone';
const { A2HS: A2HSWrapper, A2HSControls } = styles;

const useNotification = (): [
    boolean,
    (isOpen: boolean) => void
] => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const isAppStandalone = checkMediaProperty(DISPLAY_STANDALONE);

        if (!isAppStandalone) {
            setIsOpen(true);
        }
    }, []);

    return [isOpen, setIsOpen];
};

export default function A2HS(): JSX.Element | null {
    const [isOpen, setIsOpen] = useNotification();

    if (!isOpen) {
        return null;
    }

    return (
        <figure className={ A2HSWrapper }>
            <figcaption>
                👋 Welcome!<br/>
                Add this app to your home screen for the best experience!
            </figcaption>
            <IOSInstructions />
            <div className={ A2HSControls }>
                <button
                  type="button"
                  aria-label="close notice"
                  onClick={ () => setIsOpen(false) }
                >
                    Maybe later
                </button>
            </div>
        </figure>
    );
}
