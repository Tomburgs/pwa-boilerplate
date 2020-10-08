import React, {
    memo,
    useState,
    useEffect,
    useCallback
} from 'react';
import Head from 'next/head';
import Icon from 'components/icon';
import { checkMediaProperty } from 'utils/css';
import { theme } from 'config';
import styles from './ThemeToggler.module.scss';

const PREFERS_COLOR_SCHEME = 'prefers-color-scheme: dark';
const DARK_MODE = 'dark-mode';

const {
    themeToggler,
    themeTogglerIcon,
    statusBarHighlight 
} = styles;

const useTheme = (): [boolean, (isDarkModeEnabled: boolean) => void] => {
    const isSystemDarkMode = checkMediaProperty(PREFERS_COLOR_SCHEME);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(isSystemDarkMode);

    useEffect(() => {
        const { documentElement: { classList } } = document;

        if (isDarkModeEnabled) {
            classList.add(DARK_MODE);

            return;
        }

        classList.remove(DARK_MODE);
    }, [isDarkModeEnabled]);

    return [isDarkModeEnabled, setIsDarkModeEnabled];
};

function ThemeToggler(): JSX.Element {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useTheme();
    const themeColor = isDarkModeEnabled ? theme.dark : theme.light;

    const toggleTheme = useCallback(
        () => setIsDarkModeEnabled(!isDarkModeEnabled),
        [isDarkModeEnabled]
    );


    return (
        <>
            <Head>
                <meta name="theme-color" content={ themeColor } />
            </Head>
            { /*
               * We're using black-translucent status bar setting on IOS,
               * which means that status bar has white text & tranparent background.
               * In light mode this causes the text to be invisible, so we create
               * a <figure> to put a different-colored bar behind env(safe-area-inset-top),
               * so that the text can be seen.
               *
               * Currently this is the only way to do this, as IOS will not listen for status bar
               * meta tag changes, and other settings create a significantly worse feel.
               */ }
            <figure className={ statusBarHighlight }/>
            <button
              aria-label="change theme"
              className={ themeToggler }
              onClick={ toggleTheme }
            >
                <Icon asset="Moon" className={ themeTogglerIcon } />
                <Icon asset="Sun" className={ themeTogglerIcon } />
            </button>
        </>
    );
}

export default memo(ThemeToggler);
