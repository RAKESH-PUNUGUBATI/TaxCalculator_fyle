
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const resultDiv = document.getElementById('result');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const income = parseFloat(form.income.value);
      const extraIncome = parseFloat(form.extraIncome.value);
      const deductions = parseFloat(form.deductions.value);
      const age = form.age.value;
  
      // Validation
      let isValid = true;
      if (isNaN(income) || income <= 0) {
        showError('income');
        isValid = false;
      }
      if (isNaN(extraIncome) || extraIncome < 0) {
        showError('extraIncome');
        isValid = false;
      }
      if (isNaN(deductions) || deductions < 0) {
        showError('deductions');
        isValid = false;
      }
      if (age === '') {
        showError('age');
        isValid = false;
      }
  
      if (isValid) {
        const tax = calculateTax(income, extraIncome, deductions, age);
        const totalIncome = (income + extraIncome) - deductions;
        resultDiv.innerHTML = `
          <p>After tax deductions, your net income will be:</p>
          <p><strong>${(totalIncome - tax).toFixed(2)} Rs</strong></p>
          <p>The deducted tax amount is <strong>${tax.toFixed(2)} Rs</strong>.</p>
        `;
        modal.style.display = 'block';
      }
    });
  
    closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
      form.reset(); // Reset the form fields
      clearErrorMessages(); // Clear any previous error messages
    });
    
    window.addEventListener('click', function (e) {
      if (e.target == modal) {
        modal.style.display = 'none';
        form.reset(); // Reset the form fields
        clearErrorMessages(); // Clear any previous error messages
      }
    });
  
    // Highlight error input box
  function showError(fieldName, errorMessage) {
    const errorIcon = document.getElementById(`${fieldName}-error`);
    errorIcon.style.display = 'inline';
    const errorInput = document.getElementById(fieldName);
    errorInput.classList.add('error');
  }

  function clearErrorMessages() { 
    const errorTooltips = document.querySelectorAll('.error-tooltip');
    errorTooltips.forEach(tooltip => tooltip.remove());
    const errorIcons = document.querySelectorAll('.error-icon');
    errorIcons.forEach(icon => icon.style.display = 'none');
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
  }
  
    function calculateTax(income, extraIncome, deductions, age) {
      const totalIncome = (income + extraIncome) - deductions;
      let tax = 0;
      if (totalIncome > 800000) {
        switch (age) {
          case '<40':
            tax = 0.3 * (totalIncome - 800000);
            break;
          case '>=40&<60':
            tax = 0.4 * (totalIncome - 800000);
            break;
          case '>=60':
            tax = 0.1 * (totalIncome - 800000);
            break;
          default:
            break;
        }
      }
      return tax;
    }
  });

  
  