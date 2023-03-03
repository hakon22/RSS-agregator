install:
	npm install

lint:
	npx eslint .

test:
	npm test

build:
	npm run build

run:
	npx webpack serve

.PHONY: test