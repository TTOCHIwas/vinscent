const category_pre = category;
const sortBy = sort;
let category_radio = document.getElementsByName('post-category');
let sort_select = document.getElementsByName('sort-select');



function category_Select()
{
    location.href = '/board/category/' + category_radio.id + '/sort/' + sortBy;
}

function sort_Select()
{
    location.href = '/board/category/' + category_pre + '/sort/' + sort_select.id;
}

category_radio.addEventListener('click', category_Select);
sort_select.addEventListener('click', sort_Select);
