import { useState, useCallback } from 'react';

interface SignInDataType {
  name: string;
  resetName: () => void;
  onChangeName: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const useSignInData = (): SignInDataType => {
  const [name, setName] = useState('');

  const onChangeName = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>): void => {
      setName(evt.target.value);
    },
    []
  );

  const resetName = useCallback(() => {
    setName('');
  }, []);

  return { onChangeName, resetName, name };
};

export default useSignInData;
