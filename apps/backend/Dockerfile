FROM node:17-alpine as build

RUN npm i -g pnpm

COPY . /build/

WORKDIR /build
RUN NODE_ENV=development pnpm i
RUN pnpm run build

FROM node:17-alpine

RUN npm i -g pnpm

WORKDIR /app/apps/backend

COPY --from=build /build/package.json /app
COPY --from=build /build/pnpm-workspace.yaml /app
COPY --from=build /build/packages/orm/package.json /app/packages/orm/package.json
COPY --from=build /build/apps/backend/package.json /app/apps/backend/package.json
COPY --from=build /build/apps/frontend/package.json /app/apps/frontend/package.json

RUN NODE_ENV=production pnpm i

COPY --from=build /build/packages/orm/dist /app/packages/orm/dist
COPY --from=build /build/apps/backend/dist /app/apps/backend/dist
COPY --from=build /build/apps/frontend/dist /app/apps/frontend/dist

ENTRYPOINT ["node", "dist/index.js"]
