FROM node:16-slim as base

WORKDIR /home/node/app

RUN  apt-get update -y && apt-get -y -qq install cron

COPY ["package.json", "./"]

RUN yarn install

COPY . .

# RUN yarn build

COPY crontab /etc/cron.d/crawl-cron

RUN chmod 0644 /etc/cron.d/crawl-cron && touch /var/log/cron.log && crontab /etc/cron.d/crawl-cron

# RUN echo "cron" >> /etc/bash.bashrc

# CMD /bin/bash
CMD echo "Start crawler" && crontab /etc/cron.d/crawl-cron && cron && tail -f /var/log/cron.log