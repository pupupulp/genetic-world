const { Population } = require('./genetic');

const target = "We see things they'll never see";
const populationSize = 10;

let population = new Population(target, populationSize);
population.populate();