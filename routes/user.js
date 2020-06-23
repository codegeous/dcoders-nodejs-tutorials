var router = require("express").Router();
const { verify } = require("hcaptcha");
const axios = require("axios");

router.post("/signup-with-hcaptcha", async (req, res, next) => {
    if (!req.body.token) {
        return res.status(400).json({ error: "Token is missing" });
    }

    try {
        let { success } = await verify(
            process.env.hcaptchaSecret,
            req.body.token
        );
        if (success) {
            return res.json({ success: true });
        } else {
            return res.status(400).json({ error: "Invalid Captcha" });
        }
    } catch (e) {
        return res.status(400).json({ error: "Captcha Error. Try again." });
    }
});

router.post("/signup-with-recaptcha", async (req, res, next) => {
    if (!req.body.token) {
        return res.status(400).json({ error: "reCaptcha token is missing" });
    }

    try {
        const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.reCaptchaSecret}&response=${req.body.token}`;
        const response = await axios.post(googleVerifyUrl);
        const { success } = response.data;
        if (success) {
            //Do sign up and store user in database
            return res.json({ success: true });
        } else {
            return res
                .status(400)
                .json({ error: "Invalid Captcha. Try again." });
        }
    } catch (e) {
        return res.status(400).json({ error: "reCaptcha error." });
    }
});

module.exports = router;
