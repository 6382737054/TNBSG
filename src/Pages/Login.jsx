import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apiConfig/api';
import { useTranslation } from '../Context/TranslationContext';
import useAuthStore from '../Zustand/authStore';
import useCartStore from '../Zustand/cartStore';
import { toast } from 'react-toastify';

export default function LoginSignupPage() {
  const navigate = useNavigate();
  const { isTamil } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginAs, setLoginAs] = useState('user');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Zustand store hooks
  const { setAuth, setPendingCartProduct, pendingCartProduct } = useAuthStore();
  const { addToCart } = useCartStore();

  const translations = {
    createAccount: {
      en: 'Create an Account',
      ta: 'கணக்கை உருவாக்கவும்'
    },
    welcomeBack: {
      en: 'Welcome Back',
      ta: 'மீண்டும் வரவேற்கிறோம்'
    },
    joinCommunity: {
      en: 'Join our community today!',
      ta: 'இன்றே எங்கள் சமூகத்தில் இணையுங்கள்!'
    },
    signInPrompt: {
      en: 'Please sign in to your account',
      ta: 'உங்கள் கணக்கில் உள்நுழையவும்'
    },
    username: {
      en: 'Username',
      ta: 'பயனர்பெயர்'
    },
    enterUsername: {
      en: 'Enter your username',
      ta: 'உங்கள் பயனர்பெயரை உள்ளிடவும்'
    },
    emailAddress: {
      en: 'Email address',
      ta: 'மின்னஞ்சல் முகவரி'
    },
    enterEmail: {
      en: 'Enter your email address',
      ta: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்'
    },
    password: {
      en: 'Password',
      ta: 'கடவுச்சொல்'
    },
    enterPassword: {
      en: 'Enter your password',
      ta: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்'
    },
    loginAs: {
      en: 'Login As',
      ta: 'இவராக உள்நுழையவும்'
    },
    user: {
      en: 'User',
      ta: 'பயனர்'
    },
    admin: {
      en: 'Admin',
      ta: 'நிர்வாகி'
    },
    rememberMe: {
      en: 'Remember me',
      ta: 'என்னை நினைவில் வைத்துக்கொள்'
    },
    forgotPassword: {
      en: 'Forgot your password?',
      ta: 'கடவுச்சொல் மறந்துவிட்டதா?'
    },
    processing: {
      en: 'Processing...',
      ta: 'செயலாக்கப்படுகிறது...'
    },
    signUp: {
      en: 'Sign Up',
      ta: 'பதிவு செய்யவும்'
    },
    signIn: {
      en: 'Sign In',
      ta: 'உள்நுழையவும்'
    },
    alreadyHaveAccount: {
      en: 'Already have an account?',
      ta: 'ஏற்கனவே ஒரு கணக்கு உள்ளதா?'
    },
    dontHaveAccount: {
      en: "Don't have an account?",
      ta: 'கணக்கு இல்லையா?'
    }
  };

  const validateForm = () => {
    if (isSignup && !username.trim()) {
      setError(isTamil ? 'பயனர்பெயர் தேவை' : 'Username is required');
      return false;
    }
    if (!email.trim()) {
      setError(isTamil ? 'மின்னஞ்சல் தேவை' : 'Email is required');
      return false;
    }
    if (!password.trim()) {
      setError(isTamil ? 'கடவுச்சொல் தேவை' : 'Password is required');
      return false;
    }
    if (password.length < 8) {
      setError(isTamil ? 'கடவுச்சொல் குறைந்தது 8 எழுத்துகள் நீளமாக இருக்க வேண்டும்' : 'Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let response;
      if (isSignup) {
        const registrationData = { email, password, username, loginAs };
        console.log('Sending registration data:', JSON.stringify(registrationData, null, 2));
        response = await api.post('/api/register', registrationData);

        if (response.data && response.data.message === "200OK") {
          toast.success(isTamil 
            ? 'பதிவு வெற்றிகரமாக முடிந்தது! தயவுசெய்து உள்நுழையவும்.'
            : 'Registration successful! Please log in.'
          );
          setIsSignup(false);
          setEmail('');
          setPassword('');
          setUsername('');
        }
      } else {
        const loginData = { email, password };
        console.log('Sending login data:', JSON.stringify(loginData, null, 2));
        response = await api.post('/api/login', loginData);

        console.log('Login response:', response.data);

        if (response.data?.output?.data && response.data?.output?.token) {
          // Store user data in Zustand
          setAuth(
            response.data.output.token,
            response.data.output.data.id,
            response.data.output.data.username
          );

          // Store user data in localStorage
          localStorage.setItem('authToken', response.data.output.token);
          localStorage.setItem('userId', response.data.output.data.id);
          localStorage.setItem('username', response.data.output.data.username);
          localStorage.setItem('email', email);
          localStorage.setItem('loginAs', response.data.output.data.loginAs || 'user');

          // Show success toast
          toast.success(isTamil ? 'உள்நுழைவு வெற்றிகரமானது!' : 'Login successful!');
          setShowSuccessModal(true);

          // Check for pending cart action
          if (pendingCartProduct) {
            try {
              const cartData = {
                productId: pendingCartProduct.productId,
                loginId: response.data.output.data.id,
                quantity: 1
              };

              await api.post('api/addCart', cartData);
              addToCart(pendingCartProduct);
              setPendingCartProduct(null);
            } catch (cartError) {
              console.error('Error adding pending product to cart:', cartError);
            }
          }

          // Redirect after showing success message
          setTimeout(() => {
            setShowSuccessModal(false);
            if (pendingCartProduct) {
              navigate('/cart');
            } else {
              navigate('/');
            }
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Request error:', error);
      if (error.response && error.response.data) {
        if (error.response.data.message === 'Email already in use') {
          toast.error(isTamil 
            ? 'இந்த மின்னஞ்சல் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது'
            : 'This email is already registered'
          );
        } else {
          toast.error(error.response.data.message || (isTamil 
            ? `${isSignup ? 'பதிவு' : 'உள்நுழைவு'} செய்யும் போது பிழை ஏற்பட்டது`
            : `An error occurred during ${isSignup ? 'signup' : 'login'}`
          ));
        }
      } else {
        toast.error(isTamil
          ? 'எதிர்பாராத பிழை ஏற்பட்டது'
          : 'An unexpected error occurred'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-36">
    <div className="max-w-4xl w-full space-y-8 bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="flex">
        {/* Left section with hero image */}
        <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/Images/ScoutMarch.png')" }}>
        </div>

        {/* Right section with login/signup form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isSignup ? translations.createAccount[isTamil ? 'ta' : 'en'] : translations.welcomeBack[isTamil ? 'ta' : 'en']}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isSignup ? translations.joinCommunity[isTamil ? 'ta' : 'en'] : translations.signInPrompt[isTamil ? 'ta' : 'en']}
            </p>
          </div>
          {error && (
            <div className="mt-4 text-red-600 text-sm" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 text-green-600 text-sm" role="alert">
              {success}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {isSignup && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    {translations.username[isTamil ? 'ta' : 'en']}
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder={translations.enterUsername[isTamil ? 'ta' : 'en']}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                  {translations.emailAddress[isTamil ? 'ta' : 'en']}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={translations.enterEmail[isTamil ? 'ta' : 'en']}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {translations.password[isTamil ? 'ta' : 'en']}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={translations.enterPassword[isTamil ? 'ta' : 'en']}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isSignup && (
                <div>
                  <label htmlFor="loginAs" className="block text-sm font-medium text-gray-700 mb-1">
                    {translations.loginAs[isTamil ? 'ta' : 'en']}
                  </label>
                  <select
                    id="loginAs"
                    name="loginAs"
                    value={loginAs}
                    onChange={(e) => setLoginAs(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  >
                    <option value="user">{translations.user[isTamil ? 'ta' : 'en']}</option>
                    <option value="admin">{translations.admin[isTamil ? 'ta' : 'en']}</option>
                  </select>
                </div>
              )}
            </div>

            {!isSignup && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    {translations.rememberMe[isTamil ? 'ta' : 'en']}
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    {translations.forgotPassword[isTamil ? 'ta' : 'en']}
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? translations.processing[isTamil ? 'ta' : 'en'] : (isSignup ? translations.signUp[isTamil ? 'ta' : 'en'] : translations.signIn[isTamil ? 'ta' : 'en'])}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              {isSignup ? translations.alreadyHaveAccount[isTamil ? 'ta' : 'en'] : translations.dontHaveAccount[isTamil ? 'ta' : 'en']}{' '}
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                  setSuccess('');
                }}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {isSignup ? translations.signIn[isTamil ? 'ta' : 'en'] : translations.signUp[isTamil ? 'ta' : 'en']}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Success Modal */}
    {showSuccessModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              {isTamil ? 'உள்நுழைவு வெற்றிகரமானது!' : 'Login Successful!'}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {isTamil ? 'வரவேற்கிறோம்!' : 'Welcome back!'}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

