import { NextApiRequest, NextApiResponse } from 'next';
import _pages from 'pages/api/_content/pages';
import _schema from 'pages/api/_content/schema.json';

interface Pages {
    [key: string]: string
}

interface Schema {
    [key: string]: {
        title: string,
        description: string
    }
}

const pages = _pages as Pages;
const schema = _schema as Schema;

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const { query } = req;
  const id = query.id as string;

  if (!(id in schema)) {
    res.status(404);
  }

  const { title, description } = schema[id];
  const content = pages[id];

  res.status(200).json({
    id,
    title,
    description,
    content
  });
}
