const requireAPI = require.context(
	// ./api 目录的相对路径
	'.',
	// 判断是否查询子目录
	false,
	// 使用正则判断.js文件后缀
	/.js$/
)

let module = {}; // 导出模块对象
requireAPI.keys().forEach((key,index) => {
  // 使用forEach对所有的文件进行检索，但不需要检索index.js
	if(key === './index.js') 
    return;
  // 将对应的key绑定到moudule里导出
	Object.assign(module,requireAPI(key))
})

export default module