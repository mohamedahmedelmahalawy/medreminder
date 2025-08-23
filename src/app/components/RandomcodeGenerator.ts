// No Node imports here — works in browser and server.
const ALPHANUM = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0/I/1

// Bias-free random int in [0, max)
function secureRandomInt(max: number): number {
  if (max <= 0) throw new Error("max must be > 0");

  // Prefer Web Crypto (available in browsers and Node 18+)
  const g: any = globalThis as any;
  if (g.crypto && typeof g.crypto.getRandomValues === "function") {
    const arr = new Uint32Array(1);
    // Rejection sampling to avoid modulo bias
    const range = 0x100000000; // 2^32
    const limit = Math.floor(range / max) * max;
    let x: number;
    do {
      g.crypto.getRandomValues(arr);
      x = arr[0];
    } while (x >= limit);
    return x % max;
  }

  // Very old Node/browser fallback
  return Math.floor(Math.random() * max);
}

function randomFromCharset(length: number, charset: string) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += charset[secureRandomInt(charset.length)];
  }
  return out;
}

/** Generate a code like EG-42K7Q9 or EG-123456 */
export function generateCode(opts: {
  length?: number;
  kind?: "alphanumeric";
  countryCode?: string; // e.g. "EG"
  separator?: string;   // e.g. "-"
} = {}) {
  const {
    length = 6,
    kind = "alphanumeric",
    countryCode = "",
    separator = "-",
  } = opts;

  const charset =
    kind === "alphanumeric" ? ALPHANUM : ALPHANUM; // (only one kind for now)

  const body = randomFromCharset(length, charset);

  const cc = (countryCode ?? "").slice(0, 2).toUpperCase(); // first 2 letters
  return cc ? `${cc}${separator}${body}` : body;
}
