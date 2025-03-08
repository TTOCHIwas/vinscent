const nextpageButton = document.querySelector('.next-button');
nextpageButton.disabled = true;

function selectAll(selectAll)  {
    const checkboxes 
        = document.querySelectorAll('.agreement-checkbox-element');

    const optCheckboxes 
    = document.getElementsByName('optional-agreement');

    checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
    })

    optCheckboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    })
    primeAgreeCheck();
}

function checkedListen(checkbox){
    const allCheck = document.getElementById('all-agree');
    const checkedCnt = document.querySelectorAll('.agreement-checkbox-element:checked').length;
    const totalCnt = document.querySelectorAll('.agreement-checkbox-element').length;

    primeAgreeCheck();

    if(!checkbox.checked)
    {
        allCheck.checked = checkbox.checked;
    }
    else
    {
         if(totalCnt == checkedCnt){
            allCheck.checked = true;
         }
        else{
            allCheck.checked = false;
        }
    }


}

function detailOn(agreement){
    const detail = document.getElementById(agreement);
    if(detail.style.visibility == 'hidden'){
        detail.style.position = "static";
        detail.style.opacity = "1";
        detail.style.visibility = "visible";
        detail.style.transition = "visibility 0s, opacity 0.5s ease";
    }
    else{
        detail.style.visibility = "hidden";
        detail.style.position = "absolute";
        detail.style.opacity = "0";
    }

}

function bussnissTypeOn(bussniss, frame){
    const detail = document.getElementById(frame);
    if(bussniss.checked){
        detail.style.position = "static";
        detail.style.opacity = "1";
        detail.style.visibility = "visible";
        detail.style.transition = "visibility 0s, opacity 0.5s ease";
    }
    else{
        detail.style.visibility = "hidden";
        detail.style.position = "absolute";
        detail.style.opacity = "0";
    }
}

function bussnissTypeOff(bussniss, frame){
    const detail = document.getElementById(frame);
    if(bussniss.checked){
        detail.style.visibility = "hidden";
        detail.style.position = "absolute";
        detail.style.opacity = "0";
    }
    else{
        detail.style.position = "static";
        detail.style.opacity = "1";
        detail.style.visibility = "visible";
        detail.style.transition = "visibility 0s, opacity 0.5s ease";
    }
}

function primeAgreeCheck()
{    
    const adaltAgreement = document.getElementsByName('adalt-agree');
    const storeAgreement = document.getElementsByName('store-agree');

    if(adaltAgreement[0].checked && storeAgreement[0].checked)
    {
        nextpageButton.disabled = false;
    }else{
        nextpageButton.disabled = true;
    }

}

function brandUser()
{    
    const detail = document.getElementById(agreement);
    if(detail.style.visibility == 'hidden'){
        detail.style.position = "static";
        detail.style.opacity = "1";
        detail.style.visibility = "visible";
        detail.style.transition = "visibility 0s, opacity 0.5s ease";
    }
    else{
        detail.style.visibility = "hidden";
        detail.style.position = "absolute";
        detail.style.opacity = "0";
    }
}

var inputUserId = document.getElementsByName('inputid');




// function getNextPage()
// {
//     const checkedAgreements = document.querySelectorAll('.agreement-checkbox-element:checked');
//     var agreementList = [];
//     checkedAgreements.forEach((agreement) => {
//         agreementList.puch([agreement.id, agreement.checked]);
//     })


// }