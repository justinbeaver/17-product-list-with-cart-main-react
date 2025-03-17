import { useState, useEffect, useMemo, useCallback } from "react";

import { ProductsGrid } from "@/components/ProductsGrid/ProductsGrid";
import { Cart } from "@/components/Cart/Cart";
import { ConfirmedModal } from "@/components/ConfirmedModal/ConfirmedModal";

import s from "./Page.module.scss";

export const Page = () => {
  const [products, setProducts] = useState({});
  const [productsOrdering, setProductsOrdering] = useState([]);
  const [cartProducts, setCartProducts] = useState({});
  const [isConfirmedModalShown, setIsConfirmedModalShown] = useState(false);

  // Fetch products json and set products state
  useEffect(() => {
    const loadData = async () => {
      const url = "17-product-list-with-cart-main-react/data.json";
      const response = await fetch(url);
      const json = await response.json();

      const productsMap = json.reduce((accumulator, product) => {
        accumulator[product.name] = product;
        return accumulator;
      }, {});
      setProducts(productsMap);

      const productsOrderingMap = json.map((product) => {
        return product.name;
      });
      setProductsOrdering(productsOrderingMap);
    };
    loadData();
  }, []);

  const productsToGrid = useMemo(
    () =>
      productsOrdering.map((productName) => {
        const product = products[productName];

        return {
          imgMobile: product.image.mobile,
          imgDesktop: product.image.desktop,
          title: productName,
          category: product.category,
          price: product.price,
          count: cartProducts[product.name] || 0,
        };
      }),
    [products, cartProducts, productsOrdering]
  );

  const productsToCart = useMemo(
    () =>
      Object.keys(cartProducts).map((productName) => ({
        name: productName,
        price: products[productName].price,
        count: cartProducts[productName],
      })),
    [products, cartProducts]
  );

  const productsToConfirmedModal = useMemo(
    () =>
      Object.keys(cartProducts).map((productName) => {
        const product = products[productName];

        return {
          imgThumbnail: product.image.thumbnail,
          name: productName,
          price: product.price,
          count: cartProducts[productName],
        };
      }),
    [products, cartProducts]
  );

  const handleAddToCart = useCallback((product) => {
    setCartProducts((prev) => ({
      ...prev,
      [product]: prev[product] ? prev[product] + 1 : 1,
    }));
  }, []);

  const handleSubtractFromCart = useCallback((product) => {
    setCartProducts((prev) => {
      const cart = { ...prev };
      if (cart[product] > 1) {
        cart[product] = cart[product] - 1;
      } else {
        delete cart[product];
      }
      return cart;
    });
  }, []);

  const handleRemoveFromCart = useCallback((product) => {
    setCartProducts((prev) => {
      const cart = { ...prev };
      delete cart[product];
      return cart;
    });
  }, []);

  const handleConfirmedModalToggle = useCallback(() => {
    setIsConfirmedModalShown((prev) => {
      if (prev) {
        setCartProducts({});
      }
      return !prev;
    });
  }, []);

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
