import instance from '@/utils/request.js';

function getPhoneRcode(data) {
    return instance({
        url: '/sendsms',
        method: 'post',
        data,
    })
}

export {getPhoneRcode}