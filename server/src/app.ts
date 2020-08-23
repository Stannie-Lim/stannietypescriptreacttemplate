import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv'

import 'reflect-metadata';
import { createConnection } from 'typeorm';

config()
const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, X-Real-Ip, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

(async () => {
    await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'idkmakeauser',
        database: 'idkmakeadb',
        password: '123456',
        entities: [
            /* models */
        ],
        synchronize: true,
        logging: false,
    });

    /* 
        routes
    */

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
})();

export { app };
