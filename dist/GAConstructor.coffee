Holder = ($)->
  class GAConstructor
    @version = "0.1.1"
    constructor:(KEY, Backbone, displayfeatures = false, anonymize = false)->
      window.ga = window.ga or ->
        (ga.q = ga.q or []).push arguments
        return
      ga.l = +new Date
      ga 'create', KEY, 'auto'
      ga('require', 'displayfeatures') if displayfeatures
      ga('set', 'anonymizeIp', true) if anonymize
      analyticsScript = @_getTrackerScript()
      s = document.getElementsByTagName("script")[0]
      s.parentNode.insertBefore analyticsScript, s
      if Backbone?
        Backbone.history.on "route",=> @trackPageView()
      else
        @trackPageView()

    _getTrackerScript: ->
      analyticsScript = document.createElement "script"
      analyticsScript.type = "text/javascript"
      analyticsScript.async = true
      isSecure = document.location.protocol is 'https:'
      analyticsScript.src = (if isSecure then 'https://' else 'http://') +
        'www.google-analytics.com/analytics.js'
      analyticsScript

    initElementClick: ($el, category, action="", label="")->
      return if $el.attr "data-ga-click"
      $el.click => @trackEvent category, action, label
      $el.attr "data-ga-click", "#{category};#{action};#{label}"
      $el

    unlinkElementClick: ($el)->
      $el.off "click"
      $el.attr "data-ga-click", ""

    trackPageView:->
      path = location.protocol + '//' + location.host  + location.pathname + location.hash
      ga 'send', {
        hitType: 'pageview'
        page: location.pathname + location.hash
        location: path
      }

    trackEvent: (category, action, label="")->
      ga 'send', 'event', category, action, label

if (typeof define is 'function') and (typeof define.amd is 'object') and define.amd
  define ["jquery"], ($)-> Holder($)
else
  window.ServerClient = Holder(jQuery or $)
