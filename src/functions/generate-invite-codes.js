import connect from './db-connect.js';
import InviteCode from '../schemas/invite-code-schema.js';

/**
 * Generates a specified number of invite codes, and inserts them into the database.
 * @param {string} source    The source of the invite code, e.g. `april-2023-invite-cards`.
 * @param {number} count     The number of invite codes to generate.
 * @param {array}  names     An array of random Roman names to associate with the invite codes.
 * @returns {Promise<array>} An array of invite codes.
 */
async function generateInviteCodes(source, count, names) {
  await connect();
  const inviteCodes = [];
  console.log('Names:', names);

  for (let i = 0; i < count; i++) {
    // If the name is already taken, generate a new one
    while (await InviteCode.findOne({ code: names[i] }))
      names[i] = generateRandomRomanNames(1)[0];

    const inviteCode = {
      inviteId: (await InviteCode.countDocuments({})) + 1,
      code: names[i],
      source
    };
    console.log(`Adding invite code #${inviteCode.inviteId}: ${inviteCode.code}`);
    inviteCodes.push(inviteCode);
    await InviteCode.create(inviteCode);
  }

  return inviteCodes;
}

/**
 * Generates a specified number of random Roman names.
 * @param {number} count The number of names to generate.
 * @returns {array}      An array of random Roman names.
 */
function generateRandomRomanNames(count) {
  const praenomens = [
    'Aulus',
    'Appius',
    'Gaius',
    'Gnaeus',
    'Decimus',
    'Kaeso',
    'Lucius',
    'Marcus',
    'Manius',
    'Mamercus',
    'Numerius',
    'Publius',
    'Quintus',
    'Sextus',
    'Servius',
    'Spurius',
    'Titus',
    'Tiberius'
  ];
  const nomens = [
    'Julius',
    'Octavius',
    'Flavius',
    'Aurelius',
    'Maximus',
    'Valerius',
    'Claudius',
    'Severus',
    'Cornelius',
    'Fabius'
  ];
  const cognomens = [
    'Caesar',
    'Augustus',
    'Magnus',
    'Pius',
    'Brutus',
    'Germanicus',
    'Africanus',
    'Britannicus',
    'Cicero',
    'Crassus'
  ];

  const names = [];
  for (let i = 0; i < count; i++) {
    const name = praenomens[Math.floor(Math.random() * praenomens.length)].toLowerCase() + '-' +
                 nomens[Math.floor(Math.random() * nomens.length)].toLowerCase() + '-' +
                 cognomens[Math.floor(Math.random() * cognomens.length)].toLowerCase();
    names.push(name);
  }

  return names;
}

export { generateInviteCodes, generateRandomRomanNames };
