import { NextApiRequest, NextApiResponse } from 'next';
import schema from 'pages/api/_content/schema.json';

export default function handler(_: NextApiRequest, res: NextApiResponse): void {
  res.status(200).json(schema);
}
