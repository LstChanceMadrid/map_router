
function gatherKeyValuesFromJSON() {

    fetch("index.json")

        .then(function(response){
            return response.json();
        })

        .then(function(obj){

            for (let key in obj){

                // Every leg of the journey
                legsInfoArray = obj[key].legs;

                legsInfoArray.forEach(function(leg){

                    let distanceObj = leg.distance              // {text: "0.4 mi", value: 674}           
                    let durantionObj = leg.duration             // {text: "2 mins", value: 130}

                    let startAddress = leg.start_address        
                    let startLocationObj = leg.start_location   // {lat: 29.7531944, lng: -95.3388006}

                    let endAddress = leg.end_address
                    let endLocationObj = leg.end_location       // {lat: 29.7553068, lng: -95.33571289999999}
                    
                    // Create object with specific items
                    legInfoObj = {
                        key: key,
                        distance: distanceObj,
                        duration: durantionObj,
                        startAddress: startAddress,
                        startLocation: startLocationObj,
                        endAddress: endAddress,
                        endLocation: endLocationObj,
                    }

                    // console.log(legInfoObj);
                    return legInfoObj

                });
            }
        })
}

gatherKeyValuesFromJSON();

