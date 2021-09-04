import { User } from '@/components/App/App';

export type FetchUser = () => Promise<User>;

export const fetchUser: FetchUser = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  let userData = null;

  if (response.ok) {
    userData = await response.json();
  } else {
    console.error('Ошибка HTTP: ' + response.status);
  }

  return userData;
};
