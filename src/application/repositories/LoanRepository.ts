import { Loan } from "@App/domain/entities/Loan";

export interface LoanRepository {
  save(loan: Loan): Promise<void>;
  get(code: string): Promise<Loan>;
}
