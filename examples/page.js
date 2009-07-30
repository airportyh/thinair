function page(){
  for (var tag in thinair){
    eval("var " + tag + " = thinair." + tag)
  }
  return div({style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      '-webkit-border-radius': 5,
      '-moz-border-radius': 5,
      border: '1px solid #888'
    }},
    h1('Welcome to Thin-Air')
      .css({
        backgroundColor: '#ddd',
        padding: '0.2em',
        margin: 0
      })
      .click(function(){
        alert('You clicked on the header!')
      }),
    div({style: {padding: '0.5em'}},
      p({style: {fontWeight: 'bold'}},
        'Thin-Air is a Javascript GUI library that facilicates creating\
        dom elements and any combination there of on-the-fly very easily.'
      ),
      p({style: {fontStyle: 'italic'}},
        'The Thin-Air paradigm is similar to that of GWT in that all of\
        the DOM elements are created on-the-fly in Javascript\
        rather than html'),
      p('The Javascript code you write mirrors the html and css that\
        you would otherwise write but\
        is much more consise.'),
      hr(),
      p(
        'Would you like to learn more?&nbsp;',
        label('yes'),
        input({type: 'radio', value: 'yes'}),
        label('no'),
        input({type: 'radio', value: 'no'}),
        input({type: 'submit', value: 'Go!'})
      ),
      div({id: 'checkbox-example'},
        h3('List of checkboxes Example'),
        ul(
          ['att', 'level3', 'sprint']
          .map(function(carrier){
            return li(input({type: 'checkbox'}), label(carrier))
          })
        )
      )
    )
  )
}