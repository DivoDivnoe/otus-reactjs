// Задание второго уровня 1
// Есть объединение (юнион) типов заказов в различных состояниях
// и функция filterOnlyInitialAndInWorkOrder которая принимает заказы в любых состояниях
// А возвращает только initial и inWork
// Нужно заменить FIXME на правильный тип вычисленный на основе Order

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const orderStates = [
  'initial',
  'inWork',
  'buyingSupplies',
  'producing',
  'fullfilled',
] as const;

type OrderState = typeof orderStates[number];

type Options<StateType extends OrderState> = {
  state: StateType;
  sum: number;
  workerId: number;
  suppliesSum: number;
  produceEstimate: Date;
  fullfillmentDate: Date;
};

type InitialStateOptions = Pick<Options<'initial'>, 'state' | 'sum'>;
type InWorkStateOptions = Pick<Options<'inWork'>, 'state' | 'sum' | 'workerId'>;
type BuyingSuppliesStateOptions = Omit<
  Options<'buyingSupplies'>,
  'produceEstimate' | 'fullfillmentDate'
>;
type ProducingStateOptions = Omit<Options<'producing'>, 'fullfillmentDate'>;
type FullfilledStateOptions = Options<'fullfilled'>;

type Order =
  | InitialStateOptions
  | InWorkStateOptions
  | BuyingSuppliesStateOptions
  | ProducingStateOptions
  | FullfilledStateOptions;

type FIXME = InitialStateOptions | InWorkStateOptions | null;

// type Order =
//   | {
//       state: 'initial';
//       sum: number;
//     }
//   | {
//       state: 'inWork';
//       sum: number;
//       workerId: number;
//     }
//   | {
//       state: 'buyingSupplies';
//       sum: number;
//       workerId: number;
//       suppliesSum: number;
//     }
//   | {
//       state: 'producing';
//       sum: number;
//       workerId: number;
//       suppliesSum: number;
//       produceEstimate: Date;
//     }
//   | {
//       state: 'fullfilled';
//       sum: number;
//       workerId: number;
//       suppliesSum: number;
//       produceEstimate: Date;
//       fullfillmentDate: Date;
//     };

export const filterOnlyInitialAndInWorkOrder = (order: Order): FIXME => {
  if (order.state === 'initial' || order.state === 'inWork') {
    return order;
  }

  return null;
};
