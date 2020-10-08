import express, { Request, Response } from 'express';
import api from 'router/api';
import next from 'next';

const { NODE_ENV, PORT } = process.env;

const dev = NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = PORT || 3000;

(async () => {
    try {
        await app.prepare();

        const server = express();

        server.use('/api', api);
        server.use((req: Request, res: Response) => handle(req, res));

        server.listen(port, (err?: any) => {
            if (err) {
                throw err;
            }

            process.stdout.write(
                `🚀 Server is ready on port ${port} in ${NODE_ENV} mode.\n`
            );
        });
    } catch (e) {
        process.stdout.write(e);
        process.exit(1);
    }
})();
