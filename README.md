# Current Time Javascript Action

This action sets the current ISO8601 time to the `time` output. Useful for setting build times in subsequent steps, or keeping the same recorded time for the entire workflow.

## Inputs

### `format`

Time format to use - using [MomemtJS syntax](https://momentjs.com/) - optional

## Outputs

### `time`

The UTC time when this step was run.

### `formattedTime`

The UTC time when this step was run - formatted using `format` input.

## Example usage

```yaml
steps:
  - name: Get current time
    uses: srfrnk/current-time@master
    id: current-time
    with:
      format: YYYYMMDD
  - name: Use current time
    env:
      TIME: "${{ steps.current-time.outputs.time }}"
      F_TIME: "${{ steps.current-time.outputs.formattedTime }}"
    run: echo $TIME $F_TIME
```
