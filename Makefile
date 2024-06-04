
subdirs = \
	lib/ucdp.uu.se/ged231-csv.zip \
	lib/download.geofabrik.de/asia/japan/kanto

all: $(subdirs)

clean: $(subdirs)

$(subdirs):
	$(MAKE) -C $@ $(MAKECMDGOALS)
