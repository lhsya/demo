// const pxToremOption = {
//     rootValue: 46.875,
//     unitPrecision: 5,
//     propList: ['*', '!border'],
//     selectorBlackList: [],
//     replace: true,
//     mediaQuery: false,
//     minPixelValue: 0
// };
//
// module.exports = ({env, file, options}) => {
//
//     if (options.processArgv.env === "development"){
//         return {
//             plugins: [
//                 require("autoprefixer")(),
//                 require('postcss-pxtorem')(pxToremOption)
//             ]
//         }
//
//     }else{
//         return {
//             plugins: [
//                 require("autoprefixer")(),
//                 require("cssnano")({
//                     preset: "default"
//                 }),
//                 require('postcss-pxtorem')(pxToremOption)
//             ]
//         }
//     }
// };
