import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { IUser } from "src/types";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

class JWTService {
  private jwtSecret: string;

  constructor() {
    // Initialize JWT secret key from environment variables
    this.jwtSecret = process.env.SECRET_KEY || "";
    this.verifyToken = this.verifyToken.bind(this);
    if (!this.jwtSecret) {
      throw new Error(
        "JWT secret key is not defined in the environment variables"
      );
    }
  }

  // Generate JWT token for the provided user
  public generateToken(user: IUser): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: user._id },
        this.jwtSecret,
        { expiresIn: "1d" },
        (err: Error | null, token?: string) => {
          if (err || !token) {
            reject(new Error("Failed to generate token"));
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  // Verify JWT token in the request headers
  public verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Token not provided" });
      return;
    }
    jwt.verify(
      token,
      this.jwtSecret,
      (err: VerifyErrors | null, decoded?: any) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded as IUser;
        next();
      }
    );
  }
}

export default new JWTService();
