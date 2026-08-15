import type { User } from '@/types'

// Deterministic, documented, non-real credentials for automation testing only.
// See README "Test Accounts" section.
export const SEED_USERS: User[] = [
  {
    id: 'seed-user-1',
    firstName: 'Standard',
    lastName: 'User',
    email: 'user@example.com',
    username: 'standarduser',
    password: 'User@123',
    phone: '5550100001',
    dateOfBirth: '1995-06-15',
    country: 'India',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-user-2',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    username: 'adminuser',
    password: 'Admin@123',
    phone: '5550100002',
    dateOfBirth: '1990-03-22',
    country: 'India',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-user-3',
    firstName: 'Locked',
    lastName: 'User',
    email: 'locked@example.com',
    username: 'lockeduser',
    password: 'Locked@123',
    phone: '5550100003',
    dateOfBirth: '1992-11-05',
    country: 'India',
    role: 'user',
    status: 'locked',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-user-4',
    firstName: 'Unverified',
    lastName: 'User',
    email: 'unverified@example.com',
    username: 'unverifieduser',
    password: 'User@123',
    phone: '5550100004',
    dateOfBirth: '1998-08-30',
    country: 'India',
    role: 'user',
    status: 'unverified',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-user-5',
    firstName: 'Disabled',
    lastName: 'User',
    email: 'disabled@example.com',
    username: 'disableduser',
    password: 'Disabled@123',
    phone: '5550100005',
    dateOfBirth: '1988-02-14',
    country: 'India',
    role: 'user',
    status: 'disabled',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
]

// Identifiers reserved so "already taken" validation is reproducible even
// before a real account with that value is created.
export const RESERVED_USERNAMES = ['standarduser', 'adminuser', 'existinguser']
export const RESERVED_EMAILS = ['user@example.com', 'admin@example.com', 'existing@example.com']

// Deterministic codes so QA scripts never need to read a real inbox.
export const EMAIL_VERIFICATION_CODE = '123456'
export const PASSWORD_RESET_CODE = '654321'
export const EXPIRED_CODE = '000000'
export const MAX_CODE_ATTEMPTS = 5

export const PASSWORD_POLICY = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
}

export const SESSION_DURATION_MS = {
  rememberMe: 1000 * 60 * 60 * 24 * 30, // 30 days
  default: 1000 * 60 * 60 * 2, // 2 hours
}

// Display-friendly view of the seed accounts for the Login page's
// "quick-fill" panel. Passwords are intentionally visible — these are
// documented, non-real automation credentials, not production secrets.
export const DEMO_ACCOUNTS = SEED_USERS.map((u) => ({
  label: `${u.firstName} ${u.lastName}`,
  identifier: u.email,
  username: u.username,
  password: u.password,
  status: u.status,
  role: u.role,
}))
