export const formatCurrency = (value, decimal = 2) => {
  if (isNaN(value)) {
    return value;
  }

  const options = {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  };

  return new Intl.NumberFormat("en-US", options).format(value);
}

/* EXAMPLE USAGE
import { formatCurrency } from "./utils/money";
const formattedValue = formatCurrency(1234.56); // "$1,234.56"
console.log(formattedValue);
*/