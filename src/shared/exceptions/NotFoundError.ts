import { AppError } from "./AppError";
import { HTTP_STATUS } from "../constants/httpStatus";

export class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}
