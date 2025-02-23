import { Exception } from "./Exception";

export class ClassNotFoundException extends Exception {
  constructor(message: string = "Class not found") {
    super(message, 404);
    this.name = "ClassNotFoundException";
  }
}