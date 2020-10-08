const cnt = 8; /*request.getParameter('cnt');*/
cntCheck2(1, cnt);

$("#displayCnt").append("인원 " + cnt + "명");

printInput();
var NameBox = new Array(cnt);

function printInput() {
    for (let i = cnt; i > 0; i--) {
        let textPenaltyCode =
            "                    <div class=\"text-penalty input-style input-style-2 input-required\">\n" +
            "                            <span class=\"color-highlight input-style-1-active input-style-1-inactive\">이름 " + i + "</span>\n" +
            "                            <em><i class=\"fa fa-exclamation-triangle color-red-light\"></i></em>\n" +
            "                            <input class=\"name\" type=\"text\" placeholder=\"이름입력\" value='이창"+i+"'>\n" +
            "                        </div>";

        $(".textBox").prepend(textPenaltyCode);
    }
}

function startTourna(){
    //입력한 이름 배열에 넣기
    for (let i = 0; i < cnt; i++){
        NameBox[i] = $(".name").eq(i).val();
    }
    // 이름 섞기
    shuffle();

    $(".textBox").remove();
    $("#btn-start").remove();

    let cc = 0,
        oo = cnt;

    while(true){
        if(oo == 1)break;
        oo = oo/2;
        cc++;
    }

    let numHeight = 2*(cc*2)+1; //세로칸 갯수
    let numWidth = cnt-1; //가로칸 갯수
    let NumNameBox = 0; //배열인덱스
    let center = Math.floor(numWidth/2);//중간값

    //전체칸 뿌리기
    for(let i=0; i<numHeight; i++){
        $(".jb-table").append("<div class='jb-table-row'></div>");
        for(let j =0; j<numWidth; j++ ){
            $(".jb-table-row").eq(i).append("<div class='jb-table-cell'></div>");

        }
    }
    console.log(NameBox);
    //인원 뿌리기
    for(let i = 0; i<cnt*2; i++){
        if(i%2 == 1){
            if(NumNameBox<(cnt/2)){
                $(".jb-table-row").eq(0).find(".jb-table-cell").eq(i-1).append(NameBox[NumNameBox++]);
            }else{
                $(".jb-table-row").eq(numHeight-1).find(".jb-table-cell").eq(i-cnt-1).append(NameBox[NumNameBox++]);
            }
        }
    }

    for(let i = 0; i<numWidth; i++){
        //클래스바꾸기
        $(".jb-table-row").eq(0).find(".jb-table-cell").eq(i).attr("class","jb-table-cell-value");
        $(".jb-table-row").eq(numHeight-1).find(".jb-table-cell").eq(i).attr("class","jb-table-cell-value");

        if(i%3 == 1 && cnt >= 8){
            $(".jb-table-row").eq(2).find(".jb-table-cell").eq(i).attr("class","jb-table-cell-value");
            $(".jb-table-row").eq(numHeight-3).find(".jb-table-cell").eq(i).attr("class","jb-table-cell-value");
        }
        if(i%7 == 3 && cnt >= 16){
            $(".jb-table-row").eq(4).find(".jb-table-cell").eq(i).attr("class","jb-table-cell-value");
            $(".jb-table-row").eq(numHeight-5).find(".jb-table-cell").eq(i).attr("class","jb-table-cell-value");
        }
    }

    for(let i=0; i<numHeight; i++){
        if( ((numHeight/2)+2)>=i && ((numHeight/2)-3) <= i && i%2 ==0){
            $(".jb-table-row").eq(i).find(".jb-table-cell").eq(center).attr("class","jb-table-cell-value");
        }
    }


    //중간 직선만들기
    for(let i=0; i<numHeight; i++){
        //2.5~5.5 , 3 4 5
        if( ((numHeight/2)+1)>i && ((numHeight/2)-2) <= i && i%2 ==1){
            $(".jb-table-row").eq(i).find(".jb-table-cell").eq(center).append("<div class='line'></div>");
        }
    }

    //전체 직선 만들기
    for(let i = 0; i<numWidth+1; i++){
        if(i%2 == 1){
            $(".jb-table-row").eq(1).find(".jb-table-cell").eq(i-1).append("<div class='line'></div>");
            $(".jb-table-row").eq(numHeight-2).find(".jb-table-cell").eq(i-1).append("<div class='line'></div>");
        }
        if(i%4 == 1 && cnt >= 8){
            $(".jb-table-row").eq(3).find(".jb-table-cell").eq(i).append("<div class='line'></div>");
            $(".jb-table-row").eq(numHeight-4).find(".jb-table-cell").eq(i).append("<div class='line'></div>");
        }
        if(i%8 == 3 && cnt >= 16){
            $(".jb-table-row").eq(5).find(".jb-table-cell").eq(i).append("<div class='line'></div>");
            $(".jb-table-row").eq(numHeight-6).find(".jb-table-cell").eq(i).append("<div class='line'></div>");
        }
    }

    //4강가는 선 만들기
    for(let i = 0; i<numWidth+1; i++){
        if(i%3 == 1){
            $(".jb-table-row").eq(2).find(".jb-table-cell").eq(i-1).append("<div class='line-downRight'></div>");
            $(".jb-table-row").eq(numHeight-3).find(".jb-table-cell").eq(i-1).append("<div class='line-upRight'></div>");
        }
        if(i%3 == 2){
            $(".jb-table-row").eq(2).find(".jb-table-cell").eq(i-1).append("<div class='line-downLeft'></div>");
            $(".jb-table-row").eq(numHeight-3).find(".jb-table-cell").eq(i-1).append("<div class='line-upLeft'></div>");
        }

    }

    for(let i = 0; i<numWidth+1; i++){
        if(i==2 || i==3){
            $(".jb-table-row").eq(4).find(".jb-table-cell").eq(i).append("<div class='line-upHorizon'></div>");
            $(".jb-table-row").eq(numHeight-5).find(".jb-table-cell").eq(i).append("<div class='line-upHorizon'></div>");
        }
        if(i==1 && cnt>4){
            $(".jb-table-row").eq(4).find(".jb-table-cell").eq(i).append("<div class='line-downRight2'></div>");
            $(".jb-table-row").eq(numHeight-5).find(".jb-table-cell").eq(i).append("<div class='line-upRight'></div>");
        }
        if(i==4 && cnt>4){
            $(".jb-table-row").eq(4).find(".jb-table-cell").eq(i).append("<div class='line-downLeft2'></div>");
            $(".jb-table-row").eq(numHeight-5).find(".jb-table-cell").eq(i).append("<div class='line-upLeft'></div>");
        }
    }


    //빈라인 클래스바꾸기
    for(let i=0; i<numHeight; i++){
        if(i>0 && i%1==0){
            $(".jb-table-row").eq(i).attr("class","jb-table-row-none");
        }
    }
}


//섞기 함수
function shuffle(){
    let j, x, y;
    for(let i=0; i<999; i++){
        j = Math.floor(Math.random() * cnt);
        y = j-1;
        x = NameBox[j];
        if(y < 0){
            y = cnt-1;
        }
        NameBox[j] = NameBox[y];
        NameBox[y] = x;
    }
}


