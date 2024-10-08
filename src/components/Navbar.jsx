import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';

const Navbar = () => {
  const { isTamil, toggleLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const translations = {
    en: {
      whoWeAre: "Who we are",
      whatWeDo: "What we do",
      whereWeWork: "Where we work",
      getInvolved: "Get involved",
      shop: "Shop",
      donate: "Donate",
      cart: "Cart",
      login: "Login",
      searchPlaceholder: "Search Me!",
      headerText: "Bharat Scouts and Guides"
    },
    ta: {
      whoWeAre: "நாங்கள்",
      whatWeDo: "என்ன செய்கிறோம்",
      whereWeWork: " இடம்",
      getInvolved: "பங்கேற்க",
      shop: "கடை",
      donate: "நன்கொடை",
      cart: "வண்டி",
      login: "உள்நுழைய",
      searchPlaceholder: "தேடுங்கள்!",
      headerText: "பாரத சாரணர் மற்றும் வழிகாட்டிகள்"
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {isMobile ? (
        <>
          <div className="bg-blue-900 text-white py-4 px-4 flex items-center justify-between">
            <img src="/Images/ScoutLogo.png" alt="Bharat Scouts and Guides Logo" className="h-12 w-12" />
            <h1 className="text-lg font-semibold">BSG</h1>
            <div className="flex items-center space-x-4">
              <img src="/Images/tn-logo.png" alt="TN Logo" className="h-12 w-12" />
              <button onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="bg-white text-black shadow-md py-4 px-4">
              <ul className="flex flex-col space-y-4 mb-4">
                <li className={`hover:text-blue-600 cursor-pointer text-sm ${isTamil ? 'font-medium' : 'font-medium'}`}>{t.whoWeAre}</li>
                <li className={`hover:text-blue-600 cursor-pointer text-sm ${isTamil ? 'font-medium' : 'font-medium'}`}>{t.whatWeDo}</li>
                <li className={`hover:text-blue-600 cursor-pointer text-sm ${isTamil ? 'font-medium' : 'font-medium'}`}>{t.whereWeWork}</li>
                <li className={`hover:text-blue-600 cursor-pointer text-sm ${isTamil ? 'font-medium' : 'font-medium'}`}>{t.getInvolved}</li>
                <li className={`hover:text-blue-600 cursor-pointer text-sm ${isTamil ? 'font-medium' : 'font-medium'}`}>{t.shop}</li>
              </ul>
              <div className="flex justify-between items-center mb-4">
                <button className="flex flex-col items-center">
                  <img src="/Images/cash.png" alt="Donate" className="h-6 w-6" />
                  <span className={`text-xs ${isTamil ? 'font-medium' : 'font-bold'} mt-1`}>{t.donate}</span>
                </button>
                <button className="flex flex-col items-center">
                  <img src="/Images/cart.png" alt="Add to Cart" className="h-6 w-6" />
                  <span className={`text-xs ${isTamil ? 'font-medium' : 'font-bold'} mt-1`}>{t.cart}</span>
                </button>
                <button className="flex flex-col items-center">
                  <img src="/Images/login.png" alt="Login Page" className="h-6 w-6" />
                  <span className={`text-xs ${isTamil ? 'font-medium' : 'font-bold'} mt-1`}>{t.login}</span>
                </button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <span className="mr-2 text-sm">{isTamil ? 'த' : 'En'}</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    checked={isTamil}
                    onChange={toggleLanguage}
                  />
                  <label
                    htmlFor="toggle"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <span className="text-sm">{isTamil ? 'En' : 'த'}</span>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-gray-100 text-black px-3 py-2 rounded text-sm"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="bg-blue-900 text-white py-6 md:py-4 lg:py-4">
            <div className="container mx-auto flex items-center justify-between px-4 lg:px-16">
              <div className="w-16 lg:w-24"></div>
              <h1 className="text-xs lg:text-base font-semibold text-center flex-grow px-2 lg:px-4 -ml-40">
                Bharat Scouts and Guides - பாரத சாரணியர் & வழிகாட்டுநர் மாநில தலைமையகம்
              </h1>
              <div className="flex items-center space-x-2 lg:space-x-4 mr-4 lg:mr-16">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="bg-white text-black px-3 py-1 rounded text-sm w-32 lg:w-48"
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                <div className="relative flex items-center">
  <input
    type="checkbox"
    id="languageToggle"
    className="hidden"
    checked={isTamil}
    onChange={toggleLanguage}
  />
  <label htmlFor="languageToggle" className="flex items-center cursor-pointer">
    <div className={`relative w-10 lg:w-12 h-5 lg:h-6 rounded-full bg-white border-2 border-gray-400 transition duration-300`}>
      <div className={`absolute w-4 lg:w-5 h-4 lg:h-5 rounded-full bg-red-500 shadow-md transition duration-300 transform ${isTamil ? 'translate-x-5 lg:translate-x-6' : 'translate-x-0.5 lg:translate-x-1'}`}></div>
    </div>
    <span className="ml-2 text-white text-xs lg:text-sm">{isTamil ? 'En' : 'த'}</span>
  </label>
</div>



              </div>
            </div>
          </div>

          <div className="bg-white text-black shadow-md py-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                <ul className="flex flex-wrap lg:justify-start items-center space-x-2 lg:space-x-4 mb-4 lg:mb-0 lg:ml-32">
                  <li className={`hover:underline cursor-pointer text-sm lg:text-base ${isTamil ? 'font-medium' : 'font-medium'} whitespace-nowrap`}>{t.whoWeAre}</li>
                  <li className="text-gray-400 hidden lg:block">/</li>
                  <li className={`hover:underline cursor-pointer text-sm lg:text-base ${isTamil ? 'font-medium' : 'font-medium'} whitespace-nowrap`}>{t.whatWeDo}</li>
                  <li className="text-gray-400 hidden lg:block">/</li>
                  <li className={`hover:underline cursor-pointer text-sm lg:text-base ${isTamil ? 'font-medium' : 'font-medium'} whitespace-nowrap`}>{t.whereWeWork}</li>
                  <li className="text-gray-400 hidden lg:block">/</li>
                  <li className={`hover:underline cursor-pointer text-sm lg:text-base ${isTamil ? 'font-medium' : 'font-medium'} whitespace-nowrap`}>{t.getInvolved}</li>
                  <li className="text-gray-400 hidden lg:block">/</li>
                  <li className={`hover:underline cursor-pointer text-sm lg:text-base ${isTamil ? 'font-medium' : 'font-medium'} whitespace-nowrap`}>{t.shop}</li>
                </ul>

                <div className="flex items-center space-x-4 lg:space-x-8 lg:mr-32">
                  <div className="flex flex-col items-center space-y-1">
                    <button className="flex flex-col items-center">
                      <img src="/Images/cash.png" alt="Donate" className="h-6 w-6 lg:h-8 lg:w-8" />
                      <span className={`text-xs ${isTamil ? 'font-medium' : 'font-bold'} hover:underline whitespace-nowrap`}>{t.donate}</span>
                    </button>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <button className="flex flex-col items-center">
                      <img src="/Images/cart.png" alt="Add to Cart" className="h-6 w-6 lg:h-8 lg:w-8" />
                      <span className={`text-xs ${isTamil ? 'font-medium' : 'font-bold'} hover:underline whitespace-nowrap`}>{t.cart}</span>
                    </button>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <button className="flex flex-col items-center">
                      <img src="/Images/login.png" alt="Login Page" className="h-6 w-6 lg:h-8 lg:w-8" />
                      <span className={`text-xs ${isTamil ? 'font-medium' : 'font-bold'} hover:underline whitespace-nowrap`}>{t.login}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-10 flex items-center">
            <img src="/Images/ScoutLogo.png" alt="Bharat Scouts and Guides Logo" className="h-16 w-16 lg:h-24 lg:w-24" />
          </div>
          <div className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-10 flex items-center">
            <img src="/Images/tn-logo.png" alt="TN Logo" className="h-16 w-16 lg:h-24 lg:w-24" />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;