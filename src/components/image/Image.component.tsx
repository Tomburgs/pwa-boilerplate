import React, { useEffect, useState } from 'react';
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
    className?: string
};

const useImageState = (
    src: string
): [string, (imageState: string) => void] => {
    const [imageState, setImageState] = useState(IMAGE_LOADING);

    useEffect(() => {
        if (!src) {
            return setImageState(IMAGE_NOT_SPECIFIED);
        }

        return setImageState(IMAGE_LOADING);
    }, [src]);

    return [imageState, setImageState];
};

export default function Image(props: ImageProps): JSX.Element {
    const {
        src = '',
        alt = '',
        className = '',
        isPlaceholder = false
    } = props;
    const [imageState, setImageState] = useImageState(src);

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
                  onLoad={ () => setImageState(IMAGE_LOADED) }
                  onError={ () => setImageState(IMAGE_NOT_FOUND) }
                />
            ) }
        </div>
    );
}
