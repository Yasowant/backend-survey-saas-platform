import { AppError } from "./AppError";
import { HTTP_STATUS } from "../constants/httpStatus";

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}
