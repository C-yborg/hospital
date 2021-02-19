function loadingMsg(data) {
    let wrap = document.getElementById(data.id)
     console.log(data.message);
     //数据为空 取消加载动画
     if(data.message == '当前数据为空') {
         wrap.innerHTML = `<div class="loading-wait">
                    <p>${data.message}</p>
                </div>`;
        return false;
     }
     //数据不为空 有加载动画
     wrap.innerHTML = `<div class="loading-wait">
                    <p>${data.message}</p>
                    <div class="loading-icon"><i class="fa fa-circle-o-notch" aria-hidden="true"></i></div>
                </div>`;
}