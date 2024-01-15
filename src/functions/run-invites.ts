// import Invite from '../types/Invite.js'
// import { generateInvites, generateRandomRomanNames } from './generate-invites.js'

/**
 * Generates a specified number of invites, and inserts them into the database.
 * @param {number} count      The number of invites to generate.
 * @param {array}  names      An array of names to associate with the invites. If not specified, random Roman names will be generated.
 * @param {string} source     The source of the invites, e.g. `april-2023-invite-cards`.
 * @param {array}  conditions An array of conditions to apply to the invites. If not specified, the default conditions will be used.
 */

/*
async function generate (count, names, source, conditions) {
  if (!names)
    names = generateRandomRomanNames(count)
  if (!source)
    source = 'april-2023-invite-cards'
  if (!conditions)
    conditions = ['no-invite', 'expires', 'use-once']
  await generateInvites(source, count, names, conditions)
  console.log(`Generated ${count} invites.`)
}
*/

/**
 * Clears all invites from the database.
 */
/*
async function clear () {
  await connect()
  await Invite.deleteMany({})
  console.log('Cleared all invites.')
}

const flags = process.argv.slice(2)
if (flags.length === 0) {
  console.log('No flags specified. Usage:' + '\n' +
              'node run-invites.js --generate <count>' + '\n' +
              'node run-invites.js --generate [-s] [source] [-c] [condition1,condition2,condition3] [-m] [name1,name2,name3]' + '\n' +
              'node run-invites.js --clear')
  process.exit(0)
}

if (flags.includes('--generate')) {
  let source, names, conditions, count
  // Handle source
  if (flags.includes('-s')) {
    source = flags[flags.indexOf('-s') + 1]
    if (!source) {
      console.log('No source specified. Use `-s <source>`.')
      process.exit(0)
    }
  }

  // Handle conditions
  if (flags.includes('-c')) {
    conditions = flags[flags.indexOf('-c') + 1].split(',')
    if (conditions.length === 0) {
      console.log('No conditions specified. Use `-c <condition1,condition2,condition3>`.')
      process.exit(0)
    }
  }

  // Handle names
  if (flags.includes('-m')) {
    names = flags[flags.indexOf('-m') + 1].split(',')
    if (names.length === 0) {
      console.log('No names specified. Use `-m <name1,name2,name3>`.')
      process.exit(0)
    }
  }

  // Otherwise, the next flag is the number of invites to generate
  if (names)
    count = names.length
  else
    count = flags[flags.indexOf('--generate') + 1]
  if (!count) {
    console.log('No count specified. Use `--generate <count>`.')
    process.exit(0)
  }

  console.log('count:', count)
  console.log('names:', names)
  console.log('source:', source)
  console.log('conditions:', conditions)
  await generate(count, names, source, conditions)
}

else if (flags.includes('--clear'))
  await clear()

else
  console.log('No valid flags specified. Usage: `node run-invites.js --generate <count>` or `node run-invites.js --clear`.')

process.exit(0)
*/
