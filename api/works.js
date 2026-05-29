import request from "@/request/index.js"



export function getList() {
	return request({
		url: 'works/index',
		method: "GET"
	})
}
export function getWorksDetail(data) {
	return request({
		url: 'works/detail1',
		method: 'POST',
		data: data
	})
}
export function photo(data) {
	return request({
		url: 'user/photo',
		method: 'POST',
		data: data
	})
}
export function getLove(data) {
	return request({
		url: 'works/love',
		method: 'POST',
		data: data
	})
}
