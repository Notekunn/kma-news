# Hướng dẫn sử dụng

- Chạy dev front end

```bash
yarn frontend start
```

- Chạy dev backend

```bash
yarn backend start
```

- Add package dependencies

```bash
yarn <frontend|backend> add <package>
```

- Chạy dev docker

```bash
docker compose up --build backend
```

- Seed data

```bash
docker compose run seed
```

- Khi renew letencrypt nhớ tắt auto https đi

```
docker-compose -f docker-compose.dev.yml build
docker tag kma-news-crawler notekunn/kma-news-crawler
docker push notekunn/kma-news-crawler
```
