import imageMappings from './real_mapping.js'
import fs from 'fs'
import replaceStrings from './replace.js'

const data = fs.readFileSync('products.json', 'utf8');
const products = JSON.parse(data)
const toBeReplacedArray = Object.keys(imageMappings);
	
let descriptionToBeUpdatedProducts = [];

let customFieldsToBeUpdatedProducts = [];

let allURLreplaceMents = [];


for (let i = 0; i < products.length; i++) {

    const p = products[i];

    const pid = p.id;

    const productDescription = p.description;
    
    let [replacedDescription, isURLsInDescriptionReplaced, URLreplaceMentsInDesc] = replaceStrings(imageMappings, productDescription);

    if (isURLsInDescriptionReplaced) {

    	descriptionToBeUpdatedProducts.push(
    		{
    			"prod_id": pid,
    			"oldDesc": productDescription,
    			"replacedDesc": replacedDescription
    		}
    	)
        
        URLreplaceMentsInDesc.map(r => {
        	r.product_id=pid;
        	return r
        })
        .forEach(rr=>{
        	allURLreplaceMents.push(rr)
        })

        // fs.writeFileSync('productDescriptionPath.txt', productDescription);

        // fs.writeFileSync('sourceDescriptionPath.txt', sourceDescription);

        // console.log("Replacement completed.", replaceMents);

        // break; // Exit the loop if replacement is made

    }

    const customFields = p.custom_fields;
    
    const customFieldsForShortDescs = customFields.filter(({name}) => name === "short_description");
    
    const shortDescConcatenated = customFieldsForShortDescs.map(({value}) => value ).join('');

    let [replacedConcatenatedCustomFields, isURLsInConcatenatedCustomFieldsReplaced, URLreplaceMentsInConcatenatedCFs] = replaceStrings(imageMappings, shortDescConcatenated);

    if (isURLsInConcatenatedCustomFieldsReplaced) {

		customFieldsToBeUpdatedProducts.push(
			{
				"prod_id": pid,
				"oldConcatenatedCustomFields": shortDescConcatenated,
				"replacedConcatenatedCustomFields": replacedConcatenatedCustomFields
			}
		)

        URLreplaceMentsInConcatenatedCFs.map(r => {
        	r.product_id=pid;
        	return r
        })
        .forEach(rr=>{
        	allURLreplaceMents.push(rr)
        })

        // console.log("Replacement completed.", replaceMents);

        // break; // Exit the loop if replacement is made

    }

}

fs.writeFileSync('./replaced-src/customFieldsToBeUpdatedProducts.json', JSON.stringify(descriptionToBeUpdatedProducts, null, 2));

fs.writeFileSync('./replaced-src/descriptionToBeUpdatedProducts.json', JSON.stringify(customFieldsToBeUpdatedProducts, null, 2));

fs.writeFileSync('./replaced-src/allURLreplaceMents.json', JSON.stringify(allURLreplaceMents, null, 2));

console.log("Num Products whose description will be updated: ", descriptionToBeUpdatedProducts.length)

console.log("Num Products whose custom fields will be updated: ", customFieldsToBeUpdatedProducts.length)

console.log("Total products to be updated: ", descriptionToBeUpdatedProducts.length + customFieldsToBeUpdatedProducts.length )

console.log("Total Image URL replacements that will be carried out: ", allURLreplaceMents.length)