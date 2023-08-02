// Function for onclick images in collection page, redirect to individual collection page with respective information
function redirectToInformationPage(clickedImage) {      
  // Extract the data-record-number attribute from the clicked image
  const mitchellLibraryNo = clickedImage.getAttribute('mitchell-library-no');

  // Construct the URL of the target page with the data-record-number parameter
  const targetPageUrl = `collection_individual.html?mitchellLibraryNo=${encodeURIComponent(mitchellLibraryNo)}`;

  // Redirect the user to the target page
  window.location.href = targetPageUrl;
}

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