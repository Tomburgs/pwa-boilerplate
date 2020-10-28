import React from 'react';
import { useUser } from 'hooks/user';
import Pages from 'components//pages';
import Image from 'components/image';
import Placeholder from 'components/placeholder';
import styles from './Sidebar.module.scss';

const {
    sidebar,
    sidebarProfile,
    sidebarProfileImage,
    sidebarProfileName,
    sidebarProfileBio,
    sidebarPages,
    sidebarPagesList,
    sidebarPagesActive
} = styles;

export default function Sidebar(): JSX.Element {
    const {
        name,
        avatar_url,
        bio
    } = useUser();

    return (
        <aside className={ sidebar }>
            <div className={ sidebarProfile }>
                <Image
                  isPlaceholder={ !avatar_url }
                  src={ avatar_url }
                  alt="avatar"
                  className={ sidebarProfileImage }
                />
                <h2 className={ sidebarProfileName }>
                    <Placeholder content={ name } length="short" />
                </h2>
                <p className={ sidebarProfileBio }>
                    <Placeholder content={ bio } length="medium" />
                </p>
            </div>
            <div className={ sidebarPages }>
                <h3>Pages</h3>
                <Pages
                  className={ sidebarPagesList }
                  activeClass={ sidebarPagesActive }
                >
                    <li><Placeholder length="short" /></li>
                    <li><Placeholder length="short" /></li>
                    <li><Placeholder length="short" /></li>
                </Pages>
            </div>
        </aside>
    );
}
