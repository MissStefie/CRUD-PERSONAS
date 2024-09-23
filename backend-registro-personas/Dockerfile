FROM node:20-alpine

WORKDIR /app

COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh

COPY . .

EXPOSE 4000

CMD ["./wait-for-db.sh", "db", "npm", "start"]
