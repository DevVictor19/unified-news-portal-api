FROM node:lts-alpine3.19 as development

WORKDIR /usr/src/app

COPY  package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine3.19 as production

WORKDIR /usr/src/app

COPY  package*.json .

RUN npm install --only-production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]