const axios = require("axios");
const fs = require("fs");
const path = require("path");

const printData = async (path) => {
  try {
    const pdfToPrinter = require("pdf-to-printer");

    const filePath = path;
    const printerName = "SATO CG408DT";

    pdfToPrinter
      .print(filePath, {
        printer: printerName,
        orientation: "landscape",
        paperSize: "barcode",
        scale: "noscale",
      })
      .then(() => {
        console.log("Print job sent successfully.");
      })
      .catch((err) => {
        console.error("Error printing:", err);
      });
  } catch (error) {
    console.log(error);
  }
};

exports.dowloadFile = async (req, res, next) => {
  try {
    const { fileName } = req.query;
    // URL of the PDF file
    const pdfUrl = `https://aj.lyrid.id/assets/uploads/${fileName}`; // Replace with your PDF URL

    // Path where the PDF will be saved
    const outputPath = path.resolve(`${process.env.PATH_PRINT}${fileName}`);

    await axios({
      url: pdfUrl,
      method: "GET",
      responseType: "stream", // Important for handling binary data
      // responseType: "arraybuffer", // Important for handling binary data
    })
      .then(async (response) => {
        const writer = fs.createWriteStream(outputPath);
        // Pipe the response data to the file
        await response.data.pipe(writer);
        writer.on("finish", () => {
          console.log("PDF downloaded and saved successfully.");
        });
        writer.on("error", (err) => {
          console.error("Error saving PDF:", err);
        });
        printData(outputPath);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
exports.printData = async (req, res, next) => {
  try {
    const pdfToPrinter = require("pdf-to-printer");

    const filePath = "C:\\Users\\FIO\\Desktop\\Barcode_Accessories.pdf";
    const printerName = "SATO CG408DT";

    pdfToPrinter
      .print(filePath, { printer: printerName, orientation: "landscape" })
      .then(() => {
        console.log("Print job sent successfully.");
      })
      .catch((err) => {
        console.error("Error printing:", err);
      });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
