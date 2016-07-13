var Holder;

Holder = function($) {
  var GAConstructor;
  return GAConstructor = (function() {
    GAConstructor.version = "0.1.1";

    function GAConstructor(KEY, Backbone, displayfeatures, anonymize) {
      var analyticsScript, s;
      if (displayfeatures == null) {
        displayfeatures = false;
      }
      if (anonymize == null) {
        anonymize = false;
      }
      window.ga = window.ga || function() {
        (ga.q = ga.q || []).push(arguments);
      };
      ga.l = +(new Date);
      ga('create', KEY, 'auto');
      if (displayfeatures) {
        ga('require', 'displayfeatures');
      }
      if (anonymize) {
        ga('set', 'anonymizeIp', true);
      }
      analyticsScript = this._getTrackerScript();
      s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(analyticsScript, s);
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

    GAConstructor.prototype._getTrackerScript = function() {
      var analyticsScript, isSecure;
      analyticsScript = document.createElement("script");
      analyticsScript.type = "text/javascript";
      analyticsScript.async = true;
      isSecure = document.location.protocol === 'https:';
      analyticsScript.src = (isSecure ? 'https://' : 'http://') + 'www.google-analytics.com/analytics.js';
      return analyticsScript;
    };

    GAConstructor.prototype.initElementClick = function($el, category, action, label) {
      if (action == null) {
        action = "";
      }
      if (label == null) {
        label = "";
      }
      if ($el.attr("data-ga-click")) {
        return;
      }
      $el.click((function(_this) {
        return function() {
          return _this.trackEvent(category, action, label);
        };
      })(this));
      $el.attr("data-ga-click", "" + category + ";" + action + ";" + label);
      return $el;
    };

    GAConstructor.prototype.unlinkElementClick = function($el) {
      $el.off("click");
      return $el.attr("data-ga-click", "");
    };

    GAConstructor.prototype.trackPageView = function() {
      var path;
      path = location.protocol + '//' + location.host + location.pathname + location.hash;
      return ga('send', {
        hitType: 'pageview',
        page: location.pathname + location.hash,
        location: path
      });
    };

    GAConstructor.prototype.trackEvent = function(category, action, label) {
      if (label == null) {
        label = "";
      }
      return ga('send', 'event', category, action, label);
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
