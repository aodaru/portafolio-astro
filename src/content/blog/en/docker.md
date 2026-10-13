---
title: "From Virtualization to Docker: My Journey as an Eternal Student (and Geek) of Computing"
description: "A walk through the evolution from traditional virtualization to Docker, and how containers transformed the way I develop and administer systems."
date: 2025-12-24
tags: ["Docker", "Linux", "Virtualization"]
image: "/img/posts/docker.jpg"
draft: false
lang: en
translationKey: "docker"
---

Throughout my life as an enthusiast and a lifelong student of computing, the concept of virtualization is something I have used countless times. Whether for testing, experimenting or even taking some projects to production, virtualization has been a reliable companion and a great help thanks to its —in quotes— easy maintenance.

However, if there is a "but" to point out, it is precisely the maintenance of those resources. Because of the very nature of traditional virtualization, managing those environments can become somewhat tedious.

## The paradigm shift: From reserved resources to shared resources

With the arrival of **Docker**, the concept changed radically. We went from reserving specific resources for a single purpose (with all the weight that carries) to sharing those resources much more efficiently with the other applications. That win has let me multiply my options and, above all, my speed to reuse, develop and ship new features.

Explaining virtualization or Docker to someone outside of technology is complicated, mainly because this world has gone through many changes and improvements, each one specialized for a different kind of use:

1. **Full Virtualization:** If we want to bring an old computer back to life, we have no choice but to fully virtualize that hardware.
2. **Paravirtualization:** In cases where hardware emulation is partial, we resort to paravirtualization.
3. **Containers (Docker):** But if all we want is to isolate the environment and share the operating system kernel, this is where Docker comes in.

## Docker in the developer's day-to-day

As a developer, for a long time I depended on paravirtualization to carry out my projects. But with Docker, setting up development environments becomes far more pleasant. Being able to save those configurations, replicate them exactly for every project and isolate them in different containers avoids conflicts or those typical configuration problems that show up later.

```
docker-compose up -d
```

## The heart of my HomeLab

Then, with the rise of the **HomeLab**, Docker became the undisputed protagonist. It is the tool that brings my local servers to life for all kinds of jobs:

- DNS servers.
- Ad blockers (such as Pi-hole or AdGuard).
- VPNs for secure access.
- Task managers and photo storage.

I still have a lot to discover in this huge ecosystem, but I will keep telling you about my experience as I keep exploring.

And you? Are you still reserving resources, or have you already moved to the efficiency of containers?
