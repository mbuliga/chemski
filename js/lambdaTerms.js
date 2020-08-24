/*

forked from https://github.com/mbuliga/quinegraphs/blob/master/js/lambdaTerms.js

*/


function termLibrary(lambdaName) {

switch (lambdaName) {

  case "SKKI":
  var lambdaTerm = "S K K I";
  break;

  case "SKILAMBDAEX":
  var lambdaTerm = "(\\x.\\y.y x x) K S I";
  break;

  case "SIISII":
  var lambdaTerm = "(S I I) (S I I)";
  break;

  case "lambdanote":
  var lambdaTerm = "(\\n.(\\f.(\\x.(((n (\\g.(\\h.(h (g f))))) (\\u.x)) (\\u.u))))) (((\\b.(\\e.(e b))) (\\f.(\\x.(f (f (f x)))))) (\\f.(\\x.(f(f (f (f x)))))))";
  break;

  case "(SUBSTRACT ((MULTLONG 3) 4)) 4":
  var lambdaTerm = "(((\\m.\\n.((n (\\n.(\\f.(\\x.(((n (\\g.(\\h.(h (g f))))) (\\u.x)) (\\u.u)))))) m)) (((\\m.(\\n.((m ((\\m.(\\n.((m (\\n.(\\f.(\\x.(f ((n f) x)))))) n))) n)) (\\f.(\\x.x))))) (\\f.(\\x.(f (f (f x)))))) (\\f.(\\x.(f(f (f (f x)))))))) (\\f.(\\x.(f(f (f (f x)))))))";
  break;

  case "4omega":
  var lambdaTerm = "((\\f.(\\x.(f(f (f (f x)))))) ((\\ x.x x) (\\x.x x)))";
  break;

  case "times_only_short":
  var lambdaTerm = "(((\\m.(\\n.(\\f.(m (n f))))) (\\f.(\\x.(f(f (f (f (f x)))))))) (\\f.(\\x.(f(f (f (f (f x))))))))";
  break;

  case "times_only_long":
  var lambdaTerm = "(((\\m.(\\n.((m ((\\m.(\\n.((m (\\n.(\\f.(\\x.(f ((n f) x)))))) n))) n)) (\\f.(\\x.x))))) (\\f.(\\x.(f(f (f (f (f x)))))))) (\\f.(\\x.(f(f (f (f (f x))))))))";
  break;

  case "ackermann_2_2":
  var lambdaTerm = "(((\\x.(\\y.(((x (\\a.(\\b.((((\\c.(\\d.(\\e.(d ((c d) e))))) b) a) (\\f.(\\g.(f g))))))) (\\z.(\\u.(\\v.(u ((z u) v)))))) y))) (\\h.(\\i.(h (h i))))) (\\j.(\\k.(j (j k)))))";
  break;

  case "ackermann_3_2":
  var lambdaTerm = "(((\\x.(\\y.(((x (\\a.(\\b.((((\\c.(\\d.(\\e.(d ((c d) e))))) b) a) (\\f.(\\g.(f g))))))) (\\z.(\\u.(\\v.(u ((z u) v)))))) y))) (\\h.(\\i.(h (h (h i)))))) (\\j.(\\k.(j (j k)))))";
  break;

  case "bigpredLambda":
  var lambdaTerm = "(\\n.(\\f.(\\x.(((n (\\g.(\\h.(h (g f))))) (\\u.x)) (\\u.u))))) (\\f.(\\x.(f(f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f (f x))))))))))))))))))))))))))))))";
  break;

  case "omegaSI":
  var lambdaTerm = "(\\S.\\I.S I I (S I I)) (\\x.\\y.\\z.(x z) (y z)) \\x.x";
  break;

  case "SKK":
  var lambdaTerm = "(((\\S.(\\K.((S K) K))) (\\x.(\\y.(\\z.((x z) (y z)))))) (\\x.(\\y.x)))";
  break;

  case "y_comb_id":
  var lambdaTerm = "((\\g.((\\x.(g (x x))) (\\x.(g (x x))))) (\\x.x))";
  break;

  case "omega":
  var lambdaTerm = "((\\x.x x) (\\x.x x))";
  break;

  case "alexo_example":
  var lambdaTerm = "(\\a.a a)(\\x.((\\b.b b)(\\y.y x)))";
  break;

  case "false (Y A)":
  var lambdaTerm = "((\\x.(\\y.y)) ((\\g.((\\x.(g (x x))) (\\x.(g (x x))))) A))";
  break;


  default:
  var lambdaTerm = "";
  break;
}
return lambdaTerm;
}
