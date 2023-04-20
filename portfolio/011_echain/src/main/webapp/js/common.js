
$.ajaxPOST = function(url, header, param, success, error = null) {
	$.ajax({
		type: "POST",
		url: url,
		header : header,
		data :  JSON.stringify(param),
		contentType : "application/json;charset=UTF-8",
		success: function(result, textStatus, xhr) {
            if (result.code == "0000" && success) {
                 success(result)
            } else if (result.code == "1000" || result.code == "1001" || result.code == "1002") {
                 location.href = baseUrl + "error/expired";
            } else if (result.code == "1003") {
                 location.href = baseUrl + "error/duplicate";
            } else if (error) {
                 error(200, result.code, result.message);
            }else {
                 globalPopupMessage();
            }
		},
		error: function(xhr, status, err) {
            if (error) {
                error(status);
            } else {
                globalPopupMessage();
            }
		}
	});
};

var gPopupEl = null;
function globalPopupMessage(context=null, title=null) {
    if (context == null) {
        context = "서버와의 통신이 실패했습니다.<br>관리자에게 문의해주세요.";
    }

    // 기존 팝업 닫기
    if (gPopupEl) {
        gPopupEl.remove();
        gPopupEl = null;
    }

    var html = '';
    html += '<div class="popDimLayer"></div>';
    html += '<div id="global_popAlert" class="popWrap popAlert">';
    html += '   <div class="popWrap__inner">';
    html += '       <section class="popContent">';
    if (title != null) {
        html += '           <h1 class="popTitle">'+title+'</h1>';
    }
    html += '           <div class="popBody">';
    html += '               <p class="popText">'+context+'</p>';
    html += '           </div>';
    html += '       </section>';
    html += '       <div class="popBtns">';
    html += '           <button id="global_pop_message_submit" type="button" class="btn btn--pop btn--bgClr">확인</button>';
    html += '       </div>';
    html += '   </div>';
    html += '</div>';

    gPopupEl = $(html);
    $('body').append(gPopupEl);

    popup.open($("#global_popAlert"));

    $("#global_pop_message_submit").click(() => {
        if (gPopupEl) {
            gPopupEl.remove();
            gPopupEl = null;
        }
    });
}

////////// ----- 정규식 시작 ----- //////////
// 아이디 입력
function RegId(input){
	input.value = input.value.replace(/[^0-9a-zA-Z]/g,'');
}

// 비밀번호 입력
function RegPassword(input){
	input.value = input.value.replace(/[^a-zA-Z0-9\w\.\_\-]/g,'');
}

// 핸드폰번호 입력
function RegPhone(input){
	input.value = input.value.replace(/[^0-9]/g,'');
}

// 이메일 입력
function RegEmail(input){
	input.value = input.value.replace(/[^a-zA-Z0-9\w\.\_\-@]/g,'');
}

// 한글입력
function RegName(input){
	input.value = input.value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
}

// 숫자입력 + 콤마 
function RegNum(input){
	input.value = input.value.replace(/^[0]/g,'');
	input.value = input.value.replace(/[^0-9]/g,'');
	input.value = plusComma(input.value);
}

// 숫자입력 + 콤마 
var floatReg = /[0-9.]/;
var floatPattern1 = /\d*[.]\d*$/;
var floatPattern2 = /\d*[.]\d{3}$/;
function RegFloatOnKeyPress(event){
	var eventObject = (event.target)?event.target:event.srcElement;
	var eventString = eventObject.value+event.key;
	if(floatReg.test(event.key)){
		if(floatPattern1.test(eventObject.value)){
			if(event.charCode == 46){
				return false;
			}else{
				if (floatPattern2.test(eventObject.value)){
					return false;
				}
			}
		}
		return true;
	}
	return false;
}

var firstZero = /^[0]+[^\.]/;
function RegFloatOnInput(input){
	input.value = input.value.replace(/[^0-9.]/g,'');
	if(firstZero.test(input.value)){
		input.value = input.value.replace(/^[0]/g,'');
	}
	input.value = plusComma(input.value);
}

function plusComma(text){
	return text.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function minusComma(text){
	return text.replace(/,/g,"");
}
////////// ----- 정규식 종료 ----- //////////

$.fn.cmsRequired = function () {
    var ele = $(this);
    if(ele.val() == ""){
        if(ele.data("msg"))alert(ele.data("msg"));
        ele.focus();
        //if(ele.data("msg")) $.cmsAlert("입력확인", ele.data("msg"), function(){ele.focus();});
        return false;
    }
    return true;
};

$.fn.cmsMinlength = function () {
    var ele = $(this);
    if(ele.attr("minlength") > ele.val().length){
        if(ele.data("msg")) alert(ele.data("msg"));
        ele.focus();
        //if(ele.data("msg")) $.cmsAlert("입력확인", ele.data("msg"), function(){ele.focus();});
        return false;
    }
    return true;
};

$.fn.cmsValid = function () {
    var required = $(this).find("[required]");
    for(var i=0 ; i < required.length ;i++){
        var ele = $(required[i]);
        if(!ele.cmsRequired()) return false;
    }
    var minlength = $(this).find("[minlength]");
    for(var i=0 ; i < minlength.length ;i++){
        var ele = $(minlength[i]);
        if(!ele.cmsMinlength()) return false;
    }
    return true;
};

$.fn.serializeObject = function() {
    let obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() === "FORM") {
            let arr = this.serializeArray();
            if (arr) {
                obj = {};
                $.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }

    return obj;
};

let errorFunction = function (request) {
    if(request.status === 400){
        location.href = "/";
    }
    //alert(request.statusText);
    //alert(request.responseText);
};

$.cmsPostAjax = function (init) {
    let setting = {
        type : "POST",
        error: errorFunction
    };
    let val = $.extend({}, setting, init);
    return $.ajax(val);
};