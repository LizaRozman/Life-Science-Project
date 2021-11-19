async function TreatQuery(disease) {
    var treat_query = 'SELECT ?treatLabel	WHERE {wd:' + disease + ' wdt:P2176 ?treat. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } GROUP BY ?treatLabel ORDER BY ASC(?treatLabel)';
    var treatments = await Retrieve(treat_query);
    console.log(treatments); //only for debugging
    return treatments;
}


async function SymptQuery(disease) {
    var sympt_query = 'SELECT ?symptLabel	WHERE {wd:' + disease + ' wdt:P780 ?sympt. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } GROUP BY ?symptLabel ORDER BY ASC(?symptLabel)';
    var symptoms = await Retrieve(sympt_query);
    console.log(symptoms); //only for debugging
    return symptoms;
}

async function GeneQuery(disease) {
    var gene_query = 'SELECT ?geneLabel WHERE {wd:' + disease + ' wdt:P2293 ?gene. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } GROUP BY ?geneLabel ORDER BY ASC(?geneLabel)';
    console.log(gene_query); //only for debugging
    var genes = await Retrieve(gene_query);
    console.log(genes); //only for debugging
    return genes;
  
}

async function StructQuery(disease) {
    var struct_query = 'SELECT ?structureLabel WHERE {wd:' + disease + ' wdt:P2293 ?gene. ?gene wdt:P5572 ?structure. VALUES (?regions) {(wd:Q1620186) (wd:Q1073)}. ?structure wdt:P31|wdt:P2791 ?regions. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } GROUP BY ?structureLabel ORDER BY ASC(?structureLabel)';
    var structures = await Retrieve(struct_query);
    console.log(structures); //only for debugging
    return structures;
}

async function Retrieve(query) {
    let url = wdk.sparqlQuery(query); //create wikidata URL based on the recieved query string 
    let response = await fetch(url); //retreives results of the query
    let results = await response.json();
	var final = await wdk.simplify.sparqlResults(results); //simplifies object for easier handling
    return final;
}
