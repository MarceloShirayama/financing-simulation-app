import { Installment } from "@App/domain/entities/Installment";
import { Connection } from "@App/infra/database/Connection";

export class InstallmentDatabaseRepository {
  constructor(readonly connection: Connection) {}

  async save(installment: Installment) {
    await this.connection.query(
      `
      INSERT INTO installment 
      (loan_code, number, amount, interest, amortization, balance)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        installment.loan_code,
        installment.number,
        installment.amount,
        installment.interest,
        installment.amortization,
        installment.balance,
      ]
    );
  }

  async getByCode(code: string): Promise<Installment[]> {
    const installmentsData = await this.connection.query(
      `
      SELECT * FROM installment
      WHERE loan_code = $1
      `,
      [code]
    );

    const installments: Installment[] = [];

    for (const installmentData of installmentsData) {
      installments.push(
        new Installment(
          installmentData.loan_code,
          installmentData.number,
          parseFloat(installmentData.amount),
          parseFloat(installmentData.interest),
          parseFloat(installmentData.amortization),
          parseFloat(installmentData.balance)
        )
      );
    }

    return installments;
  }
}
