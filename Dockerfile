FROM mhart/alpine-node:10

WORKDIR /app

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

EXPOSE 3000

CMD npm install && npm run dev