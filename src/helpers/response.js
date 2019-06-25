import ApplicationError from './Error';
import { sentenceCase } from '.';

export default {
  empty: resource =>
    new ApplicationError(
      `Oops, looks like no ${resource} exist yet! Generate some first!`,
      404
    ),
  success: (resource, action, data = {}) => ({
    status: 'success',
    message: `${sentenceCase(`${resource} ${action} successfully`)}`,
    data,
  }),
};
