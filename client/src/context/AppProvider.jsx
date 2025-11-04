import { io } from "socket.io-client";
import { AppContext } from "./AppContext";
import { backendURL, socketBackendURL } from "../constant";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Create socket once
    const newSocket = io(socketBackendURL, {
      transports: ["websocket"], // ensure WS transport
    });

    // Listen for notifications
    newSocket.on("productAddNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
      setUnreadCount((prev) => prev + 1);
      toast.success(notification.title || "New product added!");
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []); // run once

  // Add Products
  const addProduct = async (payload) => {
    const uploadProduct = await fetch(`${backendURL}/create_product`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const response = await uploadProduct.json();

    if (!response.success) {
      toast.error(response.message);
    }
  };
  // Fetch All Products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${backendURL}/product`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  // Delete Single Product
  const handleDelete = async (productId) => {
    const res = await fetch(`${backendURL}/product/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) {
      toast.error(data.message);
    }

    toast.success(data.message);
    window.location.href = "/";
  };
  // Product Details
  const productDetails = async (productId) => {
    const res = await fetch(`http://localhost:3000/api/product/${productId}`);
    const data = await res.json();
    setProduct(data.data);
    return data.data;
  };
  // Product Update
  const updateProduct = async (productId, payload) => {
    const uploadProduct = await fetch(
      `http://localhost:3000/api/product/${productId}`,
      {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }
    );

    const response = await uploadProduct.json();
    if (!response.success) {
      toast.error(response.message);
    }

    toast.success(response.message);
  };
  // Checkout
  const checkout = async (payload) => {
    const payment = await fetch(`http://localhost:3000/api/checkout`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json", // send JSON
      },
      method: "POST",
    });

    const checkoutURL = await payment.json();
    window.location.href = checkoutURL;
  };

  // ============================= Notifications ===========================
  const loadNotification = async () => {
    const res = await fetch(`${backendURL}/notifications`);
    const data = await res.json();
    setNotifications(data.data);
    setUnreadCount(data.data.length);
  };
  // Product Real-time notification

  useEffect(() => {
    fetchProducts();
    loadNotification();
  }, []);

  const value = {
    products,
    handleDelete,
    addProduct,
    product,
    productDetails,
    checkout,
    updateProduct,
    unreadCount,
    setUnreadCount,
    notifications,
    setNotifications,
  };

  return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
};
