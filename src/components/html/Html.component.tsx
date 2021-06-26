import React, { createElement } from 'react';
import parser, {
  domToReact,
  attributesToProps,
  HTMLReactParserOptions
} from 'html-react-parser';
import { Element } from 'domhandler/lib/node';
import Image from 'components/image';
import { Style } from 'components/html/modifiers';

type HtmlProps = {
    content: string
}

export const components: { [key: string]: any } = {
  'img': Image,
  'style': Style
};

export const options: HTMLReactParserOptions = {
  /*
     * Node set as `any` due to babel es5 transpilation which breaks `instanceof`.
     * Instead of checking `instanceof` we check `attribs`.
     */
  replace: (node: any) => {
    if (node.attribs) {
      const { name = '', attribs, children } = node as Element;
      const component = components[name];

      if (component) {
        return createElement(
          component,
          attributesToProps(attribs),
          children && domToReact(children, options)
        );
      }
    }
  }
};

export default function Html(props: HtmlProps): JSX.Element {
  const { content } = props;

  return (
    <>
      { parser(content, options) }
    </>
  );
}
