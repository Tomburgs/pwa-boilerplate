import React, { memo } from 'react';
import { Schema } from 'stores/pages';
import { injectClassNames } from 'utils/css';
import { useSchema, usePageId } from 'hooks/page';
import Link from 'next/link';

type PageProps = {
    className?: string,
    activeClass?: string,
    children?: JSX.Element[]
}

type PageItemProps = PageProps & {
    url: string,
    name: string,
    page: string
}

type PageItemList = PageProps & {
    schema: Schema
}

export const PageItem = (props: PageItemProps): JSX.Element => {
  const {
    url,
    name,
    page,
    activeClass = ''
  } = props;
  const isActive = url === page;
  const className = injectClassNames([activeClass, isActive]);

  return (
    <li className={ className }>
      <Link href={ `/${url}` }>
        { name }
      </Link>
    </li>
  );
};

export const PageItemList = (props: PageItemList): JSX.Element => {
  const { schema } = props;
  const page = usePageId();

  return (
    <>
      { Object.entries(schema).map(
        ([url, { title: name }]) => (
          <PageItem
            key={ url }
            { ...{
              url, name, page,
              ...props
            } }
          />
        )
      ) }
    </>
  );
};

export default memo(
  function Pages(props: PageProps): JSX.Element {
    const { className, children } = props;
    const { home, ...schema } = useSchema();
    const isSchemaLoaded = !!Object.keys(schema).length;

    return (
      <ul className={ className }>
        { !isSchemaLoaded
          ? children
          : (
            <PageItemList
              schema={ schema }
              { ...props }
            />
          )
        }
      </ul>
    );
  }
);
