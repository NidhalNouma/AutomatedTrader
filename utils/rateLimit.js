let lastAccess = {};
let blockList = {};
const MAX_REQUESTS = 10;
const TIME_LIMIT = 5000; // 5 seconds in milliseconds
const BLOCK_PERIOD = 3600000; // 1 hour in milliseconds

export function rateLimit(handler) {
  return async (req, res) => {
    const ip = req.socket.remoteAddress;
    const currentTime = Date.now();

    // Check if IP is on block list
    if (blockList[ip] && blockList[ip] > currentTime) {
      const timeLeft = blockList[ip] - currentTime;
      res
        .status(429)
        .json({ error: `IP blocked for ${timeLeft / 1000} seconds` });
      return;
    }

    if (!lastAccess[ip]) {
      lastAccess[ip] = [];
    }

    lastAccess[ip] = lastAccess[ip].filter(
      (time) => currentTime - time < TIME_LIMIT
    );

    if (lastAccess[ip].length > MAX_REQUESTS) {
      // Add IP to block list for BLOCK_PERIOD milliseconds
      blockList[ip] = currentTime + BLOCK_PERIOD;
      res.status(429).json({
        error: `Rate limit exceeded. IP blocked for ${
          BLOCK_PERIOD / 1000
        } seconds`,
      });
      return;
    }

    lastAccess[ip].push(currentTime);

    return handler(req, res);
  };
}
