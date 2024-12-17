import { useState, useEffect } from "react";

import { ProductsGrid } from "@/components/ProductsGrid/ProductsGrid";
import { Cart } from "@/components/Cart/Cart";
import { ConfirmedModal } from "@/components/ConfirmedModal/ConfirmedModal";

import s from "./Page.module.scss";

export const Page = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState({});
  const [isConfirmedModalShown, setIsConfirmedModalShown] = useState(false);

  // Fetch products json and set products state
  useEffect(() => {
    const loadData = async () => {
      const url = "/data.json";
      const response = await fetch(url);
      const json = await response.json();
      setProducts(json);
    };
    loadData();
  }, []);

  const productsToGrid = products.map((product) => ({
    imgMobile: product.image.mobile,
    imgDesktop: product.image.desktop,
    title: product.name,
    category: product.category,
    price: product.price,
    count: cartProducts[product.name] || 0,
  }));

  const productsToCart = Object.keys(cartProducts).map((product) => {
    for (const item of products) {
      if (item.name === product) {
        return {
          name: product,
          price: item.price,
          count: cartProducts[product],
        };
      }
    }
  });

  const productsToConfirmedModal = productsToCart.map((product) => {
    for (const item of products) {
      if (item.name === product.name) {
        return { ...product, imgThumbnail: item.image.thumbnail };
      }
    }
  });

  const handleAddToCart = (product) => {
    setCartProducts((prev) => ({
      ...prev,
      [product]: prev[product] ? prev[product] + 1 : 1,
    }));
  };

  const handleSubtractFromCart = (product) => {
    setCartProducts((prev) => {
      const cart = { ...prev };
      if (cart[product] > 1) {
        cart[product] = cart[product] - 1;
      } else {
        delete cart[product];
      }
      return cart;
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartProducts((prev) => {
      const cart = { ...prev };
      delete cart[product];
      return cart;
    });
  };

  const handleConfirmedModalToggle = () => {
    setIsConfirmedModalShown((prev) => {
      if (prev) {
        setCartProducts({});
      }
      return !prev;
    });
  };

  return (
    <div className={s.page}>
      <ProductsGrid
        products={productsToGrid}
        handleAddToCart={handleAddToCart}
        handleSubtractFromCart={handleSubtractFromCart}
      />
      <Cart
        cartProducts={productsToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleConfirmedModalToggle={handleConfirmedModalToggle}
      />
      <ConfirmedModal
        isShown={isConfirmedModalShown}
        orderProducts={productsToConfirmedModal}
        handleConfirmedModalToggle={handleConfirmedModalToggle}
      />
    </div>
  );
};
