help:
	@echo ""
	@echo "Please use 'make <target>' where <target> is one of"
	@echo ""
	@echo "  install    to install npm packages"
	@echo "  start      to start the application"
	@echo "  start-dev  to start the application with debug enabled"
	@echo "  build      to build the application (gulp)"
	@echo "  watch      to launch gulp 'watch' task"
	@echo ""

install:
	npm install
	bower install
	./bin/install-neo4j.sh

start-neo:
	./neo4j/bin/neo4j start

stop-neo:
	./neo4j/bin/neo4j stop

start:
	node --harmony index.js

start-dev:
	DEBUG=* node --harmony index.js

build:
	gulp

watch:
	gulp && gulp watch
