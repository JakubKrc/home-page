const btn = document.getElementById("theme-toggle");
const themes = ["light", "dark", "system"];

let theme = localStorage.getItem("theme") || "system";

applyTheme(theme);
updateButtonText(theme);

btn.addEventListener("click", () => {
    const index = themes.indexOf(theme);
    theme = themes[(index + 1) % themes.length];

    localStorage.setItem("theme", theme);
    applyTheme(theme);
    updateButtonText(theme);
});

function applyTheme(theme) {
    if (theme === "system") {
        applySystemTheme();
    } else {
        document.documentElement.setAttribute("data-theme", theme);
    }
}

function applySystemTheme() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme = prefersDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", systemTheme);
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (theme === "system") {
        applySystemTheme();
    }
});

function updateButtonText(theme) {
    const icon = btn.querySelector("i");
    if (theme === "light") {
        btn.textContent = "Light";
        btn.prepend(icon);
        icon.className = "fa-solid fa-lightbulb";
    } else if (theme === "dark") {
        btn.textContent = "Dark";
        btn.prepend(icon);
        icon.className = "fa-solid fa-moon";
    } else if (theme === "system") {
        btn.textContent = "System";
        btn.prepend(icon);
        icon.className = "fa-solid fa-laptop";
    }
}

async function createProjects() {

  const repos = await loadProjects()
  repos.map( (repo) => repo["name-of-git"] = (repo["name-of-git"] == "") ? repo.name : repo["name-of-git"] )
  repos.map( (repo) => repo["demo-url"] = (repo["demo-url"] == "") ? '/'+repo.name : repo["demo-url"])

  repos.map( (repo) => {

    const div = document.createElement("div");
    div.className = "repo";

    const spanName = document.createElement("span")
    spanName.textContent = repo.name;
    spanName.className = "repo-name"
    div.appendChild(spanName);

    const spanDesc = document.createElement("span");
    spanDesc.className = "repo-desc"
    div.appendChild(spanDesc);

    const divForLinks = document.createElement("div")
    divForLinks.className = "div-for-links"
    div.appendChild(divForLinks)

    const repoIgithub = document.createElement("i")
    repoIgithub.className = "fa-brands fa-github"

    const repoLink = document.createElement("a");
    repoLink.appendChild(repoIgithub)
    repoLink.href = `https://github.com/JakubKrc/${repo["name-of-git"]}`
    repoLink.target = "_blank";
    repoLink.style.fontWeight = "bold";
    repoLink.appendChild(document.createTextNode(`Repository`));
    divForLinks.appendChild(repoLink);

    const repoIstart = document.createElement("i")
    repoIstart.className = "fa-solid fa-hourglass-start"

    const appLink = document.createElement("a");
    appLink.appendChild(repoIstart)
    appLink.href = repo["demo-url"];
    appLink.target = "_blank";
    appLink.style.fontWeight = "bold";
    appLink.appendChild(document.createTextNode(`Try in browser`));
    divForLinks.appendChild(appLink);

    if(repo["mobile-err"] != ""){
      const spanMobileErr = document.createElement("span")
      spanMobileErr.textContent = repo["mobile-err"];
      spanMobileErr.className = "mobile-err"
      div.appendChild(spanMobileErr);
    }

    document.getElementById('repos-container').appendChild(div);

    if (repo.desc != ""){
      spanDesc.textContent = repo.desc
      return
    }

    fetch(`https://api.github.com/repos/JakubKrc/${repo["name-of-git"]}`, {
    /*headers: token ? { Authorization: `token ${token}` } : {}*/
    })
      .then(response => response.json())
      .then(data => {
        const description = data.description || "No description available.";
        spanDesc.textContent = description;
      })
      .catch(error => {
        console.error("Error fetching repo description:", error);
        document.getElementById("repo-description").textContent =
          "Failed to fetch description. Check the console for errors.";
      });
  })

}
createProjects()

const form = document.getElementById('contact-form')
const msg = document.getElementById('form-msg')

form.addEventListener('submit', async function(e) {
    e.preventDefault()
    const formData = new FormData(form)
    const action = form.action

    try {
        const response = await fetch(action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        })

        if (response.ok) {
            msg.textContent = "Message sent! Thank you."
            form.reset();
        } else {
          const result = await response.json();
          if (result.errors) {
            msg.textContent = result.errors.map(e => e.message).join(", ");
          } else {
            msg.textContent = "Oops! There was a problem submitting your form.";
          }
        }
      } catch (error) {
        msg.textContent = "Oops! There was a problem submitting your form.";
      }
})

document.getElementById("email-button").addEventListener("click", function() {
  const form = document.getElementById("contact-form")

  form.scrollIntoView({ behavior: "smooth", block: "center" })
  setTimeout(() => {
    form.querySelector("input, textarea, select").focus()
  }, 300)
})
