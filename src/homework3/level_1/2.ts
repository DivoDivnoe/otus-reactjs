// Задание первого уровня 2
// Есть объединение (юнион) типов заказов в различных состояниях
// Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const orderStates = [
  'initial',
  'inWork',
  'buyingSupplies',
  'producing',
  'fullfilled',
] as const;

type FIXME = typeof orderStates[number];

type Order =
  | {
      state: Extract<FIXME, 'initial'>;
      sum: number;
    }
  | {
      state: Extract<FIXME, 'inWork'>;
      sum: number;
      workerId: number;
    }
  | {
      state: Extract<FIXME, 'buyingSupplies'>;
      sum: number;
      workerId: number;
      suppliesSum: number;
    }
  | {
      state: Extract<FIXME, 'producing'>;
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
    }
  | {
      state: Extract<FIXME, 'fullfilled'>;
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
      fullfillmentDate: Date;
    };

export const getOrderState = (order: Order): FIXME => order.state;
