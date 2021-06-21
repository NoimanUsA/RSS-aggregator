install:
	npm ci
	
lint: 
	npm run lint

build:
	npm run build

run:
	npm run run

deploy:
	npm ci
	npm run build
	npm run deploy
	