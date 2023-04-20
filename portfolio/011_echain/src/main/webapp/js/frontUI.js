// 레이어 팝업
var popup = {
	open : function(elem){	
        if($(".popWrap:visible").length == 0){
            $(".popDimLayer").show();
		    elem.show();
        } else {
            var $zidx = 0;
			for(var i=0; i<$(".popWrap:visible").length; i++){
				if($zidx < $(".popWrap:visible").eq(i).css("z-index") * 1 ){
					$zidx = $(".popWrap:visible").eq(i).css("z-index") * 1
				}
			}
            elem.css("z-index",$zidx + 1).show();
        }
	},
	close : function(elem){
        if($(".popWrap:visible").length == 0){
            elem.css("z-index","").hide();
		} else {
            $(".popDimLayer").hide();
            elem.css("z-index","").hide();
        }
        
	}
};

// table layout 깨짐 방지
function tableLayout(){
    $($.fn.dataTable.tables(true)).DataTable()
        .columns.adjust()
    // $.fn.dataTable
    // .tables( { visible: true, api: true } )
    // .columns.adjust();
}

$(function() {
    //input을 datepicker로 선언
    $(".pgInput--datepicker").datepicker();   

    //모든 datepicker에 대한 공통 옵션 설정
    $.datepicker.setDefaults({
        dateFormat: 'yy.mm.dd' //Input Display Format 변경
        ,showOtherMonths: false //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        //,changeYear: true //콤보박스에서 년 선택 가능
        //,changeMonth: true //콤보박스에서 월 선택 가능                            
        ,yearSuffix: "." //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        //,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        //,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
    });

    //user menu event 
    var $pushBox = $('.pushBox');
    var $notiBtn = $('.btn--header__noti');
    var $userBtn = $('.btn--user');
    var $pushBoxOpen = ('pushBox--open');

    function openToggleClass(elem){
        if($(elem).next($pushBox).hasClass($pushBoxOpen)){
            $(elem).next($pushBox).removeClass($pushBoxOpen);
        }else{
            $pushBox.removeClass($pushBoxOpen);
            $(elem).next($pushBox).addClass($pushBoxOpen);
        }
    }

    // tab 컨텐츠 toggle 
    var $tabIdx;
    var $tab = $(".pgTab").find(".btn--tab");
    $tab.click(function(){
        $tabIdx = $(this).index();

        $tab.removeClass('btn--tab--current');
        $(this).addClass('btn--tab--current');

        $("[id^='pgTabContent']").hide();
        $("#pgTabContent" + $tabIdx).show();
    });

    var $lineTabIndex;
    var $linetab = $(".pgTab").find(".btn--lineTab");
    $linetab.click(function(){
        $lineTabIndex = $(this).index();

        $linetab.removeClass('btn--lineTab--current');
        $(this).addClass('btn--lineTab--current');

        $("[id^='pgTabLineContent']").hide();
        $("#pgTabLineContent" + $lineTabIndex).show();
    });

    var $linetab2 = $(".pgTab").find(".btn--lineTab2");
    $linetab2.click(function(){
        $lineTab2Index = $(this).index();
        // alert($lineTab2Index);
        $linetab2.removeClass('btn--lineTab--current');
        $(this).addClass('btn--lineTab--current');

        $("[id^='pgTabLineCont2_']").hide();
        $("#pgTabLineCont2_" + $lineTab2Index).show();
    });

    var $chartTabIndex;
    var $chartTab =$('.chartTab').find(".chartTab__item");
    $chartTab.click(function(){
        $chartTabIndex = $(this).index();
        $chartTab.removeClass('chartTab__item--current')
        $(this).addClass('chartTab__item--current');

        $("[id^='chartTabContent']").hide();
        $("#chartTabContent" + $chartTabIndex).show();
    });


    // tab table head/body layout 깨짐 설정
    $('.btn--tab, .btn--lineTab').click(function(){
        tableLayout()
    }); 

    // table width 100% 일때 깨짐 설정
    $( window ).resize( function() {
        tableLayout()
    }).ready(function(){
        tableLayout()
    });



    $notiBtn.click(function(){
        openToggleClass(this)
    });

    $userBtn.click(function(){
        openToggleClass(this)
    });

    $infoBtn = $('.btn--helper')
    $infoBtn.click(function(){
        $(this).find('.pgTitle__infoText ').toggle();
    });
});

// datatable 공통옵션
var dataTableOpt = {
    filter : false,
    lengthChange : true, //데이터건수 변경
    lengthMenu: [[10, 20, 50], ["10개 보기", "20개 보기", "50개 보기"]], //데이터건수옵션 
    paging : true,  //페이징처리
    pagingType : "full_numbers", 
    pageLength: 10, //기본 데이터건수
    info: false,
    searching : false, //검색
    autoWidth: false, //가로자동
    ordering: false,
    responsive: true,
    scrollX: "100%", 
    scrollXInner: "100%",
    language : {
        "info": "<strong>_TOTAL_</strong>건 &middot; _PAGE_/_PAGES_Page",
        "infoEmpty": "검색결과가 없습니다."
    },
};

var memoDataTableOpt = {
    filter : false,
    lengthChange : false, //데이터건수 변경
    paging : true,  //페이징처리
    pagingType : "full_numbers", 
    pageLength: 5, //기본 데이터건수
    info: false,
    searching : false, //검색
    autoWidth: false, //가로자동
    ordering: false,
    responsive: true,
    scrollX: "100%", 
    scrollXInner: "100%",
    language : {
        "info": "<strong>_TOTAL_</strong>건 &middot; _PAGE_/_PAGES_Page",
        "infoEmpty": "검색결과가 없습니다.",
        "emptyTable": "메모가 없습니다."
    },
};





