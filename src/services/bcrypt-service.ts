import bcrypt from "bcryptjs";

class PasswordService {
  // Hashes the given password using bcrypt
  public async hashPassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  // Compares the given password with the hashed password using bcrypt
  public async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const match: boolean = await bcrypt.compare(password, hashedPassword);
    return match;
  }
}

export default new PasswordService();
