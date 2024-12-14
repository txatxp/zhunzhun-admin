import _ from "lodash-es";
/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * 判断是否是外部链接
 *
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
  return isExternal;
}
export function arrayToTree(data: any, rootId: any = 0): any {
  const list: any = _.chain(data)
    .filter((item: any) => item.pid === rootId)
    .map((item: any) => ({
      ...item,
      label: item.title,
      value: item.id,
      children: arrayToTree(data, item.id).length ? arrayToTree(data, item.id) : [],
    }))
    .value();

  function delEmetyChildren(child: any) {
    child.forEach((item: any) => {
      if (item.children && item.children.length === 0) {
        console.log("空");
        delete item.children;
      } else if (item.children && item.children.length > 0) {
        delEmetyChildren(item.children);
      }
    });
  }
  delEmetyChildren(list);
  return list;
}
