import React from 'react';
import { Element } from 'domhandler/lib/node';
import Head from 'next/head';

export default function Style(domNode: Element): JSX.Element | null {
  const { children } = domNode;

  return (
    <Head>
      <style>
        { children }
      </style>
    </Head>
  );
}
