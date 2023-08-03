# 环境准备

cd .. 
# 安装开发环境依赖
p i #pnpm install 
# 首次需要通过 prisma 生成数据库
npx prisma migrate deploy
# 创建一个博客用户
ts-node create-a-user.ts

# python3 cnblog/sqlite_to_mysql.py
apt install python3-pip
pip install pymysql