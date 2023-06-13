import { APIError } from '../api/types.ts';

export function hasError(response: any): response is APIError {
  return response && response.reason;
}
