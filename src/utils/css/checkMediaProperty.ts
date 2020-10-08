import { getWindowProperty } from 'utils/browser';

export default (mediaQueryString: string): boolean => {
    const { matchMedia } = getWindowProperty();

    return (
        matchMedia
        && matchMedia(`(${mediaQueryString})`).matches
        || false
    );
};
