FROM node:18.12

WORKDIR /user/src/app/client
COPY ./client /user/src/app/client
RUN npx create-next-app@9 client --typescript

CMD ["npm run dev"]