'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const dbName = 'we-record';
	const action = event.action;
	let result = null;
	if (action === 'create') {
		const count = event.count;
		const time = event.time;
		const create_time = new Date().getTime()
		const create_date = new Date().toDateString()
		const client_ip = context.CLIENTIP // 客户端ip信息
		const client_ua = context.CLIENTUA // 客户端user-agent
		const device_id = context.DEVICEID
		result = await db.collection(dbName).add({
			count,
			time,
			create_time,
			create_date,
			client_ip,
			client_ua,
			device_id
		})
	} else if (action === 'pk') {
		const highest = await db.collection(dbName).limit(1).orderBy("count", "desc").get()
		const { count } = highest.data[0]
		result = {
			count
		}
	}
	
	//返回数据给客户端
	return result
};
