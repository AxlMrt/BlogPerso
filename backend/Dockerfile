FROM node:alpine AS builder

# Create app directory
WORKDIR /app

# copy both to the container
COPY package*.json ./
COPY prisma ./prisma/

# install packages to the container
RUN npm install

# copy everything
COPY . .

# generate the prisma database client
RUN npx prisma generate
RUN npm run build

FROM node:alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# expose the api port
EXPOSE 8000

# run the dev app - prod is not currently Dockerised
CMD [  "npm", "run", "start:migrate:prod" ]