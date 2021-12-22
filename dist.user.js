// ==UserScript==
// @name            杭电学评教（新）
// @namespace       http://tampermonkey.net/
// @updateURL       https://raw.githubusercontent.com/ParticleG/AutoEvaluate/main/dist.user.js
// @downloadURL     https://raw.githubusercontent.com/ParticleG/AutoEvaluate/main/dist.user.js
// @version         1.0.0
// @description     杭电新版教务系统自动学生评价插件
// @author          Particle_G
// @match           http://newjw.hdu.edu.cn/jwglxt/xspjgl/xspj_cxXspjIndex.html*
// @icon            http://newjw.hdu.edu.cn/jwglxt/logo/favicon.ico
// @grant		    GM_addElement
// @grant		    GM_log
// @grant		    GM_xmlhttpRequest
// @grant		    window.close
// @run-at		    document-start
// ==/UserScript==

(async function () {
    'use strict';
    Object.defineProperty(navigator, 'userAgent', {
        value: "Android",
        writable: false
    });

    while (true) {
        await waitUntilElementReady("[title=未评],[title=已评完]");
        try {
            document.querySelector("[title=未评]").click();
        } catch (_) {
            break;
        }

        await waitUntilElementReady(".radio-pjf");
        let questionCount = document.querySelectorAll(".radio-pjf").length / 4;
        for (let i = 0; i < questionCount; i++) {
            document.querySelectorAll(".radio-pjf")[i * 4 + Math.floor((Math.random() * 3))].click();
        }

        await waitUntilElementReady("textarea");
        document.querySelector("textarea").value = "感谢老师的辛苦付出！";

        await waitUntilElementReady("#btn_xspj_bc");
        document.querySelector("#btn_xspj_bc").click();

        await waitUntilElementReady("#btn_ok");
        document.querySelector("#btn_ok").click();
    }
    await waitUntilElementReady("#btn_xspj_tj");
    document.querySelector("#btn_xspj_tj").click();
})();

/**
 * 向指定 父元素 中添加 子元素
 * @param {String} tagName 子元素标签名称
 * @param {String} innerHTML 子元素的内容
 * @param {Object} options 子元素的属性
 * @param {HTMLElement} parentNode 父元素，默认为 body
 */
function addElement(tagName, innerHTML = "", options = {}, parentNode = document.body) {
    const el = document.createElement(tagName);
    el.innerHTML = innerHTML;
    Object.assign(el, options);
    parentNode.appendChild(el);
}

async function waitUntilElementReady(query) {
    let isReady = false;
    do {
        isReady = document.readyState == "complete" && document.querySelector(query);
        await sleep(100);
    } while (!isReady);
    GM_log("Element: " + query + " is ready!");
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
