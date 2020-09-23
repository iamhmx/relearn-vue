/*
 * @Author: mingxing.huang
 * @Date: 2020-09-22 18:44:05
 */
import request from '@/utils/request'

export function getArticle(name) {
  return request({
    url: `/${name}`,
    method: 'GET'
  })
}
