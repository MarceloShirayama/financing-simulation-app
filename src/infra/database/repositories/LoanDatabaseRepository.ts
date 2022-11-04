import { Loan } from "@App/domain/entities/Loan";
import { Connection } from "@App/infra/database/Connection";

export class LoanDatabaseRepository {
  connection: Connection;

  constructor() {
    this.connection = new Connection();
  }

  async save(loan: Loan) {
    await this.connection.query(
      `
      INSERT INTO loan 
      (code, amount, period, rate, type)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [loan.code, loan.amount, loan.period, loan.rate, loan.type]
    );
  }
}
