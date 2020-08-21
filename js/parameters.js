// general parameters
//
// forked from https://github.com/mbuliga/quinegraphs/blob/master/js/parameters.js
//
// this version 15.08.2020


// set up the d3 visualisation
var w = 560,
    h = 480;

// node radii

var smallNode = 6,
    bigNode = 10;

// d3 force graph parameters

var chargeForceStrength = -16;
var gravForceStrength = 0.12;

var forceStrength = 0.5;
var forceAlpha = 0.1;
var forceAlphaDecay = 0;
var forceVelocityDecay = 0.1;

// colors 

var redCol = "#FF0000";            //"red";                          // "#b80000";
var orangeCol = "#F08080";         //"lightcoral";                // "#FF6C03";
var orange2Col = "#FF8C00";        //"darkorange";               // "#FFA500";
var yellowCol = "#FFD700";         //"gold";                      // "#FFCE54";
var greenCol = "#008000";          //"green";                      // "#9fc952";
var middleCol = "#4682B4";         //"steelblue";                 // "#4A89DC";
var blueCol = "#0000FF";           //"blue";                        // "#00F";
var violetCol = "#D503FF";
var whiteCol = "#fff";

// 

var speed = 0;
var startVar = 0;
var arenaVar = 0;
var fightersVar = 0;
var combOnly = 0;
var olderFirst = 0;

// transform chemlambda into directed IC and back parameter

var isChemlambda = 1;

// parser for lambda term (isSkiTerm = 0) or for SKI term (isSkiTerm = 1)

var isSkiTerm = 1;


// age

var age = 0;


// global counter

var globCount = 0;

// tag and number and token


var tokenIni = "";
var tagIni = "";
var numberIni = 0;
var decorationOfEdges = [];

// node colors for metabolism

var metabo = 0;
