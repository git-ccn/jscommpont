/**
 * 
 */
const rules = {
  TELEPHONE: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/, //通用的手机号验证
  EMAIL:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, //通用的匹配邮箱验证
  CARDID: /^\d{17}[\dXx]$/, //通用匹配身份证号
}
// 号码的正则表达式判断
const telePhone = (value) => {
  return rules.TELEPHONE.test(value)
}

// e-mail的正则表达式的判断
const eMail = (value) => {
  return rules.EMAIL.test(value)
}

// 身份证号的正则表达式的判断
const CardId = (value) => {
  return rules.CARDID.test(value)
}

// 自定义的正则表达式
const DIYRule = (value,rule) => {
  if (!(rule instanceof RegExp)) {
    throw new Error('请输入正确的正则表达式')
  }
  return rule.test(value)
} 

const RegularExpression = (value,rules) => {
  console.log('rules');
  return {
    telePhone:()=>telePhone(value),
    eMail:()=>eMail(value),
    CardId:()=>CardId(value),
    DIYRule:()=>DIYRule(value,rules)
  }
}
export default RegularExpression