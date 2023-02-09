import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.APP_PORT || 3000,
  appName: process.env.APP_NAME || 'hello world',
}));
