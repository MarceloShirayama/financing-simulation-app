import crypto from "crypto";

import { GetLoan } from "@App/application/use-case/GetLoan";
import { RequestLoan } from "@App/application/use-case/RequestLoan";
import { Input } from "@App/application/use-case/SimulateLoan";

// Test in memory
import { InstallmentInMemoryRepository } from "@App/infra/database/repositories/memory/InstallmentInMemoryRepository";
import { LoanInMemoryRepository } from "@App/infra/database/repositories/memory/LoanInMemoryRepository";

// Test in database
// import { PgPromiseConnection } from "@App/infra/database/PgPromiseConnection";
// import { LoanDatabaseRepository } from "@App/infra/database/repositories/LoanDatabaseRepository";
// import { InstallmentDatabaseRepository } from "@App/infra/database/repositories/InstallmentDatabaseRepository";

describe("RequestLoan", () => {
  it("Should be able must apply in a financing using the price table ", async () => {
    const code = crypto.randomUUID();

    // Test in memory
    const loanRepository = new LoanInMemoryRepository();
    const installmentRepository = new InstallmentInMemoryRepository();

    // Test in database
    // const connection = new PgPromiseConnection();
    // const loanRepository = new LoanDatabaseRepository(connection);
    // const installmentRepository = new InstallmentDatabaseRepository(connection);

    const requestLoan = new RequestLoan(loanRepository, installmentRepository);

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

    const getLoan = new GetLoan(loanRepository, installmentRepository);

    const inputGetLoan = { code };

    const output = await getLoan.execute(inputGetLoan);

    expect(output.installments).toHaveLength(12);

    const [firstInstallment] = output.installments;
    expect(firstInstallment.balance).toBe(184230.24);

    const lastInstallment = output.installments[output.installments.length - 1];
    expect(lastInstallment.balance).toBe(0);

    // Test in database
    // connection.close();
  });
});
