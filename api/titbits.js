import request from "@/request/index.js"

export function getTitbitsData() {
	return request({
		url: 'works/titbits',
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
