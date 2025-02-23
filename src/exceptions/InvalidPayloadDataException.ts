import { Exception } from "./Exception";

export class InvalidPayloadDataException extends Exception {
  constructor(message: string = "Invalid payload data") {
    super(message, 400);
    this.name = "InvalidPayloadDataException";
  }
}