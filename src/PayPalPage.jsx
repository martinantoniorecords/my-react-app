// PayPalPage.jsx

import React, { useEffect } from 'react';

const PayPalPage = () => {
  useEffect(() => {
    // Load the PayPal SDK script
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.onload = () => {
      // PayPal button will be rendered after the script is loaded
      if (window.paypal) {
        paypal.HostedButtons({
          hostedButtonId: "YWAHX2FAPX7PA"
        }).render("#paypal-container-YWAHX2FAPX7PA");
      }
    };

    // Append script to the document head
    document.head.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <h1>Payment Page</h1>
      <p>Please proceed with the payment using the PayPal button below:</p>
      <div id="paypal-container-YWAHX2FAPX7PA"></div>
    </div>
  );
};

// Styles for the PayPal page
const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '20px',
};

export default PayPalPage;
