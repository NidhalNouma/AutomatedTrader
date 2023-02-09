import { useState, useContext, createContext } from "react";

export function GetChargeBee() {
  const [chargeBee, setChargeBee] = useState(null);

  function openCheckout() {
    if (!chargeBee) return;

    chargeBee.setCheckoutCallbacks(function (cart) {
      return {
        success: function (hpid) {
          console.log("success", hpid);
        },
      };
    });

    let cart = chargeBee.getCart();

    const planPriceId = "cbdemo_sample_plan"; // Plan price point ID is used to identify the product
    const planPriceQuantity = 1;
    const product = chargeBee.initializeProduct(planPriceId, planPriceQuantity);
    cart.replaceProduct(product);

    // Adding an addon
    product.addAddon({
      id: "cbdemo_additional_analytics", // Addon price point ID
      quantity: 1,
    });

    // Adding a coupon
    product.addCoupon("fourty");

    // Dynamically changing Plan quantity using setPlanQuantity
    product.setPlanQuantity(planPriceQuantity);

    // Removing Addons using removeAddon
    product.removeAddon("silver-pass-USD-monthly"); // Addon price point ID

    // Passing values for custom fields
    product.setCustomData({ referral: "yes", corporate_agent: "no" });

    // Opening the checkout
    cart.proceedToCheckout();
  }

  return { chargeBee, setChargeBee, openCheckout };
}

export const ChargeBeeC = createContext(null);

export const ChargeBeeCC = ({ children, value }) => {
  return <ChargeBeeC.Provider value={value}>{children}</ChargeBeeC.Provider>;
};

export const GetChargeBeeContext = () => useContext(ChargeBeeC);
