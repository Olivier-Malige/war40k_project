FROM node:14

RUN mkdir -p /app
WORKDIR /app

ENV NODE_ENV=development
COPY package.json /app/
RUN  npm i -g nodemon && npm i
COPY . /app

EXPOSE 3001

CMD [ "npm", "start" ]
