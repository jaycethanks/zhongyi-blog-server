#! /bin/bash
docker run \
-itd --name mysql-blog \
-p 3396:3306 \
-e MYSQL_ROOT_PASSWORD=123456 \
-v /home/jayce/softwares/dockerData/mysql8/log:/var/log/mysql \
-v /home/jayce/softwares/dockerData/mysql8/data:/var/lib/mysql \
-v /home/jayce/softwares/dockerData/mysql8/conf:/etc/mysql/conf \
-v /home/jayce/softwares/dockerData/mysql8/mysql-files:/var/lib/mysql-files \
mysql