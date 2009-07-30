eval(thinair.imports)
function markup(node){
  var parent = $('<div></div>')
  parent.append(node)
  return parent.html()
}

describe('thinair')
  .should('build input', function(){
    var node = input({name: 'age', type: 'text'})
    expect(markup(node))
      .toEqual('<input name="age" type="text">')
  })
  .should('build style', function(){
    var node = span({style: {color: '#ffffff', fontFamily: 'Arial'}})
    expect(markup(node))
      .toEqual('<span style="color: rgb(255, 255, 255); font-family: Arial; "></span>')
  })
  .should('do inner content', function(){
    var node = 
      div({id: 'div'},
        span({id: 'span'}),
        p({}, 'Blah')
      )
    expect(markup(node))
      .toEqual('<div id="div"><span id="span"></span><p>Blah</p></div>')
  })
  .it('should do this example', function(){
    var node =
      div({id: 'wrapper'},
        div({id: 'action-bar'},
          input({id: 'lookup-box', type: 'text', 'class': 'text'}),
          div({id: 'lookup-results'}),
          div({'class': 'buttons'},
            a({id: 'login-or-out', 'class': 'action-button', 
              href: '/w/account/login?return_to=me'}, 'Login')
          )
        )
      )
    expect(markup(node)).toEqual('<div id="wrapper"><div id="action-bar"><input id="lookup-box" type="text" class="text"><div id="lookup-results"></div><div class="buttons"><a id="login-or-out" class="action-button" href="/w/account/login?return_to=me">Login</a></div></div></div>')
  })
  .it('can let you skip the attrs if you want', function(){
    expect(markup(div())).toEqual('<div></div>')
  })
  .it('can skip the attrs and go straight to content', function(){
    expect(markup(p('Hello World!'))).toEqual('<p>Hello World!</p>')
  })
  .it('can skip the attrs with jquery handlers and won\'t mess up parent', function(){
    expect(markup(div(h1('blah').click(function(){})))).toEqual('<div><h1>blah</h1></div>')
  })
  .should('be able to pass elements in as array', function(){
    expect(markup(ul(['bobby', 'timmy'].map(function(boy){
      return li(boy)
    })))).toBe('<ul><li>bobby</li><li>timmy</li></ul>')
  })