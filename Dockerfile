FROM node:16.8-alpine3.11 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN npm ci \
    && npm run build \
    && npm prune --production

# ---

FROM node:16.8-alpine3.11

ENV NODE_ENV production

ENV JWT_SECRET +YdNZ_EBcF|tybuV:BT|?P?|ycF=1<M@FYI5RyT6>D%LYFWkydNDFB&fJKo

ENV DB_PORT 5432
ENV DB_HOST movies-nestjs.ck2lneoorlhn.us-east-1.rds.amazonaws.com
ENV DB_USERNAME root
ENV DB_PASSWORD Erik2202*
ENV DB_DATABASE movies

ENV PORT 8080

ENV REDIS_PORT 14768
ENV REDIS_HOST redis-14768.c265.us-east-1-2.ec2.cloud.redislabs.com
ENV REDIS_PASSWORD uv81vSDbZHUfGeHrBuIGRdPOy9tdJSdr

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["node", "dist/main.js"]