// chemistries
// forked from https://github.com/mbuliga/quinegraphs/blob/master/js/chemistry.js , version 24.08.2020
// this version: 29.05.2023, 



// general COMB rewrites


function chemistry(id) {

switch (id) {
  case "COMB": 
    var out = [
  {left:"any",right:"Arrow",action:"arrow", named:"COMB", kind:"COMPOSE"},          //                 tokenIn:           tokenOut:Arrow
];
  break;


// general pure termination T rewrites

  case "T":
    var out = [
  {left:"T",right:"T",action:"remove4", named:"T-T", kind:"TERMINATION"},
  {left:"FRIN",right:"T",action:"remove4", named:"FRIN-T", kind:"TERMINATION"},
  {left:"T",right:"FROUT",action:"remove4", named:"T-FROUT", kind:"TERMINATION"},
  {left:"null",right:"T",action:"remove1", named:"?-T", kind:"TERMINATION"},
  {left:"null",right:"T",action:"remove1", kind:"TERMINATION"},
];
  break;


// chemlambda-v2 rewrites

  case "CHEMLAMBDABARE":
    var out = [
  {left:"L",right:"A",action:"beta-arrow-X", named:"L-A", t1:"Arrow",t2:"Arrow", kind:"BETA"},      // action modified from "beta" to "beta-arrow-X" which is the original beta rewrite from chemlambda
  {left:"FI",right:"FOE",action:"beta-arrow", named:"FI-FOE", t1:"Arrow",t2:"Arrow", kind:"BETA"},  // action modified from "beta" to "beta-arrow" which is the original FI-FOE rewrite from chemlambda
// DIST rewrites
  {left:"L",right:"FOE",action:"DIST7", named:"L-FOE", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FOE-L"], kind:"DIST"},
  {left:"L",right:"FO",action:"DIST7", named:"L-FO", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FO-L"], kind:"DIST"}, // 
//
  {left:"FI",right:"FO",action:"DIST1", named:"FI-FO", t1:"FO",t2:"FO",t3:"FI",t4:"FI",blocks:["FO-FI"], kind:"DIST"}, // 
//
  {left:"FO",right:"FOE",action:"DIST7", named:"FO-FOE", t1:"FOE",t2:"FI",t3:"FO",t4:"FO",blocks:["FOE-FO"], kind:"DIST"}, //       
// Pruning rewrites
  {left:"FRIN",right:"FO",action:"terminfrin", named:"FRIN-FO", kind:"TERMINATION"}, //    
//  {left:"FRIN",right:"FOE",action:"terminfrin", named:"FRIN-FOE", kind:"TERMINATION"}, // 
  {left:"FRIN",right:"FI",action:"termFI", named:"FRIN-FI", kind:"TERMINATION"}, // 
//
  {left:"FI",right:"T",action:"term", named:"FI-T", kind:"TERMINATION"},
  {left:"T",right:"FO",action:"termin2", named:"T-FO", kind:"TERMINATION"}, // 
  {left:"T",right:"FOE",action:"termin2", named:"T-FOE", kind:"TERMINATION"}, //  
];
  break;

// DIC = CHEMLAMBDABARE + DICMOD
  case "DICMOD":
    var out = [
  {left:"L",right:"T",action:"termLD", named:"L-T", kind:"TERMINATION"},
 {left:"A",right:"T",action:"term3", named:"T-A", kind:"TERMINATION"},
 {left:"FI",right:"A",action:"DIST3", named:"FI-A", t1:"A",t2:"A",t3:"FOE",t4:"FI",blocks:["A-FI"], kind:"DIST"}
];
  break;
// CHEMLAMBDA = CHEMLAMBDABARE + CHEMLAMBDAEND
  case "CHEMLAMBDAEND":
    var out = [
  {left:"L",right:"T",action:"termL", named:"L-T", kind:"TERMINATION"},
  {left:"FOE",right:"T",action:"term1", named:"FOE-T", kind:"TERMINATION"}, // 
  {left:"FO",right:"T",action:"term1", named:"FO-T", kind:"TERMINATION"},  // 
  {left:"A",right:"T",action:"term", named:"A-T", kind:"TERMINATION"},
  {left:"A",right:"FOE",action:"DIST1", named:"A-FOE", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A"], kind:"DIST"}, // 
  {left:"A",right:"FO",action:"DIST1", named:"A-FO", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A"], kind:"DIST"}, // 
];
  break;




// CHEMSKI  is a purely local graph rewrite system for the SKI combinators
// it is an alternative and I guess better than COMBINALAMBDA chemistry.
//
// it will be modified to a version which uses "tokens", ie two nodes molecules like I-A, S-A, S-K, ..., which added to the rewrites make them 
// conservative in the nodes and edges. 
//  
// Alternatively to Combinatory Chemistry, in this system there are SKI combinators graphs (i.e. chemSKI graphs) and lots of small token molecules
// The system evolves by conservative chemical reactions, corresponding to chemSKI purely local rewrites 
//
// Another feature of Combinatory Chemistry is that it allows chemical reactions which build larger graphs from smaller ones. 
// In terms of combinators, the reaction is A + B --> A B, like in ALCHEMY
//
// This can be replaced in chemSKI by a rewrite which adds (inserts, glues) a token molecule to an edge of the graph of another token, or to one of 
// any other graph. 
//
// This was suggested for chemlambda in Chemlambda strings https://doi.org/10.6084/m9.figshare.5751318.v1
//
  case "CHEMSKI":
    var out = [
  {left:"K",right:"A",action:"KA", named:"K-A", kind:"BETA"},                 // Kab = a, a beta          v    tokenIn: Arrow      tokenOut: A-A

// Pruning rewrites  
  {left:"I",right:"A",action:"termIA", named:"I-A", kind:"TERMINATION"},      // Ia = a                   v    tokenIn: Arrow      tokenOut: I-A
  {left:"I",right:"S",action:"terminIS", named:"I-S", kind:"TERMINATION"}, // like termin2 and terminfrin v    tokenIn: I-A        tokenOut: S-A
  {left:"K",right:"S",action:"terminKS", named:"K-S", kind:"TERMINATION"}, // like terminfrin             v    tokenIn: S-K        tokenOut: S-S
  {left:"S",right:"K",action:"terminSK", named:"S-K", kind:"TERMINATION"}, // like term1                  v    tokenIn: Arrow      tokenOut: S-K
  {left:"A",right:"K",action:"termAK", named:"A-K", kind:"TERMINATION"}, // like term                     v    tokenIn: S-K        tokenOut: S-A


// DIST rewrites
  {left:"A",right:"S",action:"DIST1", named:"A-S", t1:"S",t2:"S",t3:"A",t4:"A", kind:"DIST"}, //          v    tokenIn: S-A        tokenOut:

// NEUTRAL rewrites
  {left:"S",right:"S",action:"SS", named:"S-S", kind:"DIST"},  //                                         v    tokenIn:            tokenOut:
  {left:"S",right:"A",action:"SA", named:"S-A", kind:"DIST"},      // Sabc = (ac)(bc)                     v    tokenIn:            tokenOut:

// token rewrites
//   A-A + S-S <--> S-A + S-A
//   
];
  break;

// As in chemSKI the node S is a fanout, in this version the node S with ports 1 and 2 not connected becomes a FOE. 
// Because the parser from lambda to mol uses also FO nodes, we have to introduce also LHS patterns for rewrites with FO instead of FOE. \
// For example I-S from chemSKI turns into two rewrites: I-FOE and I-FO

  case "CHEMSKI+LAMBDA":
    var out = [
  {left:"K",right:"A",action:"KA", named:"K-A", kind:"BETA"},      // Kab = a, a beta     v    tokenIn: Arrow        tokenOut:  A-A

// Pruning rewrites  
  {left:"I",right:"A",action:"termIA", named:"I-A", kind:"TERMINATION"},      // If = f                   v    tokenIn: Arrow      tokenOut: I-A
  {left:"I",right:"FOE",action:"terminIFOE", named:"I-FOE", kind:"TERMINATION"}, // like termin2 and terminfrin v    tokenIn: I-A        tokenOut: FOE-A
  {left:"I",right:"FO",action:"terminIFOE", named:"I-FO", kind:"TERMINATION"}, // like termin2 and terminfrin v    tokenIn: I-A        tokenOut: FO-A
  {left:"K",right:"FOE",action:"terminKFOE", named:"K-FOE", kind:"TERMINATION"}, // like terminfrin             v    tokenIn: FOE-K        tokenOut: FOE-FOE
  {left:"K",right:"FO",action:"terminKFOE", named:"K-FO", kind:"TERMINATION"}, // like terminfrin             v    tokenIn: FOE-K        tokenOut: FO-FOE
  {left:"FOE",right:"K",action:"terminFOEK", named:"FOE-K", kind:"TERMINATION"}, // like term1                  v    tokenIn: Arrow        tokenOut: FOE-K
  {left:"FO",right:"K",action:"terminFOEK", named:"FO-K", kind:"TERMINATION"}, // like term1                  v    tokenIn: Arrow        tokenOut: FO-K
  {left:"A",right:"K",action:"termAK", named:"A-K", kind:"TERMINATION"}, // like term                     v    tokenIn: FOE-K        tokenOut: FOE-A


// DIST rewrites, with chemlambda available A-S becomes A-FOE which already exists
//  {left:"A",right:"S",action:"DIST1", named:"A-S", t1:"S",t2:"S",t3:"A",t4:"A", kind:"DIST"}, //                        v    tokenIn: S-A        tokenOut:

// NEUTRAL rewrites
  {left:"S",right:"FOE",action:"SFOE", named:"S-FOE", kind:"DIST"},  //                                         v    tokenIn:            tokenOut:
  {left:"S",right:"FO",action:"SFOE", named:"S-FO", kind:"DIST"},  //                                         v    tokenIn:            tokenOut:
  {left:"S",right:"A",action:"SAFOE", named:"S-A", kind:"DIST"},      // Sabc = (ac)(bc)                     v    tokenIn:            tokenOut:

// token rewrites
//   A-A + FOE-FOE <--> FOE-A + FOE-A , A-A + FO-FOE <--> FOE-A + FO-A
//   FOE-FOE + FO-K <--> FOE-K + FO-FOE
];
  break;




// COMBINALAMBDA  is a version of chemlambda with GLOBAL FANOUT (GLOBALFO) for those molecules obtained from lambda terms
// name invented by German Kruszewski, who posed the problem of a graph-rewriting version of his and Tomas Mikolov Combinatory Chemistry
// https://www.mitpressjournals.org/doi/pdf/10.1162/isal_a_00258  and https://arxiv.org/pdf/2003.07916.pdf
//
// The problem of Combinatory chemistry is that the reaction S a b c   + c --> (a c) (b c)  + S     is based on the delegated duplication
// of c, i.e. the reaction happens only if somewhere else in the system the term c is produced
//
// In this COMBINALAMBDA I turn any SKI term into a lambda term, then I produce the chemlambda molecule, then I reduce it with COMBINALAMBDA
// rewrites. Instead of the delegated duplication of a term I attach to any edge of the chemlambda molecule a decoration (which is a lambda term)
// and GLOBALFO is a rewrite which, whhenever a FO x y z (fanout) node is encountered, it is deleted, 
// added an Arrow x z and a FRIN y 
// and the decoration the y edge is copied from the one of the "in" edge x.
// Then, a global duplication (of the lambda term which is the decoration of x) can be achieved by parsing the decoration of y from lambda to 
// chemlambda, then apending the new molecule to the FRIN y node.

  case "COMBINALAMBDA":
    var out = [
  {left:"L",right:"A",action:"beta-arrow-X", named:"L-A", t1:"Arrow",t2:"Arrow", kind:"BETA"},      // action modified from "beta" to "beta-arrow-X" which is the original beta rewrite from chemlambda
// Pruning rewrites
  {left:"FRIN",right:"FO",action:"terminfrin", named:"FRIN-FO", kind:"TERMINATION"}, //    
  {left:"T",right:"FO",action:"termin2", named:"T-FO", kind:"TERMINATION"}, // 
  {left:"L",right:"T",action:"termL", named:"L-T", kind:"TERMINATION"},
  {left:"FO",right:"T",action:"term1", named:"FO-T", kind:"TERMINATION"},  // 
  {left:"A",right:"T",action:"term", named:"A-T", kind:"TERMINATION"},
// DIST rewrites
  {left:"L",right:"FO",action:"GLOBALFO", t1:"FRIN", named:"L-FO", kind:"DIST"}, //        // GLOBALFO not yet implemented
  {left:"A",right:"FO",action:"GLOBALFO", t1:"FRIN", named:"A-FO", kind:"DIST"}, //        // GLOBALFO not yet implemented
];
  break;

// IC rewrites
  case "IC":
    var out = [
// action modified from "GAMMA-GAMMA" with 2 pairs Arrow-Arrow added, in order to be sure that COMB rewrite, as is, eliminates all arrows
//  {left:"GAMMA",right:"GAMMA",action:"GAMMA-GAMMA-arrow", named:"GAMMA-GAMMA", t1:"Arrow",t2:"Arrow",t3:"Arrow",t4:"Arrow", kind:"BETA"},
// action modified from "DELTA-DELTA" with 2 pairs Arrow-Arrow added, in order to be sure that COMB rewrite, as is, eliminates all arrows
//  {left:"DELTA",right:"DELTA",action:"DELTA-DELTA-arrow", named:"DELTA-DELTA", t1:"Arrow",t2:"Arrow",t3:"Arrow",t4:"Arrow", kind:"BETA"}, 
// action modified from "GAMMA-GAMMA" with 1 pair Arrow-Arrow added, asymmetric
  {left:"GAMMA",right:"GAMMA",action:"GAMMA-GAMMA-arrow1", named:"GAMMA-GAMMA", t1:"Arrow",t2:"Arrow", kind:"BETA"}, 
// action modified from "DELTA-DELTA" with 1 pair Arrow-Arrow added, asymmetric
  {left:"DELTA",right:"DELTA",action:"DELTA-DELTA-arrow1", named:"DELTA-DELTA", t1:"Arrow",t2:"Arrow", kind:"BETA"}, 
// notice that due to symmetry there is no need for DELTA-GAMMA
  {left:"GAMMA",right:"DELTA",action:"GAMMA-DELTA", named:"GAMMA-DELTA", t1:"DELTA",t2:"DELTA",t3:"GAMMA",t4:"GAMMA", kind:"DIST"}, 
  {left:"GAMMA",right:"T",action:"term3", named:"GAMMA-T", kind:"TERMINATION"},
  {left:"DELTA",right:"T",action:"term3", named:"DELTA-T", kind:"TERMINATION"},
];
  break;

// chemlambda-v2 + directed IC = KALI

// KALI, or kaleidoscope, is experimental, related to Pure See 
// https://mbuliga.github.io/quinegraphs/puresee.html

  case "KALI":
    var out = [
  {left:"L",right:"A",action:"beta-arrow-X", named:"L-A", t1:"Arrow",t2:"Arrow", kind:"BETA"},      // action modified from "beta" to "beta-arrow-X" which is the original beta rewrite from chemlambda
  {left:"FI",right:"FOE",action:"beta-arrow", named:"FI-FOE", t1:"Arrow",t2:"Arrow", kind:"BETA"},  // action modified from "beta" to "beta-arrow" which is the original FI-FOE rewrite from chemlambda
  {left:"D",right:"FOX",action:"beta-arrow", named:"D-FOX", t1:"Arrow",t2:"Arrow", kind:"BETA"},  // added for directed IC

// DIST rewrites
  {left:"L",right:"FOE",action:"DIST7", named:"L-FOE", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FOE-L"], kind:"DIST"},
  {left:"L",right:"FO",action:"DIST7", named:"L-FO", t1:"FOE",t2:"FI",t3:"L",t4:"L",blocks:["FO-L"], kind:"DIST"}, // 
//
  {left:"A",right:"FOE",action:"DIST1", named:"A-FOE", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A"], kind:"DIST"},  // 
  {left:"A",right:"FO",action:"DIST1", named:"A-FO", t1:"FOE",t2:"FOE",t3:"A",t4:"A",blocks:["FOE-A"], kind:"DIST"}, 
  {left:"D",right:"FOE",action:"DIST1", named:"D-FOE", t1:"FOE",t2:"FOE",t3:"D",t4:"D",blocks:["FOE-D"], kind:"DIST"}, // added for directed IC
//
  {left:"FI",right:"FO",action:"DIST1", named:"FI-FO", t1:"FO",t2:"FO",t3:"FI",t4:"FI",blocks:["FO-FI"], kind:"DIST"}, // 
  {left:"FI",right:"FOX",action:"DIST1", named:"FI-FOX", t1:"FOX",t2:"FOX",t3:"FI",t4:"FI",blocks:["FOX-FI"], kind:"DIST"}, // added for directed IC
//
  {left:"FO",right:"FOE",action:"DIST7", named:"FO-FOE", t1:"FOE",t2:"FI",t3:"FO",t4:"FO",blocks:["FOE-FO"], kind:"DIST"}, //       
// Pruning rewrites
  {left:"FO",right:"T",action:"term1", named:"FO-T", kind:"TERMINATION"},  // 
  {left:"T",right:"FO",action:"termin2", named:"T-FO", kind:"TERMINATION"}, // 
  {left:"T",right:"FOE",action:"termin2", named:"T-FOE", kind:"TERMINATION"}, //  
  {left:"FRIN",right:"FO",action:"terminfrin", named:"FRIN-FO", kind:"TERMINATION"}, //    
//  {left:"FRIN",right:"FOE",action:"terminfrin", named:"FRIN-FOE", kind:"TERMINATION"}, // 
  {left:"FRIN",right:"FI",action:"termFI", named:"FRIN-FI", kind:"TERMINATION"}, // 
//
  {left:"L",right:"T",action:"termL", named:"L-T", kind:"TERMINATION"},
  {left:"A",right:"T",action:"term", named:"A-T", kind:"TERMINATION"},
  {left:"FI",right:"T",action:"term", named:"FI-T", kind:"TERMINATION"},
  {left:"FOE",right:"T",action:"term1", named:"FOE-T", kind:"TERMINATION"}, // 
];
  break;

  default:
  var out = "";
  break;
}
return out;
}


 
// reactions, i.e. graph rewrites (find and do) transforms algorithms
/*
The LHS pattern graph notation.

All patterns which trigger rewrites (aka left hand side patterns) are made of two mol nodes. 

If these two mol nodes are trivalent then the pattern is  

n1type e c d
n2type a b e

where  n1type and n2type are the types of the nodes. 

Such a pattern has free edges a, b, c, d. 

At the graph level we have two center nodes n1 and n2, of types n1type, n2type, 
with the 3rd port node of n2 (i.e. e2) connected to the 1st port of n1 (i.e. e1).


          a                       c
           \_1                 2_/
            \      e2    e1     /
             \                 /
  n2type  n2  o----|-----|----o   n1  n1type
             /     3     1     \
          2_/           "in"    \_3
           /                     \
          b                       d

There are exceptions (like in the case of COMB rewrites, where the node n1 has valence 2), 
but always the pattern involves the "in" node port e1 of the node n1 and the node which n2 which 
has a node port connected to e1.


*/

/* This function finds an LHS pattern starting from the center node n1.

*/

function findTransform(n1) {
  if (!isCenter(n1)) return;

// e1 is the port node of type "in" of the center node n1
  var e1 = findLinkedOfType(n1,"in");
// e2 is the other port node connected to e1
  var e2 = findLinkedHalfEdge(e1);
  var n2 = null;
  var n2type = null;
  
  if (e2 == null) {
    e2type = "null"
    n2type = "null";
  } else {
// n2 is the center node whose port node is e2
    n2 = findLinkedCenter(e2);
// n2type is the type of the center node n2, likewise for e2type for e2
    n2type = n2.type;
    e2type = e2.type;
  }
/* starts a loop through the list of possible transforms, in order to 
   see if the LHS pattern deduced from the center node n1 matches.

*/
  for (var i=0; i<transformList.length; i++) {
// take a transform
    var trans = transformList[i];
/* check if the "left" node, i.e. n2 and the "right" node, i.e. n1, 
   have the type which is needed according to the transform "action". 
   If the types are right, we check if indeed the node ports types are right.

   If a match is found, return the transform.
*/
    if (trans.left == n2type && trans.right == n1.type) {
      switch (trans.action) {
        case "beta": case "beta-arrow": case "beta-arrow-X": case "DIST0": case "DIST1": case "DIST2":  case "DIST3": case "DIST4": case "DIST5": case "DIST6": case "DIST7": case "termsplit": case "term": case "termL": case "termLD": 
// case "GLOBALFO":
/*
only matters if n1type, n2type match and if the node port e2 is of type "out"
                               
                   e2    e1     
           
  n2type  n2  o----|-----|----o   n1  n1type
                         1     
                 "out"  "in"                                                                   
*/
          if (e2type == "out") return trans;
        break;


        case "GAMMA-GAMMA": case "GAMMA-GAMMA-arrow": case "GAMMA-GAMMA-arrow1": case "DELTA-DELTA": case "DELTA-DELTA-arrow": case "DELTA-DELTA-arrow1": case "GAMMA-DELTA":  
/*
For interaction combinators. Only matters if n1type, n2type match and if the node port e2 is of type "in"
                               
                   e2    e1     
           
  n2type  n2  o----|-----|----o   n1  n1type
                         1     
                 "in"  "in"                                                                   
*/
          if (e2type == "in") return trans;
        break;
        
        case "termin": case "termin2": case "term3": 
/*
For some TERMINATION rewrites, as 1-valent mol nodes (like T) have, graphically, only one node port of type "in", 
only matters if n1type, n2type match and if the node port e2 is of type "in". 
                               
                   e2    e1     
           
  n2type  n2  o----|-----|----o   n1  n1type
                         1     
                 "in"  "in"                                                                   
*/
          if (e2type == "in") return trans;
        break;




        
        case "terminfrin": case "termFI": 
// same as previously
          if (e2type == "in") return trans;
        break;
        
        case "term1":
/*
For some TERMINATION rewrites, as 1-valent mol nodes (like T) have, graphically, only one node port of type "in", 
only matters if n1type, n2type match and if the node port e2 is of type "middle" or "out". Here n1type may be "T". or "K"
                               
                   e2    e1     
           
  n2type  n2  o----|-----|----o   n1  n1type
                         1     
              "middle"  "in"          
                 "out"                                                         
*/
          if (e2type == "middle" || e2type == "out") return trans;
        break;
        
        case "remove1":
/*
In case the port node e1 is free (there is no e2)
*/
          if (e2type == "null") return trans;
        break;
        
        case "remove4": 
/*
Only the n1type, n2type matches are enough.
*/
          return trans;
        break;
/*
a case  which is not used in the chemlambda or IC chemistries
*/        
        case "eta":
          if (e2type == "out") {
          var bmid  = findLinkedOfType(n2,"middle");
          var ccmid = findLinkedHalfEdge(bmid);
          var cmid  = findLinkedOfType(n1,"middle");
          if (ccmid == cmid) return trans;
          }
        break;
/*
cases for chemSKI
*/

        case "KA":
          if (e2type == "in") {
            var e1out = findLinkedOfType(n1,"out");
            var e2in = findLinkedHalfEdge(e1out);
            if (e2in != null) {
              var n3in = findLinkedCenter(e2in);
              if (e2in.type == "in" && n3in.type == "A" ) return trans; 
            }
          }

        break;

        case "termIA": 
/*
only matters if n1type, n2type match and if the node port e2 is of type "out"
                               
                   e2    e1     
           
  n2type  n2  o----|-----|----o   n1  n1type
                         1     
                 "out"  "in"                                                                   
*/
          if (e2type == "in") return trans;
        break;


        case "terminIS": case "terminIFOE":

          if (e2type == "in") {
            var e1mid = findLinkedOfType(n1,"middle");
            var e1out = findLinkedOfType(n1,"out");
            var e22 = findLinkedHalfEdge(e1out);
            if (e22 != e1mid) return trans;
          }
        break;

        case "terminKS": case "terminKFOE":

          if (e2type == "in") {
            var e1mid = findLinkedOfType(n1,"middle");
            var e1out = findLinkedOfType(n1,"out");
            var e22 = findLinkedHalfEdge(e1out);
            if (e22 != e1mid) return trans;
          }
        break;


        case "terminSK": case "terminFOEK":

            var e22mid = findLinkedOfType(n2,"middle");
            var e22out = findLinkedOfType(n2,"out");
            var e33 = findLinkedHalfEdge(e22out);
          if (e2type == "middle" || (e2type == "out" && e22mid != e33)) return trans;
        break;


        case "termAK":

          if (e2type == "out") return trans;
        break;


        case "SS": case "SFOE":

          if (e2type == "out") {
            var e2mid = findLinkedOfType(n2,"middle");
            var e2in = findLinkedOfType(n2,"in");
            var e22 = findLinkedHalfEdge(e2mid);

            var e1mid = findLinkedOfType(n1,"middle");
            var e1out = findLinkedOfType(n1,"out");
            var e11 = findLinkedHalfEdge(e1out);
            if ((e22 == e2in) && (e11 != e1mid)) return trans;
          }
        break;


        case "SA": case "SAFOE":

          if (e2type == "out") {
            var e2mid = findLinkedOfType(n2,"middle");
            var e2in = findLinkedOfType(n2,"in");
            var e22 = findLinkedHalfEdge(e2mid);               // e22 == e2in
            var e1mid = findLinkedOfType(n1,"middle");
            var e1out = findLinkedOfType(n1,"out");
            var e11 = findLinkedHalfEdge(e1out);              // e11.type == "in"
            if (e11 != null) {
              var n2s = findLinkedCenter(e11);                  // n2s.type == "A"
              if ((e22 == e2in) && (e11.type == "in") && (n2s.type == "A")) {
                var e2sout = findLinkedOfType(n2s,"out");
                var e3in = findLinkedHalfEdge(e2sout);            // e3in.type == "in"
                if (e3in != null) {
                  var n3s = findLinkedCenter(e3in);                 // n3s.type == "A"
                  if ((e3in.type == "in") && (n3s.type == "A")) {
                    return trans;
                  } 
                }
              }
            }
          }
        break;


/*
end cases for chemSKI
*/



      }



/*
for "arrow" (aka COMB) rewrites, all it matters if the n1type matches

                   e2    e1     
           
any type  n2  o----|-----|----o   n1  n1type
                         1     
                  any   "in"          
              port type           
*/
    } else if (trans.left == "any" && trans.right == n1.type) {
      return trans;
    }
  }
  
  return null;

// end function findTransform
}

/*
 This function makes a vector of all possible transforms. It does compute the age of each possible 
LHS pattern.
*/

function findAllTransforms() {
  transformCache = [];
// we loop through the  nodes  
  for (var i=0; i<nodes.length; i++) {
    if (!isCenter(nodes[i])) continue;
// take each center node as n1 and use findTransform     
    var trans = findTransform(nodes[i]);
// if we get a match    
    if (trans) {
// compute the age of the pattern, which is the max over the ages of the nodes and links of the pattern.
    var minAge = nodes[i].age;
    var e1h = findLinkedOfType(nodes[i],"in");
    minAge = Math.max(minAge,e1h.age);
    var e2h = findLinkedHalfEdge(e1h);
  
    if (e2h != null) {
      var edgAge = findLinkAge(e1h,e2h);
      minAge = Math.max(minAge,edgAge);
      n2h = findLinkedCenter(e2h);
      minAge = Math.max(minAge,n2h.age);
    }
/* push the transform object into the vector. 
   The transform object has a "node" (which is the node n1 used in findTransform),
   a transformation "trans",
   and "age".
*/
      transformCache.push({node: nodes[i], trans: trans, age: minAge})
    }
  }
  
  return transformCache;
}


/*
This function takes a center node n1 and a transform and performs the rewrite.

There are several kinds of rewrites considered.


*/

function doTransform(n1, trans) {

/* starting from the graph node n1, the LHS pattern is identified

*/
  
  var e1 = findLinkedOfType(n1,"in");
  var e2 = findLinkedHalfEdge(e1);
/*
at this stage we have 

                               
                  e2     e1    
                               
  n2type  n2  o----|-----|----o   n1  n1type
                         1     
                       "in"                   

but it is still possible that there is no e2 port node
*/
  var n2, a, b, b1, c, d, a1, indTokenType, TokenName = "";

/* the center node n1, if it is 3 valent then it has the ports 
 

               c  "middle"
            2_/
     e1,a1   /
            /
    --|----o   n1  n1type
      1     \
     "in"    \_3
              \
               d  "out"

but it is not excluded that some of these ports do not exist. (see further the "arrow" rewrite)

*/

  a1 = findLinkedOfType(n1,"in")
  c  = findLinkedOfType(n1,"middle")
  d  = findLinkedOfType(n1,"out")

  if (e2 != null) {

/* if there is an e2, it is a port node of the center node n2

    "in"  a                
           \_1               
            \      b1     
             \         
  n2type  n2  o----|--
             /     3   
          2_/    "out"  
           /    
"middle"  b 

but we don't know yet which of the node ports a, b, b1 are equal to e2
*/
    n2 = findLinkedCenter(e2);

    a  = findLinkedOfType(n2,"in")
    b  = findLinkedOfType(n2,"middle")
    b1 = findLinkedOfType(n2,"out")
  }

  switch (trans.action) {
    case "arrow":
/* - "arrow" are COMB rewrites, which remove an Arrow mol node.

                   e2    e1   n1,"Arrow"
           
any type  n2  o----|-----|------o------|--- d
                         1             2
                  any   "in"         "out"     
              port type           
*/
      moveLink2(e1,d);
/*
moveLink2(e1,d), defined in myD3Graph.js, works like this: 
- identifies the other port node connected to e1, in this case e2
- identifies the other port connected to d
- makes a link between these node ports.

Then the following removes the node n1, its node ports and all affected links
*/
      removeNodeAndEdges(n1);  indTokenType  = Tokens.indexOf("Arrow"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] + 1;
/*
In mol nodes notation, the LHS pattern is 
t  ...a... 
Arrow a d
which transforms into the mol node
t ...d...
*/
 

      break;

/*
The following is the beta rewrite, but without using Arrow nodes. Not used.
*/
    case "beta":
      // L-A, D-FOX and FI-FOE transitions:
      // Link in to out and middle to middle
      moveLink2(a,d);
      moveLink2(b,c);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

/*
This is a beta rewrite with Arrow nodes. 

In mol notation, the LHS pattern is 

L a b e
A e c d

which is transformed into 

Arrow a d
Arrow c b

The graphical version of the LHS pattern is 

"middle"  b                       d  "out"
           \_2                 3_/
            \    e2,b1  e1,a1   /
             \                 /
       L  n2  o----|-----|----o   n1  A
             /     3     1     \
          1_/    "out"  "in"    \_2
           /                     \
    "in"  a                       c  "middle"

and the RHS pattern is made by two Arrow center nodes, with the node ports connected 
to a,d, respectively to c, b. 

This justifies the "beta-arrow-X" name.
*/
    case "beta-arrow-X":
      // L-A transitions:
      // Arrow a d^Arrow c b
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);

      moveLink1(a,ar1[1]);
      moveLink1(b,ar2[2]);
      moveLink1(c,ar2[1]);
      moveLink1(d,ar1[2]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);     indTokenType  = Tokens.indexOf("Arrow"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 2;
      break;

/*
This is another beta rewrite with Arrow nodes, where the Arrow nodes after the transform connect differently.

In mol notation, the LHS pattern is 


D a b e
FOX e c d

or 

FI a b e
FOE e c d

which is transformed into 

Arrow a d
Arrow b c

The graphical version of the LHS pattern is 

    "in"  a                       c  "middle"
           \_1                 2_/
            \    e2,b1  e1,a1   /
             \                 /
    D/FI  n2  o----|-----|----o   n1  FOX/FOE
             /     3     1     \
          2_/    "out"  "in"    \_3
           /                     \
"middle"  b                       d  "out"

and the RHS pattern is made by two Arrow center nodes, with the node ports connected 
to a,d, respectively to b, c. 

The second Arrow mol node (Arrow b c) is different than before. Also, if we would draw 
the node ports in the same circular order as before, this time the Arrow elements would not 
cross.
*/
    case "beta-arrow":
      // D-FOX and FI-FOE transitions:
      // Arrow a d^Arrow b c
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);

      moveLink1(a,ar1[1]);
      moveLink1(b,ar2[1]);
      moveLink1(c,ar2[2]);
      moveLink1(d,ar1[2]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);     indTokenType  = Tokens.indexOf("Arrow"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 2;
      break;

// not used
    case "eta":
      // FOX-D-eta, A-L-eta and FOE-FI-eta transitions:
      moveLink2(a,d);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
// for the following DIST rewrites see the tool to choose DIST rewrites https://mbuliga.github.io/rhs.html

//            THE LHS NOTATION
//
//          a                       c
//           \_1                 2_/
//            \      e2    e1     /
//             \                 /
//  n2type  n2  o----|-----|----o   n1  n1type
//             /     3     1     \
//          2_/                   \_3
//           /                     \
//          b                       d
//

//  THE RHS ABSOLUTE PORTS PLACEMENT AND NOTATION  (related to the "shuffle trick", or (convex) axiom from em-convex)    
//
//            a                       c
//             \_1                 3_/
//              \                   /
//               \     2     1     /
// n1type  na/t1  o----|-----|----o  nc/t3  n2type
//                 \      u      /
//                3_\           /_2
//                   \         /
//                    \       /  
//                   v \     / w 
//                      \   /  
//                       \ /
//                        X        
//                       / \
//                      /   \             
//                     /     \
//                  w /       \ v
//                   /         \     
//                2_/           \_1
//                 /   3     2   \
// n1type  nb/t2  o----|-----|----o  nd/t4  n2type
//               /        p        \ 
//            1_/                   \_3 
//             /                     \
//            b                       d
//
// at https://mbuliga.github.io/rhs.html are computed all possible such rewrites
// which are compatible with the anharmonic group decorations of the nodes 
// to be found at nodes.js, definition of nodeValence 


    case "DIST0":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[3],nc[2],2);
      addLink(na[2],nd[1],2);
      addLink(nb[2],nc[3],2);
      addLink(nb[3],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[1]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST1":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[1],2);
      addLink(na[3],nd[1],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[3],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[1]);
      moveLink1(c,nc[3]);
      moveLink1(d,nd[3]);  if (trans.t1 == "S" && trans.t3 == "A") {indTokenType  = Tokens.indexOf("S-A"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 1;}
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);    
      break;
    case "DIST2":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[3],nc[1],2);
      addLink(na[2],nd[2],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[3],nd[1],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[1]);
      moveLink1(c,nc[3]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST3":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[3],2);
      addLink(na[3],nd[1],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[3],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[1]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST4":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[2],2);
      addLink(na[3],nd[1],2);
      addLink(nb[1],nc[3],2);
      addLink(nb[2],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[3]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST5":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[3],2);
      addLink(na[3],nd[1],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[1],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[3]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST6":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[1],2);
      addLink(na[3],nd[2],2);
      addLink(nb[1],nc[2],2);
      addLink(nb[2],nd[1],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[3]);
      moveLink1(c,nc[3]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "DIST7":
      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      addLink(na[2],nc[1],2);
      addLink(na[3],nd[1],2);
      addLink(nb[2],nc[2],2);
      addLink(nb[1],nd[2],2);
      moveLink1(a,na[1]);
      moveLink1(b,nb[3]);
      moveLink1(c,nc[3]);
      moveLink1(d,nd[3]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "GLOBALFO":
      var decor = [nodes[n2].tag];
      var nd = addNodeAndEdgesWithDeco(trans.t1,n1.x,n1.y,decor);

      addLink(nd[1],c);
      moveLink2(e2,d);
      removeNodeAndEdges(n1);
    break;

// Interaction Combinators GAMMA-GAMMA, without Arrow nodes, not used

    case "GAMMA-GAMMA":
      // GAMMA-GAMMA transition:
      // Link out n1 to middle n2 and middle n1 to out n2
      moveLink2(d,b);
      moveLink2(c,b1);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

// Interaction Combinators GAMMA-GAMMA, with Arrow nodes, 4 Arrow nodes needed

    case "GAMMA-GAMMA-arrow":
      // GAMMA-GAMMA transition:
      // Arrow b f^Arrow d f^Arrow b1 g^Arrow c g
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);
      var ar4 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar3 = addNodeAndEdges(trans.t1,n1.x,n1.y);

      addLink(ar1[2],ar2[2],2);
      addLink(ar3[2],ar4[2],2);

      moveLink1(b,ar2[1]);
      moveLink1(d,ar1[1]);
      moveLink1(b1,ar3[1]);
      moveLink1(c,ar4[1]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

// Interaction Combinators GAMMA-GAMMA, with Arrow nodes, 1 Arrow nodes needed

    case "GAMMA-GAMMA-arrow1":
      // GAMMA-GAMMA transition:
      // Arrow b f^Arrow d f^Arrow b1 g^Arrow c g
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);


      moveLink1(b,ar1[1]);
      moveLink1(d,ar1[2]);
      moveLink1(b1,ar2[1]);
      moveLink1(c,ar2[2]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;


// Interaction Combinators DELTA-DELTA, without Arrow nodes, not used
    case "DELTA-DELTA":
      // DELTA-DELTA transition:
      // Link out n1 to out n2 and middle n1 to middle n2
      moveLink2(d,b1);
      moveLink2(b,c);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
// Interaction Combinators DELTA-DELTA, with Arrow nodes, 4 Arrow nodes needed
    case "DELTA-DELTA-arrow":
      // DELTA-DELTA transition:
      // Arrow b1 f^Arrow d f^Arrow b g^Arrow c g
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);
      var ar4 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar3 = addNodeAndEdges(trans.t1,n1.x,n1.y);

      addLink(ar1[2],ar2[2],2);
      addLink(ar3[2],ar4[2],2);

      moveLink1(b1,ar2[1]);
      moveLink1(d,ar1[1]);
      moveLink1(b,ar3[1]);
      moveLink1(c,ar4[1]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

// Interaction Combinators DELTA-DELTA, with Arrow nodes, 4 Arrow nodes needed
    case "DELTA-DELTA-arrow1":
      // DELTA-DELTA transition:
      // Arrow b1 f^Arrow d f^Arrow b g^Arrow c g
      var ar2 = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var ar1 = addNodeAndEdges(trans.t1,n1.x,n1.y);


      moveLink1(b1,ar1[1]);
      moveLink1(d,ar1[2]);
      moveLink1(b,ar2[1]);
      moveLink1(c,ar2[2]);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "GAMMA-DELTA":
      //  DIST like transition GAMMA-DELTA,

      var na = addNodeAndEdges(trans.t1,n2.x,n2.y);
      var nb = addNodeAndEdges(trans.t2,n2.x,n2.y);
      var nc = addNodeAndEdges(trans.t3,n1.x,n1.y);
      var nd = addNodeAndEdges(trans.t4,n1.x,n1.y);
      
      addLink(na[2],nc[2],2);
      addLink(na[3],nd[2],2);
      addLink(nb[2],nc[3],2);
      addLink(nb[3],nd[3],2);

      moveLink1(b,na[1]);
      moveLink1(b1,nb[1]);
      moveLink1(c,nc[1]);
      moveLink1(d,nd[1]);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

// termination rewrites, i.e. those which involve a node T

    case "term3":
      // Terminator transition for GAMMA and DELTA
      // Make another terminator
      na = addNodeAndEdges("T",n2.x,n2.y);
      
      moveLink1(b1,e1.id)
      moveLink1(b,na[1])
      
      removeNodeAndEdges(n2);
      break;

    case "remove1":
      // Just remove an unconnected T
      removeNodeAndEdges(n1);
      break;
    case "remove4":
      // Just remove the pair of nodes
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "term":
      // Terminator transition for A and FI
      // Make another terminator
      na = addNodeAndEdges("T",n2.x,n2.y);
      
      moveLink1(a,e1.id)
      moveLink1(b,na[1])
      
      removeNodeAndEdges(n2);
      break;
    case "termL":
      // Terminator transition for L, for chemlambda
      // Make a FRIN
      na = addNodeAndEdges("FRIN",n2.x,n2.y);
      
      moveLink1(a,e1.id)
      moveLink1(b,na[1])
      
      removeNodeAndEdges(n2);
      break;

   case "termLD":
      // Terminator transition for L, but for directed IC
      // Make a FRIN
      na = addNodeAndEdges("T",n2.x,n2.y);
      
      moveLink1(a,e1.id)
      moveLink1(b,na[1])
      
      removeNodeAndEdges(n2);
      break;

    case "termFI":
      // Terminator transition for FRIN-FI

      moveLink2(c,d)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "term1": case "term2":
      // Terminator transition for FO and FOE
      // Remove the node and terminator
      if (e2.type == "out") {
        moveLink2(a,b)
      } else {
        moveLink2(a,b1)
      }
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "termin":
      // Terminator transition for T-FOX, T-D
      // Remove the node and terminator
      moveLink2(c,d)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "termin2":
      // Terminator transition for T-FO
      // Make another terminator
      na = addNodeAndEdges("T",n1.x,n1.y);
      nb = addNodeAndEdges("T",n2.x,n2.y);
      
      moveLink1(c,nb[1],2)
      moveLink1(d,na[1],2)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;

    case "terminfrin":
      // Terminator transition for FRIN-FO
      // Make another terminator
      na = addNodeAndEdges("FRIN",n1.x,n1.y);
      nb = addNodeAndEdges("FRIN",n2.x,n2.y);
      
      moveLink1(c,nb[1],2)
      moveLink1(d,na[1],2)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);
      break;
    case "termsplit":
      // Terminator transition for L
      // Terminate left and leave out alone
      moveLink1(a,e1.id)
      
      removeNodeAndEdges(n2);
      break;



// chemSKI transforms

    case "KA": 


// like "beta-arrow-X" where a=c, b=a1, c=g32, d=g33, n1=n3in, n2=n1

      var e2in = findLinkedHalfEdge(d);
      var n3in = findLinkedCenter(e2in);
      var g32 = findLinkedOfType(n3in,"middle");
      var g33 = findLinkedOfType(n3in,"out");       

//    add two Arrow nodes    
      var ar2 = addNodeAndEdges("Arrow",n1.x,n1.y);
      var ar1 = addNodeAndEdges("Arrow",n3in.x,n3in.y); 

      indTokenType  = Tokens.indexOf("Arrow"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 2;

      moveLink1(c,ar1[1]);
      moveLink1(a1,ar2[2]);
      moveLink1(g32,ar2[1]);
      moveLink1(g33,ar1[2]);
      
      removeNodeAndEdges(n3in);
      removeNodeAndEdges(n1);     

      indTokenType  = Tokens.indexOf("A-A"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] + 1;





 



    break;


    case "termIA":

//    add Arrow   (from token Arrow) 

      var nar = addNodeAndEdges("Arrow",n1.x,n1.y);  indTokenType  = Tokens.indexOf("Arrow"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 1;

//    create links

      moveLink1(d,nar[1]);
      moveLink1(c,nar[2]);

//    when tokens will be ready
//      movelink1(n1[2],n1[3]);
//    otherwise
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);     indTokenType  = Tokens.indexOf("I-A"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] + 1;

    break; 



    case "terminIS": case "terminIFOE":

//    add one I node   (from token I-A) 


      na = addNodeAndEdges("I",n1.x,n1.y);
      nb = addNodeAndEdges("I",n2.x,n2.y);    if (trans.action == "terminIS") { indTokenType  = Tokens.indexOf("I-A"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 1;}
      
      moveLink1(c,nb[1],2)
      moveLink1(d,na[1],2)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);                  if (trans.action == "terminIS") { indTokenType  = Tokens.indexOf("S-A"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] + 1;}


    break; 


    case "terminKS": case "terminKFOE":

//    add one K node   (from token A-K) 

      na = addNodeAndEdges("K",n1.x,n1.y);
      nb = addNodeAndEdges("K",n2.x,n2.y);     if (trans.action == "terminKS") { indTokenType  = Tokens.indexOf("S-K"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 1;}
      
      moveLink1(c,nb[1],2)
      moveLink1(d,na[1],2)
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);     if (trans.action == "terminKS") {indTokenType  = Tokens.indexOf("S-S"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] + 1;}
    break; 


    case "terminSK": case "terminFOEK":

// identical to "term1", with the exception of the I-A token instead of Arrow or direct reconnection

//    with tokens add I-A
//
//    otherwise
      if (e2.type == "out") {
        moveLink2(a,b);
      } else {
        moveLink2(a,b1);
      }                         if (trans.action == "terminSK") {indTokenType  = Tokens.indexOf("Arrow"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 1;}          
      
//    when tokens will be ready create S-K
//
//    otherwise
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);  if (trans.action == "terminSK") {indTokenType  = Tokens.indexOf("S-K"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] + 1;}

    break; 


    case "termAK":

// identical to "term", with the exception of the I-K token

      na = addNodeAndEdges("K",n2.x,n2.y);
      
      moveLink1(a,e1.id);
      moveLink1(b,na[1]);  indTokenType  = Tokens.indexOf("S-K"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] - 1;
      
//    when tokens will be ready connect the I from the I-K token with n2 to obtain a pair I-A, which we use instead of Arrow a e1.id
//
//    otherwise 
      removeNodeAndEdges(n2);  indTokenType  = Tokens.indexOf("S-A"); balanceOfTokens[indTokenType] = balanceOfTokens[indTokenType] + 1;

    break;


    case "SS":  case "SFOE":

      na = addNodeAndEdges("S",n1.x,n1.y);
      nb = addNodeAndEdges("S",n2.x,n2.y);
      
      moveLink1(c,na[3]);
      moveLink1(d,nb[3]);

      addLink(na[2],na[1],2);
      addLink(nb[2],nb[1],2);
      
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2);

    break; 


    case "SA":

      var e11 = findLinkedHalfEdge(d);              
      var n2s = findLinkedCenter(e11);                
      
      var e2sout = findLinkedOfType(n2s,"out");
      var e2smid = findLinkedOfType(n2s,"middle");

      var e3in = findLinkedHalfEdge(e2sout);           
      var n3s = findLinkedCenter(e3in);  

      var e3sout = findLinkedOfType(n3s,"out");
      var e3smid = findLinkedOfType(n3s,"middle"); 


// create copies of the 4 nodes

      var n2new = addNodeAndEdges("S",n2.x,n2.y);
      var n1new = addNodeAndEdges("A",n2.x,n2.y);
      var n2snew = addNodeAndEdges("A",n1.x,n1.y);
      var n3snew = addNodeAndEdges("A",n1.x,n1.y);

// connect the external half-edges

      moveLink1(c,n1new[1]);
      moveLink1(e2smid,n2snew[1]);
      moveLink1(e3sout,n3snew[3]);
      moveLink1(e3smid,n2new[1]);

// recreate the internal half-edges

      addLink(n1new[3],n3snew[1],2);
      addLink(n2snew[3],n3snew[2],2);
      addLink(n2new[2],n1new[2],2);
      addLink(n2new[3],n2snew[2],2);

// delete old nodes

      removeNodeAndEdges(n2);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2s);
      removeNodeAndEdges(n3s);

    break; 

    case "SAFOE":

      var e11 = findLinkedHalfEdge(d);              
      var n2s = findLinkedCenter(e11);                
      
      var e2sout = findLinkedOfType(n2s,"out");
      var e2smid = findLinkedOfType(n2s,"middle");

      var e3in = findLinkedHalfEdge(e2sout);           
      var n3s = findLinkedCenter(e3in);  

      var e3sout = findLinkedOfType(n3s,"out");
      var e3smid = findLinkedOfType(n3s,"middle");


// create copies of the 4 nodes

      var n2new = addNodeAndEdges("FOE",n2.x,n2.y);
      var n1new = addNodeAndEdges("A",n2.x,n2.y);
      var n2snew = addNodeAndEdges("A",n1.x,n1.y);
      var n3snew = addNodeAndEdges("A",n1.x,n1.y);

// connect the external half-edges

      moveLink1(c,n1new[1]);
      moveLink1(e2smid,n2snew[1]);
      moveLink1(e3sout,n3snew[3]);
      moveLink1(e3smid,n2new[1]);

// recreate the internal half-edges

      addLink(n1new[3],n3snew[1],2);
      addLink(n2snew[3],n3snew[2],2);
      addLink(n2new[2],n1new[2],2);
      addLink(n2new[3],n2snew[2],2);

// delete old nodes

      removeNodeAndEdges(n2);
      removeNodeAndEdges(n1);
      removeNodeAndEdges(n2s);
      removeNodeAndEdges(n3s);

    break; 


//

    default:
      console.error("Invalid transformation "+trans.action)
  }

  findAllTransforms();

// end function doTransform
}


