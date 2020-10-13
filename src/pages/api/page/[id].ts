import { NextApiRequest, NextApiResponse } from 'next';
import _pages from 'pages/api/_content/pages';
import _schema from 'pages/api/_content/schema.json';

interface Pages {
    [key: string]: string
}

interface Schema {
    [key: string]: string
}

const pages = _pages as Pages;
const schema = _schema as Schema;

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
    const { query: { id } } = req;

    if (!(id as string in schema)) {
        res.status(404);
    }

    const title = schema[id as string];
    const content = pages[id as string];

    res.status(200).json({
        id,
        title,
        content
    });
}
