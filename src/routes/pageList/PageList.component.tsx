import React from 'react';
import Head from 'next/head';
import Pages from 'components/pages';
import Placeholder from 'components/placeholder';
import styles from './PageList.module.scss';

const {
  pageList,
  pageListContainer
} = styles;

export default function PageList(): JSX.Element {
  return (
    <>
      <Head>
        <title>Page List</title>
      </Head>
      <main className={ pageList }>
        <h1>Pages</h1>
        <p>
                    Do you also think this lack of content looks sad?<br />
                    Feel free to contribute by going to our GitHub repo and creating a pull-request,<br />
                    we would greatly appreciate it!
        </p>
        <Pages className={ pageListContainer }>
          <li><Placeholder length="medium" /></li>
          <li><Placeholder length="medium" /></li>
          <li><Placeholder length="medium" /></li>
          <li><Placeholder length="medium" /></li>
          <li><Placeholder length="medium" /></li>
        </Pages>
      </main>
    </>
  );
}
