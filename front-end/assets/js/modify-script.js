window.onload = function () {
    loadPagination();
    loadFood(1);
    loadCategories();
}

let numberOfPages;
let selectPage = 0;

// load food into table
function loadFood(num) {
    fetch(`http://localhost:8080/get-food-for-page/${num}`)
        .then(res => res.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {
                $(".loadTableData").append(
                    `
                <tr class="tableRow" data-id="${data[i].id}" data-name="${data[i].name}" data-description="${data[i].description}" data-price="${data[i].price}" data-category="${data[i].category}" data-available="${data[i].available}">
                    <th scope="row">${data[i].id}</th>
                    <td>${data[i].name}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].category}</td>
                    <td>${data[i].available}</td>
                    <td>
                        <a class="fs-5 me-2" data-bs-toggle="modal" data-bs-target="#modifyModal" onclick="getRowData(this)" style="cursor: pointer;"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                        <a href="#" class="fs-5" style="color: red;" data-bs-toggle="modal" data-bs-target="#availabilityModal"><i class="fa fa-trash-o"
                                aria-hidden="true"></i></a>
                    </td>
                </tr>
                `
                )
            }
        })
}

const categoryList = [];

// load categories
function loadCategories() {
    fetch("http://localhost:8080/get-categories")
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                $(".select-category .loadCategory").append(`<option value="${data[i].name}">${data[i].name}</option>`);

                const category = {
                    "id": i,
                    "name": data[i].name
                };

                categoryList[i] = category;
            }
        });
}

// load pagination
function loadPagination() {
    fetch("http://localhost:8080/get-number-of-pages")
        .then(res => res.json())
        .then(data => {
            numberOfPages = data;

            if (numberOfPages == 2) {
                $(".paginationBar").append(
                    `
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item first"><a class="page-link active" onclick="navPagination(1)" style="cursor: pointer;">1</a></li>
                            <li class="page-item second"><a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a></li>
                        </ul>
                    </nav>
                    `
                )
            } else if (numberOfPages == 3) {
                $(".paginationBar").append(
                    `
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item first"><a class="page-link active" onclick="navPagination(1)" style="cursor: pointer;">1</a></li>
                            <li class="page-item second"><a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a></li>
                            <li class="page-item third"><a class="page-link" onclick="navPagination(3)" style="cursor: pointer;">3</a></li>
                        </ul>
                    </nav>
                    `
                )
            } else if (numberOfPages > 3) {
                $(".paginationBar").append(
                    `
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item previous"><a class="page-link text-secondary" onclick="navPagination(0)" style="cursor: default; pointer-events: none;">Previous</a></li>
                            <li class="page-item first"><a class="page-link active" onclick="navPagination(1)" style="cursor: pointer;">1</a></li>
                            <li class="page-item second"><a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a></li>
                            <li class="page-item third"><a class="page-link" onclick="navPagination(3)" style="cursor: pointer;">3</a></li>
                            <li class="page-item next"><a class="page-link" onclick="navPagination(4)" style="cursor: pointer;">Next</a></li>
                        </ul>
                    </nav>
                    `
                )
            }
        })
}

