'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	
	const dbName = event.dbName //集合表名
	const search = event.search //搜索
	const tags = event.tags //搜索
	const random = event.random // 随机抽取1条数据
	const order = event.order ? event.order : {} //排序
	const filter = event.filter ? event.filter : {} //筛选条件
	const pageIndex = event.pageIndex ? event.pageIndex : 1 //当前页数
	const pageSize = event.pageSize ? event.pageSize : 15 //每页数量
	
	let countResult = {}
	if(search){
		countResult = await db.collection(dbName).where({
			"name": new RegExp(search,'i'),
			"status": 1
		}).count()
	}else if(tags){
		countResult = await db.collection(dbName).where({
			"tags": new RegExp(tags,'i'),
			"status": 1
		}).count()
	}else if(random){
		countResult = await db.collection(dbName).aggregate().sample({ size: 1 }).limit(1).end()
	}else{
		countResult = 1
	}
	const total = countResult.total  //得到总记录数 
	const totalPage = Math.ceil(total / pageSize)  //计算页数
	
	let hasMore  //提示前端是否还有数据
	if (pageIndex > totalPage || pageIndex == totalPage) {  //如果没有数据了，就返回false
			hasMore = false 
		} else {
			hasMore = true 
	}
	
	let result = {}
	if(search){
		result = await db.collection(dbName)
		.where({
			"name": new RegExp(search,'i'),
			"status": 1
		})
		.skip((pageIndex - 1) * pageSize)
		.limit(pageSize)
		.get()
	}else if(tags){
		result = await db.collection(dbName)
		.where({
			"tags": new RegExp(tags,'i'),
			"status": 1
		})
		.skip((pageIndex - 1) * pageSize)
		.limit(pageSize)
		.get()
	}else if(random){
		result = await db.collection(dbName).aggregate().sample({ size: 1 }).limit(1).end()
	}else{
		if(order.name && order.type){
			result = await db.collection(dbName)
			.where(filter)
			.skip((pageIndex - 1) * pageSize)
			.limit(pageSize)
			.orderBy(order.name,order.type)
			.get()
		}else{
			result = await db.collection(dbName)
			.where(filter)
			.skip((pageIndex - 1) * pageSize)
			.limit(pageSize)
			.get()
		}
	}
	result.hasMore = hasMore
	return result
};
