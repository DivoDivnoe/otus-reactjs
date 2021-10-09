import { renderHook, act } from '@testing-library/react-hooks';
import useUserData from './useUserData';

describe('useUserData hook', () => {
  it('should toggle user correctly', () => {
    const { result } = renderHook(useUserData);

    const { user, setUser } = result.current;
    expect(user).toBeNull();

    act(() => setUser('Andrey'));
    expect(result.current.user).toBe('Andrey');
  });
});
