import React, { useState, useEffect } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';
import { ShoppingCart, Eye, Star, Search, ChevronDown, Filter } from 'lucide-react';

const dummyProducts = [
  { id: 1, name: { en: 'Smartphone X', ta: 'ஸ்மார்ட்போன் X' }, price: 599.99, rating: 4.5, reviews: 120, inStock: true },
  { id: 2, name: { en: 'Laptop Pro', ta: 'லாப்டாப் ப்ரோ' }, price: 1299.99, rating: 4.8, reviews: 250, inStock: true },
  { id: 3, name: { en: 'Wireless Earbuds', ta: 'வயர்லெஸ் இயர்பட்ஸ்' }, price: 129.99, rating: 4.2, reviews: 180, inStock: true },
  { id: 4, name: { en: 'Smart Watch', ta: 'ஸ்மார்ட் வாட்ச்' }, price: 199.99, rating: 4.0, reviews: 150, inStock: true },
  { id: 5, name: { en: 'Digital Camera', ta: 'டிஜிட்டல் கேமரா' }, price: 449.99, rating: 4.6, reviews: 200, inStock: true },
  { id: 6, name: { en: 'Gaming Console', ta: 'கேமிங் கன்சோல்' }, price: 399.99, rating: 4.7, reviews: 300, inStock: true },
  { id: 7, name: { en: 'Bluetooth Speaker', ta: 'புளூடூத் ஸ்பீக்கர்' }, price: 79.99, rating: 4.1, reviews: 90, inStock: true },
  { id: 8, name: { en: 'Fitness Tracker', ta: 'ஃபிட்னெஸ் டிராக்கர்' }, price: 89.99, rating: 4.3, reviews: 110, inStock: true },
  { id: 9, name: { en: 'Tablet', ta: 'டேப்லெட்' }, price: 349.99, rating: 4.4, reviews: 160, inStock: true },
  { id: 10, name: { en: 'Smartwatch', ta: 'ஸ்மார்ட்வாட்ச்' }, price: 199.99, rating: 4.2, reviews: 140, inStock: true },
  { id: 11, name: { en: 'Wireless Mouse', ta: 'வயர்லெஸ் மவுஸ்' }, price: 29.99, rating: 4.0, reviews: 80, inStock: true },
  { id: 12, name: { en: 'External Hard Drive', ta: 'வெளிப்புற ஹார்ட் டிரைவ்' }, price: 89.99, rating: 4.5, reviews: 170, inStock: true },
  { id: 13, name: { en: 'Portable Charger', ta: 'போர்ட்டபிள் சார்ஜர்' }, price: 49.99, rating: 4.3, reviews: 130, inStock: true },
  { id: 14, name: { en: 'Smart Home Hub', ta: 'ஸ்மார்ட் ஹோம் ஹப்' }, price: 129.99, rating: 4.1, reviews: 100, inStock: true },
  { id: 15, name: { en: 'Wireless Keyboard', ta: 'வயர்லெஸ் கீபோர்ட்' }, price: 59.99, rating: 4.2, reviews: 95, inStock: true },

];


const Products = () => {
  const { isTamil } = useTranslation();
  const [products, setProducts] = useState(dummyProducts);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    let result = [...dummyProducts];
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name[isTamil ? 'ta' : 'en'].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch (sortBy) {
      case 'priceLowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setProducts(result);
  }, [searchTerm, sortBy, isTamil]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleAddToCart = (product) => {
    setSnackbarMessage(isTamil ? `${product.name.ta} கூடைக்கு சேர்க்கப்பட்டது` : `${product.name.en} added to cart`);
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 3000);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSeeMore = () => {
    setVisibleProducts(prevVisible => Math.min(prevVisible + 12, products.length));
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const translations = {
    en: {
      title: 'Discover Our Tech Treasures',
      search: 'Search for your next gadget...',
      sort: 'Sort by',
      popularity: 'Most Popular',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      rating: 'Highest Rated',
      addToCart: 'Add to Cart',
      seeMore: 'Explore More',
      reviews: 'reviews',
      viewProduct: 'Quick View',
      filters: 'Filters',
      close: 'Close',
    },
    ta: {
      title: 'எங்கள் தொழில்நுட்ப சொத்துகளை கண்டறியுங்கள்',
      search: 'உங்கள் அடுத்த சாதனத்தைத் தேடுங்கள்...',
      sort: 'வகைப்படுத்து',
      popularity: 'மிக பிரபலமானவை',
      priceLowToHigh: 'விலை: குறைவிலிருந்து அதிகம்',
      priceHighToLow: 'விலை: அதிகத்திலிருந்து குறைவு',
      rating: 'உயர்ந்த மதிப்பீடு',
      addToCart: ' வண்டியில் சேர்',
      seeMore: 'மேலும் கண்டறிய',
      reviews: 'விமர்சனங்கள்',
      viewProduct: 'விரைவில் காண்க',
      filters: 'வடிகள்',
      close: 'மூடு',
    }
 
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  return (
    <div className="bg-gray-100 min-h-screen">
  <div className="container mx-auto px-4 py-8 pt-40">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{t.title}</h1>
        
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          <div className="flex w-full md:w-1/3 space-x-2">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="popularity">{t.popularity}</option>
              <option value="priceLowToHigh">{t.priceLowToHigh}</option>
              <option value="priceHighToLow">{t.priceHighToLow}</option>
              <option value="rating">{t.rating}</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-1/3 p-3 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <Filter size={20} className="mr-2" />
              {t.filters}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            {/* Add filter options here */}
            <p>Filter options coming soon...</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, visibleProducts).map((product, index) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={mediaData.carouselImages[index % mediaData.carouselImages.length]}
                alt={product.name[isTamil ? 'ta' : 'en']}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2 text-gray-800">{product.name[isTamil ? 'ta' : 'en']}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2 text-sm">({product.reviews} {t.reviews})</span>
                </div>
                <p className="text-2xl font-bold mb-4 text-blue-600">₹{product.price.toFixed(2)}</p>
                <div className="flex justify-between space-x-2">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-2/3 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors duration-300"
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    {t.addToCart}
                  </button>
                  <button 
                    onClick={() => handleViewProduct(product)}
                    className="w-1/3 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center transition-colors duration-300"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleSeeMore}
              className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold transition-colors duration-300"
            >
              {t.seeMore}
            </button>
          </div>
        )}
      </div>

      {snackbarOpen && (
        <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded shadow-lg">
          {snackbarMessage}
        </div>
      )}


      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl max-h-90vh overflow-y-auto">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 pr-4">
                <img
                  src={mediaData.carouselImages[selectedImage]}
                  alt={selectedProduct.name[isTamil ? 'ta' : 'en']}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <div className="flex space-x-2 mb-4">
                  {mediaData.carouselImages.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-20 h-20 object-cover cursor-pointer rounded ${
                        selectedImage === index ? 'border-2 border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">{selectedProduct.name[isTamil ? 'ta' : 'en']}</h2>
                <p className="text-3xl font-bold text-blue-600 mb-4">₹{selectedProduct.price.toFixed(2)}</p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2 text-sm">({selectedProduct.reviews} {t.reviews})</span>
                </div>
                <p className="text-gray-700 mb-6">
                  {selectedProduct.description ? 
                    selectedProduct.description[isTamil ? 'ta' : 'en'] : 
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
                  >
                    {t.close}
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      closeModal();
                    }}
                    className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center transition-colors duration-300"
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    {t.addToCart}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;