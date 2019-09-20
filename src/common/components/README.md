# 概述


# dialog
![image](https://www.lgstatic.com/i/image2/M01/42/39/CgotOVz4wgaAFh7QAADYGQqaw0w217.png)
```
import Dialog from "$common/components/dialog";

Dialog.show({
    title: '请完善简历',
    text: '你的简历尚未达到可投递的标准，请完善简历后再进行投递',
    cancelText: '暂不',
    okText: '完善简历',
    okFunc: () => {
        Dialog.hide();
        window.location.href = "lagou://lagou.com/resume/edit";
    }
})
```

# image
- 会根据url情况加上域名`www.lgstatic.com`
- 如果图片显示不出来，展示默认图片
```
import Image from '$common/components/image';
import defaultImage from '$staticPath/images/company-map/default-logo.jpg';

<Image 
    src={companyLogo}
    defaultImage={defaultImage}
/>
```

# modals
## showMessage
![image](https://www.lgstatic.com/i/image2/M01/42/39/CgotOVz4wi6AURZpAACf_eulaVI836.png)
```
import showMessage from '$common/components/modals';

showMessage('您的网络好像不太给力请稍后再试', 2000);

```
## Loading(不推荐使用)
```
import { Loading } from '$common/components/modals';
<Loading
    showing={true}
    isActionFailed={loadingFailed}
    successHandle={fetchData}
    failedHandle={fetchData}
    intersectionOptions={intersectionOptions}
    styles={style}
/>
```
## Modal
```
import Modal from '$common/components/modals';
<Modal showing={true} stopBodyScroll={true}></Modal>
```

#pull-refresh
- 添加下拉刷新，用户下拉时会整个刷新页面
```
import PullRefresh from '$common/components/pull-refresh';

<PullRefresh />
```
# title-bar
![image](https://www.lgstatic.com/i/image2/M01/42/39/CgotOVz4wkyAZ-rOAABtDeTgl0I109.png)

```
import TitleBar from '$common/components/title-bar';
<TitleBar
    title={"页面标题"}
    styleClass='title-bar'
    styles={{
        boxShadow: '0 4px 12px 0 rgba(0,0,0,0.03)',
    }}
/>
```
# toast
![image](https://www.lgstatic.com/i/image2/M01/42/39/CgotOVz4wlqAQxNQAACfmUMC4yE679.png)

```
import Toast from "$common/components/toast";
Toast.info("当前暂无匹配你的公开职位，明天再来看看吧");
Toast.info("当前暂无匹配你的公开职位，明天再来看看吧", 1000);
```