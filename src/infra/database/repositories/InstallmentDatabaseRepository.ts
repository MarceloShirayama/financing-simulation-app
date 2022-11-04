import { Installment } from "@App/domain/entities/Installment";
import { Loan } from "@App/domain/entities/Loan";
import { Connection } from "@App/infra/database/Connection";

export class InstallmentDatabaseRepository {
  connection: Connection;

  constructor() {
    this.connection = new Connection();
  }

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
}
