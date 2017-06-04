FROM banian/node

ENV NODE_ENV=production
CMD npm start
EXPOSE 3000

COPY package.json yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app
RUN npm run build
