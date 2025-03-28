
function handleFormSubmit(event) {
    event.preventDefault();
  
    
    const token = localStorage.getItem('token');
  
    
    const jobTitle = event.target['job-title'].value;
    const company_name = event.target['company_name'].value;
    const applicationDate = event.target['application-date'].value;
    const status = event.target['status'].value;
    const notes = event.target['notes'].value;
    
    
 
    const formData ={
        jobTitle,
        company_name,
        applicationDate,
        status,
        notes

    }
  
    console.log(formData)
  
    
    axios
      .post('http://localhost:4000/job/save-job-application', {formData:formData}, {
        headers: {
          'Authorization': token
      }})
      .then((response) => {
        loadApplications(); 
        alert('Job application submitted successfully.');
        resetForm(); 
      })
      .catch((error) => {
        console.error('Error saving job application:', error);
        alert('There was an error submitting your job application.');
      });
  }
  
  
  function resetForm() {
    document.getElementById('applicationForm').reset();
  }
  
  
  function displayApplications(applications) {
    const applicationsContainer = document.getElementById('applications');
    applicationsContainer.innerHTML = ''; 
  
    
    applications.forEach((application) => {
      const applicationDiv = document.createElement('div');
      applicationDiv.classList.add('application-card');
      
      applicationDiv.innerHTML = `
        <h3>Job Title: ${application.job_title}</h3>
        <p><strong>Company:</strong> ${application.company_name}</p>
        <p><strong>Application Date:</strong> ${application.application_date}</p>
        <p><strong>Status:</strong> ${application.status}</p>
        <p><strong>Notes:</strong> ${application.notes || 'No notes provided'}</p>
        
      `;
      
      
      applicationsContainer.appendChild(applicationDiv);
    });
  }
  
  async function uploaadFiles(fileName){

    const token = localStorage.getItem('token');

    if (fileName.trim() !== "") {
        try {
            const response = await axios.post(
                "http://localhost:4000/job/uploadFile",
                {
                    message: fileName,  
                   
                },
                { headers: { 'Authorization': token } }
            );

            console.log('File Uploaded successfully:', response.data);

            
        } catch (error) {
            console.error("Error Uploading File:", error);
        }
    }
};

document.getElementById('upload-btn').addEventListener('click', async function(e) {
    e.preventDefault(); 
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0]; 

    if (!file) {
        alert("Please select a file to upload");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
         console.log(response.data)
        const { filePath} = response.data
        console.log('File uploaded successfully:', response.data);
        uploaadFiles(filePath)
        
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
    }
});


  
  function loadApplications() {
    const token = localStorage.getItem('token');
  
    axios
      .get('http://localhost:4000/job/get-job-applications', {
        headers: {
          'Authorization': token,
        },
      })
      .then((response) => {
        const applications = response.data.applications;
        displayApplications(applications); 
      })
      .catch((error) => {
        console.error('Error fetching job applications:', error);
        alert('Error fetching job applications.');
      });
  }
  
  
  document.getElementById('applicationForm').addEventListener('submit', handleFormSubmit);
  
  
  document.addEventListener('DOMContentLoaded', () => {
    loadApplications();
  });
  