/*
 * @Author: mingxing.huang
 * @Date: 2020-07-14 17:01:49
 */
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)