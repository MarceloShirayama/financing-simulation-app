import { RepositoryAbstractFactory } from "@App/application/factory/RepositoryAbstractFactory";
import { InstallmentRepository } from "@App/application/repositories/InstallmentRepository";
import { LoanRepository } from "@App/application/repositories/LoanRepository";
import { InstallmentInMemoryRepository } from "../database/repositories/memory/InstallmentInMemoryRepository";
import { LoanInMemoryRepository } from "../database/repositories/memory/LoanInMemoryRepository";

export class RepositoryMemoryFactory implements RepositoryAbstractFactory {
  createLoanRepository(): LoanRepository {
    return LoanInMemoryRepository.getInstance();
  }
  createInstallmentRepository(): InstallmentRepository {
    return InstallmentInMemoryRepository.getInstance();
  }
}
