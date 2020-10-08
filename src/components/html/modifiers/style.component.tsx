import React from 'react';
import { DomElement } from 'htmlparser2';
import Head from 'next/head';

export default function Style(domNode: DomElement): JSX.Element | null {
    const { children } = domNode;

    return (
        <Head>
            <style>
                { children }
            </style>
        </Head>
    );
}
