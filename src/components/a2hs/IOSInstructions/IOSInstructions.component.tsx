import React from 'react';
import Icon from 'components/icon';
import styles from './IOSInstructions.module.scss';

const {
  iconBox,
  iconPlus
} = styles;

export default function IOSInstructions(): JSX.Element {
  return (
    <p>
            Tap <Icon asset="Box-Arrow" className={ iconBox }/>, 
            then select Add to Home Screen <Icon asset="Plus-Square" className={ iconPlus }/>.
    </p> 
  );
}
