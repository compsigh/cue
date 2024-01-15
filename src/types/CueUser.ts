import type { User } from 'next-auth'
import { Generation } from './Generation'

export interface CueUser extends User {
  generations: Generation[]
  invitesRemaining: number
}
