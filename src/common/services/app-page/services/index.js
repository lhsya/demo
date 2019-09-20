export default {
    index_c() {
        return "lagou://lagou.com/";
    },
    index_b(type) {
        return `lagouhr://lagou.com/tab=${type}`
    },
    positionlist_feedback() {
        return "lagou://lagou.com/positionlist/feedback"
    },
    positionlist_hot() {
        return "lagou://lagou.com/positionlist/hot"
    },
    positionlist_salary() {
        return "lagou://lagou.com/positionlist/salary"
    },
    hunter_home() {
        return "lagou://lagou.com/hunter/home";
    },
    hunter_position(positionId) {
        return `lagou://lagou.com/hunter/position?id=${positionId}`;
    },
    hunter_process(positionId) {
        return `lagou://lagou.com/hunter/process??id=${positionId}`;
    },
    hunter_v2_home() {
        return "lagou://lagou.com/hunter_v2/home";
    },
    hunter_v2_process(orderId) {
        return `lagou://lagou.com/hunter_v2/process?orderId=${orderId}`;
    },
    community_home(type) {
        return `lagou://lagou.com/community?tab=${type}`
    },
    community_question(questionid) {
        return `lagou://lagou.com/content/community/question?questionid=${questionid}`
    },
    community_answer(answerid) {
        return `lagou://lagou.com/content/community/answer?answerid=${answerid}`
    },
    community_qualityanswer() {
        return "lagou://lagou.com/community/qualityanswer"
    },
    community_topic() {
        return "lagou://lagou.com/content/community/topic_square"
    },
    community_notice(type) {
        return `lagou://lagou.com/community/notice?tab=${type}`
    },
    resume_edit() {
        return "lagou://lagou.com/resume/edit";
    },
    resume_selfdesc() {
        return "lagou://lagou.com/resume/edit/self_desc"
    },
    resume_skill() {
        return "lagou://lagou.com/resume/edit/skill"
    },
    resume_workexp() {
        return "lagou://lagou.com/resume/edit/work_experience"
    },
    resume_resumelist_b(type) {
        return `lagouhr://lagou.com/resumelist?tab=${type}`
    },
    chat_sessionlist_c() {
        return "lagou://lagou.com/sessionlist"
    },
    chat_sessionlist_b() {
        return "lagouhr://lagou.com/sessionlist"
    },
    chat_c(userid, jobid) {
        return `lagou://lagou.com/chat?userid=${userid}&jobid=${jobid}`;
    },
    chat_b(userid, jobid) {
        return `lagouhr://lagou.com/chat?userid=${userid}&jobid=${jobid}`;
    },
    chat_inspect_c() {
        return "lagou://lagou.com/cinspect"
    },
    chat_inspect_b() {
        return "lagouhr://lagou.com/binspect"
    },
    chat_newjobs() {
        return "lagou://lagou.com/newjobs"
    },
    chat_jobmanage(type) {
        return `lagouhr://lagou.com/jobmanage?tab=${type}`
    },
    company_c(companyId, type) {
        return `lagou://lagou.com/company?id=${companyId}&page=${type}`;
    },
    company_b() {
        return "lagouhr://lagou.com/company_home"
    },
    company_authorization_b() {
        return "lagouhr://lagou.com/company_authorization"
    },
    company_identifyface_b() {
        return "lagouhr://lagou.com/identify_face"
    },
    company_interestedjoblist () {
        return "lagou://lagou.com/interestedjoblist"
    },
    company_benefit_message(messageId) {
        return "lagou://lagou.com/company/benefit/messageList?messageId=${messageId}"
    },
    company_talent_search_b() {
        return "lagouhr://lagou.com/talent/search"
    },
    position_jd(id) {
        return `lagou://lagou.com/jd?id=${id}`;
    },
    position_publish_b() {
        return "lagouhr://lagou.com/publish_job"
    },
    other_me_c() {
        return "lagou://lagou.com/me"
    },
    other_me_b() {
        return "lagouhr://lagou.com/me"
    },
    other_collection() {
        return "lagou://lagou.com/collection"
    },
    other_recommand() {
        return "lagou://lagou.com/recommand"
    },
    other_delivery_record(orderid, type) {
        return `lagou://lagou.com/deliveryrecord?orderid=${orderid}&tab=${type}`
    },
    other_open_notify() {
        return "lagou://lagou.com/notify/open"
    },
    other_tasklist() {
        return "lagou://lagou.com/tasklist"
    }
}