// nav pagination
function navPagination(num) {

    if (numberOfPages == 2) {
        if (num == 2) {
            $(".tableRow").remove();
            loadFood(2);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link active" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
        } else if (num == 1) {
            $(".tableRow").remove();
            loadFood(1);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link active" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
        }
    } else if (numberOfPages == 3) {
        if (num == 2) {
            $(".tableRow").remove();
            loadFood(2);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link active" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
            $(".paginationBar .pagination .third .page-link").remove();
            $(".paginationBar .pagination .third").append(`<a class="page-link" onclick="navPagination(3)" style="cursor: pointer;">3</a>`);
        } else if (num == 3) {
            $(".tableRow").remove();
            loadFood(3);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
            $(".paginationBar .pagination .third .page-link").remove();
            $(".paginationBar .pagination .third").append(`<a class="page-link active" onclick="navPagination(3)" style="cursor: pointer;">3</a>`);
        } else if (num == 1) {
            $(".tableRow").remove();
            loadFood(1);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link active" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
            $(".paginationBar .pagination .third .page-link").remove();
            $(".paginationBar .pagination .third").append(`<a class="page-link" onclick="navPagination(3)" style="cursor: pointer;">3</a>`);
        }
    } else if (numberOfPages > 3) {
        if (num == 2) {
            $(".tableRow").remove();
            loadFood(2);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link active" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
            $(".paginationBar .pagination .third .page-link").remove();
            $(".paginationBar .pagination .third").append(`<a class="page-link" onclick="navPagination(3)" style="cursor: pointer;">3</a>`);
        } else if (num == 3) {
            $(".tableRow").remove();
            loadFood(3);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
            $(".paginationBar .pagination .third .page-link").remove();
            $(".paginationBar .pagination .third").append(`<a class="page-link active" onclick="navPagination(3)" style="cursor: pointer;">3</a>`);
        } else if (num == 1) {
            $(".tableRow").remove();
            loadFood(1);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link active" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
            $(".paginationBar .pagination .third .page-link").remove();
            $(".paginationBar .pagination .third").append(`<a class="page-link" onclick="navPagination(3)" style="cursor: pointer;">3</a>`);
        } else if (num == 4) {
            selectPage++;
            $(".tableRow").remove();
            loadFood(selectPage + 3);
            $(".paginationBar .pagination .previous .page-link").remove();
            $(".paginationBar .pagination .previous").append(`<a class="page-link" onclick="navPagination(0)" style="cursor: pointer;">Previous</a>`);
            $(".paginationBar .pagination .first .page-link").remove();
            $(".paginationBar .pagination .first").append(`<a class="page-link text-secondary" onclick="navPagination(1)" style="cursor: default; pointer-events: none;">${selectPage + 1}</a>`);
            $(".paginationBar .pagination .second .page-link").remove();
            $(".paginationBar .pagination .second").append(`<a class="page-link text-secondary" onclick="navPagination(2)" style="cursor: default; pointer-events: none;">${selectPage + 2}</a>`);
            $(".paginationBar .pagination .third .page-link").remove();
            $(".paginationBar .pagination .third").append(`<a class="page-link active" onclick="navPagination(3)" style="cursor: default; pointer-events: none;">${selectPage + 3}</a>`);

            if ((selectPage + 3) == numberOfPages) {
                $(".paginationBar .pagination .next .page-link").remove();
                $(".paginationBar .pagination .next").append(`<a class="page-link text-secondary" onclick="navPagination(4)" style="cursor: default; pointer-events: none;">Next</a>`);
            }
        } else if (num == 0) {
            selectPage--;
            $(".tableRow").remove();
            loadFood(selectPage + 3);

            if (selectPage == 0) {
                $(".paginationBar .pagination .previous .page-link").remove();
                $(".paginationBar .pagination .previous").append(`<a class="page-link text-secondary" onclick="navPagination(0)" style="cursor: default; pointer-events: none;">Previous</a>`);
                $(".paginationBar .pagination .first .page-link").remove();
                $(".paginationBar .pagination .first").append(`<a class="page-link" onclick="navPagination(1)" style="cursor: pointer;">1</a>`);
                $(".paginationBar .pagination .second .page-link").remove();
                $(".paginationBar .pagination .second").append(`<a class="page-link" onclick="navPagination(2)" style="cursor: pointer;">2</a>`);
                $(".paginationBar .pagination .third .page-link").remove();
                $(".paginationBar .pagination .third").append(`<a class="page-link active" onclick="navPagination(3)" style="cursor: pointer;">3</a>`);
                $(".paginationBar .pagination .next .page-link").remove();
                $(".paginationBar .pagination .next").append(`<a class="page-link" onclick="navPagination(4)" style="cursor: pointer;">Next</a>`);
            } else {
                $(".paginationBar .pagination .first .page-link").remove();
                $(".paginationBar .pagination .first").append(`<a class="page-link text-secondary" onclick="navPagination(1)" style="cursor: default; pointer-events: none;">${selectPage + 1}</a>`);
                $(".paginationBar .pagination .second .page-link").remove();
                $(".paginationBar .pagination .second").append(`<a class="page-link text-secondary" onclick="navPagination(2)" style="cursor: default; pointer-events: none;">${selectPage + 2}</a>`);
                $(".paginationBar .pagination .third .page-link").remove();
                $(".paginationBar .pagination .third").append(`<a class="page-link active" onclick="navPagination(3)" style="cursor: default; pointer-events: none;">${selectPage + 3}</a>`);
                $(".paginationBar .pagination .next .page-link").remove();
                $(".paginationBar .pagination .next").append(`<a class="page-link" onclick="navPagination(4)" style="cursor: pointer;">Next</a>`);
            }
        }
    }
}

const lastSelectedRow = [];

// get row data
function getRowData(rowData) {
    $(".modify .modal-title .title").remove();
    $(".modify .modal-title").append(`<span class="title">Modify ${rowData.parentNode.parentNode.dataset.id} Food</span>`);

    const selectRow = {
        "id": rowData.parentNode.parentNode.dataset.id,
        "name": rowData.parentNode.parentNode.dataset.name,
        "description": rowData.parentNode.parentNode.dataset.description,
        "price": parseFloat(rowData.parentNode.parentNode.dataset.price),
        "category": rowData.parentNode.parentNode.dataset.category
    }

    lastSelectedRow[0] = selectRow;

    document.getElementById("txt-name").value = rowData.parentNode.parentNode.dataset.name;
    document.getElementById("txt-description").value = rowData.parentNode.parentNode.dataset.description;
    document.getElementById("num-price").value = rowData.parentNode.parentNode.dataset.price;

    for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].name == rowData.parentNode.parentNode.dataset.category) {
            document.getElementById("opt-category").selectedIndex = i + 1;
            return;
        }
    }
}

