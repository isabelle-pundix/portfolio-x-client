#Build next app
FROM node:alpine

WORKDIR /client/app

COPY . .

RUN npm install

ENV NODE_ENV production

COPY package*.json ./

RUN npm run build

# Set the desired port (replace 3000 with your custom port)
ENV PORT=5003

# Install `serve` to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 5003

# Run application
CMD serve -s build
