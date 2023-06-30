import axios from "axios";

/**
 * @param {*基础链接地址} baseURL,
   @param {*token值} token,
   @param {*响应时间} timeout = 3000,
   @param {*错误处理信息} codeMessage = {
    code:401,
    location:'/index', //跳转页面
    type: 'tips', //默认 tips 无需确认
    MessageToken  //错误处理方法
   },
   @param {*token错误处理信息} errMessage,
   @param {*响应后拦截所处理的信息 Arrary[object]} resMessage = [{code,messageInfo],
   @param {*自主定义的请求前拦截  function} HandleOther 
 */

const AxiosWrap = (props) => {
  const {
    baseURL,
    token,
    codeMessage = {
      code:401,
      location:'/index',
      type: 'tips', //默认 tips 无需确认
      MessageToken:()=>{}
    },
    timeout = 3000,
    errMessage,
    resErrorMessage,
    HandleOther
  } = props
  // 默认url
  const defaultUrl = axios.create({
    baseURL,
    timeout,
  })
  // 请求前的拦截
  defaultUrl.interceptors.request.use(
    (config)=>{
      if (token) {
        const tokenHeard = token.split(' ')[0] === 'Bearer' ? token : `Bearer ${token}`
        config.headers.Authorization = tokenHeard
      }
      // 其他的请求拦截
      HandleOther && HandleOther()
      return config
    },
    (error)=>{
      errMessage(error.message)
      return Promise.reject(error)
    }
  )

  // 响应后的拦截
  defaultUrl.interceptors.response.use(
    (res)=>{
      const _code = res.data.code
      const _message = res.data.message || res.data.msg || res.data
      let _promiseMessage
      // 错误处理信息
      resErrorMessage.forEach(element => {
      const { code, messageInfo } = element
        if (_code === code) {
          const msg = messageInfo(_message)
          _promiseMessage = Promise.reject(msg || _message)
        }
      });

      // 验证token是否过期
      if (_code === codeMessage.code) {
        if (codeMessage.type === 'tips') {
          location.href = codeMessage.location;
          codeMessage.MessageToken()
        }else{
          codeMessage.MessageToken()
        }
        _promiseMessage = Promise.reject('无效的会话，或者会话已过期，请重新登录。')
      }
      if (!_promiseMessage) {
        return res
      }else{
        return _promiseMessage
      }
    },
    (error)=>{
      let { message } = error;
      if (message == "Network Error") {
        message = "后端接口连接异常";
      } else if (message.includes("timeout")) {
        message = "系统接口请求超时";
      } else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
      errMessage(message)
      return Promise.reject(error)
    }
  )
  return defaultUrl
}

export default AxiosWrap