# Current Time Javascript Action

This action sets the current ISO8601 time to the `time` output. Useful for setting build times in subsequent steps, or keeping the same recorded time for the entire workflow.

## Outputs

### `time`

The UTC time when this step was run.

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
