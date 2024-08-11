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
