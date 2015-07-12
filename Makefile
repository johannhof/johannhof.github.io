build: clean
	cobalt build -s ./__content__ -d ./ --posts blog

clean:
	ls . | grep -v __content__ | grep -v README.md  | grep -v Makefile | xargs  rm -rf
