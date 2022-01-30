FROM node:17
ENV NODE_ENV=production

WORKDIR /backend

COPY ["package.json", "yarn.lock", "./"]

RUN yarn 

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]