function replaceStrings(mapping, sourceDescription) {

    const replacePrefix = "https://usdieselparts.com/product_images/";

    let replaced = false;

    const array = Object.keys(mapping)

    const replaceMents = [];

    for (let i = 0; i < array.length; i++) {
    
        if (sourceDescription.includes(array[i])) {
            replaced = true
            const replacementString = replacePrefix + mapping[array[i]]
            sourceDescription = sourceDescription.replaceAll(array[i], replacementString)
            replaceMents.push({"old_img_url": array[i], "replaced_by": replacementString})
        }
    
    }

    return [sourceDescription, replaced, replaceMents];

}

export default replaceStrings;