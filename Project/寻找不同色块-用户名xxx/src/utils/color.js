/**
 * @param transparency 透明度
 * @returns {{color: string, similarityColor: string}}
 */
export function getRandomColors(transparency = 0.9) {
    const result = [];
    for (let i = 0; i < 3; i++) {
        result.push(Math.floor(Math.random() * 255));//获取0-255之间的随机数
    }
    const color = `rgba(${result.toString()})`
    const similarityColor = `rgba(${result.toString()},${transparency})`
    return { color, similarityColor }
}
