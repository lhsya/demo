import schemaMap from "./services/index";

const PAGE_NAME = {
    INDEX_C: "index_c",
    INDEX_B: "index_b",
    POSITIONLIST_FEEDBACK: "positionlist_feedback",
    POSITIONLIST_HOT: "positionlist_hot",
    POSITIONLIST_SALARY: "positionlist_salary",
    HUNTER_HOME: "hunter_home",
    HUNTER_POSITION: "hunter_position",
    HUNTER_PROCESS: "hunter_process",
    HUNTER_V2_HOME: "hunter_v2_home",
    HUNTER_V2_PROCESS: "hunter_v2_process",
    COMMUNITY_HOME: "community_home",
    COMMUNITY_QUESTION: "community_question",
    COMMUNITY_ANSWER: "community_answer",
    COMMUNITY_QUALITYANSWER: "community_qualityanswer",
    COMMUNITY_TOPIC: "community_topic",
    COMMUNITY_NOTICE: "community_notice",
    RESUME_EDIT: "resume_edit",
    RESUME_SELFDESC: "resume_selfdesc",
    RESUME_SKILL: "resume_skill",
    RESUME_WORKEXP: "resume_workexp",
    RESUME_RESUMELIST_B: "resume_resumelist_b",
    CHAT_SESSIONLIST_C: "chat_sessionlist_c",
    CHAT_SESSIONLIST_B: "chat_sessionlist_b",
    CHAT_C: "chat_c",
    CHAT_B: "chat_b",
    CHAT_INSPECT_C: "chat_inspect_c",
    CHAT_INSPECT_B: "chat_inspect_b",
    CHAT_NEWJOBS: "chat_newjobs",
    CHAT_JOBMANAGE_B: "chat_jobmanage",
    POSITION_JD: "position_jd",
    POSITION_PUBLISH_B: "position_publish_b",
    COMPANY_C: "company_c",
    COMPANY_B: "company_b",
    COMPANY_INTERESTED_JOBLIST: "company_interestedjoblist",
    COMPANY_AUTHORIZATION_B: "company_authorization_b",
    COMPANY_IDENTITYFACE_B: "company_identifyface_b",
    COMPANY_BENEFIT_MESSAGE: "company_benefit_message",
    COMPANY_TALENT_SEARCH_B: "company_talent_search_b",
    OTHER_ME_C: "other_me_c",
    OTHER_ME_B: "other_me_b",
    OTHER_COLLECTION: "other_collection",
    OTHER_RECOMMAND: "other_recommand",
    OTHER_DELIVERY_RECORD: "other_delivery_record",
    OTHER_OPEN_NOTIFY: "other_open_notify",
    OTHER_TASKLIST: "other_tasklist",
}

class AppJump {

    constructor() {
        this.PAGE_NAME = PAGE_NAME;
    }

    jump(pageName) {
        let argvs = Array.prototype.slice.call(arguments, 1);
        let schemaFuc = schemaMap[pageName];
        if (!schemaFuc) {
            return;
        }
        let schmea = schemaFuc.apply(null, argvs);
        window.location.href = schmea;
    }
}

export const appRouter = new AppJump();