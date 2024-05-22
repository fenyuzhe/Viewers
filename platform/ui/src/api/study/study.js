import { utils } from '@ohif/core';
const { service } = utils;
// 获取用户详细信息
export function getStudyList(data) {
  return service({
    url: '/study/getStudyList',
    method: 'post',
    data: data,
  });
}
