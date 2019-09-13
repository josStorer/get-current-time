# Current Time Javascript Action

This action sets the current ISO8601 time to the `time` output. Useful for setting build times in subsequent steps, or keeping the same recorded time for the entire workflow.

## Outputs

### `time`

The UTC time when this step was run.

## Example usage

```yaml
steps:
- name: Get current time
  uses: gerred/actions/current-time@master
  id: current-time
- name: Use current time
  env:
    TIME: "${{ steps.current-time.outputs.time }}"
  run: echo $TIME
```