import { RepositoryAbstractFactory } from "@App/application/factory/RepositoryAbstractFactory";
import { InstallmentRepository } from "@App/application/repositories/InstallmentRepository";
import { LoanRepository } from "@App/application/repositories/LoanRepository";
import { Connection } from "../database/Connection";
import { InstallmentDatabaseRepository } from "../database/repositories/InstallmentDatabaseRepository";
import { LoanDatabaseRepository } from "../database/repositories/LoanDatabaseRepository";

export class RepositoryDatabaseFactory implements RepositoryAbstractFactory {
  constructor(readonly connection: Connection) {}

  createLoanRepository(): LoanRepository {
    return new LoanDatabaseRepository(this.connection);
  }
  createInstallmentRepository(): InstallmentRepository {
    return new InstallmentDatabaseRepository(this.connection);
  }
}
