import crypto from "crypto";

import { GetLoan } from "@App/application/use-case/GetLoan";
import { RequestLoan } from "@App/application/use-case/RequestLoan";
import { Input } from "@App/application/use-case/SimulateLoan";

// Test in memory
import { RepositoryMemoryFactory } from "@App/infra/factory/RepositoryMemoryFactory";
import { LogDecorator } from "@App/application/decorator/LogDecorator";

// Test in database
// import { PgPromiseConnection } from "@App/infra/database/PgPromiseConnection";
// import { RepositoryDatabaseFactory } from "@App/infra/factory/RepositoryDatabaseFactory";

describe("RequestLoan", () => {
  it("Should be able must apply in a financing using the price table ", async () => {
    const code = crypto.randomUUID();

    // Test in memory
    const repositoryFactory = new RepositoryMemoryFactory();

    // Test in database
    // const connection = new PgPromiseConnection();
    // const repositoryFactory = new RepositoryDatabaseFactory(connection);

    const requestLoan = new LogDecorator(new RequestLoan(repositoryFactory));

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

    const getLoan = new LogDecorator(new GetLoan(repositoryFactory));

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
