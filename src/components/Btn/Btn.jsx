import PropTypes from "prop-types";
import classNames from "classnames/bind";

import s from "./Btn.module.scss";
const cx = classNames.bind(s);

export const Btn = ({ className, secondary, onClick, children }) => {
  const btnClass = cx({
    btn: true,
    btnSecondary: secondary ? true : false,
    [className]: className ? true : false,
  });

  return (
    <button className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
};

Btn.propTypes = {
  secondary: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
