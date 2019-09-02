const { Population } = require('./genetic');

const target = "Hello World!";
const populationSize = 20;

let population = new Population(target, populationSize);
population.populate();