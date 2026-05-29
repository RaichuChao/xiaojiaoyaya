import request from "@/request/index.js"



export function getSamplesData() {
	return request({
		url: 'works/samples',
		method: "GET"
	})
}
export function getWorksDetail(data) {
	return request({
		url: 'works/detail',
		method: 'POST',
		data: data
	})
}
