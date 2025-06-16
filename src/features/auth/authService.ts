import { User } from '../../types/Auth';

// Simulated API calls
export const loginUserService = async (data: User): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};

export const socialLoginService = async (platform: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: `User (${platform})`,
        mobile: 'N/A',
        email: `user@${platform.toLowerCase()}.com`,
      });
    }, 500);
  });
};