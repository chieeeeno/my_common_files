

/*---------------------
 * 初期処理実行
 *---------------------*/
(function(){

})();


/*---------------------
 * DOM構築後に実行
 *---------------------*/
$(document).ready(function() {

});

/*---------------------
 * load処理完了後に実行
 *---------------------*/
$(window).on('load', function () {

});








/**
 * jsonのデータを取得する
 * @param {String} _url JSONデータのURL
 * @return {$.Defferd}
 */
function getJsonData(_url){
    console.log('getJsonData()開始：'+_url);
    var $dfd = $.Deferred();
    $.ajax({
        url:_url,
        dataType:'json',
        cache:false,    //キャッシュしない
        timeout:15000
    })
        .done(function(_data){
        console.log('json取得成功：'+_url);
        $dfd.resolve(_data);
    })
        .fail(function(_data){
        console.log('記事取得error：'+_url);
        $dfd.reject(_data);
    })
        .always(function(_data){
        console.log('getJsonData()終了：'+_url);
    });
    return $dfd.promise();
}


/**
 * URLパラメーターからキーを取得
 * @param {String} paramName パラメータ名
 * @return {String} パラメータの値
 */
function getParameter(paramName){
    var retStr = '';
    var url = location.href;
    var parameters = url.split("?");
    if( parameters.length > 1 ) {
        var params   = parameters[1].split("&");
        var paramsArray = [];
        for (var i = 0; i < params.length; i++ ) {
            var neet = params[i].split("=");
            paramsArray.push(neet[0]);
            paramsArray[neet[0]] = neet[1];
        }
        retStr = paramsArray[paramName];
    }
    return retStr;
};


/**
 * 文字列内のHTMLタグを削除
 * @param {String} _str 対象の文字列
 * @return {String} HTMLタグ削除後の文字列
 */
function trimHtmlTag(_str){
    var retStr = _str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
    return retStr;
}
