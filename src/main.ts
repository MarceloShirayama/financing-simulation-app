import crypto from "crypto";

import { Input, SimulateLoan } from "@App/application/use-case/SimulateLoan";
import { LogDecorator } from "./application/decorator/LogDecorator";

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
  type: "sac",
};

const simulateLoan = new LogDecorator(new SimulateLoan());

const price = async () => {
  const result = await simulateLoan.execute(inputPrice);
  console.log("=".repeat(50));
  console.log("Tabela Price");
  console.log(result);
  console.log("=".repeat(50));
};
price();

const sac = async () => {
  const simulate = await simulateLoan.execute(inputSac);
  console.log("=".repeat(50));
  console.log("Tabela SAC");
  console.log(simulate);
  console.log("=".repeat(50));
};
sac();
