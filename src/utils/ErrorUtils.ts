import { AppDBIntegrityError } from "./../models/AppDBIntegrityError";
import { AppValidationError } from "./../models/AppValidationError";
import { ValidationError } from "class-validator";
import { QueryFailedError } from "typeorm";
import { HttpError } from "routing-controllers";
import HttpStatus from "http-status-codes";
import { FieldError } from "./../models/FieldError";

const developmentMode: boolean = process.env.NODE_ENV !== "production";

export type GlobalErrorResponse = {
  status: number;
  body: Record<string, unknown>;
};

export const isValidationError = (error: any) => {
  return (
    Array.isArray(error?.errors) &&
    error.errors.every((element: any) => element instanceof ValidationError)
  );
};

export const isDBIntegrityError = (error: any) => {
  return error instanceof QueryFailedError;
};

export const handleGlobalError = (error: any): GlobalErrorResponse => {
  let status = HttpStatus.OK;
  let body: Record<string, unknown> = {};

  if (developmentMode) {
    console.error(error);
  }

  if (isValidationError(error)) {
    status = HttpStatus.BAD_REQUEST;
    const appError = getValidationError(error);
    body = appError.toJSON();
  } else if (isDBIntegrityError(error)) {
    status = HttpStatus.CONFLICT;
    const appError = getDBIntegrityError(error);
    body = appError.toJSON();
  } else if (error instanceof HttpError) {
    if (error.httpCode) {
      status = error.httpCode;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    body.message = error.message;
  } else if (error instanceof Error) {
    // set response error fields
    if (error.name && (developmentMode || error.message)) {
      // show name only if in development mode and if error message exist too
      body.name = error.name;
    }

    if (error.message) {
      body.message = error.message;
    }

    if (error.stack && developmentMode) {
      body.stack = error.stack;
    }
  } else if (error instanceof String) {
    body.message = error;
  }

  return { status, body };
};

const getValidationError = (error: any): AppValidationError => {
  const validationErrors: ValidationError[] = error?.errors ?? [];

  const fieldErrors = validationErrors.map(
    (validationError) =>
      new FieldError(validationError.property, validationError.constraints)
  );

  return new AppValidationError(fieldErrors);
};

const getDBIntegrityError = (
  error: QueryFailedError & { code: string }
): AppDBIntegrityError => {
  return new AppDBIntegrityError(error.code);
};
