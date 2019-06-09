// ==UserScript==
// @name         ETH premium rate
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ETH premium rate
// @author       Bill
// @match        https://*/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    let otc_api = "https://otc-api.eiijo.cn/v1/data/config/purchase-price?coinId=3&currencyId=1&matchType=0";
    let floor_api = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=cny";
    $.get(otc_api, (otc_res) => {
        $.get(floor_api, (floor_res) => {
            let otc_price = otc_res.data.price;
            let floor_price = floor_res.ethereum.cny;
            let premium_rate = (otc_price - floor_price) / floor_price;
            console.log("目前场外溢价率为：" + (premium_rate*100).toFixed(2) + "%");
        });
    });
})();