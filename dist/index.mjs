// src/index.ts
import { computed, getCurrentInstance } from "vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
var withComputed = (target) => {
  const ctx = getContext();
  const returnd = {};
  Object.entries(target).forEach(([key, val]) => {
    const computedFn = bindContext(val, ctx);
    returnd[key] = computed(computedFn);
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
  const currentInstance = getCurrentInstance();
  return currentInstance.appContext.config.globalProperties;
};
var useMapState = (...args) => withComputed(mapState(...args));
var useMapGetters = (...args) => withComputed(mapGetters(...args));
var useMapActions = (...args) => {
  const actions = mapActions(...args);
  const ctx = getContext();
  bindContexts(actions, ctx);
  return actions;
};
var useMapMutations = (...args) => {
  const mutations = mapMutations(...args);
  const ctx = getContext();
  bindContexts(mutations, ctx);
  return mutations;
};
export {
  useMapActions,
  useMapGetters,
  useMapMutations,
  useMapState
};
