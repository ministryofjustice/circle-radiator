FROM node:12.13.0
MAINTAINER probation-in-court-team@digital.justice.gov.uk

ENV TZ=Europe/London
RUN ln -snf "/usr/share/zoneinfo/$TZ" /etc/localtime && echo "$TZ" > /etc/timezone

RUN mkdir -p /app
WORKDIR /app

COPY package*.json yarn*.lock ./

RUN yarn

COPY . .

EXPOSE 3000
ENV NODE_ENV='production'
USER 2000

CMD [ "yarn", "start" ]