// modify food
var btnRegister = document.getElementById("btn-modify");
btnRegister.addEventListener("click", () => {
    modifyFood();
});

const toastLive = document.getElementById("liveToast");
const modifyModal = document.getElementById("modifyModal");

function modifyFood() {
    inputFieldsDisabled();
    $(".btn-change").append(`<span class="ms-2 spinner"><i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i></span>`);
    var txtName = document.getElementById("txt-name").value;
    var txtDescription = document.getElementById("txt-description").value;
    var numPrice = document.getElementById("num-price").value;
    var optCategory = document.getElementById("opt-category").value;

    // validate user inputs
    if (txtName == "") {
        $(".input-name .errorMessage").remove();
        displayInputError("nameError");
        $(".btn-change .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".input-name .errorMessage").remove();
    }

    if (txtDescription == "") {
        $(".input-description .errorMessage").remove();
        displayInputError("descriptionError");
        $(".btn-change .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".input-description .errorMessage").remove();
    }

    if (numPrice == "") {
        $(".input-price .errorMessage").remove();
        displayInputError("priceErrorFirst");
        $(".btn-change .spinner").remove();
        inputFieldsEnabled();
        return;
    } else if (parseFloat(numPrice) < 1.00) {
        $(".input-price .errorMessage").remove();
        displayInputError("priceErrorSecond");
        $(".btn-change .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".input-price .errorMessage").remove();
    }

    if (optCategory == "0") {
        $(".select-category .errorMessage").remove();
        displayInputError("categoryError");
        $(".btn-change .spinner").remove();
        inputFieldsEnabled();
        return;
    } else {
        $(".select-category .errorMessage").remove();
    }

    const requestBody = {
        "id": lastSelectedRow[0].id,
        "name": txtName,
        "description": txtDescription,
        "price": parseFloat(numPrice),
        "category": optCategory
    }

    if (validateUserChanges(requestBody)) {
        fetch("http://localhost:8080/modify-food", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                if (data == 1) {
                    $(".tableRow").remove();
                    loadFood(calculateCurrentPage(requestBody.id));
                    inputFieldsClear();
                    $(".btn-change .spinner").remove();
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
                    $(".toast-container .toast-body").append(`<span class="message">Food Modify is Successful.</span>`);
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
                    toastBootstrap.show();
                    bootstrap.Modal.getInstance(modifyModal).hide();
                } else {
                    $(".btn-change .spinner").remove();
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
                    $(".toast-container .toast-body").append(`<span class="message">Failed! Have an Error in food modify.</span>`);
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
                    toastBootstrap.show();
                }
            })


    } else {
        $(".btn-change .spinner").remove();
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
        $(".toast-container .toast-body").append(`<span class="message">Failed! You should change at least one field to Modify.</span>`);
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
        toastBootstrap.show();
    }
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
    }
}

// input fields disabled
function inputFieldsDisabled() {
    document.getElementById("txt-name").disabled = true;
    document.getElementById("txt-description").disabled = true;
    document.getElementById("num-price").disabled = true;
    document.getElementById("opt-category").disabled = true;
    document.getElementById("btn-modify").disabled = true;
}

// input fields disabled
function inputFieldsEnabled() {
    document.getElementById("txt-name").disabled = false;
    document.getElementById("txt-description").disabled = false;
    document.getElementById("num-price").disabled = false;
    document.getElementById("opt-category").disabled = false;
    document.getElementById("btn-modify").disabled = false;
}

// input fields clear
function inputFieldsClear() {
    document.getElementById("txt-name").value = "";
    document.getElementById("txt-description").value = "";
    document.getElementById("num-price").value = "";
    document.getElementById("opt-category").selectedIndex = 0;
}

// validation user changes
function validateUserChanges(userInputs) {
    if (userInputs.name != lastSelectedRow[0].name) {
        return true;
    } else if (userInputs.description != lastSelectedRow[0].description) {
        return true;
    } else if (userInputs.price != lastSelectedRow[0].price) {
        return true;
    } else if (userInputs.category != lastSelectedRow[0].category) {
        return true;
    } else {
        return false;
    }
}



// claculate current page
function calculateCurrentPage(id){
    if(id<=10){
        return 1;
    } else if(id>10){
        var floatValue = (id/10).toFixed(1);
        const values = floatValue.split(".");
        
        let firstValue = parseInt(values[0]);
        let secondValue = parseInt(values[1]);

        if(secondValue==0){
            return firstValue;
        } else {
            return firstValue+1;
        }
    } 
}
