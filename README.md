Внутриигровой банкомат для GTA 5 RP, реализующий:

Снятие, пополнение, перевод средств между игроками

Просмотр баланса и истории операций

Данные хранятся в PostgreSQL

Использован стек: Node.js (Express) + TypeScript + PostgreSQL (pg, без ORM)

Требования:

Node.js 18+

Docker

Для запуска проекта требуется:

Установка зависимостей:

npm install

Запустить PostgreSQL через Docker:

docker compose up -d

Создать и настроить .env в корне проекта

"Пример как он должен выглядить"
PGHOST=127.0.0.1
PGPORT=5432
PGDATABASE=gta_rp_atm
PGUSER=postgres
PGPASSWORD=postgres

провести миграцию 

npm run migrate

дальше запустить сервер 

npm run dev

Описание всех эндпоинтов для проверки работоспособности

| Метод | URL                      | Описание               | Тело запроса (пример)                               |
| ----- | ------------------------ | ---------------------- | --------------------------------------------------- |
| POST  | `/atm/deposit`           | Пополнение баланса     | `{ "username": "vasya", "amount": 500 }`            |
| POST  | `/atm/withdraw`          | Снятие средств         | `{ "username": "vasya", "amount": 200 }`            |
| POST  | `/atm/transfer`          | Перевод другому игроку | `{ "from": "vasya", "to": "petya", "amount": 100 }` |
| GET   | `/atm/balance/:username` | Узнать баланс          | —                                                   |
| GET   | `/atm/history/:username` | История операций       | —                                                   |

Список всех нужных комманд

1. npm install
2. docker compose up -d
3. npm run migrate
4. npm run dev