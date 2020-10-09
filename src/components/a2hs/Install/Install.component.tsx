import React, { PureComponent } from 'react';
import { BeforeInstallPromptEvent } from './Install';
import styles from './Install.module.scss';

export const InstallAccepted = 'accepted';
export const InstallDismissed = 'dismissed';

const { button } = styles;

type InstallProps = {
    closeNotification: () => void
}

type InstallState = {
    isInstallable: boolean
}

export default class Install extends PureComponent<InstallProps, InstallState> {
    installEvent: BeforeInstallPromptEvent | undefined;

    state = {
        isInstallable: false
    };

    componentDidMount(): void {
        (self as any).onbeforeinstallprompt = this.installListener;
    }

    installListener = (event: BeforeInstallPromptEvent): void => {
        event.preventDefault();

        this.installEvent = event;
        this.setState({ isInstallable: true });
    }

    install = (): void => {
        if (!this.installEvent) {
            return;
        }

        const { closeNotification } = this.props;

        this.installEvent.prompt();
        this.installEvent.userChoice.then(
            choice => {
                if (choice.outcome === InstallAccepted) {
                    closeNotification();
                }
            }
        );
    }

    render(): JSX.Element | null {
        const { isInstallable } = this.state;

        if (!isInstallable) {
            return null;
        }

        return (
            <button
              onClick={ this.install }
              className={ button }
            >
                Add to Home Screen
            </button>
        );
    }
}
