import {
	pinyin
} from 'pinyin-pro';

/**
 * 拼音封装
 * @param {String} word 传入的词语
 * @param {String} pattern 输出的类型
 * @param {String} toneType 输出形式
 * @param {String} type 输出结果类型：字符串/数组
 */
export function convertPinyin(word, pattern = '', toneType = 'string', type = 'array') {
	if (pattern === 'final') {
		toneType = 'none'
	}
	return pinyin(word, {
		pattern,
		toneType,
		type,
		nonZh: 'removed'
	})
}

/**
 * 词语全方位匹配，判断匹配状态
 * @param {String} idiom 输入的四字成语
 * @param {String} pattern 匹配模式initial/final/num
 */
function letterMatch(idiom, pattern) {
	if (!idiom) {
		return;
	}
	const currentIdiom = uni.getStorageSync('currentIdiom')
	const todayIdiom = currentIdiom.word
	let todayLetter = convertPinyin(todayIdiom, pattern)
	let currentLetter = convertPinyin(idiom, pattern)
	// 汉字匹配
	if (pattern === 'term') {
		todayLetter = [...todayIdiom]
		currentLetter = [...idiom]
	}
	const len = currentLetter.length
	// 这里应该添加一个逻辑，不管是哪个部位的匹配，都先匹配一下汉字，如果汉字存在，直接把对应部位status都改为1
	const todayTerms = [...todayIdiom]
	const currentTerms = [...idiom]
	const markers = new Array(len).fill(3)
	const resultLetter = new Array(len).fill({})
	for(let i = 0; i < len; i++) {
		const term = currentTerms[i];
		// todayTerms.indexOf(term)
		if(todayTerms[i] === currentTerms[i]) {
			// 文字字符和位置都完全匹配 故弄玄虚 班门弄斧
			markers[i] = 1
			resultLetter[i] = {
				letter: currentLetter[i],
				status: 1
			}
			todayLetter[i] = ''
		}else if(todayTerms.indexOf(term) !== -1 && markers[currentTerms.indexOf(term)] !== 1) {
			// 文字字符存在&标记对应索引位置不是1
			markers[currentTerms.indexOf(term)] = 2
		}
	}

	for (let i = 0; i < len; i++) {
		let status = markers[i]
		//当前letter在今日成语letter列表中的索引位置
		const index = todayLetter.indexOf(currentLetter[i]);
		if(!todayLetter[i]) {
			continue;
		}
		if (currentLetter[i] === todayLetter[i]) {
			status = 1
			todayLetter[i] = ''
		} else if (index !== -1 ) {
			if(status !== 1) {
				status = 2
			}
			todayLetter[i] = ''
		}
		resultLetter[i] ={
			letter: currentLetter[i],
			status
		}
	}
	return resultLetter
}

/**
 * 四字成语匹配结果
 * @param {Object} idiom
 */
export function idiomMatch(idiom) {
	const initial = letterMatch(idiom, 'initial')
	const final = letterMatch(idiom, 'final')
	const num = letterMatch(idiom, 'num')
	const term = letterMatch(idiom, 'term')
	const index = idiom ? numIndex(convertPinyin(idiom, 'final')) : [0, 0, 0, 0];
	return {
		initial,
		final,
		num,
		term,
		index
	}
}

function convertExhibition(idiom, pattern) {
	const currentLetter = pattern !== 'term'? convertPinyin(idiom, pattern): [...idiom];
	return currentLetter.map(letter => {
		return {
			letter,
			status: 3
		}
	})
}
/**
 * 输出纯展示类型成语&拼音
 * @param {Object} idiom 成语
 */
export function idiomExhibition(idiom) {
	const initial = convertExhibition(idiom, 'initial');
	const final = convertExhibition(idiom, 'final')
	const num = convertExhibition(idiom, 'num')
	const term = convertExhibition(idiom, 'term')
	const index = idiom ? numIndex(convertPinyin(idiom, 'final')) : [0, 0, 0, 0];
	return {
		initial,
		final,
		num,
		term,
		index
	}
}

function numIndex(final) {
	const vowel = ['ɑ', 'o', 'e', 'i', 'u', 'ü']
	const indexList = []
	const len = final.length
	for (let i = 0; i < len; i++) {
		const letter = final[i]
		const arr = [...letter]
		let index = 0
		if (arr.indexOf('a') !== -1) {
			index = arr.indexOf('a')
		} else if (arr.indexOf('o') !== -1) {
			index = arr.indexOf('o')
		} else if (arr.indexOf('e') !== -1) {
			index = arr.indexOf('e')
		} else if ((arr & vowel).length >= 2) {
			index = 1
		}
		indexList.push(index)
	}
	return indexList
}

/**
 * 数字转汉字
 * @param {Number} num 数字
 */
export function convertToChinaNum(num) {
	const arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	const arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']; //可继续追加更高位转换值
	if (!num || isNaN(num)) {
		return "零";
	}
	const english = num.toString().split("")
	let result = "";
	for (let i = 0; i < english.length; i++) {
		const des_i = english.length - 1 - i; //倒序排列设值
		result = arr2[i] + result;
		const arr1_index = english[des_i];
		result = arr1[arr1_index] + result;
	}
	//将【零千、零百】换成【零】 【十零】换成【十】
	result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
	//合并中间多个零为一个零
	result = result.replace(/零+/g, '零');
	//将【零亿】换成【亿】【零万】换成【万】
	result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
	//将【亿万】换成【亿】
	result = result.replace(/亿万/g, '亿');
	//移除末尾的零
	result = result.replace(/零+$/, '')
	//将【零一十】换成【零十】
	//result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
	//将【一十】换成【十】
	result = result.replace(/^一十/g, '十');
	return result;
}

/**
 * 判断时间戳是否是今天
 */
export function isSameDate(time) {
	const currentDate = new Date().toDateString()
	const timeDate = new Date(parseInt(time)).toDateString()
	return currentDate === timeDate
}

function fillZero(num) {
	return num < 10? '0' + num : num;
}
/**
 * 时间戳转日期
 */
export function convertDate(timestamp = null) {
	const time = timestamp? new Date(parseInt(timestamp)): new Date()
	const date = time.toLocaleString().split(' ')[0]
	const [year, month, day] = date.split('/')
	return `${year}年${fillZero(month)}月${fillZero(day)}日`
}