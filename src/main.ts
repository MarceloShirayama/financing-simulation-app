import crypto from "crypto";

import { Input, SimulateLoan } from "@App/application/use-case/SimulateLoan";

const purchasePrice = 250000;
const downPayment = 50000;
const salary = 70000;
const loanAmount = purchasePrice - downPayment;
const loanRate = 1;
const loanPeriod = 12;

const inputPrice: Input = {
  code: crypto.randomUUID(),
  purchasePrice: 250000,
  downPayment: 50000,
  salary: 70000,
  period: 12,
  type: "price",
};
const inputSac: Input = {
  code: crypto.randomUUID(),
  purchasePrice: 250000,
  downPayment: 50000,
  salary: 70000,
  period: 12,
  type: "price",
};

const simulateLoan = new SimulateLoan();

console.log("price");
console.log("InstallmentNumber Amount Amortization Balance");
const price = async () => {
  const result = await simulateLoan.execute(inputPrice);
  console.log(result);
};
console.log(price());

console.log("sac");
console.log("InstallmentNumber Amount Amortization Balance");
const sac = async () => {
  const simulate = await simulateLoan.execute(inputSac);
  console.log(simulate);
};
console.log(sac());
