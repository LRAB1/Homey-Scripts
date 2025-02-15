/*This script should be the basis for a decision about wether to push power to the grid 
*  or to keep that in storage and work toward a 0 payback toward the powersupplier.
* LBA 14-02-2025
*/


//Grab the remaining power to be delivered back to the grid. Then we can make a more informed decision later when we see if we have more than 1kwh in the 'bank'.
var terugLeverCapaciteit = await Homey.logic.getVariable({
  id: "23336e3c-5451-4133-a0a1-4df602b80738",
});
log(`Teruglevercapaciteit:`, terugLeverCapaciteit.value); //for debugging purposes we'll log the value.

//Now we have the max. capacity to be delivered back let's get the amount of months until the contract resets (hardcoded to be july (6th month in the array) because that is when it resets).
var d = new Date();
var month = d.getMonth();
log(`Maand:`, month); //for debugging purposes we log the month number.

var remainingMonths = 6 - month; //This calculates the number of months left. //TODO: rollover after 6th month mark means negative value in the result.
log(`Resterende maanden:`, remainingMonths); //for debugging purposes we log the month amount.

//Calculate the remaining amount of KWh/month so we can determine how much to push on to the grid.
var maandCapaciteit = terugLeverCapaciteit.value / remainingMonths;
log(maandCapaciteit, 'kWh/maand resterend.'); //for debugging purposes we log the amount.

//Calculate if we should push back to the grid. //This current form only takes into account amount per month. Rewriting this to be an amount per night.
async function pushOrNo() {
  if (!maandCapaciteit > 5) {
    await Homey.logic.updateVariable({
    id: "5cfaa74a-27fa-4618-9d71-9d434b3f9b5b",
      variable: {
        value: false,
      },
})} else await Homey.logic.updateVariable({
  id: "5cfaa74a-27fa-4618-9d71-9d434b3f9b5b",
 variable: {
  value: true,
  }
})};

pushOrNo();
