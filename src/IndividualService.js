import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, ArrowLeft, MapPin } from "lucide-react";
import PlumberImg from "./assets/plu.png";
import ProfileImg from "./assets/profile.png";
import ShareIcon from "./assets/share.png";
import WhatsAppIcon from "./assets/whatsapp.png";

const reviews = [
  {
    id: 1,
    name: "Nisha Mann",
    date: "Sep 12, 2025",
    description:
      "Quick and professional-he fixed my leaking sink pipe in no time and left everything spotless.",
  },
  {
    id: 2,
    name: "Amit Sharma",
    date: "Oct 1, 2025",
    description:
      "Safe and precise setup of water inlet/outlet hoses for appliances or fixtures to prevent leaks and maintain steady flow.",
  },
  {
    id: 3,
    name: "Sonal Verma",
    date: "Oct 5, 2025",
    description: "Excellent service, punctual, and very clean work.",
  },
  {
    id: 4,
    name: "Ravi Kumar",
    date: "Oct 8, 2025",
    description: "Highly recommend for all emergencies.",
  },
];

export default function IndividualService() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // LandingPage se data receive karo
  const { businessData } = location.state || {};
  
  if (!businessData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No business data available</p>
          <button 
            onClick={() => navigate('/landing-page')}
            className="px-4 py-2 bg-orange-400 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { businessName, providerName, services, category } = businessData;

  return (
    <div className="min-h-screen bg-white flex flex-col relative pb-24">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white flex justify-between items-center px-5 py-4 shadow-md z-10">
        <ArrowLeft
          className="text-black cursor-pointer"
          size={24}
          onClick={() => navigate(-1)}
        />
        <img src={ShareIcon} alt="Share" className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="pt-16 px-4 space-y-6">
        {/* Business Card */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <img
            src={PlumberImg}
            alt={businessName}
            className="w-full h-48 rounded-xl object-cover mb-3"
          />

          <div className="flex items-center space-x-2 mb-2">
            <img src={ProfileImg} alt="Profile" className="w-6 h-6" />
            <h2 className="text-lg font-semibold text-black">
              {businessName}
            </h2>
          </div>

          <div className="flex items-center text-sm text-gray-600 space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-500 w-4 h-4 fill-yellow-500" />
              <span>4.5 (25 reviews)</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-pink-500" />
              <span>Warangal, Telangana</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 border border-blue-400 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                📞 <span>Call Now</span>
              </button>
              <button className="flex items-center space-x-2 border border-green-400 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
                <img src={WhatsAppIcon} alt="whatsapp" className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
            <button className="px-4 py-1.5 border-2 border-orange-400 text-black rounded-full font-medium hover:bg-orange-50">
              Book
            </button>
          </div>
        </div>

        {/* Services Section - Dynamic from API */}
        <div>
          <h1 className="text-xl font-bold text-black mb-4 px-1">Services</h1>

          <div className="space-y-5">
            {services.map((service) => (
              <div
                key={service.serviceId}
                className="flex justify-between items-start bg-white rounded-2xl shadow-md p-4"
              >
                <div className="flex flex-col space-y-2 flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-base font-semibold text-black">
                      {service.serviceName}
                    </h2>
                    <p className="font-bold text-orange-600 text-lg ml-3">₹{service.price}</p>
                  </div>
                  <p className="text-gray-600 text-sm pr-2">
                    Professional {service.serviceName.toLowerCase()} service provided by {providerName}. 
                    Quality work guaranteed with expert handling.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={PlumberImg}
                    alt={service.serviceName}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h1 className="text-xl font-bold text-black mb-4 px-1">Reviews</h1>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-md p-4"
              >
                {/* Name + Date + Rating */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-col">
                    <h2 className="text-base font-semibold text-black">
                      {review.name}
                    </h2>
                    <span className="text-gray-500 text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-black">4.3</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm">{review.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Information Section */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-semibold text-black mb-2">
            Quick Information
          </h2>
          <p className="text-gray-600 text-sm">
            {businessName} provides professional {category.toLowerCase()} solutions, 
            specializing in {services.map(s => s.serviceName.toLowerCase()).slice(0, 3).join(', ')}
            {services.length > 3 ? ' and more' : ''}
            {' '}for residential and commercial clients. Managed by {providerName}.
          </p>
        </div>
      </div>
    </div>
  );
}