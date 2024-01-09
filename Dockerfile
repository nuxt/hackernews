FROM node:alpine AS base
COPY . /app-tmp
WORKDIR /app-tmp

FROM base AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack use pnpm@8.14.0 && mkdir /app && pnpm run build

FROM base
COPY  --from=build /app-tmp/.output /app
WORKDIR /app
RUN rm -rf /app-tmp && rm -rf /pnpm
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENTRYPOINT ["node", "server/index.mjs"]
