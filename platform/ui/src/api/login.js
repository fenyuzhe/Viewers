import { utils } from '@ohif/core';
const { service } = utils;
// 获取用户详细信息
export function getInfo(data) {
  return service({
    url: '/user/getInfo',
    method: 'post',
    data: data,
  });
}

export function login(data) {
  return service({
    url: '/user/login',
    method: 'post',
    data: data,
  });
}
