FROM node:alpine
WORKDIR /draft-tool-react
COPY package.json /draft-tool-react/package.json
COPY yarn.lock /draft-tool-react/yarn.lock
ENV PATH /draft-tool-react/node_modules/.bin:$PATH
RUN yarn
CMD ["yarn", "start"]