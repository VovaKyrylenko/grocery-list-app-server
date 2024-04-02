import { Request, Response } from "express";
import { UserService, JWTService, PasswordService } from "src/services";
import { IUser } from "src/types";

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser: IUser | null = await UserService.getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }
    // Create a new user
    const newUser: IUser = await UserService.createUser(email, password);
    const token: string = await JWTService.generateToken(newUser);
    res.status(201).json({ email: newUser.email, token });
  } catch (error: any) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    // Retrieve the user by email
    const user: IUser | null = await UserService.getUserByEmail(email);
    if (!user) {
      // If user not found, return error
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    // Compare passwords
    const passwordMatch: boolean = await PasswordService.comparePasswords(
      password,
      user.password
    );
    if (!passwordMatch) {
      // If passwords don't match, return error
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token for authentication
    const token: string = await JWTService.generateToken(user);
    res.status(200).json({ email, token });
  } catch (error: any) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Failed to login user" });
  }
}
