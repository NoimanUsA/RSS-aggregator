install:
	npm ci
	
lint: 
	npm run lint

build:
	npm run build

run:
	npm run run

test:
	npx jest test

stupid: 
	git add *
	git commit -m 'form'
	git push