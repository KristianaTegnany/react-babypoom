import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import config from '../../../config'
import './styles.scss'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_live_hTxRErhREu6F4pyzUVceR1ay");
const API_URL = `${config.SERVER_URL}/api/v2/album/stripe`

function StripeCheckoutComponent({label,bpoomId,paymentType, donor}) {
  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    // Call your backend to create the Checkout Session
    let data={'bpoom_id': bpoomId, 'payment_type': paymentType, 'donor': donor}
    const response = await fetch(
      API_URL,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  return (
    <div styleName="button-order">
      <a onClick={handleClick}>
        {label}
      </a>
    </div>
  );
}
export default StripeCheckoutComponent;
