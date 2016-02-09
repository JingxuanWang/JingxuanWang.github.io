server:
	jekyll serve --port 8000 --watch --incremental
clean:
	rm -rf _site && rm -f .jekyll-metadata
