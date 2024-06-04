# data_id: ucdp-ged-23_1
# license: CC-BY-4.0
# attribution: UCDP
# file_size: 23MB
FILE_NAME = ged231-csv.zip
UNZIPED_FILE_NAME = GEDEvent_v23_1.csv
URL = https://ucdp.uu.se/downloads/ged/$(FILE_NAME)
WORK_DIR = ./tmp

all: $(WORK_DIR)/$(UNZIPED_FILE_NAME)

clean:
	rm -rf $(WORK_DIR)/$(FILE_NAME) $(WORK_DIR)/$(UNZIPED_FILE_NAME)

# action_type: download
# description: Download the zip file from the UCDP website
# required: true
$(WORK_DIR)/$(FILE_NAME):
	mkdir -p $(WORK_DIR)
	wget $(URL) -O $(WORK_DIR)/$(FILE_NAME)

# action_type: unzip
# description: Unzip the downloaded file
# required: true
$(WORK_DIR)/$(UNZIPED_FILE_NAME): $(WORK_DIR)/$(FILE_NAME)
	unzip $(FILE_NAME) -d $(WORK_DIR)

# action_type: import_to_postgis
# description: Import the data to the PostGIS database
# required: false
.PHONY: ogr2ogr-ucdp-ged
ogr2ogr-ucdp-ged: $(WORK_DIR)/$(UNZIPED_FILE_NAME)
	ogr2ogr \
		-overwrite \
		-f "PostgreSQL" PG:"dbname=tileserv user=postgres password=postgres host=localhost port=54321" \
		-oo AUTODETECT_TYPE=YES \
		-oo GEOM_POSSIBLE_NAMES=geom_wkt \
		-oo X_POSSIBLE_NAMES=longitude \
		-oo Y_POSSIBLE_NAMES=latitude \
		-a_srs EPSG:4326 \
		-lco FID=id \
		-nln "ucdp_ged" \
		--config PG_USE_COPY YES \
		--debug ON \
		$(WORK_DIR)/$(UNZIPED_FILE_NAME)
