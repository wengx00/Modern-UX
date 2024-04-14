FROM node:20

RUN npm install -g pnpm

WORKDIR /var/www/app

COPY . .

RUN pnpm install && pnpm build

EXPOSE 8080

CMD ["pnpm", "serve"]
