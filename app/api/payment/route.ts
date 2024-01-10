import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key);

export async function POST(request: NextRequest) {
  const { items, email } = await request.json();

  const stipeFriendlyItem = items.map((item: any) => ({
    quantity: 1,
    price_data: {
      currency: "INR",
      unit_amount: item.price * 100 * 82,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["AU", "IN"],
    },
    line_items: stipeFriendlyItem,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: any) => item.image)),
    },
  });

  return NextResponse.json({ session });
}
