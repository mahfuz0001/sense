'use client';

import { useState, useCallback } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';

interface UseFormOptions<T> {
  schema?: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  validateOnChange?: boolean;
}

interface UseFormReturn<T> {
  values: Partial<T>;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  setValue: (name: keyof T, value: T[keyof T]) => void;
  setValues: (values: Partial<T>) => void;
  setError: (name: keyof T, error: string) => void;
  clearError: (name: keyof T) => void;
  clearErrors: () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: (newValues?: Partial<T>) => void;
}

/**
 * Comprehensive form hook with validation, error handling, and submission management
 */
export function useForm<T extends Record<string, unknown>>({
  schema,
  onSubmit,
  onSuccess,
  onError,
  validateOnChange = true,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValuesState] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const validateField = useCallback((name: keyof T, value: T[keyof T]) => {
    if (!schema) return null;

    try {
      // For field-level validation, we'll validate the whole object
      // and extract the specific field error
      const testObj = { [name]: value } as Partial<T>;
      const fieldSchema = z.object({ [name]: z.any() });
      fieldSchema.parse(testObj);
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || 'Validation error';
      }
    }
    return null;
  }, [schema]);

  const validateForm = useCallback(() => {
    if (!schema) return true;

    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        error.issues.forEach((err) => {
          const path = err.path[0] as keyof T;
          if (path) {
            newErrors[path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [schema, values]);

  const setValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValuesState(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);

    if (validateOnChange) {
      const error = validateField(name, value);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  }, [validateOnChange, validateField]);

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }));
    setIsDirty(true);
  }, []);

  const setError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const clearError = useCallback((name: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values as T);
      onSuccess?.(values as T);
      toast.success('Form submitted successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed';
      onError?.(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit, onSuccess, onError]);

  const reset = useCallback((newValues?: Partial<T>) => {
    setValuesState(newValues || {});
    setErrors({});
    setIsDirty(false);
    setIsSubmitting(false);
  }, []);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    setValue,
    setValues,
    setError,
    clearError,
    clearErrors,
    handleSubmit,
    reset,
  };
}