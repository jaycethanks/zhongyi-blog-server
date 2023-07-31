# Base image
FROM node:alpine AS deps

# Create app directory
WORKDIR /usr/src/app
# 安装 libc6-compat 库，这是一个兼容性库，用于在 Alpine Linux 上运行使用 glibc 编译的程序
RUN apk add --no-cache libc6-compat

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install -g pnpm
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/
# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN pnpm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
