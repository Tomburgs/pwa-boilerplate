import { useContext } from 'react';
import { ThemeContext, ThemeValue } from 'contexts/theme';

const useTheme = (): ThemeValue => {
    const theme = useContext(ThemeContext) as ThemeValue;

    return theme;
};

export default useTheme;
