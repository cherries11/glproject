import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navigation1 from "../navigation/navigation1";
import Footer from "../footer/footer";

// Load Stripe with your publishable key
const stripePromise = loadStripe("your_publishable_key");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Call backend to create a PaymentIntent (adjust API path as needed)
      const response = await fetch("http://localhost:3000/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 5000 }), // Adjust amount dynamically
      });

      const { clientSecret } = await response.json();

      // Confirm payment with the client secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setSuccessMessage("Payment successful!");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto h-72 w-full bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Complete Your Payment</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="card-element">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement id="card-element" className="p-2" />
        </div>
      </div>

      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

      <button
        type="submit"
        className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${loading ? "bg-gray-500" : "bg-new"}`}
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  return (
    <div>
    <Navigation1></Navigation1>
    <div className="h-screen justify-center mt-20 ">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <Footer></Footer>
      </div>
    
  );
};

export default PaymentPage;
