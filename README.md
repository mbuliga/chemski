# chemSKI
[Marius Buliga](https://mbuliga.github.io/)

A purely local graph rewrite system for the SKI combinator calculus, in [chemlambda](https://chemlambda.github.io/index.html) style.

The main article is [chemSKI with tokens: world building and economy in the SKI universe](https://mbuliga.github.io/chemski/chemski-with-tokens.html). 

chemSKI was first proposed in  [chemSKI & chemlambda](https://mbuliga.github.io/chemski/chemski.html#SIISII). 

**Motivation.** German Kruszewski posed the problem of a chemlambda style graph-rewriting version of his and Tomas Mikolov Combinatory Chemistry
 https://www.mitpressjournals.org/doi/pdf/10.1162/isal_a_00258  
 https://arxiv.org/pdf/2003.07916.pdf
 
 **chemSKI** is a graph rewrite system for the SKI combinator calculus, with only local graph rewrites. The algorithm of application of rewrites is random.   

**Differences.** Kruszewski and Mikolov  Combinatory Chemistry is conservative. Therefore the reaction

S a b c   + c --> (a c) (b c)  + S    

is based on the delegated duplication of c, i.e. the reaction happens only if somewhere else in the system the term c is produced. 

chemSKI graph rewrites are not conservative, but they can be made conservative, as explained in the main article,  inspired by the [project Hapax](https://github.com/mbuliga/hapax).  In chemSKI the *SKI combinators graphs* (i.e. chemSKI graphs) can be supplemented with *small token molecules*, ie two nodes molecules like I-A, S-A, S-K, ..., which added to the rewrites make them conservative in the nodes and edges. This allows to build various costs of computation.


Another feature of Combinatory Chemistry is that it allows chemical reactions which build larger graphs from smaller ones. In terms of combinators, the reaction is 

A + B --> A B

like in Fontana and Buss ALCHEMY. 


This can be replaced in chemSKI by synthesis rewrites which adds (inserts, glues) a token molecule to an edge of the graph of another token, or to one of  any other graph. This was first suggested for chemlambda in Chemlambda strings 
 https://doi.org/10.6084/m9.figshare.5751318.v1 
and a first attempt was done  in the repository hapax
https://github.com/mbuliga/hapax 
mentioned before. 
