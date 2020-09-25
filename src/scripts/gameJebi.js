    var pNum = $("#displayCnt").text().replace(/[^0-9]/g,'');//사람인원수
    var kkwang = 1; //꽝갯수
    var kkwangList = new Array(pNum); //랜덤담은 리스트

    //제비생성
    for(var i=0; i<pNum; i++){
        var paper = "<img class='unJebiPaper' src='../images/gameJebi/unlots.png' style='width:65px; float:left;'>";
        $("#papers").append(paper);
    }

    //꽝 갯수 설정
    function kkwangMinus(){
        kkwang--;
        if(kkwang < 1){
            kkwang = 1;
        }
        $('.ea').text(kkwang);

    }
    function kkwangPlus(){
        kkwang++;
        if(kkwang > 8){
            kkwang = 8;
        }else if(kkwang == pNum){
            kkwang = pNum - 1;
        }
        $('.ea').text(kkwang);
    }

    //제비섞기
    function shuffle(){
        //꽝, 통과 만들기
        passOrKkwang();

        //기존 제비 제거
        $(".unJebiPaper").remove();
        $(".jebiPaper").remove();

        //새 제비 생성
        jebiRemake();

        //제비흔들기
        shake();


        $("#shuffle").attr("onclick","replay()");
        $("#shuffle").text("다시하기");
        $("#shuffle").attr("id","replay");


        //제비오픈
        $(".jebiPaper").click(function(){
            var indexNo = $(this).index();
            if(kkwangList[indexNo] == "통과"){
                indexNo = indexNo +1;
                $(this).attr("src","../images/gameJebi/lots"+indexNo+"-1.png");
            }else{
                indexNo = indexNo +1;
                $(this).attr("src","../images/gameJebi/lots"+indexNo+"-2.png");
            }
        });
    }

    //꽝 통과 배정, 섞기
    function passOrKkwang(){
        for(var i=0; i<pNum; i++){
            kkwangList[i] = "통과";
        }
        for(var i=0; i<kkwang; i++){
            kkwangList[i] = "꽝";
        }

        var j, x, y; /*[꽝][꽝][당첨][당첨][당첨]*/
        for(var i=0; i<999; i++){
            j = Math.floor(Math.random() * pNum);
            y = j-1;
            x = kkwangList[j];
            if(y < 0){
                y = pNum-1;
            }
            kkwangList[j] = kkwangList[y];
            kkwangList[y] = x;
        }
    }

    //다시하기
    function replay(){
        $(".jebiPaper").attr("src","../images/gameJebi/unlots.png");
        $(".jebiPaper").attr("class","unJebiPaper");
        $("#replay").text("제비섞기");
        $("#replay").attr("onclick","shuffle()");
        $("#replay").attr("id","shuffle");
        $(".unJebiPaper").off('click');
    }

    //제비만들기
    function jebiRemake(){
        for(var i=1; i<=pNum; i++){
        var jebiPaper = "<img class='jebiPaper' src='../images/gameJebi/lots"+i+".png' style='width:65px; float:left;'>";
            $("#papers").append(jebiPaper);
        }
    }

    //제비흔들기 효과
    function shake(){
        $('.jebiPaper').animate(
            { deg: 10 },
            { duration: 300, step: function(now) {
                $(this).css({
                    transform: 'rotate(' + now + 'deg)' });
                }
            }
        );
        $('.jebiPaper').animate(
            { deg: -10 },
            { duration: 450, step: function(now) {
                $(this).css({
                    transform: 'rotate(' + now + 'deg)' });
                }
            }
        );
        $('.jebiPaper').animate(
            { deg: 0 },
            { duration: 300, step: function(now) {
                $(this).css({
                    transform: 'rotate(' + now + 'deg)' });
                }
            }
        );
    }