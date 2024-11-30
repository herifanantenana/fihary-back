import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from '../exceptions/internals';
import { ErrorCode } from '../exceptions/root';
import { hashids } from '../index';

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

export const genRef = (data: string) => {
	const hash = hashids.encode(data.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
	return hash;
}
