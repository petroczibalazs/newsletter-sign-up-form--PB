const pageCover = document.querySelector('.page-cover');
const confirmPanel = document.querySelector('.newsletter__confirm-panel');
const confirmSpan = confirmPanel.querySelector('.newsletter__confirm-span');
const buttonDismiss = confirmPanel.querySelector('.newsletter__button--dismiss');
console.log(buttonDismiss);

const form = document.querySelector('.newsletter__form');
const formElements = [...form.querySelectorAll('input')];

const validityMessages = {
  valueMissing: 'Fill in this field!',
  typeMismatch: 'Provide a valid email address!',
  patternMismatch: "Value doesn't match the pattern.",
  tooShort: 'Input is too short. Min. 8 chars.',
  tooLong: 'Input is too long. Max. 15 chars.'
};




const showConfirmPanel = function( emailAddress="Lorem value") {

 confirmSpan.textContent = emailAddress;
 confirmPanel.classList.add('newsletter__confirm-panel--visible');
 pageCover.classList.add('page-cover-visible');
}

const hideConfirmPanel = function(){
  confirmPanel.classList.remove('newsletter__confirm-panel--visible');
  pageCover.classList.remove('page-cover-visible');

}



const validateFormElement = function ( formElement ) {

  const errorSpan = formElement.parentNode.querySelector('.newsletter__error-message');
  const validity = formElement.validity;

  if (!validity.valid) {

    for( const key in validityMessages ){
      if( validity[ key ] ){
        errorSpan.textContent = validityMessages[ key ];
        break;
      }
    }
    return false;
  } else {
    errorSpan.textContent = '';
    return true;
  }
};



const handleFormSubmit = function (e) {
  e.preventDefault();


  if( formElements.every( element =>{
    return validateFormElement( element );
  })){
      const email = form.querySelector('#email');
      const emailValue = email.value;
      showConfirmPanel(emailValue);
      email.value = '';
  }
 else {
    const firstError = form.querySelector(':invalid');
    firstError.value = '';
    firstError.focus();
  }
};

const validateElementBridge = function( e ){
  validateFormElement( e.target);
}


form.addEventListener('submit', handleFormSubmit);

formElements.forEach(input => input.addEventListener('blur', validateElementBridge));

buttonDismiss.addEventListener('click', hideConfirmPanel);

