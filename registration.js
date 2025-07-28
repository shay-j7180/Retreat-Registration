document.getElementById('hasAllergies').addEventListener('change', function(){
    document.getElementById('allergyDetailsDiv').style.display =
        this.value === 'yes' ? 'block' : 'none';
});

document.getElementById('registrationForm').addEventListener('submit', function(e){
    e.preventDefault();
    // Save all form data to localStorage
    const formData = new FormData(e.target);
    for (const [key, value] of formData.entries()) {
        localStorage.setItem(key, value);
    }

    // Redirect to policies form page
    window.location.href = "policies.html";
});