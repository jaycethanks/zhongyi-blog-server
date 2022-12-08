#! /bin/bash

bash ./run_mysql_docker.sh
npx prisma db push
yarn install
yarn run start:dev
