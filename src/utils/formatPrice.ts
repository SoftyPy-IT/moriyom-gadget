const formatPrice = (amount: number) => {
  const formattedPrice = Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    currencySign: "standard",
  }).format(amount);

  // Replace the currency code "BDT" with the Taka symbol "৳"
  return formattedPrice.replace("BDT", "৳").trim();
};

export default formatPrice;
