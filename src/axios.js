import axios from 'axios'
import Element from 'element-ui'

axios.defaults.baseURL="http://localhost:8082"

//前置拦截
axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use( response => {
    let res = response.data
    if (res.code == 200) {
        return response
    } else {
        //Element.Message.error(res.msg)

        return Promise.reject(response.data.msg)
    }
},
    error =>{



})