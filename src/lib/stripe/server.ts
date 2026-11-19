import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20' as any,
  appInfo: {
    name: 'Docentia Red Educativa',
    version: '1.0.0'
  }
});
