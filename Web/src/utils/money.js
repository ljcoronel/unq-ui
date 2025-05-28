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
};
