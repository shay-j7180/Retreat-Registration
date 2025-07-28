document.getElementById('policyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Save form data to localStorage
    const formData = new FormData(e.target);
    for (const [key, value] of formData.entries()) {
        localStorage.setItem(key, value);
    }

    // Get user's name from localStorage
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';

    // Collect all registration and policy data from localStorage
    const keys = [
        'firstName', 'lastName', 'dob', 'email', 'phone',
        'hasAllergies', 'allergyDetails',
        'emergencyContact1Name', 'emergencyContact1Phone', 'emergencyContact1Email', 'emergencyContact1Relationship',
        'agreePolicy', 'dateCompleted', 'signature', 'paymentMethod'
    ];
    const data = {};
    keys.forEach(key => data[key] = localStorage.getItem(key) || '');

    // Send data to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxeMTpHo6fdbgJhalnqWXVguZEKdPI8amey-m2SN30G26OWAxiw73hBGtLl-KOgvPtdXg/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
    })
    .then(response => response.text())
    .then(txt => {
        // Replace form with thank you message
        const form = document.getElementById('policyForm');
        form.style.display = 'none';

        const thankYouDiv = document.createElement('div');
        thankYouDiv.innerHTML = `
            <h2>Thank you, ${firstName} ${lastName}!</h2>
            <p>Your registration is complete and a confirmation email will be sent to you.</p>
        `;
        document.body.appendChild(thankYouDiv);

        // Optionally clear localStorage after successful submission
        localStorage.clear();
    })
    .catch(err => {
        alert('Error submitting registration: ' + err);
    });
});