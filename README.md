🛠️ CRUD App with Jenkins, Docker, MySQL, and SonarCloud

A production-ready CRUD (Create, Read, Update, Delete) Node.js application with a MySQL database hosted on AWS RDS.
CI/CD is automated with Jenkins, security & quality analysis via SonarCloud, and containerization using Docker.

📋 Project Setup Guide
1️⃣ Launch an EC2 Instance (Ubuntu)

Provision an EC2 instance (Ubuntu Free Tier).

Configure Security Group:

22 → SSH

8080 → Jenkins

3000 → Node.js app

🔑 Connect via SSH:

ssh -i <your-key>.pem ubuntu@<EC2_PUBLIC_IP>

2️⃣ Run EC2 Setup Script

Run the installation script to set up Docker + Jenkins:

chmod +x scripts/docker-jenkins-install.sh
./scripts/docker-jenkins-install.sh

3️⃣ AWS RDS (MySQL)

Navigate to RDS → Create Database

Select:

Engine: MySQL

Identifier: testdb-1

Username: root

Password: *********

Public access: ✅ Yes (for testing)

📌 Example endpoint:

testdb-1.cp24ccc4chcf.ap-southeast-1.rds.amazonaws.com

4️⃣ Clone the Repository
git clone https://github.com/ashubambal/crud-app.git
cd crud-app

5️⃣ Access Jenkins

Open: http://<EC2_PUBLIC_IP>:8080

Get unlock key:

sudo cat /var/lib/jenkins/secrets/initialAdminPassword

6️⃣ Install Jenkins Plugins

✅ Recommended plugins:

Docker Pipeline

SonarQube Scanner

Pipeline Stage View

7️⃣ Setup SonarCloud

Go to SonarCloud → Analyze new project

Link GitHub Repository

Create Organization → Jenkins

Generate a Sonar Token:

My Account → Security → Generate Token

8️⃣ Add Credentials in Jenkins

🔐 Navigate: Manage Jenkins → Credentials → Global

ID	Type	Purpose
sonar-token	Secret text	SonarCloud authentication
docker-cred	Username + Password	DockerHub login credentials
9️⃣ Configure SonarQube in Jenkins

Global Tool Configuration → Add SonarQube Scanner

Manage Jenkins → System → Add SonarQube Server:

Name: SonarCloud

URL: https://sonarcloud.io

Credentials: sonar-token

🔟 Create Jenkins Pipeline

New item → ci-jenkins → Pipeline

Enable: ✅ GitHub hook trigger for GITScm polling

Pipeline script from SCM (GitHub repo)

Add GitHub Webhook:

Repo → Settings → Webhooks

URL: http://<EC2-IP>:8080/github-webhook/

Content type: application/json

1️⃣1️⃣ Run & Access the App

🌍 Visit:

http://<EC2_PUBLIC_IP>:3000

📁 Project Structure
crud-app/
├── app.js                  # Express app
├── Dockerfile              # Docker container config
├── Jenkinsfile             # Jenkins pipeline
├── package.json
├── public/                 # Static frontend
├── scripts/
│   └── docker-jenkins-install.sh
└── .env                    # Local secrets (ignored in git)

✅ Technologies Used

⚡ Node.js + Express

🗄️ MySQL (AWS RDS)

🐳 Docker

🛠️ Jenkins

🔍 SonarCloud

🌐 GitHub

🎨 Website UI & Operation
<p align="center"> <img src="assets/recording.gif" alt="Demo" width="700"> </p>
