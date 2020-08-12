const core = require("@actions/core");
var moment = require('moment');

function action () {
    try {
        const utcOffset = core.getInput('utcOffset', { required: false });
        const format = core.getInput('format', { required: false });

        const time = moment().utcOffset(utcOffset);

        core.setOutput("time", time.toISOString());
        core.setOutput("ISOTime", time.toISOString());
        core.setOutput("readableTime", time.toString());
        core.setOutput("formattedTime", time.format(format));

        let [year, month, day, hour, minute, second, millisecond] = time.toArray();
        month = String(Number(month) + 1);
        core.setOutput("year", year)
        core.setOutput("month", month)
        core.setOutput("day", day)
        core.setOutput("hour", hour)
        core.setOutput("minute", minute)
        core.setOutput("second", second)
        core.setOutput("millisecond", millisecond)
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = action;
