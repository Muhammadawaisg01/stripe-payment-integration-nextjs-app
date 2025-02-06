
import { Stripe } from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-04-10", // Adjust to the correct version
});


export const POST = async ( req ) => {

    try {

        const {amount} = await req.json();
        console.log("Amount in  create-payment-intent      ",amount ) ; 
        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount,
            currency: "USD",
            automatic_payment_methods: {enabled : true},
        });

        return Response.json({ clientSecret: paymentIntent.client_secret });
        
    } catch (error) {
        console.error("Internal Error:", error);
        // Handle other errors (e.g., network issues, parsing errors)
        return Response.json(
            { error: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    }
}
