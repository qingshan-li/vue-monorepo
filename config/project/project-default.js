import { BASE } from "./base.js";
import PRODUCTS from "./project-list.js";

export default (function () {
  PRODUCTS.map(v => {
    v = Object.assign(v, BASE)
  })
  return PRODUCTS
})()