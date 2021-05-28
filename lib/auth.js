import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashesPassword = hash(password, 12);

  return hashesPassword;
}

export async function verifyPassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}
