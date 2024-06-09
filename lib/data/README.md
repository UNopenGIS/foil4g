# lib/data Directory

This directory contains YAML files that define various geospatial data sources. Each YAML file includes several fields that describe the data source's characteristics. Below is a description of each field:

- `data_id`: A unique identifier for the data source.
- `license`: The license under which the data is made available.
- `attributions`: Credits or attributions required by the data provider.
- `description`: A brief description of the data source.
- `file_format`: The format of the data files (e.g., png, pbf).
- `file_size`: The size of the data file, if known.
- `url`: The URL where the data can be accessed.
- `max_zoom`: The maximum zoom level available for tile-based data sources.
- `min_zoom`: The minimum zoom level available for tile-based data sources.

## Examples

Here are some examples to help you understand how to use these fields:

- `data_id`: "gsi_xyz_english"
- `license`: "CC-BY-4.0"
- `attributions`: ["Geospatial Information Authority of Japan (GSI)", "https://maps.gsi.go.jp/development/ichiran.html"]
- `description`: "The English version of the GSI's basic map (tile)"
- `file_format`: "png"
- `file_size`: "unknown"
- `url`: "https://cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png"
- `max_zoom`: 11
- `min_zoom`: 5

Please replace the placeholders in the `url` field with appropriate values to access the data.
