import {ACCESS_TOKEN} from './../credentials.js'

export  async function postRequest(url, requestBody){

	let options = {
		method: 'PUT',
		headers: {
	    	Accept: 'application/json',
	    	'Content-Type': 'application/json',
	    	'X-Auth-Token': ACCESS_TOKEN
	  	},
	  	body: JSON.stringify(requestBody)
	};

	try{

		let response = await fetch(url, options);
		return response;
		
	}catch(e){
		return [false, e];
	}


}

export function splitStringIntoChunks(string, chunkSize=240) {
    const substrings = [];
    let index = 0;
    while (index < string.length) {
        substrings.push(string.substr(index, chunkSize));
        index += chunkSize;
    }
    return substrings
}