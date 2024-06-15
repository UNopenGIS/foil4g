
SUBDIRS = \
	./lib/tasks/opencellid_full/pmtiles/Makefile \
	./lib/tasks/ucdp_ged_23_1/pmtiles/Makefile

all: $(SUBDIRS)

$(SUBDIRS): FORCE
	$(MAKE) -f $@ $(MAKECMDGOALS)

FORCE:
