import { useAuth } from '../../hooks/useAuth';

const SocialLogin: React.FC = () => {
  const { socialLogin } = useAuth();

  const handleSocialLogin = (platform: string) => {
    socialLogin(platform);
  };

  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={() => handleSocialLogin('Google')}
        className="flex w-full items-center justify-center rounded bg-red-500 p-2 text-white hover:bg-red-600"
      >
        <i className="fab fa-google mr-2"></i> Login with Google
      </button>
      <button
        onClick={() => handleSocialLogin('Facebook')}
        className="flex w-full items-center justify-center rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        <i className="fab fa-facebook-f mr-2"></i> Login with Facebook
      </button>
      <button
        onClick={() => handleSocialLogin('LinkedIn')}
        className="flex w-full items-center justify-center rounded bg-blue-400 p-2 text-white hover:bg-blue-500"
      >
        <i className="fab fa-linkedin-in mr-2"></i> Login with LinkedIn
      </button>
    </div>
  );
};

export default SocialLogin;