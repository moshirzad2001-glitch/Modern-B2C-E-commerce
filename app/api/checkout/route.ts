import { defaultvalue } from "@/redux/createslice";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia' as any,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { cartItems }: { cartItems: defaultvalue[] } = await req.json();

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart payload is empty or invalid" },
        { status: 400 },
      );
    }

    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const itemsubtotal = Math.round(subtotal * 100)

    const ecommercefee = Math.round(itemsubtotal *0.08);
    const realstripaccount = "acct_1ToGVFIkwALsVAPh";

    const lineItems = cartItems.map((item: defaultvalue) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(Number(item.price) * 100),
        tax_behavior: 'exclusive' as const,
      },
      quantity: item.quantity ?? 1,
      tax_rates:['txr_1TqST0IkwAodt6hytmaMqa4q'],
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      metadata: userId
        ? {
            clerkUserId: userId,
          }
        : { guestCheckout: "true" },
      line_items: lineItems,
      payment_intent_data: {
        application_fee_amount: ecommercefee,
        transfer_data: {
          destination: realstripaccount,
        },
        metadata: userId
        ? {
            clerkUserId: userId,
          }
        : { guestCheckout: "true" },
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Internal Server Checkout Crush:", error || error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
