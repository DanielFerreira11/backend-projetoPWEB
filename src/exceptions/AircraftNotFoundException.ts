import { Exception } from "./Exception";

export class AircraftNotFoundException extends Exception {
  constructor(message: string = "Aircraft not found") {
    super(message, 404);
    this.name = "AircraftNotFoundException";
  }
}