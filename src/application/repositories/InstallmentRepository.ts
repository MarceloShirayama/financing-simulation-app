import { Installment } from "@App/domain/entities/Installment";

export interface InstallmentRepository {
  save(installment: Installment): Promise<void>;
  getByCode(code: string): Promise<Installment[]>;
}
