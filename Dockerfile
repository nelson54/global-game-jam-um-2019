FROM mhart/alpine-node:10

COPY ./ /app

WORKDIR /app

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

EXPOSE 3000

RUN npm install

CMD npm run dev
