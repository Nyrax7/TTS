document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    
    if (email === "admin@gmail.com" && password === "1234") {
      alert("Connexion réussie !");
      window.location.href = "../Page/accueil.html"; 
    } else {
      alert("Identifiants incorrects.");
    }
  });
  