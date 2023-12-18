FROM gcr.io/distroless/nodejs20-debian11@sha256:8cf9967ae9ba1e64089f853abac42b41f2af95ff3aa00d08c26e5f75714605d4

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY .next/standalone /app/

EXPOSE 3000

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]
