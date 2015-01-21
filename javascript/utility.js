/**
 * Utility functions
 * @author Tomoki Kikuchi
 * @description よく使いそうなjs処理を集めたファイルです。
 * update:20141204
 */


/**
 * デバッグ用関数
 * debugMode = trueの時にコンソールに文字列を出力
 * ex.) log('出力したい文字列');
 * ex.) info('出力したい文字列');
 */
(function(){
    // デバッグモード切替
    var debugMode = true;  //true:デバッグ, false:本番

    // 置換対象のメソッドを配列として保持する
    var methods = [
        'log',
        'debug',
        'info',
        'warn',
        'error',
        'dir',
        'trace',
        'assert',
        'dirxml',
        'group',
        'groupEnd',
        'time',
        'timeEnd',
        'count',
        'profile',
        'profileEnd'
    ];

    // consoleが使えない場合は空のオブジェクトを設定しておく
    if( typeof window.console === "undefined" ){
        window.console = {};
    }

    // 各メソッドをwindowへ直接追加して行く
    for( var i in methods ){
        (function( m ){
            // consoleにある？デバッグモードは有効？consoleのものは関数？
            if( console[m] && debugMode && typeof console[m] === "function" ){
                window[m] = function(){ console[m].apply( console, arguments ); };
            }else{// debugModeがfalse,もしくは該当メソッドが存在しない場合は、空のメソッドを用意する
                window[m] = function(){};
            }
        })( methods[i] );
    }
})();


/**
 * GETパラメータを取得するメソッド
 * @param {String} _paramName パラメータの名前
 */
function getParamator(_paramName){
    //Return
    var ret=null;
    //URL取得
    var url = location.href;
    //URL分割
    parameters = url.split("?");
    //パラメータあり
    if( parameters.length > 1 ) {
        //分割
        var params   = parameters[1].split("&");
        //パラメータ配列
        var paramsArray = [];
        //パラメータ数繰り返し
        for ( i = 0; i < params.length; i++ ) {
            var neet = params[i].split("=");
            paramsArray.push(neet[0]);
            paramsArray[neet[0]] = neet[1];
        }
        //Get Param
        ret = paramsArray[_paramName];
    }
    //
    return ret;
};


/**
 * 文字列から数字以外を削除して返却
 * @param {String} _target 元となる文字列
 * @return {String} _str 数字の文字列
 */
function trimSeparator (_target) {
    var _str = _target.replace(/[^0-9]+/g,"");
    //log(_str);
    return _str;
}


/**
 * 配列のソート処理
 * @param _field (String) ソートする項目
 * @param _reverse (boolean) 昇順(false) or 降順(true)
 * @param _primer (function) 変換処理(parseIntなど)
 */

//例：_array.sort(sort_by('rank', false, parseInt));
function sortBy(_field, _reverse, _primer){
    _reverse = (_reverse) ? -1 : 1;
    return function(a,b){
        a = a[_field];
        b = b[_field];
        if (typeof(_primer) != 'undefined'){
            a = _primer(a);
            b = _primer(b);
        }
        if (a<b) return _reverse * -1;
        if (a>b) return _reverse * 1;
        return 0;
    }
}


/**
 * 文字列からHTMLタグを削除
 * @param {String} _html 元となる文字列
 * @return {String} _str HTMLタグを削除した文字列
 */
 function trimHtmlTag(_html){
    var _str = _html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
    return _str;
 }


/**
 * デバイス判定
 */
var ua;
ua = {
    iPhone: navigator.userAgent.indexOf('iPhone') != -1,
    android: navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1,
}

/**
 * 全置換：全ての文字列 org を dest に置き換える 
 * @param {String} org 置換したいの文字列
 * @param {String} dest 置換後の文字列
 * ex.) 変数「value」内の'o'を'*'に置き換える
 *      value.replaceAll("o", "*");  
 */
String.prototype.replaceAll = function (org, dest){  
  return this.split(org).join(dest);  
}  