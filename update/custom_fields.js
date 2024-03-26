import {postRequest, splitStringIntoChunks} from './utils.js'
import fs from 'fs'
import {API_PATH} from './../credentials.js'

let customFieldsToBeUpdatedProducts = fs.readFileSync('./../replaced-src/custom_fields_to_be_updated_products.json');

customFieldsToBeUpdatedProducts = JSON.parse(customFieldsToBeUpdatedProducts);

const productsUpdated = [];

const prodIDs = [62863, 62862, 62860, 62861];

const successes = [];

const errors = [];

let index = -1;

for(const {prod_id, replacedConcatenatedCustomFields} of customFieldsToBeUpdatedProducts){

	index++

	if(index > 3) continue;

	let url = `${API_PATH}catalog/products/${prodIDs[index]}`;

	let chunks = splitStringIntoChunks(replacedConcatenatedCustomFields);

	chunks = chunks.map(c => ({name: "short_description_new", value: c.toString()}))

	let response = await postRequest(url, {
		"custom_fields": chunks
	});

	response = await response.json();

	if(response.data !== undefined && response.data.id !== undefined){
		successes.push(response.data.id)
		console.log(index, " successes")
	}else{
		console.log(index, " failed")
		errors.push(
			{
				id: prodIDs[index],
				response: response
			}
		)
	}

	fs.writeFileSync('successes_cust.json', JSON.stringify(successes, null, 2))
	fs.writeFileSync('errors_cust.json', JSON.stringify(errors, null, 2))

}