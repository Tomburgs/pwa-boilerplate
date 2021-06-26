import { useContext } from 'react';
import { ThemeContext, ThemeValue } from 'contexts/theme';

const useTheme = (): ThemeValue => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('Missing ThemeContext');
  }

  return theme;
};

export default useTheme;
