import request from "@/request/index.js"

/**
 * 获取预览信息
 */
export function getOrderData(data) {
	return request({
		url: 'order/reservate',
		data:data,
		method: "POST"
	})
}

export function getPhotoData(data) {
	return request({
		url: 'order/photo',
		data:data,
		method: "POST"
	})
}
export function getPhotoDetailData(data) {
	return request({
		url: 'order/photo_detail',
		data:data,
		method: "POST"
	})
}
