import request from "@/request/index.js"

/**
 * 获取预览信息
 */
export function getPhotoData(data) {
	return request({
		url: 'user/photo',
		data:data,
		method: "POST"
	})
}

export function getSubmitData(data) {
	return request({
		url: 'user/appoint_photo',
		data:data,
		method: "POST"
	})
}
export function photoList(data) {
	return request({
		url: 'user/user_photo',
		data:data,
		method: "POST"
	})
}
export function updateName(data) {
	return request({
		url: 'user/nickname',
		data:data,
		method: "POST"
	})
}

export function getInfo(data) {
	return request({
		url: 'user/info',
		data:data,
		method: "POST"
	})
}