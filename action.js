const core = require('@actions/core')
const moment = require('moment-timezone')

function action() {
    try {
        const utcOffset = core.getInput('utcOffset', {required: false})
        const format = core.getInput('format', {required: false})
        const timezone = core.getInput('timezone', {required: false})

        let time = moment()
        if (timezone)
            time = time.tz(timezone)
        else if (utcOffset)
            time = time.utcOffset(utcOffset)
        else
            time = time.utcOffset('+00:00')

        core.setOutput('time', time.toISOString())
        core.setOutput('ISOTime', time.toISOString())
        core.setOutput('readableTime', time.toString())
        core.setOutput('formattedTime', time.format(format))

        let [year, month, day, hour, minute, second, millisecond] = time.toArray()
        month = Number(month) + 1
        core.setOutput('year', year)
        core.setOutput('month', month)
        core.setOutput('day', day)
        core.setOutput('hour', hour)
        core.setOutput('minute', minute)
        core.setOutput('second', second)
        core.setOutput('millisecond', millisecond)
    } catch (error) {
        core.setFailed(error.message)
    }
}

module.exports = action