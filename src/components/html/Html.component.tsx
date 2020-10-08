import React from 'react';
import parser, {
    domToReact,
    attributesToProps,
    HTMLReactParserOptions
} from 'html-react-parser';
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
    replace: ({ name = '', attribs, children }) => {
        if (!attribs) {
            return;
        }

        const Component = components[name];

        if (Component) {
            return (
                <Component { ...attributesToProps(attribs) }>
                    { children && domToReact(children, options) }
                </Component>
            );
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
