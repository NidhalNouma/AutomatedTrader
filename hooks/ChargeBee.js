import { useState, useContext, createContext } from "react";
import axios from "axios";

export function GetChargeBee() {
  const [chargeBee, setChargeBee] = useState(null);

  function openCheckout() {
    console.log("open", chargeBee);
    if (!chargeBee) return;

    // chargeBee.registerAgain();

    chargeBee.setCheckoutCallbacks(function (cart) {
      var product = cart.products[0];
      console.log(product.planId);
      console.log(product.addons);
      return {
        loaded: function () {
          console.log("checkout opened");
        },
        close: function () {
          console.log("checkout closed");
        },
        success: function (hostedPageId) {
          console.log(hostedPageId);
          // Hosted page id will be unique token for the checkout that happened
          // You can pass this hosted page id to your backend
          // and then call our retrieve hosted page api to get subscription details
          // https://apidocs.chargebee.com/docs/api/hosted_pages#retrieve_a_hosted_page
        },
        step: function (value) {
          // value -> which step in checkout
          console.log(value);
        },
      };
    });
    // https://automatedtrader-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Basic-Membership-USD-Monthly
    // https://automatedtrader-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Basic-Membership-USD-Monthly&subscription_items[quantity][0]=1

    let cart = chargeBee.getCart();

    const planPriceId = "Basic-Membership-USD-Monthly"; // Plan price point ID is used to identify the product
    const planPriceQuantity = 1;
    const product = chargeBee.initializeProduct(planPriceId, planPriceQuantity);
    cart.replaceProduct(product);

    cart.setCustomer({
      email: "vivek@chargebee.com",
      cf_test: "customer custom field",
      cf_date: "1991-09-16",
    });
    console.log("cart", cart);

    // Adding an addon
    // product.addAddon({
    //   id: "cbdemo_additional_analytics", // Addon price point ID
    //   quantity: 1,
    // });

    // Adding a coupon
    // product.addCoupon("fourty");

    // Dynamically changing Plan quantity using setPlanQuantity
    // product.setPlanQuantity(planPriceQuantity);

    // Removing Addons using removeAddon
    // product.removeAddon("silver-pass-USD-monthly"); // Addon price point ID

    // Passing values for custom fields
    // product.setCustomData({ referral: "yes", corporate_agent: "no" });

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

export function OpenCheckout(planPriceId, onSuccess, onFailure) {
  const chargeBee = window?.Chargebee?.getInstance();
  if (!chargeBee) return;
  console.log("open window", chargeBee);

  //   chargeBee.registerAgain();
  chargeBee.setCheckoutCallbacks(function (cart) {
    var product = cart.products[0];
    console.log(product.planId);
    console.log(product.addons);
    return {
      loaded: function () {
        console.log("checkout opened");
      },
      close: function () {
        console.log("checkout closed");
      },
      success: async function (hostedPageId) {
        console.log(hostedPageId);

        const r = await axios.get(
          `/api/chargebee/hostedPage?id=${hostedPageId}`
        );

        console.log(r);

        onSuccess(r.data);
        // Hosted page id will be unique token for the checkout that happened
        // You can pass this hosted page id to your backend
        // and then call our retrieve hosted page api to get subscription details
        // https://apidocs.chargebee.com/docs/api/hosted_pages#retrieve_a_hosted_page
      },
      step: function (value) {
        // value -> which step in checkout
        console.log(value);
      },
    };
  });

  let cart = chargeBee.getCart();

  const planPriceQuantity = 1;
  const product = chargeBee.initializeProduct(planPriceId, planPriceQuantity);
  cart.replaceProduct(product);

  //   cart.setCustomer({
  //     email: "vivek@chargebee.com",
  //     cf_test: "customer custom field",
  //     cf_date: "1991-09-16",
  //   });
  //   console.log("cart", cart);

  cart.proceedToCheckout();
}

// wJBVcBIWBcB1o33k5N5g6vH9DXZGm9tr
