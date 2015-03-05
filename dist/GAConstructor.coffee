Holder = ($)->
  class GAConstructor
    @version = "0.0.7"
    constructor:(KEY, Backbone, @isUniversal = false)->
      window._gaq = window._gaq || []
      _gaq.push ['_setAccount', KEY]
      ga = document.createElement("script")
      ga.type = "text/javascript"
      ga.async = true
      ga.src = @_getTrackerScript()
      s = document.getElementsByTagName("script")[0]
      s.parentNode.insertBefore ga, s
      if Backbone?
        Backbone.history.on "route",=> @trackPageView()
      else
        @trackPageView()

    _getTrackerScript: ->
      isSecure = document.location.protocol is 'https:'
      if @isUniversal
        (if isSecure then 'https://' else 'http://') + 'stats.g.doubleclick.net/dc.js'
      else
        (if isSecure then "https://ssl" else "http://www") + ".google-analytics.com/ga.js"

    initElementClick:($el,category,actions="",labels="")->
      return if $el.attr "data-ga-click"
      $el.click => @trackEvent category, actions, labels
      $el.attr "data-ga-click", "#{category};#{actions};#{labels}"
      $el

    unlinkElementClick:($el)->
      $el.off("click")
      $el.attr "data-ga-click",""

    trackPageView:->
      path = location.protocol+ '//' + location.host  + location.pathname + location.hash
      window._gaq.push ['_trackPageview', path]

    trackEvent:(category,actions="",labels="")->
      window._gaq.push ['_trackEvent',category, actions, "" + labels]

if (typeof define is 'function') and (typeof define.amd is 'object') and define.amd
  define ["jquery"], ($)-> Holder($)
else
  window.ServerClient = Holder(jQuery or $)
