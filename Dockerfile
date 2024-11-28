FROM node:23.2.0

# working directory
WORKDIR /app

# copy
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY public ./public
COPY data ./data
COPY example ./example

# build
RUN npm install --save-dev 
RUN npm run build

# env
ENV MONGOMS_DEBUG=1

# expose
EXPOSE 3000 

# command
ENTRYPOINT ["npm", "run", "start:prod"]
