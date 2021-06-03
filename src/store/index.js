import { createStore } from "vuex";
import conf from "../config.json";
import db from "../../datasources/persons.json";

export default createStore({
  state: {
    config: conf,
    db: db
  },
  getters: {
    showColumnToWhom(state) {
      return state.config.showColumnToWhom;
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
