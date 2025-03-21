
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HouseForm from '../components/HouseForm';
import PredictionResult from '../components/PredictionResult';
import FeatureImportance from '../components/FeatureImportance';
import { HouseData } from '../data/modelData';
import { predictPrice } from '../utils/prediction';

const Index: React.FC = () => {
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  const handleFormSubmit = (data: HouseData) => {
    const price = predictPrice(data);
    setPredictedPrice(price);
    
    // Scroll to results if on mobile
    if (window.innerWidth < 768) {
      const resultElement = document.getElementById('prediction-result');
      if (resultElement) {
        setTimeout(() => {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Header />
          
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <HouseForm onSubmit={handleFormSubmit} />
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              <div id="prediction-result">
                <PredictionResult price={predictedPrice} />
              </div>
              
              <FeatureImportance />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
