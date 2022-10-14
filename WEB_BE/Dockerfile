FROM node:16
WORKDIR /usr/src/app
ENV PORT=5000 \
    NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY ./src .
EXPOSE 5000
CMD ["node", "app.js"]
