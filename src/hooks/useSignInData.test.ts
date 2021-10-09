import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useSignInData from './useSignInData';

describe('useSignInData hook', () => {
  it('should update user name correctly', () => {
    const { result } = renderHook(useSignInData);

    const { name, onChangeName, resetName } = result.current;
    expect(name).toEqual('');

    act(() =>
      onChangeName({
        target: { value: 'Andrey' },
      } as React.ChangeEvent<HTMLInputElement>)
    );
    expect(result.current.name).toEqual('Andrey');

    act(resetName);
    expect(result.current.name).toEqual('');
  });
});
