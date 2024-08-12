// src/LandingPage.js
import React from 'react';

const LandingPage = () => {
    return (
        <div className="h-screen"> 
            
            {/* Content */}
            <div className="flex flex-col items-center justify-center h-full text-center shadow-lg">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to Shortcut-Manager
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Your gateway to managing all your application shortcuts in one place.
                </p>
                <div className="flex space-x-4">
                    <a href="/application" className="bg-blue-400 hover:bg-blue-500 font-bold py-2 px-4 rounded">
                        Get Started
                    </a>
                    <button className="hidden bg-transparent border border-black hover:bg-black hover:text-white font-bold py-2 px-4 rounded">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
