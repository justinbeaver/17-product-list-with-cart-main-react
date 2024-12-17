import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Btn } from "@/components/Btn/Btn";
import { BtnStepper } from "@/components/BtnStepper/BtnStepper";

import AddToCartSvg from "@/assets/images/icon-add-to-cart.svg?react";
import IncrementSvg from "@/assets/images/icon-increment-quantity.svg?react";
import DecrementSvg from "@/assets/images/icon-decrement-quantity.svg?react";

import breakpoints from "@/styles/0_settings/_breakpoints.module.scss";
import s from "./ProductCard.module.scss";
const cx = classNames.bind(s);

export const ProductCard = ({
  imgMobile,
  imgDesktop,
  title,
  category,
  price,
  count,
  handleAddToCart,
  handleSubtractFromCart,
}) => {
  const cardClass = cx({
    card: true,
    cardActive: count,
  });

  const inCart = () => {
    return (
      <div className={`${s.stepperBlock} ${s.positioning}`}>
        <BtnStepper onClick={handleSubtractFromCart}>
          <DecrementSvg />
        </BtnStepper>
        <span>{count}</span>
        <BtnStepper onClick={handleAddToCart}>
          <IncrementSvg />
        </BtnStepper>
      </div>
    );
  };

  const notInCart = () => {
    return (
      <Btn className={s.positioning} onClick={handleAddToCart}>
        <AddToCartSvg />
        <span>Add to Cart</span>
      </Btn>
    );
  };

  return (
    <article className={cardClass}>
      <header className={s.header}>
        <picture>
          <source
            srcSet={imgDesktop}
            media={`(min-width: ${breakpoints.desktop})`}
          />
          <img className={s.img} src={imgMobile} alt={title} />
        </picture>
        {count ? inCart() : notInCart()}
      </header>
      <div className={s.body}>
        <p className={s.category}>{category}</p>
        <h2 className={s.title}>{title}</h2>
        <p className={s.price}>{`$${price.toFixed(2)}`}</p>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  imgMobile: PropTypes.string.isRequired,
  imgDesktop: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleSubtractFromCart: PropTypes.func.isRequired,
};
