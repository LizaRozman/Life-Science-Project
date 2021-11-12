async function TreatQuery(disease) {
  var treat_query = "
	SELECT ?treatlabel
	WHERE 
	{
  	wd:"+disease" wdt:P2176 ?treat.     
  	SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } # Helps get the label in your language, if not, then en language
	}
	GROUP BY ?treatLabel";
  return treat_query;
}

async function SymptQuery(disease) {
  var sympt_query = "
	SELECT ?symptLabel
	WHERE 
	{
 	wd:"+disease"dt:P780 ?sympt.        
  	SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } # Helps get the label in your language, if not, then en language
	}GROUP BY ?symptLabel";
  return sympt_query;
}

async function GeneQuery(disease) {
  var gene_query = "
	SELECT ?geneLabel
	WHERE 
	{
 	wd:"+disease" wdt:P5572 ?gene.        
  	SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } # Helps get the label in your language, if not, then en language
	}GROUP BY ?geneLabel";
  return gene_query;
}

async function StructQuery(disease) {
  var struct_query = "
	SELECT ?structureLabel
	WHERE
	{
  	wd:Q202387 wdt:P2293 ?gene.
  	?gene wdt:P5572 ?structure.
  	VALUES (?regions) {(wd:Q1620186) (wd:Q1073)}
  	?structure wdt:P31|wdt:P2791 ?regions.
  
  	SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } # Helps get the label in your language, if not, then en language
	}	
	GROUP BY ?structureLabel";
  return struct_query; 
}

async function Retreive(query) {
    var url = wdk.sparqlQuery(query);
    var response = await fetch(url);
    var results = await response.json();
    var final = wdk.simplify.sparqlResults(results);
    return final;
}
