import reducer from './model';

export {
  ActionCreator,
  Model,
  Binary,
  CellState,
  CellStateType,
} from './model';
export { getModel, getNextGenModel, getZeroMatrix } from './selectors';

export default reducer;
