// VARIABLES
const borderRadiusInput = document.querySelector("#border-radius-input");
const imageButtons = document.querySelectorAll(".img-button");
const images = document.querySelectorAll("#image-container img");
const activeImage = document.querySelector("#image-container img.enabled");
const imageContainer = document.querySelector("#image-container");
const borderColorInput = document.querySelector("#border-color-input");
const uploadImage = document.querySelector("#avatar");
const userImage = document.querySelector(".user_image");
const uploadFormPlaceholder = document.querySelector("#upload-form-placeholder");

// EVENT LISTENERS

imageButtons.forEach(imageButton => {
    imageButton.addEventListener("click", () => {
        enableButton(imageButtons, imageButton);
        getImage(imageButton.dataset.value);
        uploadFormPlaceholder.textContent = "Choose a file...";
    })
});

borderRadiusInput.addEventListener("change", (event) => {
    console.log(event.currentTarget.value)
    imageContainer.style.borderRadius = `${event.currentTarget.value}px`;
});

borderColorInput.addEventListener("change", event => {
    imageContainer.style.borderColor = `${event.currentTarget.value}`;
});

uploadImage.addEventListener("change", event => {
    uploadUserImage(event.currentTarget.files[0]);
    imageButtons.forEach(imageButton => {
        imageButton.classList.remove("enabled");
    })
});

// FUNCTIONS
const enableButton = (buttons, button) => {
    uploadImage.value = "";
    buttons.forEach(button => {
        button.classList.remove("enabled");
    })
    button.classList.add("enabled");
}

const getImage = (value) => {
    images.forEach(image => {
        image.dataset.value === value ? image.classList.add("enabled") : image.classList.remove("enabled");
    });
}

const uploadUserImage = (imageFile) => {
    if(imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener("load", () => {
            console.log();
            userImage.src = `${reader.result}`
            getImage(userImage.dataset.value);
            imageFile.name.length <= 23 
            ? uploadFormPlaceholder.textContent = `${imageFile.name.trim()}` 
            : uploadFormPlaceholder.textContent = `${imageFile.name.substring(0, 23)}...`;
        });
    }
}


