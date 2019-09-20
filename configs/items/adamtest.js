const path = require("path");

module.exports = {
    config({Const}) {
        return {
            frame: Const.FRAMES.REACT,
            devServer: {
                port: 4610
            },
            cdn: {
                host: `//www.lgstatic.com/${Const.PRJ_NAME}`
            },
            dll: {
                assets: {
                },
                entry: {
                    "vendor": ["babel-polyfill", "url-polyfill"],
                    "reactVendor": [ "react", "react-dom","react-redux", "redux", "react-router-dom"]
                }
            }
        }
    },
    after({rigger, itemConfig, processArgv, Const}) {
        let entry = {};
        let plugins = [];
        return rigger
            .plugins(plugins)
            .append({
                resolve: {
                    alias: {
                        "$staticPath": itemConfig.absolutePath.staticPath,
                        "$common": path.resolve(Const.SRC_PATH, "./common")
                    }
                }
            })
            .done();

    }
};
