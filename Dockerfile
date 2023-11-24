FROM gcr.io/distroless/nodejs20-debian11@sha256:5f62f9294663ff12d697e5d72f6b15c295ac377c8b924afb16e2bc4c1f10511f

WORKDIR /app

COPY package.json /app/
COPY next-logger.config.js /app/
COPY .next/standalone /app/

EXPOSE 3000

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]
