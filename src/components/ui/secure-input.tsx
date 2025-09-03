'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { sanitizeInput, isValidEmail, isValidUrl, hasSqlInjectionPatterns } from '@/lib/security';
import { AlertCircle, Check, X } from 'lucide-react';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'email' | 'url' | 'text' | 'password';
  sanitize?: boolean;
  validateOnChange?: boolean;
  showValidation?: boolean;
  onValidationChange?: (isValid: boolean, message?: string) => void;
}

/**
 * Secure input component with built-in sanitization and validation
 * Prevents common security vulnerabilities like XSS and SQL injection
 */
export const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  ({
    variant = 'text',
    sanitize = true,
    validateOnChange = true,
    showValidation = false,
    onValidationChange,
    onChange,
    className,
    ...props
  }, ref) => {
    const [validationState, setValidationState] = useState<{
      isValid: boolean;
      message?: string;
    }>({ isValid: true });

    const validateInput = (value: string): { isValid: boolean; message?: string } => {
      if (!value.trim()) {
        return { isValid: true };
      }

      // Check for SQL injection patterns
      if (hasSqlInjectionPatterns(value)) {
        return {
          isValid: false,
          message: 'Invalid characters detected',
        };
      }

      // Variant-specific validation
      switch (variant) {
        case 'email':
          if (!isValidEmail(value)) {
            return {
              isValid: false,
              message: 'Please enter a valid email address',
            };
          }
          break;
        case 'url':
          if (!isValidUrl(value)) {
            return {
              isValid: false,
              message: 'Please enter a valid URL',
            };
          }
          break;
      }

      return { isValid: true };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Sanitize input if enabled
      if (sanitize && variant !== 'password') {
        value = sanitizeInput(value);
        e.target.value = value;
      }

      // Validate input if enabled
      if (validateOnChange) {
        const validation = validateInput(value);
        setValidationState(validation);
        onValidationChange?.(validation.isValid, validation.message);
      }

      onChange?.(e);
    };

    // Re-validate when value changes externally
    useEffect(() => {
      if (validateOnChange && props.value) {
        const validation = validateInput(String(props.value));
        setValidationState(validation);
        onValidationChange?.(validation.isValid, validation.message);
      }
    }, [props.value, validateOnChange, onValidationChange]);

    const getValidationIcon = () => {
      if (!showValidation || !props.value) return null;

      if (validationState.isValid) {
        return <Check className="w-4 h-4 text-green-500" />;
      } else {
        return <X className="w-4 h-4 text-red-500" />;
      }
    };

    const getValidationStyles = () => {
      if (!showValidation || !props.value) return '';

      if (validationState.isValid) {
        return 'border-green-500 focus:border-green-500 focus:ring-green-500';
      } else {
        return 'border-red-500 focus:border-red-500 focus:ring-red-500';
      }
    };

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={variant === 'email' ? 'email' : variant === 'url' ? 'url' : variant === 'password' ? 'password' : 'text'}
          onChange={handleChange}
          className={cn(
            getValidationStyles(),
            showValidation && props.value && 'pr-10',
            className
          )}
        />
        
        {showValidation && props.value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {getValidationIcon()}
          </div>
        )}
        
        {showValidation && validationState.message && (
          <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
            <AlertCircle className="w-3 h-3" />
            <span>{validationState.message}</span>
          </div>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';

export default SecureInput;