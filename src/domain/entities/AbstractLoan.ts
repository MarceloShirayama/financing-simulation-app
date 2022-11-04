import { Installment } from "./Installment";

export abstract class AbstractLoan {
  constructor(
    readonly code: string,
    readonly amount: number,
    readonly period: number,
    readonly rate: number,
    readonly salary: number,
    readonly type: "price" | "sac"
  ) {}

  abstract generateInstallments(): Installment[];
}
