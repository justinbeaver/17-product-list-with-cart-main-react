import PropTypes from "prop-types";
import { useMemo } from "react";

import { Btn } from "@/components/Btn/Btn";
import { BtnStepper } from "@/components/BtnStepper/BtnStepper";

import EmptyCartSvg from "@/assets/images/illustration-empty-cart.svg?react";
import IconRemoveItemSvg from "@/assets/images/icon-remove-item.svg?react";
import CarbonNeutralSvg from "@/assets/images/icon-carbon-neutral.svg?react";

import s from "./Cart.module.scss";

export const Cart = ({
  cartProducts,
  handleRemoveFromCart,
  handleConfirmedModalToggle,
}) => {
  const { productsCount, totalPrice } = useMemo(() => {
    let productsCount = 0;
    let totalPrice = 0;

    for (const product of cartProducts) {
      productsCount += product.count;
      totalPrice += product.price * product.count;
    }

    return { productsCount, totalPrice };
  }, [cartProducts]);

  const emptyCart = () => {
    return (
      <div className={s.emptyCart}>
        <EmptyCartSvg />
        <p>Your added items will appear here</p>
      </div>
    );
  };

  const fullCart = () => {
    const products = cartProducts.map((product) => {
      const price = `$${product.price.toFixed(2)}`;
      const totalProductPrice = `$${(product.price * product.count).toFixed(
        2
      )}`;
      return (
        <li key={product.name} className={s.item}>
          <h3 className={s.itemTitle}>{product.name}</h3>
          <div className={s.itemDetails}>
            <p className={s.itemAmount}>{product.count}x</p>
            <p className={s.itemPrice}>@{price}</p>
            <p className={s.itemTotalPrice}>{totalProductPrice}</p>
          </div>
          <BtnStepper
            secondary
            className={s.removeBtn}
            onClick={() => {
              handleRemoveFromCart(product.name);
            }}
          >
            <IconRemoveItemSvg />
          </BtnStepper>
        </li>
      );
    });

    return (
      <div className={s.filledCart}>
        <ul>{products}</ul>
        <p className={s.orderTotal}>
          <span>Order Total</span>
          <span className={s.totalPrice}>{`$${totalPrice.toFixed(2)}`}</span>
        </p>
        <div className={s.carbonNeutral}>
          <CarbonNeutralSvg />
          <p>
            This is a <span className="semi-bold">carbon-neutral</span> delivery
          </p>
        </div>
        <Btn secondary onClick={handleConfirmedModalToggle}>
          Confirm Order
        </Btn>
      </div>
    );
  };

  return (
    <div className={s.cart}>
      <h2 className={s.title}>Your Cart ({productsCount})</h2>
      {productsCount ? fullCart() : emptyCart()}
    </div>
  );
};

Cart.propTypes = {
  cartProducts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  handleConfirmedModalToggle: PropTypes.func.isRequired,
};
