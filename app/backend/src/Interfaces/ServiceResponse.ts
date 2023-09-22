export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
  'NOT_FOUND' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'UNPROCESSABLE_ENTITY';

type ServiceResponseSuccessType =
  'SUCCESSFUL' | 'CREATED';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: ServiceResponseSuccessType,
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
