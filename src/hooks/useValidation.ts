import {useState} from 'react';
import {ValidationError} from 'yup';

export const useValidation = <T>(schema: any) => {
  const [errors, setErrors] = useState<ValidationError | null>(null);

  const getError = (field: string): string =>
    errors?.inner.find(elm => elm.path === field)?.message ?? '';

  const hasError = (field: string): boolean =>
    errors?.inner.some(elm => elm.path === field) ?? false;

  const hasErrors = (): boolean => errors !== null;

  const validate = (data: T): boolean => {
    try {
      schema.validateSync(data, {abortEarly: false});
      setErrors(null);
    } catch (error: unknown) {
      setErrors(error as ValidationError);
      return false;
    }
    return true;
  };

  return {
    errors,
    getError,
    hasError,
    hasErrors,
    validate,
  };
};
