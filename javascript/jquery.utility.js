/**
 * センタリングする座標を配列で返す
 * @param {String} _selector セレクタ
 * @return {Array} セレクタの座標（横／縦）
 */
function getCenteringPos(_selector){
    //画面(ウィンドウ)の幅、高さを取得
    var w = $(window).width();
    var h = $(window).height();

    //コンテンツ(#modal-content)の幅、高さを取得
    var cw = $(_selector).outerWidth(true);
    var ch = $(_selector).outerHeight(true);
    return Array( ((w - cw)/2) , ((h - ch)/2) );
}
