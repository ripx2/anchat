FROM debian:bookworm-slim as base
# Install prerequisites
RUN apt-get update && apt-get install -y \
  curl unzip
RUN curl -fsSL https://bun.sh/install | bash
RUN mv ~/.bun /opt/bun
ENV PATH=$PATH:/opt/bun/bin

FROM base as build
# Install packages
COPY package.json .
COPY bun.lockb .
RUN bun install
COPY . /app
WORKDIR app
# Build front
RUN bun run build
# Build server
RUN bun --compile build src/server.ts --outfile server

FROM nginx:alpine as front
COPY --from=build app/dist /usr/share/nginx/html
EXPOSE 80

FROM debian:bookworm-slim as server
COPY --from=build /app/server /
EXPOSE 3000
CMD ["/server"]
