export const pricingList = {
  monthly: {
    "Basic plan": {
      chargeBeeId: "Basic-Membership-USD-Monthly",
      sellixId: "6707b53215941",
      price: 39,
      save: 0,

      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,
      discord: false,
      shareAlerts: false,
      alerts: 10,
      more: false,
    },
    "Standard plan": {
      chargeBeeId: "Standard-Membership-USD-Monthly",
      sellixId: "67085d40562af",
      price: 59,
      save: 0,

      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,
      discord: false,
      shareAlerts: false,
      alerts: 40,
      more: false,
    },
    "Professional plan": {
      chargeBeeId: "Professional-Membership-USD-Monthly",
      sellixId: "67085e861084f",
      price: 99,
      save: 0,

      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,
      discord: true,
      shareAlerts: false,
      alerts: 80,
      more: false,
    },
    "Premium plan": {
      chargeBeeId: "Premium-Membership-USD-Monthly",
      sellixId: "67086044ac1da",
      advancedWebhook: true,
      price: 159,
      save: 0,

      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,
      discord: true,
      shareAlerts: true,
      more: true,
      alerts: 200,
      manualTrade: true,
      standout: true,
    },
  },
  annual: {
    "Basic plan": {
      chargeBeeId: "Basic-Membership-USD-Yearly",
      sellixId: "670833a596674",
      price: 259,
      save: 30,

      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,
      discord: false,
      shareAlerts: false,
      alerts: 10,
      more: false,
    },
    "Standard plan": {
      chargeBeeId: "Standard-Membership-USD-Yearly",
      sellixId: "67085dbe71780",
      price: 459,
      save: 30,

      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,
      discord: false,
      shareAlerts: false,
      alerts: 40,
      more: false,
    },
    "Professional plan": {
      chargeBeeId: "Professional-Membership-USD-Yearly",
      sellixId: "67085f3ddadda",
      price: 699,
      save: 40,

      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,

      discord: true,
      shareAlerts: false,
      more: false,
      alerts: 80,
      manualTrade: true,
    },
    "Premium plan": {
      chargeBeeId: "Premium-Membership-USD-Yearly",
      sellixId: "670860a9a22db",
      advancedWebhook: true,
      price: 949,
      save: 50,

      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,

      discord: true,
      shareAlerts: true,
      more: true,
      alerts: 200,
      manualTrade: true,
      standout: true,
    },
  },
  lifetime: {
    "Lifetime access": {
      chargeBeeId: "Life-Time-Membership",
      sellixId: "6707a48ed0c13",

      advancedWebhook: true,
      price: 3750,
      save: 25,
      metatrader: 1,
      binance: 3,
      webhooks: 100,
      telegram: 5,
      discord: true,
      shareAlerts: true,
      more: true,
      alerts: 500,
      manualTrade: true,
      presets: 10,
      standout: true,
    },
  },
};

export function getPlanById(subscription, isLifetime, isTSlifetime = false) {
  if (isLifetime) {
    const bb = pricingList.lifetime["Lifetime access"];
    return { ...bb, name: "Lifetime access", no: 0, time: "lifetime" };
  } else if (isTSlifetime) {
    const bb = pricingList.annual["Basic plan"];
    return { ...bb, name: "Basic plan", no: 0, time: "yearly" };
  }

  let r = null;
  let id = null;

  if (!subscription) return r;

  id = subscription;

  // if (subscription.subscription_items?.length > 0) {
  //   id = subscription?.subscription_items[0].item_price_id;
  // }

  // if (!id) return r;
  // if (subscription.status !== "active") return r;

  // console.log(subscription, id);

  const m = pricingList.monthly;

  const keys = Object.keys(m);
  for (let i = 0; i < keys.length; i++) {
    const data = m[keys[i]];
    if (id === data.chargeBeeId || id === data.sellixId) {
      r = { ...data, planName: keys[i], name: keys[i], no: i, time: "mo" };
    }
  }

  const y = pricingList.annual;

  const keyy = Object.keys(y);
  for (let i = 0; i < keyy.length; i++) {
    const data = y[keyy[i]];
    if (id === data.chargeBeeId || id === data.sellixId) {
      r = { ...data, planName: keyy[i], name: keyy[i], no: i, time: "yearly" };
    }
  }

  if (
    id === pricingList.lifetime["Lifetime access"].chargeBeeId ||
    id === pricingList.lifetime["Lifetime access"].sellixId
  ) {
    r = {
      ...pricingList.lifetime["Lifetime access"],

      planName: "Lifetime access",
      name: "Lifetime",
      no: 0,
      time: "lifetime",
    };
  }

  return r;
}
