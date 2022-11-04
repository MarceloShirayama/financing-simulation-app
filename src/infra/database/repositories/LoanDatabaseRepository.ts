import { Loan } from "@App/domain/entities/Loan";
import { Connection } from "@App/infra/database/Connection";

export class LoanDatabaseRepository {
  constructor(readonly connection: Connection) {}

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

  async get(code: string) {
    const [loadData] = await this.connection.query(
      `
      SELECT * FROM loan
      WHERE code = $1
      `,
      [code]
    );

    if (!loadData) throw new Error("Loan not found!");

    return new Loan(
      loadData.code,
      parseFloat(loadData.amount),
      loadData.period,
      loadData.rate,
      loadData.salary,
      loadData.type
    );
  }
}
