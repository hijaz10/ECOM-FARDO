import rateLimit from "express-rate-limit";

// GENERAL API — 100 requests per 15 mins
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// AUTH — 10 attempts per 15 mins (login, register, OTP)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many attempts. Please wait 15 minutes before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// OTP — 5 requests per 10 mins
export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      "Too many verification attempts. Please wait before requesting a new code.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ORDERS — 20 per hour
export const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many order attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// REVIEWS — 10 per hour
export const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many review submissions. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// NEWSLETTER — 3 per hour
export const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many subscription attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
