import express from 'express';
import { mikroorm } from './entities';
import ormConfig from './mikro-orm.config';
import { routes } from './controllers';
import bodyParser from 'body-parser';
import { passport } from './security/passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());

app.use(mikroorm(ormConfig));

app.use(routes);
