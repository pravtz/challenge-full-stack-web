FROM node:17.8

RUN apt-get update 

WORKDIR /api-edtech/

COPY package.json package-lock.json /api-edtech/

RUN npm install

COPY . .

USER node

# CMD ["npm", "run", "dev"]