var countries =
  [
    'Hungary',
    'Germany',
    'Italy',
    'Spain'
  ];

var countryDropdownIsCollapsed = true;

const DROPDOWN_COLLAPSED = 'dropdown-collapsed';
const DROPDOWN_OPTION = 'dropdown-option';
const DROPDOWN_OPTION_HOVER = 'dropdown-option-hover';
const DROPDOWN_ICON_COLLAPSED = 'dropdown-icon-collapsed';
const OPENED = 'dropdown-opened';
const COUNTRY = 'country-dropdown';

function initializeCountryDropdownItems() {
  let dropdown = document.getElementById(COUNTRY);

  dropdown.innerHTML = '';
  let filteredCountries = getFilteredCountryDropdownItems();
  if(filteredCountries.length > 0){
    for (let index = 0; index < filteredCountries.length; index++) {
      dropdown.appendChild(createDropdownOption(filteredCountries[index], true));
    }
  }
  else{
    dropdown.appendChild(createDropdownOption('No matching country', false));
  }
}

function createDropdownOption(text, hasOnClick){
  let dropdownOption = document.createElement('div');
  dropdownOption.classList.add(DROPDOWN_OPTION);
  dropdownOption.innerHTML = text;
  if(hasOnClick){
    dropdownOption.addEventListener('click', selectDropdownElement_OnClick);
    dropdownOption.classList.add(DROPDOWN_OPTION_HOVER);
  }

  return dropdownOption;
}

function getFilteredCountryDropdownItems() {
  let inputValue = getDropdownInput().value.toLowerCase();
  let filteredCountries = countries.filter(element =>{
    if(element.length > 0){
      return element.toLowerCase().includes(inputValue);
    }
  });

  return filteredCountries;
}

function initializeOpenDropdownClick() {
  var dropdowns = document.getElementsByClassName('dropdown');
  for (let index = 0; index < dropdowns.length; index++) {
    const element = dropdowns[index];
    
    element.childNodes.forEach(item => {
      if (item.classList != undefined) {
        if(item.type == 'text'){
          item.addEventListener('keyup', selectDropdownElement_OnValueChange);
        }

        if (item.classList.contains('material-icons')) {
          item.addEventListener('click', openDropdown_OnClick);
        }
      }
    });
  }
}

function openDropdown_OnClick(e) {
  if (isDropdown(e, 'country-dropdown')) {
    countryDropdownIsCollapsed = !countryDropdownIsCollapsed;
  }

  collapseDropdown(countryDropdownIsCollapsed, COUNTRY);
}

function selectDropdownElement_OnClick(e){
  countryDropdownIsCollapsed = true;

  collapseDropdown(countryDropdownIsCollapsed, COUNTRY);

  let dropdown = getDropdown(COUNTRY);

  dropdown.parentNode.childNodes[3].childNodes[1].value = e.explicitOriginalTarget.innerHTML;
}

function selectDropdownElement_OnValueChange(e){
  countryDropdownIsCollapsed = false;

  collapseDropdown(countryDropdownIsCollapsed, COUNTRY);

  initializeCountryDropdownItems();
}

function collapseDropdown(collapse, id){
  let dropdown = getDropdown(id);
  let dropdownBase = dropdown.parentNode.childNodes[3];
  let dropdownCollapseIcon = getDropdownCollapseIcon();
  console.log(dropdownCollapseIcon);

  if (collapse) {
    dropdown.classList.add(DROPDOWN_COLLAPSED);
    dropdownBase.classList.remove(OPENED);
    dropdownCollapseIcon.classList.remove(DROPDOWN_ICON_COLLAPSED);
  }
  else {
    dropdown.classList.remove(DROPDOWN_COLLAPSED);
    dropdownBase.classList.add(OPENED);
    dropdownCollapseIcon.classList.add(DROPDOWN_ICON_COLLAPSED);
  }
}

function getDropdown(id){
  return document.getElementById(id);
}

function getDropdownInput(){
  let dropdownInput = '';

  var dropdowns = document.getElementsByClassName('dropdown');
  for (let index = 0; index < dropdowns.length; index++) {
    const element = dropdowns[index];
    
    element.childNodes.forEach(item => {
      if (item.classList != undefined) {
        if(item.type == 'text'){
          dropdownInput = item;
        }
      }
    });
  }

  return dropdownInput;
}

function getDropdownCollapseIcon(){
  let dropdownCollapseIcon = '';

  var dropdowns = document.getElementsByClassName('dropdown');
  for (let index = 0; index < dropdowns.length; index++) {
    const element = dropdowns[index];
    
    element.childNodes.forEach(item => {
      if (item.classList != undefined) {
        if (item.classList.contains('material-icons')) {
          dropdownCollapseIcon = item;
        }
      }
    });
  }

  return dropdownCollapseIcon;
}

function isDropdown(e, id) {
  return e.srcElement.parentElement.parentElement.childNodes[5].id == id;
}

initializeCountryDropdownItems();
initializeOpenDropdownClick();

