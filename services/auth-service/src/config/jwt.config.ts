import { ENV } from './env';

export const JWT_CONFIG = {
    secret: ENV.JWT_SECRET,
    expiresIn: ENV.JWT_EXPIRES_IN,
};
