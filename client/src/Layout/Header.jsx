import React from 'react';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white py-4 shadow">
            <div className="container mx-auto px-4 flex justify-between items-center">
            <a href='/' className="text-2xl font-bold">My Shop</a>
            <nav>
                <ul className="flex gap-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/add-product" className="hover:underline">Add Product</a></li>
                </ul>
            </nav>
            </div>
      </header>
    );
};

export default Header;