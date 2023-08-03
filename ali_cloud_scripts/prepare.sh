#! /bin/bash
# 环境准备 (服务器首次准备)

# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash #执行完毕需要重启 terminal

# 查看 node 可获取版本
# nvm ls-remote

# 安装最新并 use lts版本 (# node >= 16.16.0)
nvm install v18.17.0 

# 安装 npm 如果没有
sudo apt install npm

# 安装 nrm
npm i nrm -g

# 切换淘宝源
nrm use taobao

# 安装 pnpm
npm i pnpm -g

# alias pnpm
cat alias p='pnpm' >> ~/.bash_aliases
source ~/.bash_aliases

# 安装 ts-node
npm i ts-node -g