import React from 'react';

const Footer = () => {
    return (
        <div>
           {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-auto">
                <div className="container mx-auto px-4 text-center">
                &copy; {new Date().getFullYear()} My Shop. All rights reserved.
                </div>
            </footer> 
        </div>
    );
};

export default Footer;