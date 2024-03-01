const ruleSet = () => { //just creates a ruleset for the ER Page. If new rules are added, they need only be added to this file

  return [
    { toFrom: '(cons (first L) (rest L))', fromTo: 'L', name: 'cons', tags: 'test' },
    { toFrom: '(first (cons x L))', fromTo: 'x', name: 'first', tags: 'test' },
    { toFrom: '(rest (cons x L))', fromTo: 'L', name: 'rest', tags: 'test' },
    { toFrom: '‘(x y … z)', fromTo: '(cons x ‘(y…z))', name: 'quote/cons', tags: 'test' },
    { toFrom: '(if #t x y)', fromTo: 'x', name: 'if', tags: 'test' },
    { toFrom: '(if #f x y)', fromTo: 'y', name: 'if', tags: 'test' },
    { toFrom: '(if x y y)', fromTo: 'y', name: 'if', tags: 'test' },
    { toFrom: '(null? (cons x L))', fromTo: '#f', name: 'null?', tags: 'test' },
    { toFrom: '(zero? (+ x y))', fromTo: '#f', name: 'zero?', tags: 'test' },
    { toFrom: '(cons? (cons x L))', fromTo: '#t', name: 'cons?', tags: 'test' }
  ] 
}

export default ruleSet;