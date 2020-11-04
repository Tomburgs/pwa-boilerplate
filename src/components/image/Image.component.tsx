import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { injectClassNames } from 'utils/css';
import styles from './Image.module.scss';

const {
    image,
    placeholder
} = styles;

export const IMAGE_LOADING = 'IMAGE_LOADING';
export const IMAGE_LOADED = 'IMAGE_LOADED';
export const IMAGE_NOT_FOUND = 'IMAGE_NOT_FOUND';
export const IMAGE_NOT_SPECIFIED = 'IMAGE_NOT_SPECIFIED';

type ImageProps = {
    isPlaceholder?: boolean | null,
    src?: string,
    alt?: string,
    height?: string,
    width?: string,
    loading?: 'lazy' | 'eager',
    className?: string
};

const useImageState = (
    src: string,
    ref: RefObject<HTMLImageElement>
): [string, (imageState: string) => void] => {
    const isLoaded = ref.current?.complete;

    const initialState = isLoaded ? IMAGE_LOADED : IMAGE_LOADING;
    const [imageState, setImageState] = useState(initialState);

    useEffect(() => {
        if (isLoaded) {
            setImageState(IMAGE_LOADED);
            return;
        }

        if (!src) {
            setImageState(IMAGE_NOT_SPECIFIED);
            return;
        }

        setImageState(IMAGE_LOADING);
    }, [isLoaded, src]);

    return [imageState, setImageState];
};

export default function Image(props: ImageProps): JSX.Element {
    const {
        src = '',
        alt = '',
        height,
        width,
        loading = 'lazy',
        className = '',
        isPlaceholder = false
    } = props;
    const ref = useRef<HTMLImageElement>(null);
    const [imageState, setImageState] = useImageState(src, ref);

    const onLoad = useCallback(() => setImageState(IMAGE_LOADED), [setImageState]);
    const onError = useCallback(() => setImageState(IMAGE_NOT_FOUND), [setImageState]);

    const imageStyle = isPlaceholder
        ? placeholder : styles[imageState];

    return (
        <div
          role="img"
          aria-label={ alt }
          className={
            injectClassNames(
                image,
                imageStyle,
                [className, !!className]
            )
          }
        >
            { !isPlaceholder && (
                <img
                  src={ src }
                  alt={ alt }
                  ref={ ref }
                  height={ height }
                  width={ width }
                  loading={ loading }
                  onLoad={ onLoad }
                  onError={ onError }
                />
            ) }
        </div>
    );
}
