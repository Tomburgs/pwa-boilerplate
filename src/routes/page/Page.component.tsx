import React from 'react';
import Head from 'next/head';
import A2HS from 'components/a2hs';
import Sidebar from 'components/sidebar';
import Html from 'components/html';
import usePageData from 'hooks/usePageData';
import styles from './Page.module.scss';

const {
    page,
    pageContent,
    placeholder
} = styles;

export default function Page(): JSX.Element {
    const { title = '', content = '' } = usePageData();

    return (
        <>
            <Head>
                { title && <title>{ title }</title> }
            </Head>
            <main className={ page }>
                <div className={ pageContent }>
                    <A2HS />
                    <div className={ pageContent }>
                        { content
                            ? <Html content={ content } />
                            : (
                                <>
                                  <figure className={ placeholder } />
                                  <figure className={ placeholder } />
                                  <figure className={ placeholder } />
                                </>
                            )
                        }
                    </div>
                </div>
                <Sidebar />
            </main>
        </>
    );
}
