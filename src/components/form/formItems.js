import React from 'react';
import { Field as FormikField, ErrorMessage } from 'formik';

// Field component
export const Field = ({ label, name, type = 'text', ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <FormikField
      id={name}
      name={name}
      type={type}
      {...props}
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1 "
    />
  </div>
);

// DropDown component
export const DropDown = ({ label, name, options, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <FormikField
      as="select"
      id={name}
      name={name}
      {...props}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormikField>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1 "
    />
  </div>
);

// Title component
export const Title = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold mb-4 ${className}`}>{children}</h2>
);

// Button component
export const Button = ({ children, type = 'button', disabled = false, className = "", ...props }) => (
  <button
    type={type}
    disabled={disabled}
    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
      disabled
        ? "bg-indigo-300 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);