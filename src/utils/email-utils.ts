/**
 * 邮箱链接 base64 加密工具，防止爬虫直接抓取邮箱地址。
 *
 * 用法（与 Profile / 横幅链接一致）：
 * - 渲染时：href 用 "#"，data-encoded-email 用 encodeMailto(url) 的返回值；
 * - 点击时：内联 onclick 执行 MAILTO_ONCLICK_SCRIPT 解码并跳转。
 */

// 加密邮箱（去掉 "mailto:" 前缀后 base64 编码，SSR 侧使用）
export function encodeMailto(url: string): string {
	return Buffer.from(url.replace("mailto:", "")).toString("base64");
}

// 邮箱链接的点击解密脚本（内联 onclick 使用，浏览器侧 atob 解码）
export const MAILTO_ONCLICK_SCRIPT =
	"(function(){var e=this.getAttribute('data-encoded-email');this.href='mailto:'+atob(e);this.removeAttribute('data-encoded-email');this.removeAttribute('onclick');this.click();return false;}).call(this);";

// 邮箱链接的“点击显示并复制邮箱”脚本（内联 onclick 使用）
// 点击时解码邮箱，复制到剪贴板，并弹出一个短暂的提示条显示邮箱地址。
// 不移除属性，支持重复点击。
export const EMAIL_COPY_ONCLICK_SCRIPT =
	"(function(){var e=this.getAttribute('data-encoded-email');if(!e)return false;var a=atob(e);try{if(navigator.clipboard){navigator.clipboard.writeText(a);}}catch(x){}var t=document.getElementById('email-copy-toast');if(!t){t=document.createElement('div');t.id='email-copy-toast';t.style.cssText='position:fixed;bottom:5rem;left:50%;transform:translateX(-50%);z-index:1000;padding:0.5rem 1rem;border-radius:0.5rem;background:rgba(0,0,0,0.8);color:#fff;font-size:0.875rem;backdrop-filter:blur(4px);opacity:0;transition:opacity 0.3s ease;pointer-events:none;white-space:nowrap;';document.body.appendChild(t);}t.textContent='\\u5DF2\\u590D\\u5236\\u90AE\\u7BB1\\uFF1A'+a;t.style.opacity='1';if(window.__emailToastTimer){clearTimeout(window.__emailToastTimer);}window.__emailToastTimer=setTimeout(function(){t.style.opacity='0';},2500);return false;}).call(this);";
