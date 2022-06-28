> # **NotesApp**  

Created by Shubham Bhosale (shrishubhamb94@gmail.com) using **MERN** stack.  
Deployed on **AWS EC2** Ubuntu instance using **Docker** container.  
URL: http://35.154.78.143/  

> ## **Stack**  

- Database : MySQL
- Server : Express js
- Front End : React js
- Back End : Node js  

> ## **Salient Features**  

  - Single page application using ReactJS
  - Responsive UI using Bootstrap 5
  - Authentication and authorization using JSON Web Token
  - Authentication state management using React-Redux
  - Password encryption using crypto-js
  - Password reset via email OTP using Nodemailer  
  
> ## **Running the app using Docker**  

Docker images for this apps are uploaded on the [**docker hub**](https://hub.docker.com/u/shrishubhamb).  
If you have Docker Desktop installed on your computer,  
you can run this app by following,  

```bash
# in git repository dir
cd NotesApp_Docker
docker compose up
```  

This will pull the images from docker hub and run the containers and  
you can access the app on your [localhost](http://localhost/).  
Code for this app is also shared in this repository.  
I have hidden the email credentials required for the Nodemailer in the code,  
hence reset password via email otp will not work.