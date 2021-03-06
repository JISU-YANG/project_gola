cntCheck(3, cnt);

let rotation = 3660; //회전각도
let bang = [1, 0, 0, 0, 0, 0]; //임의의 총알
let count = 0; //발사횟수


//총알 섞기
function shuffle() {
    let j, x, y;
    for (let i = 0; i < 999; i++) {
        j = Math.floor(Math.random() * 6);
        y = j - 1;
        x = bang[j];
        if (y < 0) {
            y = 5;
        }
        bang[j] = bang[y];
        bang[y] = x;
    }
}

//탄창 빈탄창으로 이미지 교체
//총알 각각 넣기
//시작버튼
function start() {
    $('#bullet').animate(
        {deg: 3600},
        {
            duration: 3000, step: function (now) {
                $(this).css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        }
    );
    setTimeout(function () {
        $("#bullet").attr('src', '../images/gameRussian/emptyBullet.png');
        $(".bulletOne").css('display', 'block');
    }, 3000);

    shuffle();
    changeBtn('green');
    $("#Start").text('발사');
    $("#Start").attr('onclick', 'fire()');

}
//버튼 변경
function changeBtn(newColor) {
    let preset = 'btn btn-3d btn-m btn-full mb-3 rounded-xs text-uppercase font-900 shadow-s border-'+newColor+'-dark bg-'+newColor+'-light';
    $("#Start").attr('class',preset);
}
//발사
function fire() {
    //탄창 회전 애니메이션
    $('#bullet').animate(
        {deg: rotation},
        {
            duration: 300, step: function (now) {
                $(this).css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        }
    );
    rotation = rotation + 60;
    if (count < 2) {
        $(".bulletOne").eq(count).delay(350).fadeOut('slow');
    } else if (count > 2) {
        $(".bulletOne").eq(count - 1).delay(350).fadeOut('slow');
    }
    if (bang[count] == 0) {
        $("#title").text("생존!");
    } else {
        changeBtn('red');
        $(".backArea").css('background', 'red');
        $("#title").text("사망!");
        $("#Start").attr('onclick', 'rePlay()');
        $("#Start").text('다시하기');
    }
    count++;
}

//다시하기
function rePlay() {
    rotation = 3660;
    count = 0;
    $('#bullet').animate(
        {deg: 0},
        {
            duration: 1, step: function (now) {
                $(this).css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        }
    );
    $(".backArea").css('background', 'none');
    $("#title").text("");
    $("#bullet").attr('src', '../images/gameRussian/Bullet.png');
    $(".bulletOne").css('display', 'none');
    changeBtn('blue');
    $("#Start").attr('onclick', 'start()');
    $("#Start").text('시작');
}
