// Makes a training access code for one practice (docs/TRAINING-GAME-PLAN.md §5).
//
//   node scripts/training-code.mjs "Oak Dental"            one more practice
//   node scripts/training-code.mjs "Oak Dental" --secret   the first time (also the cookie secret)
//
// It shows the access code to give the practice, then puts each Cloudflare value on the clipboard
// one at a time (press Enter between them), so nothing has to be copied by hand.
// Nothing is sent anywhere, and the code is not stored: only its hash goes to Cloudflare.
import { createHash, randomBytes, randomInt } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createInterface } from "node:readline/promises";

const args = process.argv.slice(2);
const wantSecret = args.includes("--secret");
const practice = args.filter((a) => a !== "--secret").join(" ").trim();
if (!practice || /[;="']/.test(practice)) {
  console.error('Usage: node scripts/training-code.mjs "Practice name" [--secret]  (no ; = or quotes in the name)');
  process.exit(1);
}

// 31 letters and numbers, without the easily confused 0 O 1 I L. 16 of them = about 79 random bits.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const raw = Array.from({ length: 16 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
const code = raw.match(/.{4}/g).join("-");
const entry = `${practice}=${createHash("sha256").update(raw).digest("hex")}`;

function copy(value) {
  try {
    execFileSync("pbcopy", { input: value });
    return true;
  } catch {
    return false;
  }
}

const rl = createInterface({ input: process.stdin, output: process.stdout });
const step = async (name, value, note) => {
  if (copy(value)) {
    console.log(`\n${name} is on your clipboard.${note}`);
    console.log(`In Cloudflare, edit ${name} (type Secret), select everything in the value box, paste, and save.`);
  } else {
    console.log(`\nPaste this as the value of ${name} (type Secret), nothing else:\n\n${value}\n`);
  }
  await rl.question("Press Enter when done. ");
};

console.log(`\nAccess code for ${practice} (give this to the practice):\n\n    ${code}\n`);
await step(
  "TRAINING_CODES",
  entry,
  "\nIf other practices are already in it, add a ; after the last one and paste after it instead.",
);
if (wantSecret) await step("TRAINING_COOKIE_SECRET", randomBytes(32).toString("base64url"), "");
rl.close();
console.log(`\nDone. Keep the access code above: ${code}\n`);
