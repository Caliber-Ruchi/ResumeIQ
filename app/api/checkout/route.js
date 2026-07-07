import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: "ResumeIQ Pro",
              description: "Unlimited AI Resume Reviews",
            },

            unit_amount: 999, // $9.99
          },

          quantity: 1,
        },
      ],

      success_url:
        `${process.env.NEXT_PUBLIC_APP_URL}/success`,

      cancel_url:
        `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}