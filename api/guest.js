import request from "@/request/index.js"

/**
 * 获取预览信息
 */
export function getCategoryData() {
	return request({
		url: 'index/category',
		method: "GET"
	})
}

export function getGuestData(data) {
	return request({
		url: 'works/guest',
		method: 'POST',
		data: data
	})
}

export function getGuestDetail(data) {
	return request({
		url: 'works/detail',
		method: 'POST',
		data: data
	})
}
export function getGuestAll() {
	return request({
		url: 'works/guest_all',
		method: 'POST',
	})
}

