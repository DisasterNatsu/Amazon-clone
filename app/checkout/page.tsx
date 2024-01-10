"use client";
import CheckoutProduct from "@/components/CheckoutProduct";
import { selectItems, selectTotal } from "@/slices/cartSlice";
import { Products } from "@/typings";
import { loadStripe } from "@stripe/stripe-js";
import Axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

let publicKey: string = process.env.stripe_public_key!;

const stripePromise = loadStripe(publicKey);

const CheckoutPage = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  let indianLocale = Intl.NumberFormat("en-IN"); // format the price
  const newPrice = indianLocale.format(total * 82); // convert usd to inr

  const session = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // call the backend to create a checkout session
    const data = {
      items: items,
      email: session.data?.user?.email,
    };

    const response = await fetch("api/payment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    //
    const result = await stripe?.redirectToCheckout({
      sessionId: resData.session.id,
    });

    if (result?.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            alt="advert"
            width={1020}
            height={250}
            className="object-contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your amazon cart is empty."
                : "Shopping Cart"}
            </h1>

            {items?.map((item: Products, i: number) => (
              <CheckoutProduct key={item.id} product={item} />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">₹ {newPrice}</span>
              </h2>

              <button
                disabled={!session.data}
                className={`mt-2 ${
                  !session.data
                    ? "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                    : "button"
                }`}
                onClick={createCheckoutSession}
              >
                {!session.data ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
