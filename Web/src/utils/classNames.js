export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
}
// Usage example
// import { classNames } from './utils/classNames';
//
// const buttonClass = classNames(
//   'btn',
//   'btn-primary',
//   isActive && 'active',
//   isDisabled ? 'disabled' : 'enabled'
// );
// console.log(buttonClass); // Output: "btn btn-primary active enabled"