export default function $http(options) {
	const { name, data } = options;
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name,
			data
		}).then((res) => {
			console.log('res')
			console.log(res)
			reslove(res)
		}).catch((err) => {
			reject(err)
		})
	})
}