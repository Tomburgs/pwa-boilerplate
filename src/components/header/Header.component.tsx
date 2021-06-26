import React, { memo, useEffect } from 'react';
import Icon from 'components/icon';
import Items from 'components/header/items';
import Logo from 'components/header/logo';
import ThemeToggler from 'components/header/themeToggler';
import styles from './Header.module.scss';

const OFFLINE = 'offline';

const {
  header,
  headerControls,
  offline,
  offlineIcon
} = styles;

const handleNetworkChange = (): void => {
  const { documentElement: { classList } } = document;

  if (!navigator.onLine) {
    classList.add(OFFLINE);

    return;
  }

  classList.remove(OFFLINE);
};

export default memo(
  function Header(): JSX.Element {
    useEffect(() => {
      if (typeof window !== undefined) {
        handleNetworkChange();

        window.addEventListener('online', handleNetworkChange);
        window.addEventListener('offline', handleNetworkChange);

        return () => {
          window.removeEventListener('online', handleNetworkChange);
          window.removeEventListener('offline', handleNetworkChange);
        };
      }
    }, []);

    return (
      <>
        <div className={ offline }>
          <Icon
            asset="Cloud-Slash"
            className={ offlineIcon }
          />
                    You are currently browsing in offline mode.
        </div>
        <header className={ header }>
          <nav>
            <div className={ headerControls }>
              <Logo />
              <ThemeToggler />
            </div>
            <Items />
          </nav>
        </header>
      </>
    );
  }
);
