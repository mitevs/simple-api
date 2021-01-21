export enum AppErrorCodes {
  DB_ERROR = "APP_DB",
  VALIDATION_ERROR = "APP_VALIDATION",
}

export abstract class AppError {
  constructor(private errorCode: AppErrorCodes, private message?: string) {}

  toJSON(): Record<string, unknown> {
    const obj: Record<string, unknown> = {
      errorCode: this.errorCode,
    };

    if (this.message) {
      obj.message = this.message;
    }

    return obj;
  }
}
