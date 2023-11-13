FROM gcr.io/distroless/nodejs20-debian11@sha256:68698df0dbbb13ec414446d2f1f5b2b0dcb485ac4f1b5b36720ffb6b87b70102

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY .next/standalone /app/

EXPOSE 3000

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]
