FROM node:16-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "wait-for.sh", "./"]

RUN npm i -g gatsby-cli
RUN npm i
COPY . .

CMD ["gatsby", "develop"]
