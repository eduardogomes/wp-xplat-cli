FROM node:boron
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json .

RUN npm install
# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]