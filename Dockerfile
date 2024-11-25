FROM node:23.2.0

# working directory
WORKDIR /app

# mongodb memory server
#ENV MONGOMS_RUNTIME_DOWNLOAD=false
#RUN wget "https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian12-8.0.1.tgz" \
#    && tar -zxvf mongodb-*.tgz \
#    && mv mongodb-linux-x86_64-debian12-8.0.1 mongodb
#ENV MONGOMS_SYSTEM_BINARY=/app/mongodb/bin/mongod

#ENV MONGOMS_DOWNLOAD_URL=https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian12-8.0.1.tgz
#ENV DEBUG="mongodb-memory-server* node main.js"

###ENV MONGOMS_PLATFORM=linux
##ENV MONGOMS_ARCH=x64
##ENV MONGOMS_DISTRO=debian12
#ENV MONGOMS_VERSION=8.0.1

#RUN apt update
#RUN apt install -y nodejs npm
#
ENV MONGOMS_DEBUG=1
#RUN apt update
#RUN apt install qemu-user-static
#ENV MONGOMS_DOWNLOAD_URL=https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2004-7.0.14.tgz

# npm install
#COPY package*.json ./
#RUN npm install --save-dev

# npm build
#COPY tsconfig*.json ./
#RUN npm run build

# copy dist
#COPY dist /app/dist

# copy
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY public ./public

# build
RUN npm install --save-dev
RUN npm run build

# expose
EXPOSE 8080

# command
ENTRYPOINT ["npm", "run", "start:prod"]
