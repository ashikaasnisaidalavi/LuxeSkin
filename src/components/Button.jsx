
// import { Link } from "react-router-dom";

// export default function Button({
//   children,
//   to,
//   onClick,
//   type = "button",
//   disabled = false,
//   className = "",
//   style,
//   ...rest
// }) {
//   const buttonClasses = `inline-flex items-center justify-center ${className}`;

//   if (to) {
//     return (
//       <Link
//         to={to}
//         className={buttonClasses}
//         style={style}
//         {...rest}
//       >
//         {children}
//       </Link>
//     );
//   }

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={buttonClasses}
//       style={style}
//       {...rest}
//     >
//       {children}
//     </button>
//   );
// }




import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  style,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold no-underline ${
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
  } ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        style={style}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
