# Personal Portfolio

A small, lightweight portfolio built with plain HTML, CSS, and JavaScript.  
This page acts as a hub for my projects, linking to live demos and their GitHub repositories.  
It includes a simple UI, light/dark/system theme switching, dynamic GitHub repo data, and a contact form.

---

## 🖥️ Hosting & Deployment

This site runs on a Hetzner VPS using the following setup:

#### Docker Compose
- Nginx container serving static files  
- SSL certificates mounted from the host  

#### Nginx Reverse Proxy
- Enforces HTTPS via Let's Encrypt  
- Proxies traffic to individual project containers
- Keeps Certbot + SSL renewal working without downtime  

#### GitHub Actions
A minimal CI/CD workflow that:
- SSHs into the server  
- Pulls the latest `main` branch  
- Rebuilds and restarts Docker containers  

#### 🔒 Security Notes
- SSL handled by Let's Encrypt
- Contact form submits via secure Formspree endpoint  
- Server access uses SSH keys only  

## 🚀 Features

#### 📬 Contact Form
- Powered by Formspree  
- Handles input validation + success/error states  
- Smooth scroll to the form with automatic focus  

---

#### 📦 Dynamic Project List
- Displays selected GitHub repositories automatically  
- Fetches descriptions from the GitHub API  
- Each item includes:
  - Link to the GitHub repo  
  - Live demo hosted on the VPS (via Nginx proxy)  

---

#### 🎨 Theme Toggle
- Light, Dark, and System modes  
- Saves user preference in `localStorage`  
- Realtime OS theme changes when set to System  

---

## 🛠️ Tech Stack

| Category | Tools |
|---------|-------|
| Frontend | HTML5, CSS3, JavaScript |
| Icons | Font Awesome |
| Contact | Formspree |
| Deployment | GitHub Actions, SSH |
| Containerization | Docker, Docker Compose |
| Web Server | Nginx (SSL, reverse proxy) |
| Hosting | Hetzner VPS |
| Development Assistance | AI (ChatGPT, Mistral) |

---
