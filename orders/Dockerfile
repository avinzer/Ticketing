FROM node:24

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]