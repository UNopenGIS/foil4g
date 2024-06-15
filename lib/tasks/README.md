# lib/tasks Directory

This directory contains YAML files that define various tasks related to geospatial data processing. Each YAML file includes several fields that describe the task's characteristics. Below is a description of each field:

## Required Fields

- `task_id`: A unique identifier for the task.
- `description`: A brief description of the task and its purpose.
- `goal`: The goal or objective of the task.
- `input`: A list of input data sources or parameters required for the task, including:
  - `data_id` or `api_id`: The unique identifier of the input data source.
  - `description`: A brief description of the input data source.
- `steps`: A list of steps or instructions to complete the task, including:
  - `description`: A brief description of the step.
  - `command`: The command or script to execute for the step.

## Contributing

If you know of a task that should be included in this directory, please consider contributing by adding a new YAML file for the task. Follow the guidelines outlined in this README and ensure that all required fields are filled out. For more information on how to contribute, please refer to the [CONTRIBUTING.md](../CONTRIBUTING.md) file.


