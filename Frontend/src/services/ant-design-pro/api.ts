// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  console.log('currentUser api');

  return request<{
    data: API.CurrentUser;
  }>('/api/auth/currentUser', {
    method: 'GET',
    skipErrorHandler: true,
    headers: {
      authorization: 'Token ' + localStorage.getItem('id_token'),
    },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/auth/outLogin/', {
    method: 'POST',
    headers: {
      authorization: 'Token ' + localStorage.getItem('id_token'),
    },
    ...(options || {}),
  });
}

// /** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/auth/token/obtain/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 获取产品列表 GET /goods */
export async function goods(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.GoodList>('/api/goods/', {
    method: 'GET',
    headers: {
      authorization: 'Token ' + localStorage.getItem('id_token'),
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取分类列表 GET /categorys */
export async function categorys() {
  return request<API.CategoryList>('/api/category/', {
    method: 'GET',
    headers: {
      authorization: 'Token ' + localStorage.getItem('id_token'),
    },
  }).then((resp) => {
    let data = [];
    resp.forEach((item) => {
      data.push({ value: item.id, label: item.name });
    });
    return data;
  });
}

/** 获取单位列表 GET /units */
export async function units() {
  return request<API.UnitList>('/api/unit/', {
    method: 'GET',
    headers: {
      authorization: 'Token ' + localStorage.getItem('id_token'),
    },
  }).then((resp) => {
    let data = [];
    resp.forEach((item) => {
      data.push({ value: item.id, label: item.name });
    });
    return data;
  });
}

/** 获取分类列表 GET /categorys */
export async function warehouses() {
  return request<API.WarehouseList>('/api/warehouse/', {
    method: 'GET',
    headers: {
      authorization: 'Token ' + localStorage.getItem('id_token'),
    },
  }).then((resp) => {
    let data = [];
    resp.forEach((item) => {
      data.push({ value: item.id, label: item.name });
    });
    return data;
  });
}

/** 新建库存 POST /api/good */
export async function addGood(options?: { [key: string]: any }) {
  console.log('options', options);
  return request<API.GoodListItem>('/api/goods/', {
    method: 'POST',
    headers: {
      authorization: 'Token ' + localStorage.getItem('id_token'),
    },
    data: options,
    ...(options || {}),
  });
}

// /** 登录接口 POST /api/login/account */
// export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
//   return request<API.LoginResult>('/api/auth/token/obtain/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: body,
//     ...(options || {}),
//   });
// }
