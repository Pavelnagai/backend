FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install && \
    npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000
CMD ["npm", "start"]