import { Request, Response, NextFunction } from 'express';
import schema from 'router/api/content/schema';

export default (req: Request, res: Response, next: NextFunction): void => {
    const { params: { pageId } } = req;
    const pageTitle = schema[pageId];

    if (!pageTitle) {
        res.sendStatus(404);
        return;
    }

    res.locals = { pageTitle };

    next();
};
