import { SeederFactory, SeederFactoryItem } from 'typeorm-extension';

export const makeMany = <O extends Record<string, any>, Meta = unknown>(
  factory: SeederFactory<O, Meta>,
  amount: number,
  params?: Partial<O>,
  save?: boolean,
) => {
  return Promise.all(
    Array(amount)
      .fill('')
      .map(() => factory.make(params, save)),
  );
};
