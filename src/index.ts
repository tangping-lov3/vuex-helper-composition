import { computed, ComputedRef, AppConfig, getCurrentInstance } from 'vue'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

interface MapReturnd {
  [key: string]: Function
}

interface ComputedReturnd {
  [key: string]: ComputedRef<Function>
}

const withComputed = (target: MapReturnd) => {
  const ctx = getContext()
  const returnd = {} as ComputedReturnd
  Object.entries(target).forEach(([key, val]) => {
    const computedFn = bindContext(val, ctx)
    returnd[key] = computed(computedFn)
  })
  return returnd
}

const bindContext = (fn: Function, ctx: AppConfig['globalProperties']) =>  fn.bind(ctx)

const bindContexts = (target: MapReturnd, ctx: AppConfig['globalProperties']) => {
  for (const key in target) {
    target[key] = bindContext(target[key], ctx)
  }
}

const getContext = () => {
  const currentInstance = getCurrentInstance()
  return currentInstance!.appContext.config.globalProperties
}

export const useMapState = (...args: Parameters<typeof mapState>) => withComputed(mapState(...args))

export const useMapGetters = (...args: Parameters<typeof mapGetters>) => withComputed(mapGetters(...args))

export const useMapActions = (...args: Parameters<typeof mapActions>) => {
  const actions = mapActions(...args)
  const ctx = getContext()
  bindContexts(actions, ctx)
  return actions
}

export const useMapMutations = (...args: Parameters<typeof mapMutations>) => {
  const mutations = mapMutations(...args)
  const ctx = getContext()
  bindContexts(mutations, ctx)
  return mutations
}
