# genetic-world

![contributors](https://badgen.net/github/contributors/pupupulp/genetic-world)
![stars](https://badgen.net/github/stars/pupupulp/genetic-world)
![commits](https://badgen.net/github/commits/pupupulp/genetic-world)
![last commit](https://badgen.net/github/last-commit/pupupulp/genetic-world)
[![License](https://badgen.net/github/license/pupupulp/genetic-world)](https://github.com/pupupulp/genetic-world/blob/master/LICENSE)

An opensource application to implement genetic algorithm for Hello World

## Features

+ Creation of population is randomized, you only need to specify the target string and the population size

+ Allowed characters for randomization are as follows:

```js
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeric = '0123456789';
const symbols = '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\ ';
```

+ Cost function utilized Levenshtein Distance to compute distance between strings

+ Crossover has one parent set to best parent possible and the other is set to a random crossover chance to pick the second best or a random one on the group, crossover chance is set to 0.5 by default

+ Crossover rate is set to random or a default value of 2 if a zero occurs, this rate is used to compute the pivot on where to split the strings for crossover

+ For computing mutation rate of crossover offsprings, the mutation rate of the parents are averaged, which is then added to a new random rate of the offspring which is also averaged right after to get a mutation rate of an offspring with respect to their parents mutation rate 

+ For the initial cost of the crossover offsprings, the cost of the parents are averaged 

+ Mutation chance is set to 0.5 by default, and mutates only if the chromosomes mutation rate is greater than the mutation chance

+ Mutation also utilizes the allowed characters for randomization

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/pupupulp/genetic-world/issues/new).

### Contributors

### Author

**Eagan Martin**
- [Github](https://github.com/pupupulp)
- [LinkedIn]()

### License

Copyright © 2019, [Eagan Martin](https://github.com/pupupulp). Release under the [MIT License](https://github.com/pupupulp/genetic-world/blob/master/LICENSE)