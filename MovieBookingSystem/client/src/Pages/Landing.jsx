import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const features = [
    {
      title: "Easy Booking",
      description: "Book tickets in just a few clicks",
      icon: "🎫"
    },
    {
      title: "Multiple Platforms",
      description: "Access via desktop, mobile, or theater kiosk",
      icon: "📱"
    },
    {
      title: "Secure Payment",
      description: "Safe and reliable payment processing",
      icon: "🔒"
    },
    {
      title: "Real-time Seats",
      description: "View available seats in real-time",
      icon: "💺"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white">

      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center ">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1489599809505-7c8e1c75fd6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'
          }}
        ></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Ultimate
            <span className="block bg-gradient-to-r from-red-700 to-orange-600/20 bg-clip-text text-transparent">
              Movie Experience
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Book tickets, choose your seats, and enjoy the show with MoBook - 
            the modern movie booking system for today's cinemas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-lg font-semibold"
               onClick={() => navigate("/Movies")}>
              Book Tickets Now
            </button>
            <button className="px-8 py-4 border border-gray-600 rounded-lg hover:border-red-500 transition-colors text-lg font-semibold">
              My Tickets
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose MoBook?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Experience seamless movie booking with our advanced features designed for both customers and theater staff.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 flex ">
            <div className='text-left'>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-4">
                MoBook
              </h3>
              <p className="text-gray-400">
                Your ultimate movie booking experience
              </p>
            </div>
            
            <div className='text-right'>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#movies" className="hover:text-red-500 transition-colors">Movies</a></li>
                <li><a href="#features" className="hover:text-red-500 transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-red-500 transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-red-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className='text-right'>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div className='text-right'>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@mobook.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Cinema Street, Movie City</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MoBook Movie Booking System. All rights reserved.</p>
            <p className="mt-2 text-sm">Developed by: Lance Timothy B. Satorre, Euwen Aldrich D. Villarin, Yvone Bardon, Neri Sergio</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;