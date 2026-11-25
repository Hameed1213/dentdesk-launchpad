// Makes a training access code for one practice (docs/TRAINING-GAME-PLAN.md §4).
//
//   node scripts/training-code.mjs "Oak Dental"
//
// Prints:
//   1. the code to give the practice (shown once: it is not stored anywhere);
//   2. the line to add to the TRAINING_CODES secret in Cloudflare (only the code's hash).
// With --secret it also prints a new TRAINING_COOKIE_SECRET (needed once, the first time).
// Nothing is sent anywhere; this only prints.
import { createHash, randomBytes, randomInt } from "node:crypto";

const args = process.argv.slice(2);
const wantSecret = args.includes("--secret");
const practice = args
  .filter((a) => a !== "--secret")
  .join(" ")
  .trim();
if (!practice || /[;=]/.test(practice)) {
  console.error(
    'Usage: node scripts/training-code.mjs "Practice name" [--secret]  (no ; or = in the name)',
  );
  process.exit(1);
}

// 31 letters and numbers, without the easily confused 0 O 1 I L. 16 of them = about 79 random bits.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const raw = Array.from({ length: 16 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
const code = raw.match(/.{4}/g).join("-");
const hash = createHash("sha256").update(raw).digest("hex");

console.log(`\nAccess code for ${practice} (give this to the practice):\n\n    ${code}\n`);
console.log("Add this to the TRAINING_CODES secret (separate practices with ;):\n");
console.log(`    ${practice}=${hash}\n`);
if (wantSecret) {
  console.log("TRAINING_COOKIE_SECRET (set once, keep it secret):\n");
  console.log(`    ${randomBytes(32).toString("base64url")}\n`);
}
