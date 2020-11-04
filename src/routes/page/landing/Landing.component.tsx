import React from 'react';
import Image from 'components/image';
import styles from './Landing.module.scss';

const {
    wrapper,
    landing,
    landingText,
    landingImage,
    landingNavigationWrapper
} = styles;

export default function Landing(): JSX.Element {
    return (
        <div className={ wrapper }>
            <div className={ landing }>
                <div className={ landingText }>
                    <h1>PWA Boilerplate</h1>
                    <p>
                        Designed to help you kick-start your next project.<br />
                        This boilerplate is production ready and comes with 
                        a service worker, redux store, dark-mode, router, and plenty other useful features.
                    </p>
                </div>
                <div className={ landingNavigationWrapper }>
                    <a
                      href="https://github.com/tomburgs/pwa-boilerplate"
                      target="_blank"
                      rel="noreferrer"
                    >
                        View source code on GitHub
                    </a>
                    <p>Available under MIT license</p>
                </div>
                <Image
                  className={ landingImage }
                  src="/assets/landing.png"
                  alt="Desktop & Mobile PWA Application"
                  width="400px"
                  height="340px"
                />
            </div>
        </div>
    );
}
