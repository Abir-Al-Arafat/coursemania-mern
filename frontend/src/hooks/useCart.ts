import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CartData {
  // Define the structure of your cart data
  // Adjust this according to the actual structure from your API
  data: {
    products: any[]; // Change any to the actual type of products
    total: number;
  };
}

interface ErrorResponse {
  success: boolean;
  message: string;
  data?: {
    total: number;
    // Add other properties as needed
  };
}

const useCart = (authId: string | null, token: string | null) => {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authId && token) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_BACKEND}/cart/${authId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json: CartData) => {
          setCart(json);
          setLoading(false);
        })
        .catch(() => {
          setCart(null);
          setLoading(false);
        });
    }
  }, [authId, token]);

  const addProductToCart = (productId: string) => {
    fetch(
      `${import.meta.env.VITE_BACKEND}/cart/add-product-to-cart/${authId}`,
      {
        method: "POST",
        body: JSON.stringify({ amount: 1, productId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json: CartData) => setCart(json))
      .catch(() => setCart(null));
  };

  const removeProductToCart = (productId: string) => {
    fetch(
      `${import.meta.env.VITE_BACKEND}/cart/add-product-to-cart/${authId}`,
      {
        method: "POST",
        body: JSON.stringify({ amount: 1, productId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json: CartData) => setCart(json))
      .catch(() => setCart(null));
  };

  const checkoutWithCart = (cartId: string) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND}/transactions/create/${authId}`, {
      method: "POST",
      body: JSON.stringify({ cartId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json: ErrorResponse) => {
        if (!json.success) {
          throw new Error(json.message);
        }
        setCart((prevState) => ({
          ...prevState!,
          data: {
            ...prevState?.data!,
            products: [],
            total: json.data?.total || 0,
          },
        }));
        toast.success(json.message);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
        setLoading(false);
      });
  };

  return {
    cart,
    setCart,
    addProductToCart,
    removeProductToCart,
    checkoutWithCart,
    loading,
  };
};

export default useCart;
