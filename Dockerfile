FROM gcr.io/distroless/nodejs18-debian11@sha256:8830b515f9413a8cf34ecd599a79b8676c51296d2fc99c0658f0ab1bb1c933f4

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY .next/standalone /app/

EXPOSE 3000

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]
