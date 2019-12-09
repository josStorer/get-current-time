const core = require("@actions/core");
const github = require("@actions/github");
var moment = require('moment');

try {
  const time = new Date().toISOString();
  core.setOutput("time", time);

  const format = core.getInput('format', { required: false });
  core.setOutput("formattedTime", moment().format(format));
} catch (error) {
  core.setFailed(error.message);
}
