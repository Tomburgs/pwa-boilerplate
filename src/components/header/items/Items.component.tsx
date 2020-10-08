import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { injectClassNames } from 'utils/css';
import styles from './Items.module.scss';

const {
    items,
    active
} = styles;

const links = [
    { name: 'Home', url: '/' },
    { name: 'Pages', url: '/pages' },
    { name: 'Profile', url: '/profile' }
];

export default function Items(): JSX.Element {
    const { pathname } = useRouter();

    return (
        <ul className={ items }>
            { links.map(({ name, url }) => (
                <li
                  key={ name }
                  className={
                    injectClassNames([
                        active,
                        pathname === url
                    ])
                  }
                >
                    <Link href={ url }>{ name }</Link>
                </li>
            )) }
        </ul>
    );
}
