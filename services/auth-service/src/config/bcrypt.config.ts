import { ENV } from './env';

export const BCRYPT_CONFIG = {
    saltRounds: ENV.BCRYPT_SALT_ROUNDS,
};
