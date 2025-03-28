
function handleFormSubmit(event) {
    event.preventDefault(); 
    const token = localStorage.getItem('token');
    const name = event.target['name'].value;
    const email = event.target['email'].value;
    const phone = event.target['phone'].value;
    const careerGoals = event.target['career-goals'].value;
  
    const profileDetails = {
      name,
      email,
      phone,
      career_goals: careerGoals
    };
  
    
    axios
      .post("http://localhost:4000/profile/save-profile", profileDetails,{headers : {'Authorization': token}})
      .then((response) => {
        
        loadProfile()
        alert("Profile data saved successfully.");
        //resetForm(); 
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
        alert("There was an error saving your profile.");
      });
  }
  
  
  function resetForm() {
    document.getElementById("profile-form").reset();
  }
  
  
  function displayProfile(profileData) {
      console.log(profileData)
    const{name, 
      email , 
      phone,
  career_goals} =profileData
    const profileDetailsContainer = document.getElementById('profileDetails');
    profileDetailsContainer.innerHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Career Goals:</strong> ${career_goals}</p>
    `;
  
    
    document.getElementById('profile-form').style.display = 'none';
    document.getElementById('profile-display').style.display = 'block';
  }
  
  
  document.getElementById('profileForm').addEventListener('submit', handleFormSubmit);
  
  
  document.addEventListener("DOMContentLoaded", () => {
    //resetForm()
    loadProfile();
  });
  
  
  function loadProfile() {
    const token = localStorage.getItem('token');
    axios
      .get("http://localhost:4000/profile/get-profile",{headers : {'Authorization': token}})
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          const profileData = response.data.profileData
          console.log(profileData);
          //const profileDataN = profileData[0];

          displayProfile(profileData);
        } else {
          
          document.getElementById('profile-form').style.display = 'block';
          document.getElementById('profile-display').style.display = 'none';
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }
  