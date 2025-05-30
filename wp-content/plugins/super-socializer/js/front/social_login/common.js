function theChampLoadingIcon() {
  jQuery(".the_champ_login_container").html(
    '<img id="the_champ_loading_image" src="' + theChampLoadingImgPath + '" />'
  );
}
function theChampAjaxUserAuth(a, b) {
  theChampLoadingIcon(),
    jQuery.ajax({
      type: "POST",
      dataType: "json",
      url: theChampAjaxUrl,
      data: {
        action: "the_champ_user_auth",
        profileData: a,
        provider: b,
        redirectionUrl: theChampTwitterRedirect || "",
      },
      success: function (a) {
        var b = theChampSiteUrl;
        if (1 == a.status)
          b =
            "register" == a.message
              ? a.url && "" != a.url
                ? a.url
                : theChampRegRedirectionUrl +
                  (theChampCommentFormLogin ? "/#commentform" : "")
              : "linked" == a.message
              ? theChampLinkingRedirection + "?linked=1"
              : a.url && "" != a.url
              ? a.url
              : theChampRedirectionUrl +
                (theChampCommentFormLogin ? "/#commentform" : "");
        else if (null !== a.message.match(/ask/)) {
          var c = a.message.split("|");
          b = theChampSiteUrl + "?SuperSocializerEmail=1&par=" + c[1];
        } else
          0 == a.status && "registration disabled" == a.message
            ? (b =
                "undefined" != typeof theChampDisableRegRedirect
                  ? theChampDisableRegRedirect
                  : decodeURIComponent(theChampTwitterRedirect))
            : "unverified" == a.message
            ? (b = theChampSiteUrl + "?SuperSocializerUnverified=1")
            : "not linked" == a.message
            ? (b = theChampLinkingRedirection + "?linked=0")
            : "provider exists" == a.message &&
              (b = theChampLinkingRedirection + "?linked=2");
        location.href = b;
      },
      error: function (a, b, c) {
        location.href = decodeURIComponent(theChampRedirectionUrl);
      },
    });
}
function theChampInitiateLogin(a) {
  var b = a.getAttribute("alt");
  if ("Login with Facebook" == b)
    navigator.userAgent.match("CriOS")
      ? (location.href =
          "https://www.facebook.com/dialog/oauth?client_id=" +
          theChampFBKey +
          "&redirect_uri=" +
          theChampRedirectionUrl +
          "&scope=" +
          theChampFacebookScope)
      : theChampAuthUserFB();
  else if ("Login with Twitch" == b) theChampPopup(theChampTwitchAuthUrl);
  else if ("Login with LiveJournal" == b) heateorSsLJLoginPopup();
  else if ("Login with Steam" == b) theChampPopup(theChampSteamAuthUrl);
  else if ("Login with Twitter" == b) theChampPopup(theChampTwitterAuthUrl);
  else if ("Login with Xing" == b) theChampPopup(theChampXingAuthUrl);
  else {
    if ("Login with Linkedin" == b) return IN.User.authorize(), !1;
    "Login with Google" == b
      ? theChampInitializeGPLogin()
      : "Login with Vkontakte" == b
      ? theChampInitializeVKLogin()
      : "Login with Instagram" == b && theChampInitializeInstaLogin();
  }
}
function theChampDisplayLoginIcon(a, b) {
  if ("undefined" != typeof jQuery)
    for (var c = 0; c < b.length; c++)
      jQuery("." + b[c]).css("display", "block");
  else
    for (var c = 0; c < b.length; c++)
      for (
        var d = theChampGetElementsByClass(a, b[c]), e = 0;
        e < d.length;
        e++
      )
        d[e].style.display = "block";
}
function theChampValidateEmail(a) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    a
  );
}
function the_champ_save_email(a) {
  var b = document.getElementById("the_champ_email").value.trim(),
    c = document.getElementById("the_champ_confirm_email").value.trim();
  return "save" != a.id || theChampValidateEmail(b)
    ? b != c
      ? ((document.getElementById("the_champ_error").innerHTML =
          "Email addresses do not match"),
        void jQuery("#TB_ajaxContent").css("height", "auto"))
      : void theChampCallAjax(function () {
          theChampSaveEmail(a.id, b);
        })
    : ((document.getElementById("the_champ_error").innerHTML =
        theChampEmailPopupErrorMsg),
      void jQuery("#TB_ajaxContent").css("height", "auto"));
}
function theChampSaveEmail(a, b) {
  (document.getElementById("the_champ_error").innerHTML =
    '<img src="' + theChampLoadingImgPath + '" />'),
    jQuery.ajax({
      type: "POST",
      dataType: "json",
      url: theChampAjaxUrl,
      data: {
        action: "the_champ_save_email",
        elemId: a,
        email: b,
        id: theChampEmailPopupUniqueId,
      },
      success: function (a) {
        window.history.pushState(
          { html: "html", pageTitle: "page title" },
          "",
          "?done=1"
        ),
          1 == a.status && a.message.response && "success" == a.message.response
            ? (location.href = a.message.url)
            : 1 == a.status && "success" == a.message
            ? (location.href = theChampRegRedirectionUrl)
            : 1 == a.status && "cancelled" == a.message
            ? tb_remove()
            : 1 == a.status && "verify" == a.message
            ? (document.getElementById("TB_ajaxContent").innerHTML =
                "<strong>" + theChampEmailPopupVerifyMessage + "</strong>")
            : 0 == a.status &&
              ((document.getElementById("the_champ_error").innerHTML =
                a.message),
              jQuery("#TB_ajaxContent").css("height", "auto"));
      },
      error: function (a, b, c) {
        location.href = decodeURIComponent(theChampRedirectionUrl);
      },
    });
}
function theChampCapitaliseFirstLetter2(a) {
  return a.charAt(0).toUpperCase() + a.slice(1);
}
if (void 0 === theChampLinkingRedirection) var theChampLinkingRedirection = "";
theChampVerified &&
  theChampLoadEvent(function () {
    tb_show(theChampPopupTitle, theChampAjaxUrl);
  }),
  theChampEmailPopup &&
    theChampLoadEvent(function () {
      tb_show(theChampEmailPopupTitle, theChampEmailAjaxUrl);
    });
var theChampCommentFormLogin = !1;
