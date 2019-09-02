const { levenshteinDistance } = require('./levenshtein-distance');

class Chromosome {
    constructor(config) {
        this.mutationRate = config.mutationRate;
        this.cost = config.cost;
        this.size = config.size;

        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numeric = '0123456789';
        const symbols = '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\ ';
        
        this.allowedChars = lowercase + uppercase + numeric + symbols;
        
        if (config.value) {
            this.value = config.value;
        } else {
            this.randomizeValue(this.size);
        }
    }

    randomizeValue(size) {
        this. value = '';

        while (size--) {
            this.value += this.allowedChars[(Math.floor(Math.random() * this.allowedChars.length))];
        }
    } 

    mutate() {
        const mutationChance = 0.5 || Math.random();

        if (this.mutationRate >= mutationChance) return;

        const index = Math.floor(Math.random() * this.value.length);
        const mutation = this.allowedChars[(Math.floor(Math.random() * this.allowedChars.length))];
        const mutatedValue = this.value.substr(0, index) + mutation+ this.value.substr(index + mutation.length);
        
        this.value = mutatedValue;
    }

    crossover(partner) {
        let crossoverRate = Math.floor(Math.random() * partner.length);
        crossoverRate = crossoverRate > 0 ? crossoverRate : 2;

        const pivot = Math.round(this.value.length / crossoverRate) - 1;

        const offspringCost = (this.cost + partner.cost) / 2;
        const offspringLength = this.value.length;
        const parentsMutationRate = (this.mutationRate + partner.mutationRate) / 2;

        const offspring1 = {
            mutationRate: (Math.random() + parentsMutationRate) / 2,
            cost: offspringCost,
            size: offspringLength,
            value: this.value.substr(0, pivot) + partner.value.substr(pivot)
        };

        const offspring2 = {
            mutationRate: (Math.random() + parentsMutationRate) / 2,
            cost: offspringCost,
            size: offspringLength,
            value: partner.value.substr(0, pivot) + this.value.substr(pivot)
        }

        return [new Chromosome(offspring1), new Chromosome(offspring2)];
    }

    computeCost(target) {
        this.cost = levenshteinDistance(this.value, target);
    }
}

class Population {

    constructor(target, populationSize) {
        this.chromosomes = [];
        this.target = target;
        this.generationNo = 0;

        while (populationSize--) {
            const chromosome = new Chromosome({
                mutationRate: Math.random(),
                cost: Math.floor(Math.random() * 1000),
                size: this.target.length
            });

            this.chromosomes.push(chromosome);
        }
    }

    sort() {
        this.chromosomes.sort((a, b) => {
            return a.cost - b.cost;
        });
    }

    showGeneration() {
        console.log("Generation: " + this.generationNo);
        this.chromosomes.map(chromosome => {
            console.log("value: " + chromosome.value + "(" + chromosome.cost + ")");
        });
    }

    populate() {
        for (let i = 0; i < this.chromosomes.length; i++) {
            this.chromosomes[i].computeCost(this.target);
        }

        this.sort();
        this.showGeneration();

        const crossoverChance = 0.8 || Math.random();
        const bestParent = 0;
        let randomParent = Math.floor(Math.random() * this.chromosomes.length);
        randomParent = randomParent > 0 && Math.random() > crossoverChance ? randomParent : 1;

        const offsprings = this.chromosomes[bestParent].crossover(this.chromosomes[randomParent]);

        this.chromosomes.splice(this.chromosomes.length - 2, 2, offsprings[0], offsprings[1]);

        let perfectGeneration = true;
        for (let i = 0; i < this.chromosomes.length; i++) {
            this.chromosomes[i].mutate();
            this.chromosomes[i].computeCost(this.target);

            if(this.chromosomes[i].value != this.target) {
                perfectGeneration = false;
            }
        }

        if (perfectGeneration) {
            this.sort();
            this.showGeneration();
        } else {
            this.generationNo++;
            
            const self = this;
            setTimeout(function() {
                self.populate();
            }, 20);
        }
    }
}

module.exports.Chromosome = Chromosome;
module.exports.Population = Population;