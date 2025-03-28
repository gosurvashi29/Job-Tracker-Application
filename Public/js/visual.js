function initDashboardCharts() {


    const token = localStorage.getItem('token'); 
    //canvas is use to render charts//getContext method is used to obtain the "context" of the canvas.
    const ctx1 = document.getElementById('applicationStatusChart').getContext('2d');
    const ctx2 = document.getElementById('responseRateChart').getContext('2d');

    // '2d' is the argument passed to the getContext method, specifying that we want a 2D rendering context. It allows us to draw 2D shapes and graphics like charts on the canvas.



    axios.get('http://localhost:4000/company/stats', {
        headers: {
            'Authorization': token
        }
    })                                  
    .then((response) => {

        const stats = response.data.statusData;
        console.log(stats);
        
        
        const statusCounts = stats.reduce((acc, stat) => {
            acc[stat.status] = stat.count; 
            return acc;
        }, {});
        
      
        
       

        const applicationStatusData = {
            labels: ['Applied', 'Interviewed', 'Offered', 'Rejected', 'Accepted'],
            datasets: [{
                label: 'Application Status',
                data: [statusCounts.applied,     
                    statusCounts.interviewed, 
                    statusCounts.offered,     
                    statusCounts.rejected,    
                    statusCounts.accepted  ], 
                backgroundColor: ['#FF5733', '#FFC300', '#28A745', '#DC3545', '#007BFF'],
                borderColor: ['#FF5733', '#FFC300', '#28A745', '#DC3545', '#007BFF'],
                borderWidth: 1
            }]
        };
    
        const responseRateData = {
            labels: ['Offered', 'Rejected'],
            datasets: [{
                label: 'Progress Rate',
                data: [statusCounts.offered, statusCounts.rejected], 
                backgroundColor: ['#28A745', '#DC3545'],
                borderColor: ['#28A745', '#DC3545'],
                borderWidth: 1
            }]
        };
    
        
        new Chart(ctx1, {
            type: 'bar',
            data: applicationStatusData
        });
    
        new Chart(ctx2, {
            type: 'pie',
            data: responseRateData
        });
    
    
    })
    .catch((error) => {
        console.error('Error stats missing:', error);
        alert('There was an error stats missing.');
    });
}


function handleSearchFilter(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    
    const status = document.getElementById('filter-status').value;

    const formData = {
       
        status
    };

    
    axios.post('http://localhost:4000/company/filter', { formData }, {
        headers: {
            'Authorization': token
        }
    })
    .then((response) => {
        console.log('Filtered applications:', response.data.applications);
        displayApplications(response.data.applications)

    })
    .catch((error) => {
        console.error('Error filtering applications:', error);
        alert('There was an error applying the filter.');
    });
}


function displayApplications(applications) {
    const list = document.getElementById('applications-list');
    list.innerHTML = ''; 

    applications.forEach(app => {
        const li = document.createElement('li');
        li.textContent = `Job Title: ${app.job_title}, Company: ${app.company_name}, Status: ${app.status}`;
        list.appendChild(li);
    });
}
document.getElementById('filter-btn').addEventListener('click', handleSearchFilter);



document.addEventListener('DOMContentLoaded', () => {
    loadCompanies(); 
    initDashboardCharts(); 
});

function resetForm(formId) {
    document.getElementById(formId).reset();
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

