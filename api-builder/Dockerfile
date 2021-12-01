FROM node:16

RUN mkdir -p /app
WORKDIR /app

ENV NODE_ENV=development
COPY package.json /app

RUN npm i
COPY . /app

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
