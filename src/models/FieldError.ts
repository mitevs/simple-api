export class FieldError extends Error {
  constructor(
    public fieldName: string,
    public constraints?: { [type: string]: string }
  ) {
    super(`validation error for ${fieldName}`);
  }
}
