import { LoanRepository } from "@App/application/repositories/LoanRepository";
import { Loan } from "@App/domain/entities/Loan";

export class LoanInMemoryRepository implements LoanRepository {
  loans: Loan[];

  constructor() {
    this.loans = [];
  }

  async save(loan: Loan): Promise<void> {
    this.loans.push(loan);
  }

  async get(code: string): Promise<Loan> {
    const loan = this.loans.find((loan) => loan.code === code);

    if (!loan) throw new Error("Loan not found!");

    return loan;
  }
}
