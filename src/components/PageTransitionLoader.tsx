import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bodyCheckLogoDark } from '../assets/images';

export const PageTransitionLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    // Show loader for 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white  z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <img 
            src={bodyCheckLogoDark} 
            alt="BodyCheck" 
            className="animate-pulse"
          />
        </div>
        {/* <p className="text-xl font-bold text-gray-800 animate-pulse">
          Loading...
        </p> */}
      </div>
    </div>
  );
}; 