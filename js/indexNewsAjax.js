//存储数据
let dataItem = {}

$.ajax({
    url: "./data/newsCategory.php",
    dataType: "json",
    async: true,
    cache: true,
     timeout:5000,
    data: JSON.stringify({
        module: 'news'
    }),
    headers:{
      'Content-Type': 'application/json; charset=utf-8'  
    },
    type: "POST",
    beforeSend: function() {},
    success: function(req) { //请求成功时处理
        console.log(req);
        let tagMenu = document.getElementsByClassName('tab-menu')[0];
        let data = req.data;
        let menuHtml = '';
        data.forEach((item, index) => {
            let className = '';
            if(index === 0) { className = 'current'; }
            // menuHtml += `<a href="javascript: void(0);" onclick="loadNewsData(this)" class="${className}" title="${item.categoryName}">${item.categoryName}</a>`;
            menuHtml += `<a data-type="${item.type}" data-request="false" href="javascript: void(0);" onclick="loadNewsData({_this: this, id: ${item.id},index: ${index}})" class="${className}" title="${item.categoryName}">${item.categoryName}</a>`;
        })
        tagMenu.innerHTML = menuHtml;
        //默认读取第一个分类的数据
        loadNewsData({_this: tagMenu.children[0], id:data[0].id, index: 0})
        // console.log(req);

    },
    complete:function() {},
    error: function() {},
})

function loadNewsData(params) {
    //获取request标识，判断是否已请求成功数据，true请求成功 false失败
    let categoryType = params._this.getAttribute('data-type');
    //显示指定的内容区域
    let tabContentWrap = document.getElementById('tab-content-wrap');
    //获取分类菜单
    let aItem = document.getElementsByClassName('tab-menu')[0].children;
    //分类高光
    //清除所有高光
    for (const item of aItem) {
        item.className = '';
    }
    //当前栏目高光
    params._this.className = 'current';

    //获取存储的数据
    let data = dataItem[categoryType];
    if(data) {
        tabContent(data, tabContentWrap);
        return false;
    }
    $.ajax({
        url: "./data/indexNews.php",
        dataType: "json",
        timeout:5000,
        data: JSON.stringify({
            categoryId: params.id
        }),
        headers:{
            'Content-Type': 'application/json; charset=utf-8'  
        },
        type: "POST",
        beforeSend: function() {},
        success: function(req) { //请求成功时处理
            let data = req.data;
            tabContent(data, tabContentWrap);
            //存储数据
            dataItem[categoryType] = req.data;
        },
        complete:function() {},
        error: function() {},
    })
    
}

function tabContent(data, content) {
    let itemHtml = `<div class="news-wrap"><div class="box clearfix">`;
    data.forEach(item => {
        let time = item.time.split(' ');
        itemHtml += `   <div class="item">
                            <div class="img-cover" style="background-image: url(${item.imgUrl})">
                                <img src="images/blank/indexNews.png" alt="">        //透明图片占位
                            </div>
                            <h4 class="title">${item.title}</h4>
                            <time datatime="${time[0]}">${time[0]}</time>
                            <i class="line"></i>
                            <p class="dec">${item.dec}</p>
                            <a href="" class="link-more">查看更多</a>
                        </div>`
    })
    itemHtml += `</div></div>`;
    //当前点击区域里的内容
    content.innerHTML = itemHtml;
}