import React from 'react';
import styles from './Footer.module.scss';

const {
  footer
} = styles;

export default function Footer(): JSX.Element {
  return (
    <footer className={ footer }>
      <p>© PWA Boilerplate</p>
      <p>
        View source code on{ ' ' }
        <a
          href="https://github.com/tomburgs/pwa-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
