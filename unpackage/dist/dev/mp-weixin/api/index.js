"use strict";
const request_index = require("../request/index.js");
function getHomeData() {
  return request_index.request({
    url: "/index/index",
    method: "GET"
  });
}
exports.getHomeData = getHomeData;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/index.js.map
