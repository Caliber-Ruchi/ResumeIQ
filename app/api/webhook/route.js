import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {

    const body = await request.text();

    const signature = (await headers()).get("stripe-signature");

    let event;

    try {

        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (err) {

        return new Response(
            `Webhook Error: ${err.message}`,
            {
                status: 400,
            }
        );

    }

    if (event.type === "checkout.session.completed") {

        const session = event.data.object;

        const userId = session.client_reference_id;

        const supabase = await createClient();

        await supabase
            .from("profiles")
            .update({
                plan: "PRO",
            })
            .eq("id", userId);

    }

    return Response.json({
        received: true,
    });

}