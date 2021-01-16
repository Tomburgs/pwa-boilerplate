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
    replace: node => {
        if (node instanceof Element && node.attribs) {
            const { name = '', attribs, children } = node;
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
