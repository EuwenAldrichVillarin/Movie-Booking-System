import React, { useState, useRef, useEffect } from 'react';

const BookingMovie = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);

  const movies = [
    {
      id: 1,
      title: "Altered",
      genre: "Science Fiction, Action",
      duration: "132m",
      rating: "R-5",
      image: "/assets/Movies/altered.jpg",
      description: "In an alternate present, genetically enhanced humans dominate society. Outcasts Leon and Chloe fight for justice against corrupt politicians exploiting genetic disparity, risking everything to challenge the oppressive system."
    },
    {
      id: 2,
      title: "Avengers: Endgame",
      genre: "Adventure, Science Fiction, Action",
      duration: "153m",
      rating: "R-5",
      image: "/assets/Movies/avengers-endgame.jpg",
      description: "After Thanos, devastating snap leaves the universe in ruins, the remaining Avengers reunite to undo his actions and restore balance—no matter the cost."
    },
    {
      id: 3,
      title: "Frankenstein",
      genre: "Drama, Horror, Science Fiction",
      duration: "125m",
      rating: "R-5",
      image: "/assets/Movies/frankenstein.jpg",
      description: "Dr. Victor Frankenstein, a brilliant but egotistical scientist, brings a creature to life in a monstrous experiment that ultimately leads to the undoing of both the creator and his tragic creation."
    },
    {
      id: 4,
      title: "In Your Dreams",
      genre: "Comedy, Adventure, Animation, Fantasy, Family",
      duration: "81m",
      rating: "R-5",
      image: "/assets/Movies/in-your-dreams.jpg",
      description: "Stevie and her little brother Elliot journey into the wildly absurd landscape of their own dreams to ask the Sandman to grant them the perfect family."
    },
    {
      id: 5,
      title: "War of the Worlds",
      genre: "Science Fiction, Thriller",
      duration: "145m",
      rating: "R-5",
      image: "/assets/Movies/war-of-the-worlds.jpg",
      description: "Will Radford, a top Homeland Security cyber-analyst, uncovers a mysterious attack that makes him question whether the government is hiding the truth from him—and the world."
    },
    {
      id: 6,
      title: "Wicked: For Good",
      genre: "Romance, Fantasy, Adventure",
      duration: "137m",
      rating: "R-5",
      image: "/assets/Movies/wicked-for-good.jpg",
      description: "As an angry mob rises against the Wicked Witch, Glinda and Elphaba will need to come together one final time. With their singular friendship now the fulcrum of their futures, they will need to truly see each other, with honesty and empathy, if they are to change themselves, and all of Oz, for good."
    }
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Determine swipe direction with lower threshold for easier swiping
    if (Math.abs(dragOffset) > 30) {
      if (dragOffset > 0) {
        // Swipe right - go to previous
        setCurrentIndex(prev => (prev - 1 + movies.length) % movies.length);
      } else {
        // Swipe left - go to next
        setCurrentIndex(prev => (prev + 1) % movies.length);
      }
    }
    
    setDragOffset(0);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = handleMouseUp;

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % movies.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + movies.length) % movies.length);
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 10000);
    return () => clearInterval(interval);
  }, []);

  const getMoviePosition = (index) => {
    const totalMovies = movies.length;
    const relativeIndex = (index - currentIndex + totalMovies) % totalMovies;
    
    // Calculate position and scale based on distance from center
    let position = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 0;

    switch (relativeIndex) {
      case 0: // Current
        position = 0;
        scale = 1;
        opacity = 1;
        zIndex = 30;
        break;
      case 1: // Next
        position = 80;
        scale = 0.85;
        opacity = 0.8;
        zIndex = 20;
        break;
      case totalMovies - 1: // Previous
        position = -80;
        scale = 0.85;
        opacity = 0.8;
        zIndex = 20;
        break;
      case 2: // Far next
        position = 160;
        scale = 0.7;
        opacity = 0.6;
        zIndex = 10;
        break;
      case totalMovies - 2: // Far previous
        position = -160;
        scale = 0.7;
        opacity = 0.6;
        zIndex = 10;
        break;
      default: // Hidden
        position = relativeIndex > totalMovies / 2 ? 200 : -200;
        scale = 0.5;
        opacity = 0;
        zIndex = 0;
        break;
    }

    // Apply drag offset for smooth dragging - convert pixel drag to percentage movement
    const dragPercentage = (dragOffset / window.innerWidth) * 150;
    const finalPosition = position + dragPercentage;

    return {
      transform: `translateX(${finalPosition}%) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? 'opacity 0.3s, z-index 0s' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-black flex items-center justify-center via-[#1a0000] to-red-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Now Showing
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Drag left or right to explore our latest movies
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-96 mb-12">
          <div 
            ref={carouselRef}
            className="relative w-full h-full flex items-center justify-center overflow-visible"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none'
            }}
          >
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 z-40 p-3 bg-gray-800/80 rounded-full hover:bg-red-600 transition-colors"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 z-40 p-3 bg-gray-800/80 rounded-full hover:bg-red-600 transition-colors"
            >
              →
            </button>

            {/* Movies */}
            {movies.map((movie, index) => (
              <div
                key={`${movie.id}-${index}`}
                className="absolute will-change-transform"
                style={getMoviePosition(index)}
              >
                <div className="w-64 bg-gray-800/70 rounded-xl overflow-hidden text-left border border-gray-700 shadow-2xl pointer-events-none select-none">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  <div className="p-4 pointer-events-auto">
                    <h3 className="text-lg font-semibold mb-2 truncate">{movie.title}</h3>
                    <div className="flex justify-between text-gray-400 text-sm mb-2">
                      <span>{movie.genre}</span>
                      <span>{movie.duration}</span>
                    </div>
                    <p className="text-gray-300 text-xs line-clamp-2 mb-3">
                      {movie.description}
                    </p>
                    {/* <button className="w-full py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                      Book Tickets
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Movie Details for Current Selection */}
       <div className="max-w-4xl mx-auto bg-gray-800/30 rounded-xl text-left p-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img 
                src={movies[currentIndex].image} 
                alt={movies[currentIndex].title}
                className="w-full h-90 object-cover rounded-xl shadow-2xl"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-4">{movies[currentIndex].title}</h2>
              <div className="flex text-gray-400 mb-4 flex-col">
                <span><span>Genre: </span>{movies[currentIndex].genre}</span>
                <span><span>Duration: </span>{movies[currentIndex].duration}</span>
                <span><span>Rating: </span>{movies[currentIndex].rating}</span>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {movies[currentIndex].description}
              </p>
              <div className="flex gap-4 w-full">
                <button className="w-full md:w-auto px-8 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-red-600 scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingMovie;