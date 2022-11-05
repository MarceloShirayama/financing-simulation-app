import { UseCase } from "../use-case/UseCase";

export class LogDecorator implements UseCase<any, any> {
  constructor(readonly useCase: UseCase<any, any>) {}

  async execute(input: any): Promise<any> {
    console.info({
      LOG: {
        date: new Date(),
        class: this.useCase.constructor.name,
        input,
      },
    });

    return this.useCase.execute(input);
  }
}
