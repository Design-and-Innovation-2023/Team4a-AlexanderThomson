function redirectToInformationPage(clickedImage) {
  // Extract the data from the image's data attributes
  const imageSrc = clickedImage.getAttribute('src');
  const accessionNo = clickedImage.getAttribute('data-accession-no');
  const mitchellLibraryNo = clickedImage.getAttribute('data-mitchell-library-no');
  const category = clickedImage.getAttribute('data-category');
  const title = clickedImage.getAttribute('data-title');
  const location = clickedImage.getAttribute('data-location');
  const technique = clickedImage.getAttribute('data-technique');
  const notes = clickedImage.getAttribute('data-notes');
  const date = clickedImage.getAttribute('data-date');
  const maplink = clickedImage.getAttribute('map-link');
  const arDesc = clickedImage.getAttribute('data-ar-description');
  sessionStorage.setItem('desc', arDesc);

  // Construct the URL of the target page with query parameters
  const targetPageUrl = `collection_individual.html?imageSrc=${encodeURIComponent(imageSrc)}&accessionNo=${accessionNo}&mitchellLibraryNo=${mitchellLibraryNo}&category=${category}&title=${title}&location=${location}&technique=${technique}&notes=${notes}&date=${date}&mapLink=${maplink}`;

  // Redirect the user to the target page
  window.location.href = targetPageUrl;
}

// function initGoogleSheetsAPI() {
//   console.log('Initializing Google Sheets API...');
//   gapi.client.init({
//     apiKey: 'AIzaSyBAs9z4X4aXpiC28b_vbG2ttQakqNsHReY',
//     discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//   })
//   .then(() => {
//     console.log('Google Sheets API initialized.');
//   })
//   .catch((error) => {
//     console.error('Error initializing Google Sheets API:', error);
//   });
// }


// // Load the Google Sheets API client library
// gapi.load('client', initGoogleSheetsAPI);

// // Accession No.	Mitchell Library No.	Category	Title	Location	Technique	Notes	Date	Map
// async function getImageInformation(image) {
//   console.log('getImageInformation called'); // Add this line
//   const recordNumber = image.getAttribute('data-record-number');

//   try {
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: '12v30ruxwYpkmxIYUNuySa9TZCwWTLeHN',
//       range: `Sheet1!A3:I`, // Start from row 3 onwards
//     });

//     const data = response.result.values;
//     const record = data.find(row => row[0] === recordNumber);

//     if (record) {
//       // Extract the data from the image's data attribute
//       const imageSrc = clickedImage.getAttribute('src');
//       const accessionNo = record[0];
//       const libraryNo = record[1];
//       const category = record[2];
//       const title = record[3];
//       const location = record[4];
//       const technique = record[5];
//       const notes = record[6];
//       // const description = clickedImage.getAttribute('description');
//       const date = record[7];
//       const maplink = record[8];

//       // Construct the URL of the target page with query parameters
//       // const targetPageUrl = `collection_individual.html?title=${title}&date=${date}&accessionNo=${accessionNo}&libraryNo=${libraryNo}&technique=${technique}&notes=${notes}&location=${location}&imageSrc=${encodeURIComponent(imageSrc)}&mapLink=${maplink}&description=${encodeURIComponent(description)}`; // Updated
//       const targetPageUrl = `collection_ind.html?imageSrc=${encodeURIComponent(imageSrc)}&accessionNo=${accessionNo}&libraryNo=${libraryNo}&category=${category}&title=${title}&location=${location}&technique=${technique}&notes=${notes}&date=${date}&mapLink=${maplink}`; // Updated

//       // Redirect the user to the target page
//       window.location.href = targetPageUrl;

//     } else {
//       // If no matching record found
//       console.log('Record not found.');
//     }
//   } catch (error) {
//     console.error('Error accessing Google Sheets:', error);
//   }
// }

// async function getImageInformation(image) {
//   const recordNumber = image.getAttribute('data-record-number');

