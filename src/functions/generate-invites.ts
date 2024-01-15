// import type { Invite } from '../types/Invite.js'

/**
 * Generates a specified number of invites, and inserts them into the database.
 * @param {string} source     The source of the invite, e.g. `april-2023-invite-cards`.
 * @param {number} count      The number of invites to generate.
 * @param {array}  names      An array of random Roman names to associate with the invites.
 * @param {array}  conditions An array of conditions to apply to the invites.
 * @returns {Promise<array>}  An array of invites.
 */

/*
async function generateInvites (source: string, count: number, names: string[], conditions: string[]) {
  await connect()
  const invites = []
  console.log('Names:', names)

  for (let i = 0; i < count; i++) {
    // If the name is already taken, generate a new one
    while (await Invite.findOne({ code: names[i] }))
      names[i] = generateRandomRomanNames(1)[0]

    const invite = {
      inviteId: (await Invite.countDocuments({})) + 1,
      code: names[i],
      conditions,
      source
    }
    console.log(`Adding invite #${invite.inviteId}: ${invite.code}`)
    invites.push(invite)
    await Invite.create(invite)
  }

  return invites
}
*/

/**
 * Generates a specified number of random Roman names.
 * @param {number} count The number of names to generate.
 * @returns {array}      An array of random Roman names.
 */
function generateRandomRomanNames (count: number = 1) {
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
  ]
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
  ]
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
  ]

  const names = []
  for (let i = 0; i < count; i++) {
    const name = praenomens[Math.floor(Math.random() * praenomens.length)].toLowerCase() + '-' +
                 nomens[Math.floor(Math.random() * nomens.length)].toLowerCase() + '-' +
                 cognomens[Math.floor(Math.random() * cognomens.length)].toLowerCase()
    names.push(name)
  }

  return names
}

// export { generateInvites, generateRandomRomanNames }
export { generateRandomRomanNames }
