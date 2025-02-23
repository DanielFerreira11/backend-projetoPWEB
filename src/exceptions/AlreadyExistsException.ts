import { Exception } from "./Exception";

export class AlreadyExistsException extends Exception {
  constructor(message: string = "Already exists") {
    super(message, 409);
    this.name = "AlreadyExistsException";
  }
}