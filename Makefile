-include config.mk

test:
	./node_modules/.bin/mocha test

.PHONY: test