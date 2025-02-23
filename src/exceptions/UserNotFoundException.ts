import { Exception } from "./Exception";

export class UserNotFoundException extends Exception {
  constructor(message: string = "User not found") {
    super(message, 404);
    this.name = "UserNotFoundException";
  }
}