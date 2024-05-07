window.onload = function () {
    loadCategories();
}

// load categories
function loadCategories() {
    fetch("http://localhost:8080/get-categories")
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                $(".select-category .loadCategory").append(`<option value="${data[i].name}">${data[i].name}</option>`);
            }
        });
}

// save food
var btnRegister = document.getElementById("btn-register");
btnRegister.addEventListener("click", () => {
    saveFood();
});

const toastLive = document.getElementById("liveToast");

function saveFood() {
    inputFieldsDisabled();
    $(".btn").append(`<span class="ms-2 spinner"><i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i></span>`);
    var txtName = document.getElementById("txt-name").value;
    var txtDescription = document.getElementById("txt-description").value;
    var numPrice = document.getElementById("num-price").value;
    var optCategory = document.getElementById("opt-category").value;
    var optAvailable = document.getElementById("opt-available").value;

    // validate user inputs
    if (txtName == "") {
        $(".input-name .errorMessage").remove();
        displayInputError("nameError");
        $(".btn .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".input-name .errorMessage").remove();
    }

    if (txtDescription == "") {
        $(".input-description .errorMessage").remove();
        displayInputError("descriptionError");
        $(".btn .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".input-description .errorMessage").remove();
    }

    if (numPrice == "") {
        $(".input-price .errorMessage").remove();
        displayInputError("priceErrorFirst");
        $(".btn .spinner").remove();
        inputFieldsEnabled();
        return;
    } else if (parseFloat(numPrice) < 1.00) {
        $(".input-price .errorMessage").remove();
        displayInputError("priceErrorSecond");
        $(".btn .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".input-price .errorMessage").remove();
    }

    if (optCategory == "0") {
        $(".select-category .errorMessage").remove();
        displayInputError("categoryError");
        $(".btn .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".select-category .errorMessage").remove();
    }

    if (optAvailable == "0") {
        $(".select-availability .errorMessage").remove();
        displayInputError("availabilityError");
        $(".btn .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".select-availability .errorMessage").remove();
    }


    var isAvailable;
    optAvailable == "y" ? isAvailable = true : isAvailable = false;

    const requestBody = {
        "name": txtName,
        "description": txtDescription,
        "price": parseFloat(numPrice),
        "category": optCategory,
        "isAvailable": isAvailable
    }
    console.log(requestBody);

    fetch("http://localhost:8080/save-food", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if(response.status==200){
                inputFieldsClear();
                $(".btn .spinner").remove();
                inputFieldsEnabled();
                $(".toast-container .toast-header .toast-img").remove();
                $(".toast-container .toast-header .toast-title").remove();
                $(".toast-container .toast-header .btn-close").remove();
                $(".toast-container .toast-body .message").remove();
                $(".toast-container .toast-header").append(
                    `
                    <img src="../img/success-icon.png" class="rounded me-2 toast-img" style="width: 20px;">
                    <strong class="me-auto toast-title">Success</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    `
                );
                $(".toast-container .toast-body").append(`<span class="message">Food Registration is Successful.</span>`);
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
                toastBootstrap.show();
            } else {
                $(".btn .spinner").remove();
                inputFieldsEnabled();
                $(".toast-container .toast-header .toast-img").remove();
                $(".toast-container .toast-header .toast-title").remove();
                $(".toast-container .toast-header .btn-close").remove();
                $(".toast-container .toast-body .message").remove();
                $(".toast-container .toast-header").append(
                    `
                    <img src="../img/error-icon.png" class="rounded me-2 toast-img" style="width: 20px;">
                    <strong class="me-auto toast-title">Error</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    `
                );
                $(".toast-container .toast-body").append(`<span class="message">Failed! Have an Error in food registration.</span>`);
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
                toastBootstrap.show();
            }
        })
}

// display inputs error
function displayInputError(errorField) {
    if (errorField == "nameError") {
        $(".input-name").append(`<span style="color: red;" class="fs-6 errorMessage">Please input a name.</span>`);
    } else if (errorField == "descriptionError") {
        $(".input-description").append(`<span style="color: red;" class="fs-6 errorMessage">Please input a description.</span>`);
    } else if (errorField == "priceErrorFirst") {
        $(".input-price").append(`<span style="color: red;" class="fs-6 errorMessage">Please input a price.</span>`);
    } else if (errorField == "priceErrorSecond") {
        $(".input-price").append(`<span style="color: red;" class="fs-6 errorMessage">Price should be greater than 1.</span>`);
    } else if (errorField == "categoryError") {
        $(".select-category").append(`<span style="color: red;" class="fs-6 errorMessage">Please select a category.</span>`);
    } else if (errorField == "availabilityError") {
        $(".select-availability").append(`<span style="color: red;" class="fs-6 errorMessage">Please select a availability.</span>`);
    }
}

// input fields disabled
function inputFieldsDisabled() {
    document.getElementById("txt-name").disabled = true;
    document.getElementById("txt-description").disabled = true;
    document.getElementById("num-price").disabled = true;
    document.getElementById("opt-category").disabled = true;
    document.getElementById("opt-available").disabled = true;
    document.getElementById("btn-register").disabled = true;
}

// input fields disabled
function inputFieldsEnabled() {
    document.getElementById("txt-name").disabled = false;
    document.getElementById("txt-description").disabled = false;
    document.getElementById("num-price").disabled = false;
    document.getElementById("opt-category").disabled = false;
    document.getElementById("opt-available").disabled = false;
    document.getElementById("btn-register").disabled = false;
}

// input fields clear
function inputFieldsClear(){
    document.getElementById("txt-name").value = "";
    document.getElementById("txt-description").value = "";
    document.getElementById("num-price").value = "";
    document.getElementById("opt-category").selectedIndex = 0;
    document.getElementById("opt-available").selectedIndex = 0;
}