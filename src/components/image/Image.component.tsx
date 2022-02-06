import React, { useCallback, useState } from 'react';
import { injectClassNames } from 'utils/css';
import styles from './Image.module.scss';

const {
  image,
  placeholder
} = styles;

enum ImageState {
  Loading = 'IMAGE_LOADING',
  Loaded = 'IMAGE_LOADED',
  NotFound = 'IMAGE_NOT_FOUND',
  NotSpecified = 'IMAGE_NOT_SPECIFIED',
}

type ImageProps = {
    isPlaceholder?: boolean | null,
    src?: string,
    alt?: string,
    height?: string,
    width?: string,
    loading?: 'lazy' | 'eager',
    className?: string
};

type UseImageState = () => [
  (img: HTMLImageElement | null) => void,
  ImageState,
];

const useImageState: UseImageState = () => {
  const [imageState, setImageState] = useState<ImageState>(() => ImageState.Loading);

  const imageRefCallback = useCallback((img: HTMLImageElement | null) => {
    if (!img) {
      return;
    }

    if (img.complete) {
      setImageState(ImageState.Loaded);
      return;
    }

    if (!img.src) {
      setImageState(ImageState.NotSpecified);
      return;
    }

    const onLoad = (): void => {
      setImageState(ImageState.Loaded);
    };

    const onError = (): void => {
      setImageState(ImageState.NotFound);
    };

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, []);

  return [imageRefCallback, imageState];
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
  const [imageRef, imageState] = useImageState();

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
          ref={ imageRef }
          height={ height }
          width={ width }
          loading={ loading }
        />
      ) }
    </div>
  );
}
