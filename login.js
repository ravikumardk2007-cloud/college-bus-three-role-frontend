const demoAccounts={
 student:{email:"student@demo.com",password:"student123",name:"Priya Sharma",page:"student.html"},
 driver:{email:"driver@demo.com",password:"driver123",name:"Rohit Kumar",page:"driver.html"},
 admin:{email:"admin@demo.com",password:"admin123",name:"Administrator",page:"admin.html"}
};
let selectedRole="student";
document.querySelectorAll(".role-tab").forEach(btn=>btn.addEventListener("click",()=>{
 selectedRole=btn.dataset.role;
 document.querySelectorAll(".role-tab").forEach(b=>b.classList.toggle("active",b===btn));
 document.getElementById("email").value=demoAccounts[selectedRole].email;
 document.getElementById("password").value=demoAccounts[selectedRole].password;
 document.getElementById("loginError").textContent="";
}));
document.getElementById("email").value=demoAccounts.student.email;
document.getElementById("password").value=demoAccounts.student.password;
document.getElementById("togglePassword").addEventListener("click",()=>{
 const p=document.getElementById("password");p.type=p.type==="password"?"text":"password";
 document.getElementById("togglePassword").textContent=p.type==="password"?"Show":"Hide";
});
document.getElementById("loginForm").addEventListener("submit",e=>{
 e.preventDefault();const account=demoAccounts[selectedRole];
 const email=document.getElementById("email").value.trim().toLowerCase();
 const password=document.getElementById("password").value;
 if(email!==account.email||password!==account.password){
  document.getElementById("loginError").textContent="Those demo credentials don't match the selected account type.";return;
 }
 sessionStorage.setItem("cbtRole",selectedRole);sessionStorage.setItem("cbtName",account.name);
 location.href=account.page;
});