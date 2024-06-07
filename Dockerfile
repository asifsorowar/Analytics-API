FROM node:18.18-alpine

RUN apk update -f && \
  apk add bash && \
  npm i -g migrate-mongo

RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown app:app /app

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN chown -R app:app .

RUN chmod +x ./entrypoint.sh ./wait-for-it.sh

USER app

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]
