import PropTypes from "prop-types";

import { ProductCard } from "../ProductCard/ProductCard";

import s from "./ProductsGrid.module.scss";

export const ProductsGrid = ({
  products,
  handleAddToCart,
  handleSubtractFromCart,
}) => {
  const cards = products.map((product) => {
    return (
      <ProductCard
        key={product.title}
        imgMobile={product.imgMobile}
        imgDesktop={product.imgDesktop}
        title={product.title}
        category={product.category}
        price={product.price}
        count={product.count}
        handleAddToCart={() => handleAddToCart(product.title)}
        handleSubtractFromCart={() => handleSubtractFromCart(product.title)}
      />
    );
  });

  return (
    <section>
      <h1 className={s.title}>Deserts</h1>
      <div className={s.productsGrid}>{cards}</div>
    </section>
  );
};

ProductsGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      imgMobile: PropTypes.string.isRequired,
      imgDesktop: PropTypes.string,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleSubtractFromCart: PropTypes.func.isRequired,
};
