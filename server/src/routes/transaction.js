const express = require("express");
const mpesa = require("mpesa-node-api");
const customId = require("custom-id");
const router = express.Router();

// ===========================
// C2B payment
// ==========================
router.get("/buy", async (req, res, next) => {
  const amount = parseFloat(req.query.amount);
  const phone = req.query.phone;

  try {
    const response = await mpesa.initiate_c2b(
      amount,
      phone,
      "T12344C",
      `GED${customId({ randomLength: 0 })}BUY`
    );

    if (!response) {
      return res
        .status(402)
        .json({ ok: false, message: "Could not complete transaction!" });
    }

    if (response["output_ResponseCode"] == "INS-0") {
      res.status(200).json({
        ok: true,
        message: "Payment transaction executed successfully",
        payment: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error performing payment",
      error,
    });
  }
});

module.exports = router;
