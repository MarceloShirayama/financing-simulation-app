import { InstallmentRepository } from "@App/application/repositories/InstallmentRepository";
import { Installment } from "@App/domain/entities/Installment";

export class InstallmentInMemoryRepository implements InstallmentRepository {
  installments: Installment[];

  constructor() {
    this.installments = [];
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
