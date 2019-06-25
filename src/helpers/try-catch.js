import ApplicationError from './Error';

const tryCatch = handler => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(new ApplicationError(error.message, 500));
  }
};

export default tryCatch;
