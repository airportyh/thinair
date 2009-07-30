(function(){
  function iterMap(map, func){
    for (var key in map) func(key, map[key]);
  }
  function mapMap(map, func){
    var ret = [];
    for (var key in map)
      ret.push(func(key, map[key]));
    return ret;
  }
  function dasherize(camel){
    return camel.replace( /([A-Z])/g, "-$1" ).toLowerCase()
  }
  function flatten(arr){
    return arr.reduce(function(curr, item){
      return item.constructor === Array ?
        curr.concat(item) :
        curr.concat([item])
    }, [])
  }
  var toArray = $.makeArray
  function thinair(){
    var args = toArray(arguments)
    var tag = args[0]
    var arg1 = args[1]
    var attrs = arg1 && arg1.constructor === Object && !(arg1[0] instanceof Element) ?
      arg1 : null
    var contents = flatten(args.slice(attrs ? 2 : 1))
    attrs = attrs || {}
    var style = attrs.style
    delete attrs.style
    var markup = '<' + [tag].concat(
      mapMap(attrs, function(name, value){
        return name + '="' + value + '"';
      })).join(' ') + '></' + tag + '>'
    var node = $(markup)
    if (style) node.css(style)
    if (contents.length > 0) node.append.apply(node, contents)
    return node
  }
  var tags =
  'a abbracronym address applet area b base basefont bdo big blockquote body br button caption center cite code col colgroup dd del dir div dfn dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 head hr html i iframe img input ins isindex kbd label legend li link map menu meta noframes noscript object ol optgroup option p param pre q s samp script select small span strike strong style sub sup table tbody td textarea tfoot th thead title tr tt u ul'.split(' ')
  tags.forEach(function(tag){
    thinair[tag] = function(){
      return thinair.apply(this, [tag].concat(toArray(arguments)))
    }
  })
  thinair.imports = "var " + tags.map(function(tag){
    return tag + "=thinair." + tag
  }).join(',')
  window.thinair = thinair
})()