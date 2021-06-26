import React from 'react';
import { injectClassNames } from 'utils/css';
import styles from './Placeholder.module.scss';

const { placeholder } = styles;

type PlaceholderProps = {
    content?: string,
    length: string
};

export default function Placeholder(
  props: PlaceholderProps
): JSX.Element {
  const { content = '', length } = props;

  if (content) {
    return <>{ content }</>;
  }

  return (
    <span
      className={
        injectClassNames(
          placeholder,
          styles[length]
        )
      }
    >
      { content }
    </span>
  );
}
