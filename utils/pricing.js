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
      more: false,
    },
    "Standard plan": {
      chargeBeeId: "Standard-Membership-USD-Monthly",
      price: 49,
      save: 0,
      accounts: 3,
      webhooks: 3,
      telegram: true,
      discord: false,
      shareAlerts: false,
      more: false,
    },
    "Professional plan": {
      chargeBeeId: "Professional-Membership-USD-Monthly",
      price: 99,
      save: 0,
      accounts: 5,
      webhooks: 5,
      telegram: true,
      discord: true,
      shareAlerts: false,
      more: false,
    },
    "Premium plan": {
      chargeBeeId: "Premium-Membership-USD-Monthly",
      price: 159,
      save: 0,
      accounts: 20,
      webhooks: 40,
      telegram: true,
      discord: true,
      shareAlerts: true,
      more: true,
      manualTrade: true,
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
      more: false,
    },
    "Standard plan": {
      chargeBeeId: "Standard-Membership-USD-Yearly",
      price: 411,
      save: 30,
      accounts: 3,
      webhooks: 3,
      telegram: true,
      discord: false,
      shareAlerts: false,
      more: false,
    },
    "Professional plan": {
      chargeBeeId: "Professional-Membership-USD-Yearly",
      price: 712,
      save: 40,
      accounts: 5,
      webhooks: 5,
      telegram: true,
      discord: true,
      shareAlerts: false,
      more: false,
      manualTrade: true,
    },
    "Premium plan": {
      chargeBeeId: "Premium-Membership-USD-Yearly",
      price: 954,
      save: 50,
      accounts: 20,
      webhooks: 40,
      telegram: true,
      discord: true,
      shareAlerts: true,
      more: true,
      manualTrade: true,
    },
  },
  lifetime: {
    "Lifetime access": {
      chargeBeeId: "Life-Time-Membership",
      price: 2500,
      save: 50,
      accounts: 100,
      webhooks: 100,
      telegram: true,
      discord: true,
      shareAlerts: true,
      more: true,
      manualTrade: true,
    },
  },
};

export function getPlanById(subscription) {
  let r = null;
  let id = null;

  if (subscription.subscription_items?.length > 0) {
    id = subscription?.subscription_items[0].item_price_id;
  }

  if (!id) return r;
  if (subscription.status !== "active") return r;

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

  return r;
}
