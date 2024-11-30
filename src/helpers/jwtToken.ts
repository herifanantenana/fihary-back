import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from '../exceptions/internals';
import { ErrorCode } from '../exceptions/root';

export const verifyToken = (token: string, secret: string) => {
	try {
		return jwt.verify(token, secret);
	} catch (error: any) {
		if (error instanceof jwt.TokenExpiredError)
			throw new UnauthorizedException("Invalid token!", ErrorCode.INVALID_TOKEN, error);
		if (error instanceof jwt.JsonWebTokenError)
			throw new UnauthorizedException("Token expired!", ErrorCode.TOKEN_EXPIRED, error);
		throw new UnauthorizedException(error.message, ErrorCode.UNAUTHORIZED, error);
	}
}
