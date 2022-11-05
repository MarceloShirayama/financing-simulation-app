import { InstallmentRepository } from "@App/application/repositories/InstallmentRepository";
import { Installment } from "@App/domain/entities/Installment";

export class InstallmentInMemoryRepository implements InstallmentRepository {
  installments: Installment[];
  static instance: InstallmentInMemoryRepository;

  private constructor() {
    this.installments = [];
  }

  static getInstance() {
    if (!InstallmentInMemoryRepository.instance) {
      InstallmentInMemoryRepository.instance =
        new InstallmentInMemoryRepository();
    }

    return InstallmentInMemoryRepository.instance;
  }

  async save(installment: Installment): Promise<void> {
    this.installments.push(installment);
  }
  async getByCode(code: string): Promise<Installment[]> {
    return this.installments.filter(
      (installment) => installment.loan_code === code
    );
  }
}
