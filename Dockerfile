FROM node:9.11.2
WORKDIR /Users/dayanperera/Documents/Udemy/tech-developer-hub
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# Bundle app source
COPY ./ ./
EXPOSE 5000
CMD [ "npm", "start" ]