import { useState, useCallback } from "react";

export function useAction(action, options) {
  const [fieldErrors, setFieldErrors] = useState(null);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async function (input) {
      setLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }
        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setErrors(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    errors,
    data,
    loading,
  };
}
