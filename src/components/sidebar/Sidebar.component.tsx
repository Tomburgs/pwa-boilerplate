import React from 'react';
import Pages from 'components//pages';
import Placeholder from 'components/placeholder';
import styles from './Sidebar.module.scss';

const {
  sidebar,
  sidebarPages,
  sidebarPagesList,
  sidebarPagesActive
} = styles;

export default function Sidebar(): JSX.Element {
  return (
    <aside className={ sidebar }>
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
