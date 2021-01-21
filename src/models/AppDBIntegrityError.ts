import { AppError, AppErrorCodes } from "./AppError";

const DB_ERROR_CODE_MESSAGES: Record<
  string,
  { code: string; message: string }
> = {
  ER_DUP_ENTRY: {
    code: "APP_1", // custom app codes, maybe this should be refactored a bit
    message: "Record already exists",
  },
};

export class AppDBIntegrityError extends AppError {
  constructor(private dbCode: string, message?: string) {
    super(AppErrorCodes.DB_ERROR, message);
  }

  toJSON() {
    const obj = super.toJSON();
    const dbAppMessage = DB_ERROR_CODE_MESSAGES[this.dbCode];

    obj.dbCode = dbAppMessage?.code || "UNKNOWN";

    if (dbAppMessage) {
      obj.message = dbAppMessage.message;
    }

    return obj;
  }
}
