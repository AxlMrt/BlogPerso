FROM node:19 AS builder

# Create app directory
WORKDIR /app

# copy both to the container
COPY package*.json ./
COPY prisma ./prisma/
# install packages to the container
RUN npm install


# generate the prisma database client
RUN npx prisma generate
# copy everything
COPY . .
RUN npm run build

FROM node:19

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN mkdir /dist/src/public
RUN mkdir /dist/src/public/uploads
# expose the api port
EXPOSE 8000

CMD [ "npm", "run", "start:migrate:prod" ]