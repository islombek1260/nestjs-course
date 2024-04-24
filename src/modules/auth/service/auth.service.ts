import { Injectable } from "@nestjs/common";
import { LoginDto } from "src/modules/auth/dto/login.dto";

@Injectable()
export class AuthService {
    async login(dto: LoginDto): Promise<LoginDto> {
        return dto
    }

    async verifyToken(authorization: string): Promise<number> {
        const token = authorization.substring(7);

        const secret = process.env.JWT_SECRET;
  
        const jwt = require('jsonwebtoken');
  
        const decodedToken = jwt.verify(token, secret);

        const userId = decodedToken.userId;
        
        return userId
    }
}