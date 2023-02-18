// Exclude keys from user
export function excludeUser<Account, Key extends keyof Account>(
  user: Account,
  keys: Key[],
): Omit<Account, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}
