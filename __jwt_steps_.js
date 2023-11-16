/**
 * install jsonwebtoken
 * jwt.sign(payload, secret, {expiresin:})
 * token client
 *
 */

/**
 *
 * how to store token in the client side
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

/**
 * 1. to send cookies from the client make sure you added withCredentials true for the api call using axios
 * 2. use cookies  parser as a middleware
 */

/**
 *
 * 1. to send cookies from the clinet make sure you addd withCredentials true for the
 * api call usiing axios
 *
 * 2. use cookie parser as middlewar
 *
 */
