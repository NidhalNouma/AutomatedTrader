import { updateUserData, getUserByEmail } from "../../../lib/users";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const csvText = req.body; // Expecting the CSV-like text in the request body

    // Check if csvText is provided
    if (!csvText) {
      return res.status(400).json({ error: "CSV text is required" });
    }

    // Remove double quotes from the CSV text
    const cleanedCsvText = csvText.replace(/"/g, ""); // Remove all double quotes
    // Split the CSV text into lines
    const rows = cleanedCsvText
      .split("\n")
      .map((row) => row.trim())
      .filter((row) => row);

    // Extract headers from the first row
    const headers = rows[0].split(",").map((header) => header.trim());

    // Prepare an array to hold the parsed data
    const parsedData = [];

    // Loop through each subsequent row and map it to the headers
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(",").map((value) => value.trim());
      const rowObject = {};

      headers.forEach((header, index) => {
        rowObject[header] = values[index] || null; // Handle missing values
      });

      parsedData.push(rowObject);
    }

    // for (let data of parsedData) {
    //   if (data["net_volume"] >= 999) {
    //     // console.log(data);
    //     if (data.email) {
    //       const u = await getUserByEmail(data.email);
    //       if (u) {
    //         await updateUserData(u.id, { lifetimeAccess: true }, false);
    //       }
    //     }
    //   }
    // }

    return res.status(200).json({ done: parsedData });
  }

  return res.status(200).json({ done: false });
}
