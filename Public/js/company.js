function handleReminderFormSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem('token'); 

    const reminder_date = event.target['reminder-date'].value;
    const reminder_message = event.target['reminder-message'].value;
    

    const formData = {
        reminder_date,
        reminder_message
        
    };
     
    console.log(formData)
    
    axios.post('http://localhost:4000/company/save-reminder', { formData }, {
        headers: {
            'Authorization': token
        }
    })                                    
    .then((response) => {
        alert('Reminder saved successfully!');
        resetForm('reminderForm');
    })
    .catch((error) => {
        console.error('Error saving Reminder:', error);
        alert('There was an error saving the Reminder.');
    });
}
function handleCompanyFormSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem('token'); 

    const companyName = event.target['company-name'].value;
    const contactInfo = event.target['contact-info'].value;
    const companySize = event.target['company-size'].value;
    const industry = event.target['industry'].value;
    const companyNotes = event.target['company-notes'].value;

    const formData = {
        companyName,
        contactInfo,
        companySize,
        industry,
        companyNotes
    };

    
    axios.post('http://localhost:4000/company/save-company', { formData }, {
        headers: {
            'Authorization': token
        }
    })
    .then((response) => {
        alert('Company information saved successfully!');
        loadCompanies(); 
        resetForm('companyForm');
    })
    .catch((error) => {
        console.error('Error saving company information:', error);
        alert('There was an error saving the company information.');
    });
}


function handleJobListingFormSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem('token'); 

    const jobTitle = event.target['job-title'].value;
    const companyName = event.target['company-select'].value;
    const listingNotes = event.target['listing-notes'].value;

    const formData = {
        jobTitle,
        companyName,
        listingNotes
    };

    
    axios.post('http://localhost:4000/company/save-job-listing', { formData }, {
        headers: {
            'Authorization': token
        }
    })
    .then((response) => {
        alert('Job listing saved successfully!');
        resetForm('jobListingForm');
    })
    .catch((error) => {
        console.error('Error saving job listing:', error);
        alert('There was an error saving the job listing.');
    });
}


function loadCompanies() {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:4000/company/get-companies', {
        headers: {
            'Authorization': token
        }
    })
    .then((response) => {
        const companies = response.data.companies;
        
        const companySelect = document.getElementById('company-select');
        companySelect.innerHTML = ''; 

        companies.forEach((company) => {
            const option = document.createElement('option');
            option.value = company.company_name;
            option.textContent = company.company_name;
            companySelect.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Error loading companies:', error);
        alert('There was an error loading the companies.');
    });
}


function resetForm(formId) {
    document.getElementById(formId).reset();
}





// Event Listeners
document.getElementById('reminderForm').addEventListener('submit', handleReminderFormSubmit);
document.getElementById('companyForm').addEventListener('submit', handleCompanyFormSubmit);
document.getElementById('jobListingForm').addEventListener('submit', handleJobListingFormSubmit);

