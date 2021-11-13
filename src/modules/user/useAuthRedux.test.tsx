import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from './useAuthRedux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe('useAuth hook', () => {
  it('sets user correctly', () => {
    const { result } = renderHook(() => useAuth());

    const { currentName, setName, resetName } = result.current;
    expect(currentName).toBe('');

    act(() => setName('Andrey'));
    expect(result.current.currentName).toBe('Andrey');

    act(() => result.current.signin());
    expect(mockDispatch).toBeCalledWith({
      payload: 'Andrey',
      type: 'user/signin',
    });

    act(resetName);
    expect(result.current.currentName).toBe('');

    act(() => setName(''));
    act(() => result.current.signin());
    expect(mockDispatch).toBeCalledWith({
      payload: null,
      type: 'user/signin',
    });
  });
});
