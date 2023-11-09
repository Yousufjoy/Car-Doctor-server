/**
 * install jsonwebtoken
 * jwt.sign(payload, secret, {expiresin:})
 * token client
 *
 */

/**
 *
 * ho to store toke in the client side
 * 1. memory --> ok type
 * 2. local storage --> ok type (XSS)
 * 3. cookies: http only
 *
 */

/**
 * 1. ste cookie with http only. for development secure: false,
 *
 * 2. cors settings:
 
 * pp.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
 *
 * 3. client side axios setting
 * in axios set withCredentials: true
 */
