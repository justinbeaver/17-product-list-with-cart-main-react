import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { useEffect } from "react";
import { Btn } from "@/components/Btn/Btn";

import OrderConfirmedSvg from "@/assets/images/icon-order-confirmed.svg?react";

import s from "./ConfirmedModal.module.scss";
const cx = classNames.bind(s);

const ProductItem = ({ imgThumbnail, name, price, count }) => {
  const itemCount = `${count}x`;
  const itemPrice = `@ $${price.toFixed(2)}`;
  const itemTotalPrice = `$${(price * count).toFixed(2)}`;

  return (
    <li key={name} className={s.item}>
      <div className={s.itemImgWrapper}>
        <img src={imgThumbnail} alt={name} />
      </div>
      <div className={s.itemBody}>
        <h3 className={s.itemName}>{name}</h3>
        <p>
          <span className={s.itemCount}>{itemCount}</span>
          <span className={s.itemPrice}>{itemPrice}</span>
        </p>
      </div>
      <p className={s.itemTotalPrice}>{itemTotalPrice}</p>
    </li>
  );
};

ProductItem.propTypes = {
  imgThumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export const ConfirmedModal = ({
  orderProducts,
  isShown,
  handleConfirmedModalToggle,
}) => {
  const overlayClass = cx({
    overlay: true,
    overlayActive: isShown,
  });

  const modalClass = cx({
    modal: true,
    modalActive: isShown,
  });

  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShown]);

  const totalPrice = orderProducts.reduce((accumulator, product) => {
    return accumulator + product.price * product.count;
  }, 0);

  return (
    <>
      <div className={overlayClass}></div>
      <section className={modalClass}>
        <OrderConfirmedSvg className={s.confirmedSvg} />
        <header>
          <h2 className={s.heading}>Order Confirmed</h2>
          <p className={s.subheading}>We hope you enjoy your food!</p>
        </header>
        <ul className={s.products}>
          {orderProducts.map((product) => (
            <ProductItem
              key={product.name}
              imgThumbnail={product.imgThumbnail}
              name={product.name}
              price={product.price}
              count={product.count}
            />
          ))}
        </ul>
        <p className={s.details}>
          <span>Order Total</span>
          <span className={s.totalPrice}>{`$${totalPrice.toFixed(2)}`}</span>
        </p>
        <Btn secondary onClick={handleConfirmedModalToggle}>
          Start New Order
        </Btn>
      </section>
    </>
  );
};

ConfirmedModal.propTypes = {
  orderProducts: PropTypes.arrayOf(
    PropTypes.shape({
      imgThumbnail: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  isShown: PropTypes.bool.isRequired,
  handleConfirmedModalToggle: PropTypes.func.isRequired,
};
