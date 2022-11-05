import { UseCase } from "../use-case/UseCase";

export class LogDecorator implements UseCase {
  constructor(readonly useCase: UseCase) {}

  async execute(input: any): Promise<any> {
    console.info({ date: new Date(), input });

    return this.useCase.execute(input);
  }
}
