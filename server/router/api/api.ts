import path from 'path';
import { promises as fs } from 'fs';
import express, { Router, Request, Response } from 'express';
import validateContentId from 'router/api/middleware/validateContentId';

const router = Router();

const resolveContentPath = (contentPath: string): string => (
    path.join(__dirname, 'content', contentPath)
);

router.use(
    '/assets',
    express.static(resolveContentPath('assets'))
);

router.get('/schema',
    async (_, res: Response) => {
        const { default: schema }= await import(
            resolveContentPath('schema')
        );

        res.json(schema);
    }
);

router.get('/page/:pageId',
    validateContentId,
    async (req: Request, res: Response) => {
        const { locals: { pageTitle: title } } = res;
        const { params: { pageId: id } } = req;

        const content = await fs.readFile(
            resolveContentPath(`pages/${id}.html`),
            'utf-8'
        );

        res.json({
            id,
            title,
            content
        });
    }
);

export default router;
