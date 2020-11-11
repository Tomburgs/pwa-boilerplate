export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>,

    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed',
        platform: string
    }>,

    prompt(): Promise<void>
}

declare global {
    interface Window {
        pwaInstallPrompt: BeforeInstallPromptEvent | undefined
    }

    interface WindowEventMap {
        'beforeinstallprompt': BeforeInstallPromptEvent
    }
}
