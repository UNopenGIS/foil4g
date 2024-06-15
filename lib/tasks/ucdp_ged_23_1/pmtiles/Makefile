
.PHONY: all
all: tmp/ucdp.uu.se/GEDEvent_v23_1.pmtiles

tmp/ucdp.uu.se/ged231-csv.zip:
	mkdir -p tmp/ucdp.uu.se
	wget https://ucdp.uu.se/downloads/ged/ged231-csv.zip -O tmp/ucdp.uu.se/ged231-csv.zip

tmp/ucdp.uu.se/GEDEvent_v23_1.csv: tmp/ucdp.uu.se/ged231-csv.zip
	unzip -f tmp/ucdp.uu.se/ged231-csv.zip -d tmp/ucdp.uu.se

tmp/ucdp.uu.se/GEDEvent_v23_1.geojson: tmp/ucdp.uu.se/GEDEvent_v23_1.csv
	ogr2ogr \
		-overwrite \
		-f GeoJSON \
		-oo X_POSSIBLE_NAMES=longitude \
		-oo Y_POSSIBLE_NAMES=latitude \
		-a_srs EPSG:4326 \
		--debug ON \
		tmp/ucdp.uu.se/GEDEvent_v23_1.geojson \
		tmp/ucdp.uu.se/GEDEvent_v23_1.csv

tmp/ucdp.uu.se/GEDEvent_v23_1.pmtiles: tmp/ucdp.uu.se/GEDEvent_v23_1.geojson
	tippecanoe \
		-Z1 \
		-z18 \
		-pf \
		-pk \
		-P \
		-o tmp/ucdp.uu.se/GEDEvent_v23_1.pmtiles \
		tmp/ucdp.uu.se/GEDEvent_v23_1.geojson
