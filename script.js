const root = document.getElementById("root");

//checking localstorage if users is loged in

let user = JSON.parse(localStorage.getItem("user"));
console.log("user", user);
const checkIfUserIsLogedin = () => {
  if (user) {
    render(userTemplate);
  } else {
    render(loginTemplate);
  }
};

//templates for different stages of app

const loginTemplate = () => {
  template = `<div class="landingContainer"><h1 id="landingHeader">Welcome to this fantastic site, please log in or register a user so you can recive our amazing newsletter!</h1><input type="text" placeholder="E-mail" id="emailInput"> <input type="password" placeholder="Password" id="passwordInput"> <button id="loginBtn">Log in</button> <br> <div id="registerLink">Dont have an account? Register here!</div></div>`;
  return template;
};

const registerTemplate = () => {
  template = `<div class="register-container"><h4>Username: (must contain minimum of 6 characters)</h4> <input type="text" placeholder="Username" id="registerNameInput"> <br> <h4>E-mail: (must contain a valid E-mail)</h4> <input type="text" placeholder="E-mail" id="registerEmailInput"> <br> <h4>Password: (must contain minimum of 6 characters)</h4> <input type="password" placeholder="Password" id="registerPasswordInput"> <br> <div class="checkbox-text">Tick this box to get our amazing newsletter!</div> <input type="checkbox" id="newsletterCheckbox"> <br> <button id="registerBtn">Submit</button></div>`;
  return template;
};

const getUser = async (id) => {
  const res = await fetch(
    `https://get-my-newsletter.herokuapp.com/users/${id}`
  );
  const userId = await res.json();
  localStorage.setItem("user", JSON.stringify(userId));
  return userId;
};

const userTemplate = () => {
  user = JSON.parse(localStorage.getItem("user"));
  template = `<h2 class="user-template-header">Hi and welcome to your page ${user.user}!</h2> <button id="logoutBtn">Log out</button>`;
  if (user.newsletter === true) {
    template += `<p class="user-template"> You are subscribed to our newsletter! <br> if you wish to unsubscribe <button id="unsubscribeBtn">Click here!</button></p>`;
  } else {
    template += `<p class="user-template"> You are not subscribed to our newsletter yet, please do! <br> if you wish to do that now <button id="subscribeBtn">Click here!</button></p>`;
  }
  return template;
};

const unsubscribeMessageTemplate = () => {
  template = `<div class="subscribtion-template"><h3> Im sorry our newsletter did not fulfill your needs ${user.user} <i class="far fa-frown"></i></h3> <p> If you were to change your mind again just return to your page </p> <div id="returnToUserPageBtn"> Click here to return to your page </div></div>`;
  return template;
};

const subscribeMessageTemplate = () => {
  template = `<div class="subscribtion-template"><h3> Congrats ${user.user}, you decided to join our newsletter club, I promise we wont let you down! <i class="far fa-smile"></i></h3> <p> If you were to change your mind again just return to your page </p> <div id="returnToUserPageBtn"> Click here to return to your page </div></div>`;
  return template;
};

//fetch to change subscription status

const changeSubscribtion = async () => {
  user = JSON.parse(localStorage.getItem("user"));
  console.log("user1", user);
  const res = await fetch(
    // `http://localhost:3000/users/changesubscription/${user.id}`,
    `https://get-my-newsletter.herokuapp.com/users/changesubscription/${user.id}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const subscription = await res.json();
  localStorage.setItem("user", JSON.stringify(subscription));
  console.log("1", subscription);
};

const changeToSubscribe = async () => {
  user = JSON.parse(localStorage.getItem("user"));
  console.log("user2", user);
  const res = await fetch(
    // `http://localhost:3000/users/changetosubscribe/${user.id}`,
    `https://get-my-newsletter.herokuapp.com/users/changetosubscribe/${user.id}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const subscription = await res.json();
  localStorage.setItem("user", JSON.stringify(subscription));
  console.log("2", subscription);
};

//all eventlisteners in app

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "registerLink") {
    render(registerTemplate);
  }
  if (event.target && event.target.id === "registerBtn") {
    let newUser = {
      name: registerNameInput.value,
      email: registerEmailInput.value,
      password: registerPasswordInput.value,
      newsletter: newsletterCheckbox.checked,
    };

    //fetch(`http://localhost:3000/api/user/register`, {
    fetch(`https://get-my-newsletter.herokuapp.com/api/user/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    render(loginTemplate);
  }

  if (event.target && event.target.id === "loginBtn") {
    let existingUser = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    //fetch(`http://localhost:3000/api/user/login`, {
    fetch(`https://get-my-newsletter.herokuapp.com/api/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(existingUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getUser(data.user).then(() => render(userTemplate));
      });
  }

  if (event.target && event.target.id === "unsubscribeBtn") {
    changeSubscribtion();
    render(unsubscribeMessageTemplate);
  }

  if (event.target && event.target.id === "subscribeBtn") {
    changeToSubscribe();
    render(subscribeMessageTemplate);
  }

  if (event.target && event.target.id === "returnToUserPageBtn") {
    render(userTemplate);
  }

  if (event.target && event.target.id === "logoutBtn") {
    logOut();
    render(loginTemplate);
  }
});

//log out function

let logOut = () => {
  localStorage.removeItem("user");
};

//render template function

let render = (template) => {
  root.innerHTML = template();
};

checkIfUserIsLogedin();
