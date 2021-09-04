import { User } from '@/components/App/App';
import { fetchUser, FetchUser } from './api';

jest.mock('./api');

describe('fetchUser function', () => {
  it('returns user data', async () => {
    const mockUser: User = {
      id: 1,
      name: 'Andrey',
    };

    const mockFetchUser = fetchUser as jest.MockedFunction<FetchUser>;
    mockFetchUser.mockResolvedValueOnce(mockUser);

    const user = await mockFetchUser();

    expect(mockFetchUser).toHaveBeenCalledTimes(1);
    expect(user).toEqual(mockUser);
  });
});
