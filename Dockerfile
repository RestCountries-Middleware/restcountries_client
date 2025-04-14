FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

FROM gcr.io/distroless/nodejs20

WORKDIR /app

COPY --from=build /app /app 

EXPOSE 3000

CMD [ "npm", "run", "dev" ]