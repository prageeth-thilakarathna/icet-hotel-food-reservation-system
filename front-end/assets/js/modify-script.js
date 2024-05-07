window.onload = function () {
    loadPagination();
    loadFood(1);
}

let numberOfPages;
let selectPage = 0;

function loadFood(num) {
    fetch(`http://localhost:8080/get-food-for-page/${num}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                $(".loadTableData").append(
                    `
                <tr class="tableRow" onclick="getRowData(this)" id="${data[i].id}">
                    <th scope="row">${data[i].id}</th>
                    <td>${data[i].name}</td>
                    <td>${data[i].description}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].category}</td>
                    <td>${data[i].available}</td>
                    <td>
                        <a href="#" class="fs-5 me-2" data-bs-toggle="modal" data-bs-target="#modifyModal"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                        <a href="#" class="fs-5" style="color: red;" data-bs-toggle="modal" data-bs-target="#availabilityModal"><i class="fa fa-trash-o"
                                aria-hidden="true"></i></a>
                    </td>
                </tr>
                `
                )
            }
        })
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

// get row data
function getRowData(rowData){
    $(".modify .modal-title .title").remove();
    $(".modify .modal-title").append(`<span class="title">Modify ${rowData.id} Food</span>`);
}