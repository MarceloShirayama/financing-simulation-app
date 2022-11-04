import { Output } from "./SimulateLoan";
import { Connection } from "@App/infra/database/Connection";

type Input = {
  code: string;
};

export class GetLoan {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const connection = new Connection();

    const [loadData] = await connection.query(
      `
      SELECT * FROM loan
      WHERE code = $1
      `,
      [input.code]
    );

    const installmentsData = await connection.query(
      `
      SELECT * FROM installment
      WHERE loan_code = $1
      `,
      [input.code]
    );

    const output: Output = {
      code: loadData.code,
      installments: [],
    };

    for (const installmentData of installmentsData) {
      output.installments.push({
        installmentNumber: installmentData.number,
        amount: parseFloat(installmentData.amount),
        interest: parseFloat(installmentData.interest),
        amortization: parseFloat(installmentData.amortization),
        balance: parseFloat(installmentData.balance),
      });
    }

    connection.close();

    return output;
  }
}
