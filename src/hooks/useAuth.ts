import { useStore } from 'zustand';
import { authStore } from '../store/authStore';
import { User } from '../types/Auth';
import { loginUserService, socialLoginService } from '../features/auth/authService';

export const useAuth = () => {
  const { isLoggedIn, user, login, logout, socialLogin: storeSocialLogin } = useStore(authStore);

  const loginUser = async (data: User) => {
    const userData = await loginUserService(data);
    login(userData);
  };

  const logoutUser = () => {
    logout();
  };

  const socialLoginUser = async (platform: string) => {
    const userData = await socialLoginService(platform);
    storeSocialLogin(userData);
  };

  return {
    isLoggedIn,
    user,
    login: loginUser,
    logout: logoutUser,
    socialLogin: socialLoginUser,
  };
};