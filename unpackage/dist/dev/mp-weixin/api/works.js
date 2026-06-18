"use strict";
const request_index = require("../request/index.js");
function getList() {
  return request_index.request({
    url: "works/index",
    method: "GET"
  });
}
function getWorksDetail(data) {
  return request_index.request({
    url: "works/detail",
    method: "POST",
    data
  });
}
exports.getList = getList;
exports.getWorksDetail = getWorksDetail;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/works.js.map
