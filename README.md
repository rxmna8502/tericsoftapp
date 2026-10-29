# Hello, Tericsoft!

A tiny static website served by Node.js on port **8081**, with a Dockerfile.
No npm packages, database, credentials or cloud services are required to test locally.

## Files
- `public/index.html`: the website.
- `server.js`: serves the website and a `/health` endpoint.
- `Dockerfile`: packages Node.js and the app as a container.
- `.dockerignore`: keeps unnecessary files out of the image build context.
- `.gitignore`: helps avoid committing local files or private keys. Always inspect commits for secrets.

## Windows: run with Docker Desktop

Docker Desktop must be installed and running in Linux-container mode.
Extract the ZIP, open the `hello-tericsoft` folder in PowerShell, then run:

```powershell
docker build -t hello-tericsoft .
docker run -d --name hello-tericsoft -p 8081:8081 hello-tericsoft
```

Open http://localhost:8081 in your browser.
Check health at http://localhost:8081/health.

The first build downloads the base image and needs an internet connection.

## Understand the commands

- `docker build`: creates an image using the Dockerfile.
- `-t hello-tericsoft`: names the image.
- `.`: uses the current folder as the build context.
- `docker run`: starts a container from the image.
- `-d`: runs it in the background.
- `--name`: gives the container a readable name.
- `-p 8081:8081`: maps the computer/server's port 8081 to the container's port 8081.
- `0.0.0.0` in server.js: listens on all network interfaces inside the container.
- `EXPOSE 8081`: documents the container port; it does not publish it by itself.
- `USER node`: runs the application as an unprivileged user in the container.

## Check and stop

```powershell
docker ps
docker logs hello-tericsoft
docker stop hello-tericsoft
docker rm hello-tericsoft
```

If you change the app, stop and remove the old container, rebuild the image,
and run the new one. If port 8081 is occupied, stop the existing app using it.

## Alternative: run without Docker

With Node.js installed, run:

```powershell
node server.js
```

Open http://localhost:8081. Press Ctrl+C in the terminal to stop.
This tests the app only, not the container requirement.

## Later: AWS

This is a starter app, not an AWS deployment or a completed assessment.
After deploying the container on EC2, the target URL will be
`http://YOUR-PUBLIC-IP:8081`.
AWS security-group and OS-firewall rules must allow TCP 8081 for the public demo.
Restrict SSH to your own IP; never commit or record private keys or credentials.
Check pricing and account eligibility before launching resources, and clean up
billable resources afterward. Budget alerts are not spending caps.

Practise and understand each step before recording the required one-take walkthrough.
Do not use this README as a script to read aloud. Write your own troubleshooting
note based on problems you actually encounter. ECS is an optional extension.
