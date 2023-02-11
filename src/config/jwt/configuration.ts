import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.ACCESS_TOKEN_SECRET,
  expires: process.env.ACCESS_TOKEN_EXPIRES,
}));
