Moved to [here](https://github.com/kma-academy/kma-news)
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

- Build image và push

```
docker-compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml push
```

- Deploy vps

```
docker compose -f docker-compose.prod.yml up
```
