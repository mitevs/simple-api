import { FieldError } from "./FieldError";
import { AppError, AppErrorCodes } from "./AppError";

export class AppValidationError extends AppError {
  constructor(private fieldErrors: FieldError[]) {
    super(AppErrorCodes.VALIDATION_ERROR, "validation errors");
  }

  toJSON() {
    const obj = super.toJSON();
    obj.errors = this.fieldErrors;
    return obj;
  }
}
