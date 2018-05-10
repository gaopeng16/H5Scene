FastClick.attach(document.body);

// rem
~function () {
    var desW = 640,
        winW = document.documentElement.clientWidth,
        ratio = winW / desW,
        oMain = document.querySelector('.main');
    if (winW > desW) {
        oMain.style.margin = '0 auto';
        oMain.style.width = desW + "px";

        return;
    }
    document.documentElement.style.fontSize = ratio * 100 + "px";
}();

// init swiper
new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    /*当切换结束后，给当前展示的区域添加对应的ID,由此实现对应的动画效果*/
    on: {
        /*slideChangeTransitionEnd: function () {
            var slideAry = this.slides;//获取当前一共有多少个活动块(包含LOOP模式下前后多加的两个)
            console.log(slideAry);
        }*/
        slideChange: function () {
            //this.slides;//获取当前一共有多少个活动块(包含LOOP模式下前后多加的两个)
            //this.activeIndex;//当前展示区域的索引

            var slideAry = this.slides,
                curIn = this.activeIndex,
                total = slideAry.length;

            //计算ID是page?
            var targetId = 'page';
            switch (curIn) {
                case 0:
                    targetId += total - 2;
                    break;
                case total - 1:
                    targetId += 1;
                    break;
                default:
                    targetId += curIn;
            }

            //给当前的活动块设置ID即可,把其他的移除
            [].forEach.call(slideAry, function (item, index) {
                if (curIn === index) {
                    item.id = targetId;
                    return;
                }
                item.id = null;
            });

        }
    }
});

//MUSIC
~function () {
    var musicMenu = document.getElementById('musicMenu'),
        musicAudio = document.getElementById('musicAudio');

    musicMenu.addEventListener('click', function () {
        if (musicAudio.paused) {//处于暂停状态
            musicAudio.play();
            musicMenu.className = 'music move';
            return;
        }
        musicAudio.pause();//让其暂停
        musicMenu.className = 'music';
    }, false);

    function controlMusic() {
        musicAudio.volume = 0.1;//控制音量，0~1
        musicAudio.play();
        //监听是否成功播放
        musicAudio.addEventListener('canplay', function () {
            musicMenu.style.display = "block";
            musicMenu.className = 'music move';
        })
    }

    window.setTimeout(controlMusic(), 1000);
}();