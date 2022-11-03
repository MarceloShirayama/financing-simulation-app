import crypto from "crypto";

import { Input, SimulateLoan } from "@App/application/use-case/SimulateLoan";

describe("SimulateLoan", () => {
  it("Should be able simulate a financing using the price table", async () => {
    // given | arrange
    const simulateLoan = new SimulateLoan();

    const input: Input = {
      code: crypto.randomUUID(),
      purchasePrice: 250000,
      downPayment: 50000,
      salary: 70000,
      period: 12,
      type: "price",
    };

    // when | act
    const output = await simulateLoan.execute(input);

    // then | assert
    expect(output.installments).toHaveLength(12);

    const [firstInstallment] = output.installments;
    expect(firstInstallment.balance).toBe(184230.24);

    const lastInstallment = output.installments[output.installments.length - 1];
    expect(lastInstallment.balance).toBe(0);
  });
});
