import request from "@/request/index.js"



export function getShootwayData() {
	return request({
		url: 'reservation/index',
		method: "GET"
	})
}
export function SubmitData(data) {
	return request({
		url: 'reservation/appoint',
		method: 'POST',
		data: data
	})
}
export function getImage(data) {
	return request({
		url: 'reservation/image',
		method: 'POST',
		data: data
	})
}
export function getConfig() {
	return request({
		url: 'reservation/wayConfig',
		method: 'GET',
	
	})
}