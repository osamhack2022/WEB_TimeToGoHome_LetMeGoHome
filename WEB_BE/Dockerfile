FROM node:16
WORKDIR /usr/src/app
ENV PORT=5000 \
    NODE_ENV=production
COPY package*.json ./
COPY ./src ./src
COPY ./prisma/schema.prisma ./prisma/schema.prisma
EXPOSE 5000
RUN npm install && npx prisma generate
CMD node src/app.js
