build:
	docker compose build

build-fresh:
	docker compose build --no-cache

run:
	docker compose up

# lint:
# 	docker compose run --rm site-layout-app npm run lint

shell:
	docker compose run --rm site-layout-app bash

install-deps:
	docker compose run --rm site-layout-app npm install

install-dev:
	npm install && npm install -D

db:
	# set up a local db