import { AxiosError, AxiosResponse } from 'axios';

function isAxiosResponse(
  errorOrResponse: AxiosError | AxiosResponse
): errorOrResponse is AxiosResponse {
  return (errorOrResponse as AxiosResponse).headers !== undefined;
}

export function createVacancyNotFoundError(
  errorOrResponse: AxiosError | AxiosResponse,
  id: string
): AxiosError {
  const config = errorOrResponse.config;
  const headers = isAxiosResponse(errorOrResponse)
    ? errorOrResponse.headers
    : errorOrResponse.response?.headers;

  return new AxiosError(
    'Vacancy not found',
    'FAVORITES_NOT_FOUND',
    config,
    {
      data: { id },
      status: 404,
      statusText: 'Vacancy not found',
      headers: headers,
      config: config,
    }
  );
}
