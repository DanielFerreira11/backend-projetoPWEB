import { Exception } from "./Exception";

export class DuplicateAircraftException extends Exception {
  constructor(message: string = "Aircraft already exists") {
    super(message, 409);
    this.name = "DuplicateAircraftException";
  }
}
