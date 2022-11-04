import crypto from "crypto";

import { Input } from "@App/application/use-case/SimulateLoan";
import { RequestLoan } from "@App/application/use-case/RequestLoan";
import { GetLoan } from "@App/application/use-case/GetLoan";

describe("RequestLoan", () => {
  it("Should be able must apply in a financing using the price table ", async () => {
    const code = crypto.randomUUID();
    const requestLoan = new RequestLoan();

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

    const inputGetLoan = { code };

    const getLoan = new GetLoan();

    const output = await getLoan.execute(inputGetLoan);

    expect(output.installments).toHaveLength(12);

    const [firstInstallment] = output.installments;
    expect(firstInstallment.balance).toBe(184230.24);

    const lastInstallment = output.installments[output.installments.length - 1];
    expect(lastInstallment.balance).toBe(0);
  });
});
