import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction
} from 'react';
import { browserStorage, getWindowProperty } from 'utils/browser';
import { checkMediaProperty } from 'utils/css';

const PREFERS_COLOR_SCHEME = 'prefers-color-scheme: dark';
const DARK_MODE = 'dark-mode';

export type ThemeProviderProps = {
    children: ReactNode
};

export type ThemeValue = {
  isDarkMode: boolean,
  userTheme: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ],
  systemTheme: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ]
};

export const ThemeContext = createContext<ThemeValue | null>(null);

const useThemeChange = (isDarkModeEnabled: boolean): void => {
  useEffect(() => {
    const { documentElement: { classList } } = document;

    if (isDarkModeEnabled) {
      classList.add(DARK_MODE);

      return;
    }

    classList.remove(DARK_MODE);
  }, [isDarkModeEnabled]);
};

const useSystemPreferenceChange = (
  setIsSystemDarkMode: Dispatch<SetStateAction<boolean>>
): void => {
  useEffect(() => {
    const { matchMedia } = getWindowProperty();

    if (!matchMedia) {
      return;
    }

    const listener = (event: MediaQueryListEvent): void => {
      const { matches } = event;

      setIsSystemDarkMode(matches);
    };

    const mediaQueryList = matchMedia(`(${PREFERS_COLOR_SCHEME})`);

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [setIsSystemDarkMode]);
};

const getIsUserPreferenceSet = (): boolean => {
  const userPreference = browserStorage.getItem(DARK_MODE);

  return userPreference !== null;
};

const getIsUserDarkModeSet = (): boolean => {
  const userPreference = browserStorage.getItem(DARK_MODE);

  return !!userPreference;
};

export function ThemeProvider(
  { children }: ThemeProviderProps
): JSX.Element {
  const isUserPreferenceSet = useMemo(() => getIsUserPreferenceSet(), []);
  const isUserDarkModeInitial = useMemo(() => getIsUserDarkModeSet(), []);
  const isSystemDarkModeInitial = useMemo(() => checkMediaProperty(PREFERS_COLOR_SCHEME), []);

  const systemTheme = useState(!isUserPreferenceSet);
  const userTheme = useState(isUserDarkModeInitial);
  const [isSystemThemeUsed] = systemTheme;
  const [isUserDarkMode] = userTheme;
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(isSystemDarkModeInitial);

  const isDarkMode = useMemo(() => {
    return isSystemThemeUsed ? isSystemDarkMode : isUserDarkMode;
  }, [isSystemThemeUsed, isSystemDarkMode, isUserDarkMode]);

  useEffect(() => {
    browserStorage.setItem(
      DARK_MODE,
      isUserDarkMode
    );
  }, [isUserDarkMode]);

  useThemeChange(isDarkMode);
  useSystemPreferenceChange(setIsSystemDarkMode);

  return (
    <ThemeContext.Provider value={ { isDarkMode, userTheme, systemTheme } }>
      { children }
    </ThemeContext.Provider>
  );
}
