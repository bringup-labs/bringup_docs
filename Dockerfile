# Stage 1: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY website/package.json ./website/
RUN pnpm install --frozen-lockfile

COPY . .

# The site is static, so analytics has to be baked in here — an env var supplied at
# `docker run` would come too late to affect the already-built HTML.
ARG ANALYTICS_SITE_ID
ENV ANALYTICS_SITE_ID=$ANALYTICS_SITE_ID
RUN pnpm build

# Stage 2: Serve
FROM nginx:alpine

COPY website/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/website/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
