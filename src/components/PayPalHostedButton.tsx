// PayPalHostedButton.ts

import { useEffect } from "react";

// Extend the window object to include PayPal
declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalHostedButton = () => {
  useEffect(() => {
    const renderButton = () => {
      if (window.paypal && window.paypal.HostedButtons) {
        window.paypal
          .HostedButtons({
            hostedButtonId: "TEY86AE9HNP56",
          })
          .render("#paypal-container-TEY86AE9HNP56");
      }
    };

    if (window.paypal) {
      renderButton();
    } else {
      const interval = setInterval(() => {
        if (window.paypal) {
          clearInterval(interval);
          renderButton();
        }
      }, 100);
    }
  }, []);

  return <div id="paypal-container-TEY86AE9HNP56" className="mt-4" />;
};

export default PayPalHostedButton;
