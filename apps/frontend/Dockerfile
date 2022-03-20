FROM node:17-alpine as build

RUN npm i -g pnpm

WORKDIR /build
COPY package.json /build

RUN NODE_ENV=development pnpm i

COPY . /build
RUN pnpm run build

FROM node:17-alpine

RUN npm i -g pnpm

WORKDIR /app
COPY --from=build /build/package.json /app

RUN NODE_ENV=production pnpm i

COPY --from=build /build/dist /app/dist
COPY --from=build /build/server.js /app/

ENV NODE_ENV=production
ENTRYPOINT ["node", "server.js"]