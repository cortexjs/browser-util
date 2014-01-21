-include config.mk

test:
	node test/simple/test-util.js
	node test/simple/test-util-log.js
	node test/simple/test-util-inspect.js
	node test/simple/test-util-format.js

.PHONY: test