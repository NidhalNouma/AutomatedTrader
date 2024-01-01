export const pricingList = {
  monthly: {
    "Basic plan": {
      chargeBeeId: "Basic-Membership-USD-Monthly",
      price: 29,
      save: 0,
      accounts: 1,
      webhooks: 1,
      telegram: true,
      discord: false,
      shareAlerts: false,
      alerts: 10,
      more: false,
    },
    "Standard plan": {
      chargeBeeId: "Standard-Membership-USD-Monthly",
      price: 49,
      save: 0,
      accounts: 2,
      webhooks: 3,
      telegram: true,
      discord: false,
      shareAlerts: false,
      alerts: 40,
      more: false,
    },
    "Professional plan": {
      chargeBeeId: "Professional-Membership-USD-Monthly",
      price: 99,
      save: 0,
      accounts: 3,
      webhooks: 5,
      telegram: true,
      discord: true,
      shareAlerts: false,
      alerts: 80,
      more: false,
    },
    "Premium plan": {
      chargeBeeId: "Premium-Membership-USD-Monthly",
      advancedWebhook: true,
      price: 159,
      save: 0,
      accounts: 4,
      webhooks: 40,
      telegram: true,
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
      price: 243,
      save: 30,
      accounts: 1,
      webhooks: 1,
      telegram: true,
      discord: false,
      shareAlerts: false,
      alerts: 10,
      more: false,
    },
    "Standard plan": {
      chargeBeeId: "Standard-Membership-USD-Yearly",
      price: 411,
      save: 30,
      accounts: 2,
      webhooks: 3,
      telegram: true,
      discord: false,
      shareAlerts: false,
      alerts: 40,
      more: false,
    },
    "Professional plan": {
      chargeBeeId: "Professional-Membership-USD-Yearly",
      price: 712,
      save: 40,
      accounts: 3,
      webhooks: 5,
      telegram: true,
      discord: true,
      shareAlerts: false,
      more: false,
      alerts: 80,
      manualTrade: true,
    },
    "Premium plan": {
      chargeBeeId: "Premium-Membership-USD-Yearly",
      advancedWebhook: true,
      price: 954,
      save: 50,
      accounts: 4,
      webhooks: 40,
      telegram: true,
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
      advancedWebhook: true,
      price: 1999,
      save: 60.02,
      accounts: 5,
      webhooks: 100,
      telegram: true,
      discord: true,
      shareAlerts: true,
      more: true,
      alerts: 500,
      manualTrade: true,
      standout: true,
    },
  },
};

export function getPlanById(subscription, isTSlifetime = false) {
  if (isTSlifetime) {
    const bb = pricingList.annual["Basic plan"];
    return { ...bb, name: "Basic plan", no: 0, time: "yearly" };
  }

  let r = null;
  let id = null;

  if (!subscription) return r;

  if (subscription.subscription_items?.length > 0) {
    id = subscription?.subscription_items[0].item_price_id;
  }

  if (!id) return r;
  if (subscription.status !== "active") return r;

  // console.log(subscription, id);

  const m = pricingList.monthly;

  const keys = Object.keys(m);
  for (let i = 0; i < keys.length; i++) {
    const data = m[keys[i]];
    if (id === data.chargeBeeId) {
      r = { ...data, name: keys[i], no: i, time: "mo" };
    }
  }

  const y = pricingList.annual;

  const keyy = Object.keys(y);
  for (let i = 0; i < keyy.length; i++) {
    const data = y[keyy[i]];
    if (id === data.chargeBeeId) {
      r = { ...data, name: keyy[i], no: i, time: "yearly" };
    }
  }

  if (id === pricingList.lifetime["Lifetime access"].chargeBeeId) {
    r = {
      ...pricingList.lifetime["Lifetime access"],
      name: "Lifetime",
      no: 0,
      time: "lifetime",
    };
  }

  return r;
}
