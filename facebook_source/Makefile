NODE=/usr/bin/node
compressed_files=$(wildcard compressed/*.js)
sources_makefiles=$(patsubst compressed/%.js, sources/%/Makefile, $(compressed_files))

all:$(sources_makefiles)

sources/%/Makefile:compressed/%.js create_makefile.js Makefile
	mkdir -p "sources/$*"
	$(NODE) create_makefile.js "$<" > "$@"
	cd "sources/$*" && $(MAKE)

clear:
	rm -rf sources

.PHONY: all clear
