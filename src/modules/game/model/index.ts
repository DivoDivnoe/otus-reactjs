import reducer from './model';

export {
  ActionCreator,
  Model,
  Binary,
  CellState,
  CellStateType,
  Coords,
} from './model';
export { getModel, getNextGenModel, getZeroMatrix } from './selectors';

export default reducer;
