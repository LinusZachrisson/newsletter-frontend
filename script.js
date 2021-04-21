const root = document.getElementById("root");

const loginTemplate = () => {
  template = `<div class="landingContainer"><h1 id="landingHeader">Welcome to this fantastic site, please log in or register a user so you can recive our amazing newsletter!</h1><input type="text" placeholder="E-mail" id="emailInput"> <input type="password" placeholder="Password" id="passwordInput"> <button id="loginBtn">Log in</button> <br> <div id="registerLink">Dont have an account? Register here!</div></div>`;
  return template;
};

const registerTemplate = () => {
  template = `<div><h4>Username:</h4> <input type="text" placeholder="Username" id="registerNameInput"> <br> <h4>E-mail: (must contain a valid E-mail)</h4> <input type="text" placeholder="E-mail" id="registerEmailInput"> <br> <h4>Password: (must contain minimum of 6 characters)</h4> <input type="password" placeholder="Password" id="registerPasswordInput"> <br> <div class="checkbox-text">Tick this box to get our amazing newsletter!</div> <input type="checkbox" id="newsletterCheckbox"> <br> <button id="registerBtn">Submit</button></div>`;
  return template;
};

const getUser = async (id) => {
  const res = await fetch(`http://localhost:3000/users/${id}`);
  const user = await res.json();
  console.log(user);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

const userTemplate = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  template = `<h2>Hi and welcome to your page ${user.user}!</h2> <button id="logoutBtn">Log out</button>`;
  if (user.newsletter === true) {
    template += `<p> You are subscribed to our newsletter! <br> if you wish to unsubscribe <button id="unsubscribeBtn">Click here!</button></p>`;
  } else {
    template += `<p> You are not subscribed to our newsletter yet, please do! <br> if you wish to do that now <button id="subscribeBtn">Click here!</button></p>`;
  }
  return template;
};

const unsubscribeMessageTemplate = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  template = `<h3> Im sorry our newsletter did not fulfill your needs ${user.user}</h3> <p> If you were to change your mind again just return to your page </p> <div id="returnToUserPageBtn"> Click here to return to your page </div>`
  return template;
}

const subscribeMessageTemplate = () => {
  template = `<h3> Congrats, you decided to join our newsletter club, I promise we wont let you down! </h3> <p> If you were to change your mind again just return to your page </p> <div id="returnToUserPageBtn"> Click here to return to your page </div>`
  return template;
}

let userId = localStorage.getItem("id");

const changeSubscribtion = async () => {
  const res = await fetch(
    `http://localhost:3000/users/changesubscription/${userId}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const subscription = res.json();
  console.log(subscription);
};

const changeToSubscribe = async () => {
  const res = await fetch(
    `http://localhost:3000/users/changetosubscribe/${userId}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const subscription = res.json();
  console.log(subscription);
};

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "registerLink") {
    render(registerTemplate);
  }
  if (event.target && event.target.id === "registerBtn") {
    console.log(registerNameInput.value);
    console.log(registerEmailInput.value);
    console.log(registerPasswordInput.value);
    console.log(newsletterCheckbox.checked);

    let newUser = {
      name: registerNameInput.value,
      email: registerEmailInput.value,
      password: registerPasswordInput.value,
      newsletter: newsletterCheckbox.checked,
    };

    fetch(`http://localhost:3000/api/user/register`, {
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

    fetch(`http://localhost:3000/api/user/login`, {
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
    changeSubscribtion(userId);
    render(unsubscribeMessageTemplate);
  }

  if (event.target && event.target.id === "subscribeBtn") {
    changeToSubscribe(userId);
    render(subscribeMessageTemplate);
  }

  if (event.target && event.target.id === "returnToUserPageBtn") {
    render(userTemplate);
  }

});

let render = (template) => {
  root.innerHTML = template();
};

render(loginTemplate);
