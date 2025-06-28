const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const router = express.Router();

router.post("/check-out-session", async (req, res) => {
  try {
    const { totalPrice } = req.body;
    console.log(totalPrice);

    if (!totalPrice || typeof totalPrice !== "number") {
      return res.status(400).json({ error: "Invalid totalPrice" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `https://fashion-bhandar.vercel.app/success`,
      cancel_url: `https://fashion-bhandar.vercel.app/failed`,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "INR",
            unit_amount: totalPrice * 100,
            product_data: {
              name: `Test product`,
              description: "Products List",
              images: [
                `https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
              ],
            },
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      sessionId: session.id,
      sessionUrl: session.url,
    });
  } catch (err) {
    console.error("Stripe Checkout Error:", err.message);
    res
      .status(500)
      .json({ error: "Something went wrong with payment session" });
  }
});

module.exports = router;
