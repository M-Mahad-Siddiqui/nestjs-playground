
## Dependencies
- npm install nestjs/mapped-types -D
- npm install class-transformer -D
- npm install class-validator -D

### for Database
nest g module database
nest g service database
nest g resource students
nest g module my-logger
nest g service my-logger

##  Prisma 
- npm install  prisma -D
- npm install @prisma/client -D
- npx prisma init
- npm install @prisma/client
- npx prisma migrate dev --name init   or  npx prisma migrate push(wont save sql statments)   or  npmx prisma migrate deploy(if you are working on local and want to deploy on server)
npx prisma migrate reset    clear all migrations
npx prisma generate  // after changing .sql file
npx prisma migrate dev --name email_unique   // push changing in prisma remote

## dependencies
npm i @nestjs/throttler
npm install @nestjs/config

