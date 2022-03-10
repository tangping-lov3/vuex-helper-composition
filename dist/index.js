var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useMapActions: () => useMapActions,
  useMapGetters: () => useMapGetters,
  useMapMutations: () => useMapMutations,
  useMapState: () => useMapState
});
var import_vue = require("vue");
var import_vuex = require("vuex");
var withComputed = (target) => {
  const ctx = getContext();
  const returnd = {};
  Object.entries(target).forEach(([key, val]) => {
    const computedFn = bindContext(val, ctx);
    returnd[key] = (0, import_vue.computed)(computedFn);
  });
  return returnd;
};
var bindContext = (fn, ctx) => fn.bind(ctx);
var bindContexts = (target, ctx) => {
  for (const key in target) {
    target[key] = bindContext(target[key], ctx);
  }
};
var getContext = () => {
  const currentInstance = (0, import_vue.getCurrentInstance)();
  return currentInstance.appContext.config.globalProperties;
};
var useMapState = (...args) => withComputed((0, import_vuex.mapState)(...args));
var useMapGetters = (...args) => withComputed((0, import_vuex.mapGetters)(...args));
var useMapActions = (...args) => {
  const actions = (0, import_vuex.mapActions)(...args);
  const ctx = getContext();
  bindContexts(actions, ctx);
  return actions;
};
var useMapMutations = (...args) => {
  const mutations = (0, import_vuex.mapMutations)(...args);
  const ctx = getContext();
  bindContexts(mutations, ctx);
  return mutations;
};
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useMapActions,
  useMapGetters,
  useMapMutations,
  useMapState
});
