FROM node:18-alpine

WORKDIR /app

COPY package.json /app/

RUN yarn install 

# Bundle app source
COPY . .

RUN yarn prisma generate

# Creates a "dist" folder with the production build
RUN yarn run build

CMD ["node", "./dist/src/main.js"]