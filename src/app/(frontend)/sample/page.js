
import Checkout from "@/components/Checkout";
import axios from "axios";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }


export default async function Home(){

    const amount = 4000.00;

    if (!amount) {
        return <h1>Amount not found!</h1>;
    }

    const stripePK = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    // const samplePrice = parseFloat(amount);
    
    console.log("I am stripePk in /sample     ",stripePK);

            const response = await axios(`http://localhost:3002/api/create-payment-intent`, {
                method: "POST", // Set the method to POST
                data:{
                  amount
                },
                headers: {
                  "Content-Type": "application/json", // Set the content type to JSON
                },
              //   body: JSON.stringify(data), // Send the data in the body
              //   next: { revalidate: 0 }, // Optional, you can keep this if necessary
              });
          
              const secret = await response.data.clientSecret;
              console.log(" I AM THE RESPONSE  in /sample  ", secret);

    return (
       <>
            <Checkout
               amount={amount}
               secret={secret}
               stripePK={stripePK}
               jsonData={""}
            />
        </>

    )


}









