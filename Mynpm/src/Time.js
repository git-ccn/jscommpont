import moment from "moment"
/**
 * 
 * @param {*moment时间} time 
 * @returns 日期＋时间格式
 */
  const YMDHMS = (time) => {
    return time.format('YYYY-MM-DD hh:mm:ss')
  }
  const YMDHM = (time) => {
    return time.format('YYYY-MM-DD hh:mm')
  }

/**
  * 
  * @param {*moment时间} time 
  * @returns 日期的格式
  */
// 转换成 YYYY-MM-DD
  const YMD = (time) => {
    return time.format('YYYY-MM-DD')
  }
// 转换成YYYY-DD
  const YM = (time) => {
    return time.format('YYYY-MM')
  }
// 转换成YYYY
  const Y = (time) => {
    return time.format('YYYY')
  }
// 转换成MM-DD
  const MD = (time) => {
    return time.format('MM-DD')
  }


// 时间格式化的转换
const TimeConversion = (timee)=> {
  const time = !timee ? moment(new Date()) : 
  timee instanceof moment ? timee : moment(timee)
  return {
    YMDHMS:()=> YMDHMS(time),
    YMDHM:()=> YMDHM(time),
    YMD:()=> YMD(time),
    YM:()=> YM(time),
    Y:()=> Y(time),
    MD:()=> MD(time),
  }
}
export default TimeConversion
