import React, { SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { useTheme } from 'hooks/theme';
import Icon from 'components/icon';
import Switch from 'components/switch';
import { theme } from 'config';
import {injectClassNames} from 'utils/css';
import {useOutsideClick} from 'hooks/events';
import styles from './ThemeToggler.module.scss';

const {
  themeToggler,
  themeTogglerIcon,
  themeTogglerSettingsOpen,
  themeTogglerSettings,
  statusBarHighlight 
} = styles;

const DARK_MODE_SETTING = 'dark-mode-enabled';
const SYSTEM_THEME_SETTING = 'system-theme-enabled';

export default function ThemeToggler(): JSX.Element {
  const { userTheme, systemTheme } = useTheme();
  const [isDarkModeEnabled, setIsDarkModeEnabled] = userTheme;
  const [isSystemThemeUsed, setIsSystemThemeUsed] = systemTheme;
  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);
  const settingMenuRef = useRef<HTMLUListElement | null>(null);
  const themeColor = isDarkModeEnabled ? theme.dark : theme.light;

  const onToggleTheme = useCallback((): void => {
    setIsSystemThemeUsed(false);
    setIsDarkModeEnabled(
      isDarkModeEnabled => !isDarkModeEnabled
    );
  }, [setIsSystemThemeUsed, setIsDarkModeEnabled]);
  const onToggleSystemTheme = useCallback((): void => {
    setIsSystemThemeUsed(isSystemThemeUsed => !isSystemThemeUsed);
  }, [setIsSystemThemeUsed]);
  const onToggleSettings = useCallback((event: SyntheticEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    setIsSettingMenuOpen(
      isSettingMenuOpen => !isSettingMenuOpen
    );
  }, [setIsSettingMenuOpen]);

  const themeTogglerWrapper = injectClassNames(
    styles.themeTogglerWrapper,
    [themeTogglerSettingsOpen, isSettingMenuOpen]
  );

  useOutsideClick(settingMenuRef, () => {
    setIsSettingMenuOpen(false);
  });

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
      <div className={ themeTogglerWrapper }>
        { useMemo(() => (
          <button
            aria-label="change theme"
            className={ themeToggler }
            onContextMenu={ onToggleSettings }
            onClick={ onToggleTheme }
          >
            <Icon asset="Moon" className={ themeTogglerIcon } />
            <Icon asset="Sun" className={ themeTogglerIcon } />
          </button>
        ), [onToggleSettings, onToggleTheme]) }
        <ul className={ themeTogglerSettings } ref={ settingMenuRef }>
          <li>
            <Switch
              id={ DARK_MODE_SETTING }
              checked={ !isSystemThemeUsed && isDarkModeEnabled }
              onChange={ onToggleTheme }
              disabled={ isSystemThemeUsed }
            />
            <label htmlFor={ DARK_MODE_SETTING }>Use Dark Mode</label>
          </li>
          <li>
            <Switch
              id={ SYSTEM_THEME_SETTING }
              checked={ isSystemThemeUsed }
              onChange={ onToggleSystemTheme }
            />
            <label htmlFor={ SYSTEM_THEME_SETTING }>Use System Theme</label></li>
        </ul>
      </div>
    </>
  );
}
