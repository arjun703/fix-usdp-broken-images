import fs from 'fs'
import json2xls from 'json2xls'

let all_url_replacements = JSON.parse(fs.readFileSync('./replaced-src/allURLreplaceMents.json', 'utf8'))
let custom_fields_to_be_updated_products = JSON.parse(fs.readFileSync('./replaced-src/customFieldsToBeUpdatedProducts.json', 'utf8'))
let description_to_be_updated_products = JSON.parse(fs.readFileSync('./replaced-src/descriptionToBeUpdatedProducts.json', 'utf8'))

// Convert JSON data to XLSX format
const all_url_replacements_excel = json2xls(all_url_replacements);
const custom_fields_to_be_updated_products_excel = json2xls(custom_fields_to_be_updated_products);
const description_to_be_updated_products_excel = json2xls(description_to_be_updated_products);

// Write XLSX data to a file
fs.writeFileSync('./excels/all_url_replacements.xlsx', all_url_replacements_excel, 'binary');
fs.writeFileSync('./excels/custom_fields_to_be_updated_products.xlsx', custom_fields_to_be_updated_products_excel, 'binary');
fs.writeFileSync('./excels/description_to_be_updated_products.xlsx', description_to_be_updated_products_excel, 'binary');