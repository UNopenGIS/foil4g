# lib/data Directory

This directory contains YAML files that define various geospatial data sources. Each YAML file includes several fields that describe the data source's characteristics. Below is a description of each field:

## Required Fields

- `data_id`: A unique identifier for the data source.
- `license`: The license under which the data is made available.
- `attributions`: Credits or attributions required by the data provider.
- `description`: A brief description of the data source.
- `file_format`: The format of the data files (e.g., png, pbf).
- `file_size`: The size of the data file, if known.
- `url`: The URL where the data can be accessed.

## Optional Fields

- `max_zoom`: The maximum zoom level available for tile-based data sources.
- `min_zoom`: The minimum zoom level available for tile-based data sources.

Please ensure that all mandatory fields are filled out for each YAML file in this directory. Optional fields should be included if applicable and available.
