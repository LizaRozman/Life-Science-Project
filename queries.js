async function TreatQuery(disease) {
  var treat_query = 'SELECT ?treatlabel	WHERE {wd:' + disease + ' wdt:P2176 ?treat. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } GROUP BY ?treatLabel';
  console.log(treat_query); //for debugging
  return treat_query;
}

//treatQuery('Q181923');

async function SymptQuery(disease) {
  var sympt_query = 'SELECT ?symptLabel	WHERE {wd:' + disease + 'dt:P780 ?sympt.	SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } GROUP BY ?symptLabel';
  return sympt_query;
}

async function GeneQuery(disease) {
  var gene_query = 'SELECT ?geneLabel WHERE {wd:' + disease + ' wdt:P5572 ?gene. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } GROUP BY ?geneLabel';
  console.log(gene_query); //for debugging
  return gene_query;
}

async function StructQuery(disease) {
  var struct_query = 'SELECT ?structureLabel WHERE {wd:' + disease + ' wdt:P2293 ?gene.	?gene wdt:P5572 ?structure.	VALUES (?regions) {(wd:Q1620186) (wd:Q1073)} ?structure wdt:P31|wdt:P2791 ?regions. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } GROUP BY ?structureLabel';
  return struct_query; 
}

async function Retrieve(query) {
    var url = wdk.sparqlQuery(query);
    var response = await fetch(url);
    var results = await response.json();
    var final = wdk.simplify.sparqlResults(results);
    console.log(final) //for debugging
    return final;
}
