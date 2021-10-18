FROM node:14

RUN mkdir -p /app
WORKDIR /app

ENV NODE_ENV=development
COPY package.json /app

RUN npm i
COPY . /app
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000
CMD ["npm", "start"]
