# data_id: geofabrik_osm_japan_kanto
# license: ODbL
# attribution: OpenStreetMap contributors
# file_size: 376MB
FILE_NAME = japan-latest.osm.pbf
URL = https://download.geofabrik.de/asia/japan/kanto/$(FILE_NAME)
WORK_DIR = ./tmp

# action_type: download
# description: Download the PBF file from the Geofabrik website
# required: true
$(WORK_DIR)/$(FILE_NAME):
	mkdir -p $(WORK_DIR)
	wget $(URL) -O $(WORK_DIR)/$(FILE_NAME)