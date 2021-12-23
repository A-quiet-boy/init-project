import { push as _push } from 'connected-react-router';
import { store } from "../store";
export const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

export function checkPhone(rule: any, value: any, callback: any) {
  let regex = /^1[0-9]{10}$/;//手机号
  if (value && !regex.test(value)) {
    //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
    callback('请输入正确的手机号码！');
  } else {
    callback();
  }
}

export function formatMoney(text: number) {
  if (!text && text != 0) {
    return "-";
  } else {
    return "￥" + text.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function download(url: string, downloadName = "excel") {
  if (url && Object.prototype.toString.call(url) === "[object String]") {
    let a = document.createElement("a");
    a.href = encodeURI(url);
    a.download = downloadName;
    a.click();
  }
}

export function dispatchWithPromise(args: any) {
  return new Promise((resolve, reject) => {
    store.dispatch({ ...args, resolve, reject });
  });
}
export const tablePaginationConfig = {
  pageSizeOptions: ["10", "20", "30", "40", "50"],
  showTotal: (total: number, range: number[]) => {
    return `总共${total}条，当前第${range[0]}至${range[1]}条`;
  },
  showSizeChanger: true,
  showQuickJumper: true,
};
//乘法
export function accMul(arg1: number, arg2: number) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) { }
  try {
    m += s2.split(".")[1].length;
  } catch (e) { }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}
export function htmlEncodeByRegExp(str: string) {
  var temp = "";
  if (str.length == 0) return "";
  temp = str.replace(/&/g, "&amp;");
  temp = temp.replace(/</g, "&lt;");
  temp = temp.replace(/>/g, "&gt;");
  temp = temp.replace(/\s/g, "%20");
  temp = temp.replace(/\'/g, "&#39;");
  temp = temp.replace(/\"/g, "&quot;");
  return temp;
}

export const getGlobalTableState = {
  loading: false,
  list: [],
  pageNum: 1,
  pageSize: 10,
  totalPage: 0,
  totalSize: 0,
};

export const uploadQiniuUrl: string = "https://upload.qiniup.com/";


export const push = (path: string) => {
  store.dispatch(_push(path));
}
//全屏
export function fullScreen() {
  let element: any = document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

//页面自适应
export function setmultiple() {
  let innerWidth = window.innerWidth
  let innerHeight = window.innerHeight
  let radioWidth = innerWidth / 1920
  let radioHeight = innerHeight / 1080
  let multiple = radioHeight > radioWidth ? radioWidth : radioHeight
  document.body.style.setProperty('--multiple', String(multiple));
}

export const filterColumns = (data: [], key: string, type: 1 | 2 | 3) => {//type=1运营；type=2代理商；type=3开发商
  const state = store.getState();
  const userType = state.common.loginInfo.userType;
  if (type == userType) {
    return data.filter((item: any) => {
      return item.dataIndex != key
    })
  }

  return data;
}

//数组分裂
export const arrFlat = (arr: Array<any>, index: number) => {
  let newarr = []
  for (let i = 0; i < index; i++) {
    newarr[i] = arr
  }
  return newarr
}

export function getNaturalImgPerc(url: string) {
  // 创建对象
  let img = new Image();
  // 改变图片的src
  img.src = url;
  return img.width / img.height;
}

export const matchTypeName = (list: any[], val: string, key: string, value: string):string => {
  if(!Array.isArray(list)) {
    return '-'
  }
  let name: string = '';
  list.map((item: any) => {
    if(item[key] == val) {
      name = item[value]
    }
  })
  return name;
}