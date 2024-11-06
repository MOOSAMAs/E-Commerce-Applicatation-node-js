FROM node:20

WORKDIR /E-Commerce

COPY . /E-Commerce/

RUN npm install

CMD [ "npm" , "start" ]