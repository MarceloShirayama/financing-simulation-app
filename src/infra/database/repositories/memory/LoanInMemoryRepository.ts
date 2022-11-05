import { LoanRepository } from "@App/application/repositories/LoanRepository";
import { Loan } from "@App/domain/entities/Loan";

export class LoanInMemoryRepository implements LoanRepository {
  loans: Loan[];
  static instance: LoanInMemoryRepository;

  private constructor() {
    this.loans = [];
  }

  static getInstance() {
    if (!LoanInMemoryRepository.instance) {
      LoanInMemoryRepository.instance = new LoanInMemoryRepository();
    }

    return LoanInMemoryRepository.instance;
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
