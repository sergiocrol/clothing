import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import CustomButton from '../../components/custom-button/custom-button.component';

const StripeCheckoutButton = ({ price }) => {
  // Stripe needs the price in cents
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_bb9Qcf0uB2eGE4G99lIoflkA';

  // For now we won't make bakend payment process, so we just log the token and show an alert message
  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment Successful');
    }).catch(error => {
      console.log('Payment error: ', JSON.parse(error));
      alert('There was an issue with your payment. Please, make sure you use the provided card');
    });
  };

  return (
    <StripeCheckout
      currency='EUR'
      label='Pay Now'
      name='Clothing App S.A.'
      billingAddress
      shippingAddress
      locale='en'
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is ${price}€`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    >
      <CustomButton>Pay Now</CustomButton>
    </StripeCheckout>
  );
}

export default StripeCheckoutButton;