var Holder;

Holder = function($) {
  var GAConstructor;
  return GAConstructor = (function() {
    GAConstructor.version = "0.0.1";

    function GAConstructor(KEY, Backbone) {
      var ga, s;
      window._gaq = window._gaq || [];
      _gaq.push(['_setAccount', KEY]);
      ga = document.createElement("script");
      ga.type = "text/javascript";
      ga.async = true;
      ga.src = ("https:" === document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
      s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(ga, s);
      if (Backbone != null) {
        Backbone.history.on("route", (function(_this) {
          return function() {
            return _this.trackPageView();
          };
        })(this));
      } else {
        this.trackPageView();
      }
    }

    GAConstructor.prototype.initElementClick = function($el, category, actions, labels) {
      if (actions == null) {
        actions = "";
      }
      if (labels == null) {
        labels = "";
      }
      if ($el.attr("data-ga-click")) {
        return;
      }
      $el.click((function(_this) {
        return function() {
          return _this.trackEvent(category, actions, labels);
        };
      })(this));
      $el.attr("data-ga-click", "" + category + ";" + actions + ";" + labels);
      return $el;
    };

    GAConstructor.prototype.unlinkElementClick = function($el) {
      $el.off("click");
      return $el.attr("data-ga-click", "");
    };

    GAConstructor.prototype.trackPageView = function() {
      return window._gaq.push(['_trackPageview', window.location.href]);
    };

    GAConstructor.prototype.trackEvent = function(category, actions, labels) {
      if (actions == null) {
        actions = "";
      }
      if (labels == null) {
        labels = "";
      }
      return window._gaq.push(['_trackEvent', category, actions, labels]);
    };

    return GAConstructor;

  })();
};

if ((typeof define === 'function') && (typeof define.amd === 'object') && define.amd) {
  define(["jquery"], function($) {
    return Holder($);
  });
} else {
  window.ServerClient = Holder(jQuery || $);
}
