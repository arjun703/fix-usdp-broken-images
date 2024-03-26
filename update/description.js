import {postRequest} from './utils.js'
import fs from 'fs'
import {API_PATH} from './../credentials.js'

let descriptionToBeUpdatedProducts = fs.readFileSync('./../replaced-src/description_to_be_updated_products.json');

descriptionToBeUpdatedProducts = JSON.parse(descriptionToBeUpdatedProducts);

const productsUpdated = [];

console.log(descriptionToBeUpdatedProducts.length);

const prodIDs = [62863, 62862, 62860, 62861];

const successes = [];

const errors = [];

let index = -1;

for(const {prod_id, replacedDesc} of descriptionToBeUpdatedProducts){

	index++

	if(index > 3) continue;


	let url = `${API_PATH}catalog/products/${prodIDs[index]}`;

	let response = await postRequest(url, {
		"description": replacedDesc
	});


	response = await response.json();

	console.log(index)


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


	fs.writeFileSync('successes_desc.json', JSON.stringify(successes, null, 2))
	fs.writeFileSync('errors_desc.json', JSON.stringify(errors, null, 2))

}
