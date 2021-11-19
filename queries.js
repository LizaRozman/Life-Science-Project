async function TreatQuery(disease) {
    var treat_query = `SELECT ?itemLabel	
                        WHERE {wd:` + disease + ` wdt:P2176 ?item. 
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
                        } 
                        GROUP BY ?itemLabel 
                        ORDER BY ASC(?itemLabel)`;
    var treatments = await Retrieve(treat_query);
    console.log(treatments); //only for debugging
    return treatments;
}


async function SymptQuery(disease) {
    var sympt_query = `SELECT ?itemLabel	
                        WHERE {wd:` + disease + ` wdt:P780 ?item. 
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
                        } 
                        GROUP BY ?itemLabel 
                        ORDER BY ASC(?itemLabel)`;
    var symptoms = await Retrieve(sympt_query);
    console.log(symptoms); //only for debugging
    return symptoms;
}

async function GeneQuery(disease) {
    var gene_query = `SELECT ?itemLabel 
                        WHERE {wd:` + disease + ` wdt:P2293 ?item. 
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
                        } 
                        GROUP BY ?itemLabel 
                        ORDER BY ASC(?itemLabel)`;
    console.log(gene_query); //only for debugging
    var genes = await Retrieve(gene_query);
    console.log(genes); //only for debugging
    return genes;
  
}

async function StructQuery(disease) {
    var struct_query = `SELECT ?itemLabel 
                        WHERE {
                        wd:` + disease + ` wdt:P2293 ?gene. 
                        ?gene wdt:P5572 ?item.
                        VALUES (?regions) {(wd:Q1620186) (wd:Q1073)}.
                        ?item wdt:P31|wdt:P2791 ?regions. 
                        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } 
                        } 
                        GROUP BY ?itemLabel 
                        ORDER BY ASC(?itemLabel)`;
    var structures = await Retrieve(struct_query);
    console.log(structures); //only for debugging
    return structures;
}
'async function Retrieve(query) {
    let url = wdk.sparqlQuery(query); //create wikidata URL based on the recieved query string 
    let response = await fetch(url); //retreives results of the query
    let results = await response.json();
    let final = await wdk.simplify.sparqlResults(results); //simplifies object for easier handling
    console.log(final);
    let items = Array();
    for (let row in final){
        items.push(row.itemLabel)
};
    
    return items;
}
