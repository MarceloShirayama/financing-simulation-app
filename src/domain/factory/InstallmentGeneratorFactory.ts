import { LoanType } from "@App/application/use-case/SimulateLoan";
import { InstallmentGeneratorPrice } from "../entities/InstallmentGeneratorPrice";
import { InstallmentGeneratorSac } from "../entities/InstallmentGeneratorSac";

export class InstallmentGeneratorFactory {
  static create(type: LoanType) {
    if (type === "price") {
      return new InstallmentGeneratorPrice();
    }

    if (type === "sac") {
      return new InstallmentGeneratorSac();
    }

    throw new Error("Error creating installment generator.");
  }
}
