
.PHONY: all
all: tmp/opencellid.org/cell_towers.pmtiles

tmp/opencellid.org/cell_towers.csv.gz:
	mkdir -p tmp/opencellid.org
	wget https://opencellid.org/downloads/cell_towers.csv.gz -O tmp/opencellid.org/cell_towers.csv.gz

tmp/opencellid.org/cell_towers.csv: tmp/opencellid.org/cell_towers.csv.gz
	gunzip -c tmp/opencellid.org/cell_towers.csv.gz > tmp/opencellid.org/cell_towers.csv

tmp/opencellid.org/cell_towers.geojson: tmp/opencellid.org/cell_towers.csv
	ogr2ogr \
		-overwrite \
		-f GeoJSON \
		-oo X_POSSIBLE_NAMES=lon \
		-oo Y_POSSIBLE_NAMES=lat \
		tmp/opencellid.org/cell_towers.geojson \
		tmp/opencellid.org/cell_towers.csv

tmp/opencellid.org/cell_towers.pmtiles: tmp/opencellid.org/cell_towers.geojson
	tippecanoe \
		-Z1 \
		-z18 \
		-pf \
		-pk \
		-P \
		-o tmp/opencellid.org/cell_towers.pmtiles \
		tmp/opencellid.org/cell_towers.geojson
