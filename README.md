[![Test the action workflow](https://github.com/josStorer/get-current-time/workflows/Test%20the%20action/badge.svg)](https://github.com/josStorer/get-current-time/actions?query=workflow:"Test+the+action")
[![Codecov](https://codecov.io/gh/josStorer/get-current-time/graph/badge.svg)](https://codecov.io/gh/josStorer/get-current-time)
[![GitHub release](https://img.shields.io/github/release/josStorer/get-current-time.svg)](https://github.com/josStorer/get-current-time/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-get--current--time-blue?logo=github)](https://github.com/marketplace/actions/get-current-time)
[![Repo contributors](https://img.shields.io/github/contributors/josStorer/get-current-time.svg)](https://github.com/josStorer/get-current-time/graphs/contributors)
[![Open issues](https://img.shields.io/github/issues-raw/josStorer/get-current-time)](https://github.com/josStorer/get-current-time/issues?q=is%3Aissue+is%3Aopen)
[![Solved issues](https://img.shields.io/github/issues-closed-raw/josStorer/get-current-time/solved?color=4bc51d&label=solved%20issues)](https://github.com/josStorer/get-current-time/issues?q=is%3Aissue+label%3Asolved)

# Get Current Time Github Action

This action sets the current ISO8601 time to the `time` output and also provides `readableTime`, `formattedTime`, and many more digital outputs like `year`, `day`, `second`, etc. Useful for setting build times in subsequent steps, renaming your artifact, or keeping the same recorded time for the entire workflow.

## Inputs

### `format`

Time format to use - using [MomemtJS format syntax](https://momentjs.com/docs/#/displaying/format/) - optional

### `utcOffset`

UTC offset to use - using [MomemtJS utcOffset syntax](https://momentjs.com/docs/#/manipulating/utc-offset/) - optional

## Outputs

### `time`

The ISO time this action was run, **not** affected by the parameter `utcOffset`  e.g. '2020-01-01T00:30:15.000Z'

### `ISOTime`

Same as `time`

### `readableTime`

Human-friendly time - affected by the parameter `utcOffset`  e.g. 'Wed Jan 01 2020 08:30:15 GMT+0800'

### `formattedTime`

The time this action was run - formatted using `format` and `utcOffset` inputs

### `year,month,day,hour,minute,second,millisecond`

Digital outputs, just as names

## Example usage

```yaml
steps:
  - name: Get current time
    uses: josStorer/get-current-time@v2.0.2
    id: current-time
    with:
      format: YYYYMMDD-HH
      utcOffset: "+08:00"
  - name: Use current time
    env:
      TIME: "${{ steps.current-time.outputs.time }}"
      R_TIME: "${{ steps.current-time.outputs.readableTime }}"
      F_TIME: "${{ steps.current-time.outputs.formattedTime }}"
      YEAR: "${{ steps.current-time.outputs.year }}"
      DAY: "${{ steps.current-time.outputs.day }}"
    run: echo $TIME $R_TIME $F_TIME $YEAR $DAY
```

## Run locally

### First

```
npm install
```

### Test

```
npm test
```

And you'll see the console output as following:

***

**PASS**  ./action.test.js

&ensp;&ensp;action
  
  &ensp;&ensp;&ensp;&ensp;**√** Should load (1 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should run with basic functionality (1 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should run with other basic outputs (1 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should pass format inputs (1 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should throw error (1 ms)


| File            | %&nbsp;Stmts | %&nbsp;Branch | %&nbsp;Funcs | %&nbsp;Lines | Uncovered&nbsp;Line&nbsp;#s |
|-----------------|--------------|---------------|--------------|--------------|-----------------------------|
| All files       | 100          | 100           | 100          | 100          |                             |
| &nbsp;action.js | 100          | 100           | 100          | 100          |                             |

Test Suites: **1 passed**, 1 total

Tests:       **5 passed**, 5 total

Snapshots:   0 total

Time:        1 s

Ran all test suites.

***

### Build

```
npm start
```

And you'll see the index.js is generated in the dist folder

## Credit

This project is forked from [srfrnk/current-time](https://github.com/srfrnk/current-time) and detached since 14 December of 2022
