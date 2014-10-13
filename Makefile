test:
	mocha --reporter spec --require should --ui bdd --timeout 12000 test

.PHONY: test
