import showMessage from '$common/components/modals/message';

export const requestLocation = (cachePolicy) => {
    return new Promise((resolve, reject) => {
        try{
            // alert('start locate')
            window.lgBridge.request('requestLocation', {
                data: {
                    cachePolicy: cachePolicy || 0
                }
            }, function(data) {
                // alert(JSON.stringify(data))
                if(data.state == 1002){
                    if(data.data.state === 0){
                        resolve(data.data.data);
                        return;
                    }else if(data.data.state > 2){
                        showMessage('您的网络好像不太给力请稍后再试');
                    }
                    reject(data.data);
                }
            });
        }catch(e){}  
    });
};

export const sendPageId = (pid) => {
    try{
        window.lgBridge.request('setPageId', {
            data: {
                pageId: pid
            }
        });
    }catch(e){}   
};


export const close = () => {
    try{
        window.lgBridge.request('close');
    }catch(e){}
}