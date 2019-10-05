
import Vue from 'vue'
import axios from 'axios'

var debug = true;
var showStr = false;

export function api(url, options) {
    var p = {};
    if (!url) url = '/api'
    var defaultOptions = {
        'method': 'get'
    };
    // window.location.href="http://www.baidu.com"
    var opt = Object.assign(defaultOptions, options);
    console.log("localStorage.ddKey",localStorage.ddKey)

    if(localStorage.ddKey){
        axios.defaults.headers.common['x-key'] = localStorage.ddKey;
    }
    
    p = axios(url, opt)
    p.then(resp => {
        // console.log(resp)
        if (debug) {
            console.log(`resp.data from ${url}`, opt.data);
            console.log(`%c${url} result`, 'color:green', resp.data)
        }
        if (showStr) {
            console.log(JSON.stringify(resp));
        }
        if (resp.headers.refresh_token) {
            window.localStorage.token = resp.headers.refresh_token;
        }

    }).catch(err => {
        console.error(err)
        // window.location.href = "/#/login"
    })
    return p.then(res=>res.data)
}

