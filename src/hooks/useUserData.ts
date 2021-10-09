import { useState } from 'react';

type UserType = string | null;
type SetUserType = (user: UserType) => void;

interface UserStateType {
  user: UserType;
  setUser: SetUserType;
}

const useUserData = (): UserStateType => {
  const [user, setUser] = useState(null);

  return { user, setUser: setUser as SetUserType };
};

export default useUserData;
