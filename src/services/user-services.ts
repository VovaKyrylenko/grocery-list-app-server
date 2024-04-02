import { UserModel } from "src/database";
import { PasswordService } from "src/services";
import { IUser } from "src/types";

class UserService {
  // Creates a new user with the provided email and hashed password
  public async createUser(email: string, password: string) {
    const hashedPassword: string = await PasswordService.hashPassword(password);
    const newUser: IUser = await UserModel.create({
      email,
      password: hashedPassword,
    });
    return newUser;
  }

  // Retrieves a user by their email from the database
  public async getUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }
}

export default new UserService();
