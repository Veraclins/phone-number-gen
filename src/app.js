import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import ApplicationError from './helpers/Error';

const app = express();
const { env } = process;
app.set('port', env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: `Welcome to Phone numbers generator. Visit '${
      req.protocol
    }://${req.get('host')}/generate' to generate unique phone numbers`,
  })
);

app.use('*', (req, res, next) => {
  const message =
    "It looks like the route you requested doesn't exist. Please check the url and try again";
  throw new ApplicationError(message, 404);
});

app.use((err, req, res, next) => {
  res.status(err.code).json({
    status: 'error',
    message: err.message,
    errors: {},
  });
});
export default app;
