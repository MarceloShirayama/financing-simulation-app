export class Installment {
  constructor(
    readonly loan_code: string,
    readonly number: number,
    readonly amount: number,
    readonly interest: number,
    readonly amortization: number,
    readonly balance: number
  ) {}
}
