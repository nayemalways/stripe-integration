import { useContext, useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { Link } from 'react-router-dom'
import { AppContext } from "../context/AppContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {unreadCount, notifications } = useContext(AppContext);

  // Handle Click outsid of Dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifications]);


  return (
    <header className="bg-pink-600 text-white py-4 shadow">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          Stripe Ecommerce
        </a>
        <nav className="flex gap-3">
          <div className="relative" ref={dropdownRef} title="Notification">
            {/* Bell Icon */}
            <div
              onClick={() => setOpen(!open)}
              className="relative cursor-pointer p-2 rounded-full"
            >
              <Bell className="text-2xl" />
              {unreadCount > 0 && (
                <p className="flex justify-center items-center absolute w-6 h-6 -top-2 -right-2 rounded-full bg-teal-600">
                  {" "}
                  {unreadCount}{" "}
                </p>
              )}
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <div className="p-3 border-b border-gray-200 font-semibold text-gray-700">
                  Notifications
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.reverse().map((n, i) => (
                      <Link key={i} to={`/product/${n?.productId}`}>
                        <div
                          
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                        >
                          <h6 className="font-bold text-pink-700">
                            {n?.title}
                          </h6>
                          <p className="text-slate-600 text-md">
                            {n?.description}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No new notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <ul className="flex gap-4">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/add-product" className="hover:underline">
                Add Product
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
