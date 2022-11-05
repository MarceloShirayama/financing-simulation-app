import { InstallmentRepository } from "../repositories/InstallmentRepository";
import { LoanRepository } from "../repositories/LoanRepository";

export interface RepositoryAbstractFactory {
  createLoanRepository(): LoanRepository;
  createInstallmentRepository(): InstallmentRepository;
}
