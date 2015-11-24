test:
	node_modules/mocha/bin/mocha --reporter spec --require should --ui bdd --timeout 12000 mocha

.PHONY: test
