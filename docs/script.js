// Initialize an empty object to hold the verses data
let verses = {};

// Fetch the verses JSON data
fetch('verses.json')
  .then(response => response.json())
  .then(data => {
    verses = data;  // Store the fetched data
    updateCategories();  // Update the categories dropdown
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
    alert('Failed to load verses. Please try again later.');
  });

// Function to populate the categories dropdown with available categories
function updateCategories() {
  const categorySelect = document.getElementById("category-select");
  categorySelect.innerHTML = "<option value=''>Select a category</option>";

  Object.keys(verses).forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Function to display a random verse from the selected category
function getRandomVerse() {
  const category = document.getElementById("category-select").value;
  const display = document.getElementById("verse-display");

  if (!category || !verses[category]) {
    display.textContent = "Please select a valid category.";
    return;
  }

  const versesArray = verses[category];
  const randomVerse = versesArray[Math.floor(Math.random() * versesArray.length)];

  display.innerHTML = `<p>"${randomVerse.text}"</p><p><em>${randomVerse.reference}</em></p>`;
}
  function copyVerseToClipboard() {
  const verseDisplay = document.getElementById("verse-display");
  const textToCopy = verseDisplay.innerText;

  if (!textToCopy) {
    alert("There is no verse to copy!");
    return;
  }

  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("Verse copied to clipboard!");
  }).catch(err => {
    console.error("Failed to copy:", err);
    alert("Failed to copy the verse.");
  });
}
