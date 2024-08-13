run:
	docker restart site-layout-db && npm run dev

lint:
	npm run lint

npm-install:
	npm install && npm install -D

db-create:
	docker run --name site-layout-db -p 8080:8080 -d ghcr.io/tursodatabase/libsql-server:latest

db-up:
	docker restart site-layout-db

db-down:
	docker stop site-layout-db

db-clean:
	docker stop site-layout-db && docker rm site-layout-db || true

migrations:
	npm run generate

migrate:
	npm run migrate

drizzle-studio:
	npx drizzle-kit studio

local: db-clean npm-install db-create migrations migrate run
