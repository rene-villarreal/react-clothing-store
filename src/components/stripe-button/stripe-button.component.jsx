import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JLCIjA2t29Cta3X4sFErBx0PzeRankKV7h7KeSEIIrNa2dbzGrv0kPS7XZisFLukTww8NpVZ2mNQjVPlqIwLNUX00jm31U25i';

const onToken = token => {
        console.log(token);
        alert('Payment Successful');

    }
    return (
        <StripeCheckout 
            label='Pay Now'
            name= 'RV Clothing Store'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;