import connect from './db-connect.js';
import InviteCode from '../schemas/invite-code-schema.js';
import { generateInviteCodes, generateRandomRomanNames } from './generate-invite-codes.js';

/**
 * Generates a specified number of invite codes, and inserts them into the database.
 * @param {number} count The number of invite codes to generate.
 */
async function generate(count) {
  const names = generateRandomRomanNames(count);
  await generateInviteCodes('april-2023-invite-cards', count, names);
  console.log(`Generated ${count} invite codes.`);
}

/**
 * Clears all invite codes from the database.
 */
async function clear() {
  await connect();
  await InviteCode.deleteMany({});
  console.log('Cleared all invite codes.');
}

const flags = process.argv.slice(2);
if (flags.length === 0) {
  console.log('No flags specified. Usage: `node run-invites.js --generate <count>` or `node run-invites.js --clear`.');
  process.exit(0);
}

if (flags.includes('--generate')) {
  const count = flags[flags.indexOf('--generate') + 1];
  if (count)
    await generate(count);
  else
    console.log('No count specified. Use `--generate <count>`.');
}

else if (flags.includes('--clear'))
  await clear();

else
  console.log('No valid flags specified. Usage: `node run-invites.js --generate <count>` or `node run-invites.js --clear`.');

process.exit(0);
