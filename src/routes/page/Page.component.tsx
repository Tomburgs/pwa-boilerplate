import React from 'react';
import Head from 'next/head';
import A2HS from 'components/a2hs';
import Sidebar from 'components/sidebar';
import Html from 'components/html';
import { usePageData, usePageDetails } from 'hooks/page';
import styles from './Page.module.scss';

const {
    page,
    pageContent,
    placeholder
} = styles;

export const addTitleTags = (title: string): JSX.Element => {
    if (!title) {
        return <></>;
    }

    return (
        <>
            <title>{ title }</title>
            <meta name="og:title" content={ title } />
        </>
    );
};

export const addDescriptionTag = (description: string): JSX.Element => {
    if (!description) {
        return <></>;
    }

    return (
        <meta
          name="description"
          property="og:description"
          content={ description }
        />
    );
};

export default function Page(): JSX.Element {
    const { title = '', description = '' } = usePageDetails();
    const { content = '' } = usePageData();

    return (
        <>
            <Head>
                { addTitleTags(title) }
                { addDescriptionTag(description) }
                <meta name="robots" content="INDEX,FOLLOW" />
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
