import React, { InputHTMLAttributes } from 'react';
import styles from './Switch.module.scss';

type SwitchProps = {
  id: string,
  className?: string
} & InputHTMLAttributes<HTMLInputElement>;

export default function Switch({ id, className, ...inputProps }: SwitchProps): JSX.Element {
  return (
    <div className={ className }>
      <input
        { ...inputProps }
        id={ id }
        type="checkbox"
        className={ styles.input }
      />
      <label htmlFor={ id } className={ styles.switch } />
    </div>
  );
}
