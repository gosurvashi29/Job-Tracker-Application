async function logIn(event) {
    try{
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const logInDetails={
      
      email:email,
      password:password
    }
     
    console.log(logInDetails);
  
    const response= await axios.post("http://localhost:4000/user/login",logInDetails)

    if (response.status===200){
        alert(response.data.message)
        localStorage.setItem('token', response.data.token)
        
        window.location.href="../../views/profile"
    }
    else{
        throw new Error(response.data.message)
    }
  
   
  }
  catch(err){
    console.log(JSON.stringify(err))
    document.body.innerHTML +=`<div style="color:red">${err} </div>`;
  }
  }