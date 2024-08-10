import React from "react";
import { Field, ErrorMessage, Form as FForm } from "formik";
import { Grid } from "@mui/material";
export const FormField = ({ field }) => {
  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return (
        <div className="field-wrapper">
          <label htmlFor={field.name} className="field-label">
            {field.label}
          </label>
          <Field
            type={field.type}
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            className="field-input"
          />
          <ErrorMessage
            name={field.name}
            component="div"
            className="error-message"
          />
        </div>
      );
    case "select":
      return (
        <div className="field-wrapper">
          <label htmlFor={field.name} className="field-label">
            {field.label}
          </label>
          <Field
            as="select"
            id={field.name}
            name={field.name}
            className="field-select"
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name={field.name}
            component="div"
            className="error-message"
          />
        </div>
      );
    // Add more cases for other input types as needed
    default:
      return null;
  }
};

export const FormRow = ({ row }) => {
  return (
    <div className="form-row">
      {row.map((col, index) => {
        const [colKey, field] = Object.entries(col)[0];
        return (
          <div key={`${colKey}-${index}`} className="form-col">
            <FormField field={field} />
          </div>
        );
      })}
    </div>
  );
};

export const Form = ({ formStructure, isSubmitting }) => {
  return (
    <FForm>
      <Grid container spacing={2}>
        {formStructure.map((rowObj, index) => {
          const [rowKey, row] = Object.entries(rowObj)[0];
          return (
            <Grid item xs={12} key={`${rowKey}-${index}`}>
              <FormRow row={row} />
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            Submit
          </button>
        </Grid>
      </Grid>
    </FForm>
  );
};
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
export const Button = ({
  children,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => (
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
