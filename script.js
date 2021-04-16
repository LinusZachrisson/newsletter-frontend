const root = document.getElementById("root");

const loginTemplate = () => {
  template = `<div class="landingContainer"><h1 id="landingHeader">Welcome to this fantastic site, please log in or register a user so you can recive our amazing newsletter!</h1><input type="text" placeholder="E-mail" id="emailInput"> <input type="password" placeholder="Password" id="passwordInput"> <button id="loginBtn">Log in</button> <br> <div id="registerLink">Dont have an account? Register here!</div></div>`;
  return template;
};

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "registerLink") {
    render(registerTemplate);
  }
});

const registerTemplate = () => {
  template = `<h4>Username:</h4> <input type="text" placeholder="Username" id="registerNameInput"> <br> <h4>E-mail: (must contain a valid E-mail)</h4> <input type="text" placeholder="E-mail" id="registerEmailInput"> <br> <h4>Password: (must contain minimum of 6 characters)</h4> <input type="password" placeholder="Password" id="registerPasswordInput"> <br> <button id="submitBtn">Submit</button>`;
  return template;
};

let render = (template) => {
  root.innerHTML = template();
};

render(loginTemplate);
