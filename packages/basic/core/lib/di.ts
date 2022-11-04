/**
 * 点击埋点
 * @param btnName string 埋点名称
 * @param PAGE string 埋点页面 
 * @param TITLE string 埋点标题 
 * @param id string 项目埋点id 
 * */ 
class DI {
  page = "";
  title = "";
  btnName = "";
  id;
  constructor(btnName, PAGE, TITLE, id = 14225) {
    this.btnName = btnName;
    this.id = id;
    this.page = PAGE;
    this.title = TITLE
  }
  set(others: any = {}) {
    let userId = this.getUrlParams("userId"),
      sourceStr = this.getUrlParams("source");
    sourceStr = JSON.stringify(sourceStr) === "{}" ? "notification" : sourceStr;
    console.log(sourceStr, "source");
    let params = others;
    if (this.btnName) {
      params.button_name = this.btnName;
    }
    params.source = params.source ? params.source : sourceStr;
    params.userId = userId;
    params.page = this.page;
    params.title = this.title;
    params.id = this.id;
    params.ts = Date.now();
    let url = "util/statistical?point=" + JSON.stringify(params);
    console.log("埋点链接：" + url);
    this.iframeInsert(url);
  }
  getUrlParams(...args) {
    /* 这个函数的作用是将userid和token分离出来 */
    function getByName(name) {
      const reg = new RegExp(`(^|&|\\?)${name}=([^&|#]*)`, "i");
      const param = window.location.href.substring(0).match(reg);
      if (param !== null) {
        return param[2];
      }
      return undefined;
    }

    if (arguments.length === 1) {
      return getByName(args[0]) || {};
    }
    const result = {};
    [...args].forEach((name) => {
      result[name] = getByName(name);
    });
    return result;
  }
  iframeInsert(url) {
    const iframe = document.createElement("iframe") as HTMLIFrameElement;
    const URL = "loopsmozat://" + url;
    iframe.setAttribute("src", URL);
    iframe.style.height = "0";
    iframe.style.width = "0";
    iframe.style.position = "absolute";
    iframe.style.zIndex = "-1000";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    // console.log('iframeInsert完毕=>%s', URL);
    // after 1000ms. remove the iframe to make it looks clean.
    setTimeout(function () {
      document.body.removeChild(iframe);
    }, 1000);
  }
}

export const source = new DI(null, "world-cup-list-2022", "world-cup-list-2022", 14226);
// 摩天轮
export const footballkingBtn = new DI("footballkingBtn", "world-cup-list-2022", "world-cup-list-2022");
export const vivelefootballBtn = new DI("vivelefootballBtn", "world-cup-list-2022", "world-cup-list-2022");
export const avatarOpenProfile = new DI("avatarOpenProfile", "world-cup-list-2022", "world-cup-list-2022")
export const ruleBtn = new DI("ruleBtn", "world-cup-list-2022", "world-cup-list-2022")