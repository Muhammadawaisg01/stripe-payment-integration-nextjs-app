
"use client"

import { useElements, useStripe, PaymentElement, Elements } from "@stripe/react-stripe-js";
import React,{ useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";



export default function Checkout( {amount, secret, stripePK } ) { 

    console.log("I am amount in   /CheckoutPage      ",amount);
    console.log("I am secret in   /CheckoutPage      ",secret);
    console.log("I am stripePk in /CheckoutPage      ",stripePK);


    const stripePromise = loadStripe(stripePK);
    const clientSecret = secret;

    const handleSubmit = (e) => {
        e.preventDefault();
    } 

    // if (!clientSecret || !stripe || !elements) {
    //     return (
    //       <div className="flex items-center justify-center">
    //         <div
    //           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
    //           role="status"
    //         >
    //           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //             Loading...
    //           </span>
    //         </div>
    //       </div>
    //     );
    //   }

    return(
        <div>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ 
                    clientSecret:clientSecret, 
                    // mode : "payment",
                    // amount : amount,
                    // currency : "usd"
                    }}>
                <CheckoutForm amount={amount}/>
                </Elements>
            )}
        </div>
    )
}




