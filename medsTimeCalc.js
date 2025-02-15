// Get the original variable value (e.g., "16:05")
var response = await Homey.logic.getVariable({
  id: "20731d3e-c7fe-4515-b297-e852517fa31d",
});

var medsTimeValue = response.value;
log("Original Value:", medsTimeValue);

// Split the time string into hours and minutes
let parts = medsTimeValue.split(":");
let hours = parseInt(parts[0], 10);
let minutes = parseInt(parts[1], 10);

// === Calculate the 4-hour later time ===
let addMinutes4 = 240; // 4 hours = 240 minutes
let totalMinutes4 = hours * 60 + minutes + addMinutes4;
let newHours4 = Math.floor(totalMinutes4 / 60) % 24;
let newMinutes4 = totalMinutes4 % 60;
let newTimeStr4 = newHours4.toString().padStart(2, '0') + ":" + newMinutes4.toString().padStart(2, '0');
log("New Time (4 hours later):", newTimeStr4);

// Update medsTime1 with the 4-hour later time
Homey.alarms.updateAlarm({
  id: "caad0c8d-06f4-4cc7-92fc-39ec11f078ba", // Updating medsTime1 for the 4-hour mark trigger.
  alarm: {
    type: "string",
    time: newTimeStr4,
    enabled: true,
  }
});

// === Calculate the 8-hour later time ===
let addMinutes8 = 480; // 8 hours = 480 minutes
let totalMinutes8 = hours * 60 + minutes + addMinutes8;
let newHours8 = Math.floor(totalMinutes8 / 60) % 24;
let newMinutes8 = totalMinutes8 % 60;
let newTimeStr8 = newHours8.toString().padStart(2, '0') + ":" + newMinutes8.toString().padStart(2, '0');
log("New Time (8 hours later):", newTimeStr8);

Homey.alarms.updateAlarm({
  id: "65090e8d-438d-4f39-a521-7998eb8d2694", // Updating medsTime2
  alarm: {
    type: "string",
    time: newTimeStr8,
    enabled: true,
  }
});
