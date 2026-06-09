import { AppError } from "./AppError";
import { HTTP_STATUS } from "../constants/httpStatus";

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, HTTP_STATUS.CONFLICT);
  }
}
