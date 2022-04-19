import $http from './http.js'

export const getRandomIdiom = () => {
	const data = {
		dbName: 'we-usually',
		random: 1
	}
	return $http({
		name: 'query_list',
		data
	})
}

export const updatePlayRecord = (params) => {
	// 对局信息
	// count time ua create_time create_date
	const data = {
		...params,
		action: 'create'
	}
	return $http({
		name: 'play_record',
		data
	})
}

export const playRecordCount = () => {
	// 对局信息
	const data = {
		action: 'pk'
	}
	return $http({
		name: 'play_record',
		data
	})
}