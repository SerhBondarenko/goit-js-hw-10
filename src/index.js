//import { names } from 'debug';
import { names } from 'debug';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
import templetes from './templetes.hbs';
import templateList from './list-template.hbs';
import  API  from './fetchCountries';

const input = document.querySelector("#search-box");
console.log(input)
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
console.log(countryInfo)

input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
  const name = e.target.value.trim();
  countryInfo.innerHTML = '';
  if (name) {
    API.fetchCountries(name)
    .then(renderUserList)
    .catch(error);
  }
}


function renderUserList(countries) {
   countryList.innerHTML = '';
   countryInfo.innerHTML = '';
   if (countries.length >10) {
     return  Notify.success('Too many matches found. Please enter a more specific name.');
  }
  if (countries.length >1) {
    const markupList = templateList(countries);
    countryInfo.innerHTML = markupList;
 }
 if (countries.length ===1) {
  const markupCard = templetes(countries);
  countryList.innerHTML = markupCard;
}
   //console.log(markup) 
}

function error() {
  return Notify.failure('Oops, there is no country with that name')
}