install:
	npm ci

lint:
	npx eslint .

build:
	npx webpack

run:
	npx webpack serve