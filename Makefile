install:
	npm ci
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx -n '--experimental-vm-modules' jest
test-coverage:
	npx -n '--experimental-vm-modules' jest --bail "--coverage" "--coverageProvider=v8"

.PHONY: test
