[![Test the action workflow](https://github.com/1466587594/get-current-time/workflows/Test%20the%20action/badge.svg)](https://github.com/1466587594/get-current-time/actions?query=workflow:"Test+the+action")
[![GitHub release](https://img.shields.io/github/release/1466587594/get-current-time.svg)](https://github.com/1466587594/get-current-time/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-get--current--time-blue?logo=github)](https://github.com/marketplace/actions/get-current-time)

# Get Current Time Github Action

This action sets the current ISO8601 time to the `time` output. Useful for setting build times in subsequent steps, renaming your artifact, or keeping the same recorded time for the entire workflow.

## Inputs

### `format`

Time format to use - using [MomemtJS format syntax](https://momentjs.com/docs/#/displaying/format/) - optional

### `utcOffset`

UTC time offset to use - using [MomemtJS utcOffset syntax](https://momentjs.com/docs/#/manipulating/utc-offset/) - optional

## Outputs

### `time`

The UTC time when this step was run.

### `formattedTime`

The UTC time when this step was run - formatted using `format` input.

## Example usage

```yaml
steps:
  - name: Get current time
    uses: 1466587594/get-current-time@v1
    id: current-time
    with:
      format: YYYYMMDD-HH
      utcOffset: "+08:00"
  - name: Use current time
    env:
      TIME: "${{ steps.current-time.outputs.time }}"
      F_TIME: "${{ steps.current-time.outputs.formattedTime }}"
    run: echo $TIME $F_TIME
```
