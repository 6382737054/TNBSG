import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import mediaData from '../MediaData.json';
import { Link } from 'react-router-dom';

// Add this import at the top of your file
import './TamilFont.css';

const ScoutHomepage = () => {
  const { isTamil } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({});
  const [showAllNews, setShowAllNews] = useState(false);

  const smoothScroll = useCallback((e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', smoothScroll));
    return () => links.forEach(link => link.removeEventListener('click', smoothScroll));
  }, [smoothScroll]);

  const translations = {
    title: {
      en: (
        <>
          Creating transformative learning <br />
          experiences for young people,<br />
          everywhere.
        </>
      ),
      ta: "எங்கும் இளைஞர்களுக்கான மாற்றமளிக்கும் கற்றல் அனுபவங்களை உருவாக்குகிறோம்."
    },
    learnMore: {
      en: "Scout Movement",
      ta: "சாரணர் இயக்கம்"
    },
    featuredStories: {
      en: "Featured Stories",
      ta: "சிறப்பு கதைகள்"
    },
    latestNews: {
      en: "Latest News",
      ta: "சமீபத்திய செய்திகள்"
    },
    watchScoutingStories: {
      en: "Watch Scouting Stories",
      ta: "சாரண கதைகளைப் பாருங்கள்"
    },
    newOrganization: {
      title: {
        en: "New Organization",
        ta: "புதிய அமைப்பு"
      },
      description: {
        en: "Scouting is the world's leading educational youth Movement empowering 57 million young people and volunteers to be active global citizens and agents of change in their communities.",
        ta: "சாரணம் உலகின் முன்னணி கல்வி இளைஞர் இயக்கமாகும், 57 மில்லியன் இளைஞர்கள் மற்றும் தொண்டர்களை செயல்பாட்டிற்காக உலகளாவிய குடிமக்களாகவும், தங்கள் சமூகங்களில் மாற்றங்களை செய்யும் ஏஜெண்ட்களாகவும் உருக்கொடுக்கிறது."
      }
    },
    featuredStoryTitles: {
      story1: {
        en: "World Scout Conference elects 12 voting members to the World Scout",
        ta: "உலகா சாரண மாநாடு உலக சாரணத்திற்கு 12 வாக்காளர் உறுப்பினர்களை தெரிவு செய்கிறது"
      },
      story2: {
        en: "2000 Scouts gather for the opening of the 43rd World Scout Conference",
        ta: "2000 சாரணர்கள் 43வது உலக சாரண மாநாட்டின் தொடக்கத்திற்கு கூடுகிறார்கள்"
      },
      story3: {
        en: "Ready for Life: Scouting's new brand welcomes in a new era",
        ta: "செயலுக்கு தயாராக: சாரணத்தின் புதிய பிராண்டு புதிய காலத்தைக் வரவேற்கிறது"
      }
    },
    newsDescription: {
      en: "Short description of news article",
      ta: "செய்தி கட்டுரையின் சுருக்கமான விளக்கம்"
    },
    seeAllNews: {
      en: "See All News",
      ta: "அனைத்து செய்திகளையும் காண்க"
    },
    videoDescription: {
      en: "Description of the scouting story video",
      ta: "சாரண கதை வீடியோவின் விளக்கம்"
    },
    readMore: {
      en: "Read more",
      ta: "மேலும் படிக்க"
    },
    readLess: {
      en: "Read less",
      ta: "குறைவாக படிக்க"
    }
  };

  const FadeInSection = ({ children }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };

  const toggleCardExpansion = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const newsCards = [
    ...mediaData.newsImages,
    ...mediaData.newsImages.slice(0, 3) // Add 3 more cards for "See All News"
  ].map((image, index) => (
    <FadeInSection key={index}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div className="relative pt-[75%]">
          <img
            src={image}
            alt={`Latest news ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
        <div className="p-6 flex-grow">
          <h3 className={`text-base md:text-lg font-bold mb-3 ${isTamil ? 'tamil-font' : ''}`}>
            {translations.newsDescription[isTamil ? 'ta' : 'en']}
          </h3>
          <p className={`text-sm md:text-base text-gray-600 mb-4 ${isTamil ? 'tamil-font' : ''}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            {expandedCards[index] && (
              <>
                <br /><br />
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </>
            )}
          </p>
          <button 
            onClick={() => toggleCardExpansion(index)} 
            className={`text-blue-600 hover:underline font-semibold ${isTamil ? 'tamil-font' : ''}`}
          >
            {expandedCards[index] 
              ? translations.readLess[isTamil ? 'ta' : 'en']
              : translations.readMore[isTamil ? 'ta' : 'en']}
          </button>
        </div>
      </div>
    </FadeInSection>
  ));

  return (
    <div className={`pt-20 md:pt-34 ${isTamil ? 'tamil-font' : ''}`}>
      {/* Hero Section */}
      <section className="bg-[#feeecf] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <FadeInSection>
                <h1 className={`font-bold mb-6 text-left leading-tight ${
                  isTamil 
                    ? 'text-2xl md:text-3xl lg:text-4xl tamil-hero-title' 
                    : 'text-3xl md:text-4xl lg:text-5xl'
                }`}>
                  {isTamil ? translations.title.ta : translations.title.en}
                </h1>
                <Link to="/whoweare">
                  <button className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
                    isTamil ? 'text-base' : 'text-lg'
                  }`}>
                    {translations.learnMore[isTamil ? 'ta' : 'en']}
                  </button>
                </Link>
              </FadeInSection>
            </div>
            <div className="md:w-1/2">
              <FadeInSection>
                <Carousel 
                  autoPlay 
                  infiniteLoop 
                  interval={5000} 
                  showThumbs={false} 
                  showStatus={false} 
                  transitionTime={1000}
                  className="rounded-lg shadow-2xl overflow-hidden"
                >
                  {mediaData.carouselImages.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`Scouts marching ${index + 1}`} className="w-full h-auto object-cover" />
                    </div>
                  ))}
                </Carousel>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="container mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isTamil ? translations.featuredStories.ta : translations.featuredStories.en}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaData.featuredStories.map((image, index) => (
              <FadeInSection key={index}>
                <div className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${index === 0 ? 'bg-green-300' : index === 1 ? 'bg-blue-300' : 'bg-orange-300'}`}>
                  <img
                    src={image}
                    alt={`Featured story ${index + 1}`}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                  <div className="p-6">
                    <p className="text-base md:text-lg text-white font-bold text-center">
                      {isTamil ? translations.featuredStoryTitles[`story${index + 1}`].ta : translations.featuredStoryTitles[`story${index + 1}`].en}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
              {isTamil ? translations.latestNews.ta : translations.latestNews.en}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsCards.slice(0, showAllNews ? 6 : 3)}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAllNews(!showAllNews)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
            >
              {showAllNews 
                ? (isTamil ? "Show Less" : "Show Less") 
                : translations.seeAllNews[isTamil ? 'ta' : 'en']}
            </button>
          </div>
        </div>
      </section>

      {/* Scouting Stories Video Section */}
      <section className="py-16 px-4 sm:px-9 bg-white">
        <div className="container mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isTamil ? translations.watchScoutingStories.ta : translations.watchScoutingStories.en}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <FadeInSection key={index}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-w-16 aspect-h-9">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      poster={`/api/placeholder/640/360?text=Video ${index}`}
                    >
                     <source src={mediaData.whoWeAre.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4 bg-gray-100">
                    <p className="font-semibold text-sm">
                      {translations.videoDescription[isTamil ? 'ta' : 'en']} {index}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScoutHomepage;