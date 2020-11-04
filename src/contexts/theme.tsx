import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useMemo
} from 'react';
import { browserStorage } from 'utils/browser';
import { checkMediaProperty } from 'utils/css';

const PREFERS_COLOR_SCHEME = 'prefers-color-scheme: dark';
const DARK_MODE = 'dark-mode';

export type ThemeProviderProps = {
    children: ReactNode
};

export type ThemeValue = [
    boolean,
    (isDarkModeEnabled: boolean) => void
]

export const ThemeContext = createContext<ThemeValue | []>([]);

const useThemeChange = (theme: ThemeValue): void => {
    const [isDarkModeEnabled] = theme;

    useEffect(() => {
        const { documentElement: { classList } } = document;

        browserStorage.setItem(
            DARK_MODE,
            isDarkModeEnabled
        );

        if (isDarkModeEnabled) {
            classList.add(DARK_MODE);

            return;
        }

        classList.remove(DARK_MODE);
    }, [isDarkModeEnabled]);
};

export function ThemeProvider(
    { children }: ThemeProviderProps
): JSX.Element {
    const isDarkMode = useMemo(() => {
        const userPreference = browserStorage.getItem(DARK_MODE);
        const isUserPreferenceSet = userPreference !== null;
        const isSystemDarkMode = checkMediaProperty(PREFERS_COLOR_SCHEME);

        return isUserPreferenceSet ? userPreference : isSystemDarkMode;
    }, []);

    const theme = useState(isDarkMode);

    useThemeChange(theme);

    return (
        <ThemeContext.Provider value={ theme }>
            { children }
        </ThemeContext.Provider>
    );
}
