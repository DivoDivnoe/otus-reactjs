import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from './useAuthRedux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '@/reducer';
import React, { FC } from 'react';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('useAuth hook', () => {
  it('should toggle user correctly', () => {
    const store = createStore(reducer);
    const wrapper: FC = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });

    const { user, signin, signout } = result.current;
    expect(user).toBeNull();

    act(() => signin('Andrey'));
    expect(result.current.user).toBe('Andrey');
    expect(mockHistoryPush).toHaveBeenCalledWith('/');

    act(signout);
    expect(result.current.user).toBe(null);
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  });
});
