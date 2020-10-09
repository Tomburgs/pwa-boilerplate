import React, { memo, useCallback } from 'react';
import Head from 'next/head';
import useTheme from 'hooks/useTheme';
import Icon from 'components/icon';
import { theme } from 'config';
import styles from './ThemeToggler.module.scss';

const {
    themeToggler,
    themeTogglerIcon,
    statusBarHighlight 
} = styles;

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
