function theChampPopup(e) {
  window.open(
    e,
    "popUpWindow",
    "height=400,width=600,left=400,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes"
  );
}
function theChampStrReplace(e, t, n) {
  for (var r = 0; r < e.length; r++) {
    n = n.replace(new RegExp(e[r], "g"), t[r]);
  }
  return n;
}
function theChampCallAjax(e) {
  if (typeof jQuery != "undefined") {
    e();
  } else {
    theChampGetScript("https://code.jquery.com/jquery-latest.min.js", e);
  }
}
function theChampGetScript(e, t) {
  var n = document.createElement("script");
  n.src = e;
  var r = document.getElementsByTagName("head")[0],
    i = false;
  n.onload = n.onreadystatechange = function () {
    if (
      !i &&
      (!this.readyState ||
        this.readyState == "loaded" ||
        this.readyState == "complete")
    ) {
      i = true;
      t();
      n.onload = n.onreadystatechange = null;
      r.removeChild(n);
    }
  };
  r.appendChild(n);
}
function theChampGetElementsByClass(e, t) {
  if (e.getElementsByClassName) {
    return e.getElementsByClassName(t);
  } else {
    return (function (e, t) {
      if (t == null) {
        t = document;
      }
      var n = [],
        r = t.getElementsByTagName("*"),
        i = r.length,
        s = new RegExp("(^|\\s)" + e + "(\\s|$)"),
        o,
        u;
      for (o = 0, u = 0; o < i; o++) {
        if (s.test(r[o].className)) {
          n[u] = r[o];
          u++;
        }
      }
      return n;
    })(t, e);
  }
}
if (typeof String.prototype.trim !== "function") {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  };
}
function heateorSsBrowserMsg() {
  var a = document.createElement("div");
  (a.innerHTML =
    '<button id="heateor_ss_browser_msg_close" class="close-button separated"><img src="' +
    theChampCloseIconPath +
    '" /></button><div id="the_champ_sharing_more_content"><div class="all-services" style="padding:20px 10px 0px 10px;height:auto;"><p>' +
    heateorSsSDKBlockedMsg +
    "</p></div></div>"),
    a.setAttribute("id", "the_champ_sharing_more_providers"),
    a.setAttribute("style", "height:auto;");
  var b = document.createElement("div");
  b.setAttribute("id", "heateor_ss_browser_popup_bg"),
    jQuery("body").append(a).append(b),
    (document.getElementById("heateor_ss_browser_popup_bg").onclick =
      document.getElementById("heateor_ss_browser_msg_close").onclick =
        function () {
          a.parentNode.removeChild(a), b.parentNode.removeChild(b);
        });
}
"undefined" != typeof heateorSsSDKBlockedMsg &&
  jQuery(function () {
    "shown" != localStorage.getItem("heateorSsBrowserMsg") &&
      (jQuery("<img/>")
        .attr("src", "//apps.facebook.com/favicon.ico")
        .error(function () {
          heateorSsBrowserMsg();
        })
        .css("display", "none")
        .appendTo(document.body),
      localStorage.setItem("heateorSsBrowserMsg", "shown"));
  });
function heateorSsLJLoginPopup() {
  var a = document.createElement("div");
  (a.innerHTML =
    '<button id="heateor_ss_lj_popup_close" class="close-button separated"><img src="' +
    theChampCloseIconPath +
    '" /></button><div id="the_champ_sharing_more_content"><div class="all-services" style="padding:20px 10px 0px 10px;height:auto;"><fieldset id="ss_openid"><legend>LiveJournal Login</legend><form action="' +
    theChampLJAuthUrl +
    '" method="post" onsubmit="this.login.disabled=true;"><input type="hidden" name="openid_action" value="SuperSocializerLogin"><div style="clear:both">' +
    theChampLJLoginUsernameString +
    '</div><div style="clear:both"><input type="text" name="openid_url" required class="openid_login"><input type="submit" name="login" value="Login"></div></form></fieldset></div></div></div>'),
    a.setAttribute("id", "the_champ_sharing_more_providers"),
    a.setAttribute("style", "height:auto;");
  var b = document.createElement("div");
  b.setAttribute("id", "heateor_ss_lj_popup_bg"),
    jQuery("body").append(a).append(b),
    (document.getElementById("heateor_ss_lj_popup_bg").onclick =
      document.getElementById("heateor_ss_lj_popup_close").onclick =
        function () {
          a.parentNode.removeChild(a), b.parentNode.removeChild(b);
        });
}
