function updateDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');  // Ensure two digits
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    document.getElementById("currentDate").innerText = formattedDate;
  }

  updateDate();