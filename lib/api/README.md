# lib/api Directory

This directory contains YAML files that define various API endpoints for accessing geospatial data. Each YAML file includes several fields that describe the API's characteristics. Below is a description of each field:

## Required Fields

- `api_id`: A unique identifier for the API.
- `description`: A brief description of the API and its purpose.
- `endpoint_url`: The URL where the API can be accessed.
- `parameters`: A list of parameters that the API accepts, including:
  - `name`: The name of the parameter.
  - `description`: A brief description of what the parameter does.
  - `required`: Whether the parameter is required or optional.
  - `type`: The type of the parameter (e.g., string, integer, float).

## Optional Fields

- `license`: License of the API.

The purpose of the `lib/api` directory is to provide a centralized location for API definitions that can be used to access geospatial data. By documenting these APIs in a consistent format, we aim to make it easier for developers and researchers to discover and utilize these resources.

## Contributing

If you know of an API that should be included in this directory, please consider contributing by adding a new YAML file for the API. Follow the guidelines outlined in this README and ensure that all required fields are filled out. For more information on how to contribute, please refer to the [CONTRIBUTING.md](../CONTRIBUTING.md) file.
