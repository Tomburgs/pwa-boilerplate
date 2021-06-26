import React, { createElement } from 'react';
import dynamic from 'next/dynamic';
import { injectClassNames } from 'utils/css';
import styles from './Icon.module.scss';

const { icon, loader } = styles;

type IconProps = {
    asset: string,
    className?: string
};

const Loader = ({ className = '' }: IconProps): JSX.Element => (
  <span
    className={
      injectClassNames(
        icon,
        loader,
        className
      )
    }
  />
);

export default function Icon(props: IconProps): JSX.Element {
  const {
    asset,
    className: argClassName = ''
  } = props;
  const className = injectClassNames(icon, argClassName);

  return createElement(
    dynamic<IconProps>(
      () => import(`assets/${asset}.svg`),
      { loading: () => <Loader { ...props } /> }
    ),
    { ...props, className }
  );
}
