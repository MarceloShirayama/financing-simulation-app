import { Installment } from "./Installment";

export interface InstallmentGenerator {
  generator(
    loanCode: string,
    amount: number,
    period: number,
    rate: number
  ): Promise<Installment[]>;
}
