import classNames from "classnames/bind";

import s from "./BtnStepper.module.scss";
const cx = classNames.bind(s);

export const BtnStepper = ({ className, secondary, onClick, children }) => {
  // const btnClass = secondary
  //   ? `${s.btn} ${s.btnSecondary} ${className}`
  //   : `${s.btn} ${className}`;

  const btnClass = cx({
    btn: true,
    btnSecondary: secondary,
    [className]: className ? true : false,
  });

  return (
    <button className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
};
