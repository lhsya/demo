/** 
 * bridge业务层接口 
*/
import bridge from "./services/index";
import index from "./index"

const METHOD_NAME_LIST = {
    wakeCompanySelectBox: "wakeCompanySelectBox",
    wakePositionSelectBox: "wakePositionSelectBox"
}

const business = {

    wakeCompanySelectBox(option) {
        let methodName = METHOD_NAME_LIST.wakeCompanySelectBox;
        let defaultOption = {
                style: {
                    baseColor: "#00B38A"
                },
                params: {
                    financeStages: [],//融资情况
                    companySize: [],//公司规模
                    industryFields: [],//行业数组
                    filtered: false,// 是否屏蔽已投递公司
                }
              };
        return bridge.request(methodName, {
            style: Object.assign({},defaultOption.style, option.style),
            params: Object.assign({},defaultOption.params, option.params)
        }).then((content) => {
            return Promise.resolve(content);
        }).catch((data) => {
            return Promise.reject(data);
        })
    },

    wakePositionSelectBox(option) {
        let methodName = METHOD_NAME_LIST.wakePositionSelectBox;
        let defaultOption = {
                style: {
                    baseColor: "#00B38A"
                },
                params: {
                    minSalary: 0,//最低薪资1
                    maxSalary: 0,//最高薪资100
                    workExperiences: [],//工作经验
                    educations: [],//学历
                    jobNatures: [],// 工作性质
                }
              };
        return bridge.request(methodName, {
            style: Object.assign({},defaultOption.style, option.style),
            params: Object.assign({},defaultOption.params, option.params)
        }).then((content) => {
            return Promise.resolve(content);
        }).catch((data) => {
            return Promise.reject(data);
        })
    }
};
const NEW_METHOD_NAME_LIST = Object.assign({},index.METHOD_NAME_LIST ,METHOD_NAME_LIST,);
export default Object.assign({}, index, business,{METHOD_NAME_LIST:NEW_METHOD_NAME_LIST});