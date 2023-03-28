install:
	npm ci

lint:
	npx eslint .

build:
	npm run build

run:
	npx webpack serve