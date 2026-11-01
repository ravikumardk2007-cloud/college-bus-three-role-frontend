const role=sessionStorage.getItem("cbtRole");
const name=sessionStorage.getItem("cbtName")||"User";
function requireRole(allowed){if(!role||!allowed.includes(role)){location.replace("index.html");}}
function logout(){sessionStorage.clear();location.href="index.html";}
function setGreeting(){const el=document.getElementById("userName");if(el)el.textContent=name;}
function setDate(){const el=document.getElementById("dateTime");if(el)el.textContent=new Intl.DateTimeFormat("en-IN",{dateStyle:"medium",timeStyle:"short"}).format(new Date());}
document.addEventListener("DOMContentLoaded",()=>{setGreeting();setDate();const b=document.getElementById("logoutBtn");if(b)b.addEventListener("click",logout);const m=document.getElementById("menuBtn");if(m)m.addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));});