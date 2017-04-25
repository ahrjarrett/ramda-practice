var R = require('ramda')
var bigInt = require('big-integer')

//https://blog.svpino.com/2015/05/07/five-programming-problems-every-software-engineer-should-be-able-to-solve-in-less-than-1-hour
describe("compute the sum of a list", function() {
  var list = [1, 2, 3, 4, 5]

  it("with a for loop", function() {
    var sum = 0
    for(var i = 0; i < list.length; i++) {
      sum = sum + list[i]
    }
    sum.should.eql(15)
  })

  it("with a while loop", function() {
    var sum = 0,
        i = 0

    while(i < list.length) {
      sum = sum + list[i]
      i++
    }
    sum.should.eql(15)
  })

  it("with recursion", function() {

    const sum = (list, acc) => list.length === 0
      ? acc
      : sum(R.tail(list), R.head(list) + acc)

    sum(list, 0).should.eql(15)
  })
})

describe("combine two lists", function() {
  var one = ['a', 'b', 'c'];
  var two = [1, 2, 3];

  it("by alternating taking elements", function() {
    var result = R.flatten(R.zip(one, two))

    result.should.eql(['a', 1, 'b', 2, 'c', 3]);
  });
});

describe("fibonacci sequence", function() {
  var fib = R.memoize((n) => {
    if (n.isZero() || n.eq(1)) {
      return n;
    }
    else {
      return fib(n.minus(1)).plus(fib(n.minus(2)));
    }
  });

  it("compute first 100 numbers", function() {
    var result = R.map(
      R.compose(R.toString, fib),
      R.range(0, 101).map((x) => bigInt(x))
    );

    result[100].should.eql('354224848179261915075');
  });
});

describe("given list of non negative integers", function() {
  var example = [50, 2, 1, 9];

  it("arranges them to form largest number possible", function() {
    var sortByLexicalDesc = R.compose(R.reverse, R.sortBy(R.toString))
    var concat = (x, y) => x + y

    var largestNumberPossible = R.compose(
      parseInt,
      R.reduce(concat, ''),
      sortByLexicalDesc
    )

    var result = largestNumberPossible(example)
    result.should.eql(95021)
  })

})

describe("all possibilities of + - or nothing between numbers 1..9", function() {
    var solutions

  it('should calculate all possibilities', () => {
    solutions.length.should.eql(18);

  });
});
