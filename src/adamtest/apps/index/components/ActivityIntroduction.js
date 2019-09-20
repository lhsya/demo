import React from 'react';
import PropTypes from 'prop-types';

const ActivityIntroduction = ({ closeHandler }) => {

    return (
        <div className="dialog-box" onClick={closeHandler}>
            <div onClick={(e) => e.stopPropagation()} className="activity-introduction">
                <h2 className="title">活动介绍</h2>
                <ul>
                    <li>1. 本次活动帖子中展示的职位全部是用户在拉勾平台上投递的职位，其中的面试信息也是经过平台用户授权许可后的真实内容；</li>
                    <li>2. 本次活动只支持在拉勾线上收到面试邀请的职位，才可以发布祈愿帖子；</li>
                    <li>3. 如果有任何疑问或者建议，都可以通过下方用户反馈提交给我们，可爱的客服小姐姐会在看到后尽快回复你哦～</li>
                </ul>
                <a href="lagou://lagou.com/feedback" className="to-advise">意见反馈</a>
            </div>
            <button className="to-close"></button>
        </div>
    );
};

export default ActivityIntroduction;
