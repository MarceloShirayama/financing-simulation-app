import { Installment } from "./Installment";

export class Loan {
  constructor(
    readonly code: string,
    readonly amount: number,
    readonly period: number,
    readonly rate: number,
    readonly salary: number,
    readonly type: "price" | "sac"
  ) {
    if (salary * 0.25 < amount / period) {
      throw new Error("Insufficient salary.");
    }
  }
}
