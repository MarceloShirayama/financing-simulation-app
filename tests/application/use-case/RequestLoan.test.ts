import crypto from "crypto";

import { Input } from "@App/application/use-case/SimulateLoan";
import { RequestLoan } from "@App/application/use-case/RequestLoan";
import { GetLoan } from "@App/application/use-case/GetLoan";
import { PgPromiseConnection } from "@App/infra/database/PgPromiseConnection";
import { LoanDatabaseRepository } from "@App/infra/database/repositories/LoanDatabaseRepository";
import { InstallmentDatabaseRepository } from "@App/infra/database/repositories/InstallmentDatabaseRepository";

describe("RequestLoan", () => {
  it("Should be able must apply in a financing using the price table ", async () => {
    const connection = new PgPromiseConnection();
    const loanDatabaseRepository = new LoanDatabaseRepository(connection);
    const installmentDatabaseRepository = new InstallmentDatabaseRepository(
      connection
    );
    const code = crypto.randomUUID();
    const requestLoan = new RequestLoan(
      loanDatabaseRepository,
      installmentDatabaseRepository
    );

    const inputRequestLoan: Input = {
      code,
      purchasePrice: 250000,
      downPayment: 50000,
      salary: 70000,
      period: 12,
      type: "price",
    };

    // when | act
    await requestLoan.execute(inputRequestLoan);

    const getLoan = new GetLoan(
      loanDatabaseRepository,
      installmentDatabaseRepository
    );

    const inputGetLoan = { code };

    const output = await getLoan.execute(inputGetLoan);

    expect(output.installments).toHaveLength(12);

    const [firstInstallment] = output.installments;
    expect(firstInstallment.balance).toBe(184230.24);

    const lastInstallment = output.installments[output.installments.length - 1];
    expect(lastInstallment.balance).toBe(0);

    await connection.close();
  });
});