//   try {
//     const response = await gapi.client.sheets.spreadsheets.values.get({
//       spreadsheetId: '1P-huAtEuSAkE6gI_I-OWBCVHlvdzYxS_jbcAmqoYsoI',
//       range: `Sheet1!A2:H`, // Assuming your data starts from row 2 in the spreadsheet
//     });

//     const data = response.result.values;
//     const record = data.find(row => row[0] === recordNumber);

//     if (record) {
//       const caption = record[1];
//       const description = record[2];
//       const area = record[3];
//       const street = record[4];
//       const number = record[5];
//       const date = record[6];
//       const mlLink = record[7];
//       const targetPageUrl = `collection_ind.html?caption=${caption}&date=${date}&recordNumber=${recordNumber}&area=${area}&street=${street}&number=${number}&mlLink=${mlLink}&description=${encodeURIComponent(description)}`; // Updated

//       // Redirect the user to the target page
//       window.location.href = targetPageUrl
//     } else {
//       // If no matching record found
//       console.log('Record not found.');
//     }
//   } catch (error) {
//     console.error('Error accessing Google Sheets:', error);
//   }
// }


// Function to close the pop-up
function closePopup() {
  const targetPageUrl = `collection.html`;

  // Redirect the user to the target page
  window.location.href = targetPageUrl;
}

function viewInAR() {
  const imageSrc = document.querySelector('.constrained-image').getAttribute('src');
  const title = document.querySelector('#right-side-title').textContent;
  // const desc = document.querySelector('#right-side-description').textContent;

  // Split the string by the backslash and take the last element.
  const filename = imageSrc.split('\\').pop();
  console.log(filename);

  // Store the imageSrc value in Session Storage
  sessionStorage.setItem('imageSrc', filename);
  sessionStorage.setItem('building_title', title);
  // sessionStorage.setItem('desc', desc);
  window.location.href = "ar_view.html";
}
function speakPopupText() {
  const popupText = document.getElementById("popupText").textContent;
  const utterance = new SpeechSynthesisUtterance(popupText);
  speechSynthesis.speak(utterance);
}

function exportToPDF() {
  // Get the popupText content
  const popupTextContent = document.getElementById("popupText").innerHTML;

  // Create a new HTML element to hold the content for PDF export
  const pdfContent = document.createElement("div");
  pdfContent.innerHTML = popupTextContent;

  // Get the actual image elements inside the cloned popup container
  const images = pdfContent.getElementsByTagName("img");

  // Options for PDF generation
  const options = {
    margin: [10, 10, 10, 10],
    filename: "popup_content.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate PDF
  const pdfPromise = html2pdf().from(pdfContent).set(options);

  // Update image sources and wait for images to load before saving the PDF
  const updateImageSources = async () => {
    for (let i = 0; i < images.length; i++) {
      const imageSrc = images[i].src;
      const imageBlob = await fetch(imageSrc).then((response) => response.blob());
      const imageUrl = URL.createObjectURL(imageBlob);
      images[i].src = imageUrl;
    }
    pdfPromise.save();
  };

  updateImageSources();
}

// Animation function using anime.js
function animateTitle() {
  anime({
    targets: '.title-container',
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeOutExpo',
  });
}

// Wait for the document to load before triggering the animation
document.addEventListener('DOMContentLoaded', () => {
  animateTitle();
});

// Function to animate the transition and redirect to collection.html
function animateAndRedirect() {
  const containerElement = document.querySelector('.container');

  // Animate the container to slide up and fade out
  anime({
    targets: containerElement,
    translateY: ['-100%', 0],
    opacity: 0,
    duration: 1000,
    easing: 'easeOutExpo',
    complete: function() {
      // Redirect to collection.html after the animation completes
      window.location.href = 'collection.html';
    }
  });
}

// Wait for the document to load before adding click event to the image
document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.querySelector('.image-container');
  imageContainer.addEventListener('click', animateAndRedirect);
});

function openPopup() {
  document.getElementById("overlay").style.display = "block";
  const popup = document.getElementById('tutorialPopup');
  popup.style.display = 'block';
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  const popup = document.getElementById('tutorialPopup');
  popup.style.display = 'none';
}