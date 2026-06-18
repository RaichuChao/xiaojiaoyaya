"use strict";
const request_index = require("../request/index.js");
function getShootwayData() {
  return request_index.request({
    url: "reservation/index",
    method: "GET"
  });
}
function SubmitData(data) {
  return request_index.request({
    url: "reservation/appoint",
    method: "POST",
    data
  });
}
function getConfig() {
  return request_index.request({
    url: "reservation/wayConfig",
    method: "GET"
  });
}
exports.SubmitData = SubmitData;
exports.getConfig = getConfig;
exports.getShootwayData = getShootwayData;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/reservate.js.map
