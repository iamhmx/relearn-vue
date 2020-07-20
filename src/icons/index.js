/*
 * @Author: mingxing.huang
 * @Date: 2020-07-14 17:01:49
 */
import Vue from "vue";
import Svg from "./Svg.vue";

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)

Vue.component('svg-icon', Svg)