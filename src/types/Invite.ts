// Can be migrated to ORM later for referrals or something like that
export type Invite = {
  inviteId: number,
  code: string,
  source: 'april-2023-invite-cards' | 'friends' | 'promo',
  conditions: Array<'no-invite' |'expires' | 'use-once'>,
  expires: Date,
  valid: boolean,
  createdAt: Date
}
