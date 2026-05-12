//Format a date string to German date format: "dd.mm.yyyy"

function formatToDateOnly(date) {
  if (!date || typeof date !== "string") {
    return "-";
  }

  try {
    const datePart = date.split(" ")[0];
    const [year, month, day] = datePart.split("-");

    if (!year || !month || !day) {
      return "-";
    }

    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error("Error parsing date:", error);
    return "-";
  }
}

//Format a date string to German date and time format: "dd.mm.yyyy hh:mm"
function formatToDateTime(date) {
  if (!date || typeof date !== "string") {
    return "-";
  }

  try {
    const parts = date.split(" ");
    const datePart = parts[0];
    const timePart = parts[1];

    const formattedDate = formatToDateOnly(datePart);
    if (formattedDate === "-") {
      return "-";
    }

    const [hours, minutes] = timePart.split(":");
    if (!hours || !minutes) {
      return formattedDate;
    }

    return `${formattedDate} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error parsing datetime:", error);
    return "-";
  }
}
