// Задание второго уровня 2
// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME<T> = React.ComponentType<T> extends { defaultProps?: infer R }
  ? R | undefined
  : never;

// Не нравится мне мое решение... Не понятно почему пришлось undefined добавлять
// Я думал, он должен был сам подтянуться, потому что тип у defaultProps определен как Partial<P> | undefined;

// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): FIXME<T> => {
  return component.defaultProps;
};
