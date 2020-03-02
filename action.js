const core = require("@actions/core");
var moment = require('moment');

function action() {
    try {
        const time = new Date().toISOString();
        core.setOutput("time", time);

        const format = core.getInput('format', { required: false });
        const utcOffset = core.getInput('utcOffset', { required: false });
        core.setOutput("formattedTime", moment().utcOffset(utcOffset).format(format));
    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = action;
