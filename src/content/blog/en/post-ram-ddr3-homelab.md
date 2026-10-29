---
title: "My homelab runs on 24 GB of DDR3 and RAM was never the problem"
description: "A server with 2011 hardware, 32 services and 24 GB of DDR3. What it really costs to buy RAM in 2026 and how to decide when to buy it."
date: 2026-10-21
tags:
  ["homelab", "truenas", "ddr3", "hardware", "ram", "docker", "autohospedaje"]
image: "/img/posts/postram.jpg"
draft: false
lang: en
translationKey: "post-ram-ddr3-home"
---

# My homelab runs on 24 GB of DDR3 and RAM was never the problem

A 32 GB DDR5 kit cost around $70 a year ago. Today, the same kit costs 500. It's not a one-off sale or a store taking advantage: it's the market price, and it comes from the fact that the DRAM that used to go into our computers now goes into HBM memory for artificial intelligence data centers. Consumer memory is the last thing that gets manufactured, from whatever is left over.

Meanwhile, my home server — the one that holds up my work, my backups and the applications I use every day — runs on 24 GB of DDR3 on a 2012 motherboard and a 2011 processor.

This post isn't an apology for old hardware. It's the math I did before buying memory, and why the answer wasn't the one I expected.

## The server

I built it with what I had. That's literally it: parts left over from other machines and two disks I bought used.

- **Processor:** Intel Core i3-2100, from 2011. Two cores, four threads, 3.1 GHz.
- **Motherboard:** ASUS P8Z77-V LX, LGA1155 socket. Four DDR3 slots, 32 GB maximum.
- **Memory:** 24 GB DDR3 (the system sees 23 GiB).
- **Disks:** two 240 GB Kingston SSDs and two 4 TB Seagate drives.
- **System:** TrueNAS Scale, with the applications in containers.

Thirty-two services run on top of that. n8n for automations, Immich for photos, Nextcloud, Supabase, Jellyfin, AdGuard, the memory server (RAG), the proxy, the backups.

![case](../../../assets/posts/caseNAS.jpg)

## The math that matters

When someone asks about a homelab, the conversation always ends the same way: "throw 64 GB at it and you're set for life." As if memory were free. It isn't, and this year less than ever.

Price per gigabyte, today:

- **New DDR5:** a 32 GB kit is around 500 dollars. That's about **15.60 dollars per GB**.
- **Used DDR3:** an 8 GB module at 1600 MHz can be had for **14 dollars**. That's **1.75 dollars per GB**.

The difference is almost nine times. Nine. For the same amount of memory.

And there's something more uncomfortable: filling all four slots on my board — going from 24 to 32 GB — costs about 56 dollars. Less than a single 16 GB DDR5 module, which today runs around 250.

That's the point. It's not that DDR3 is good. It's that the price of DDR5 has stopped having any relationship with what memory actually does.

## Why 24 GB is enough

Here comes the part that surprised me when I measured it.

With all thirty-two services up, the server uses **15 GB of the 23 available**. That leaves 35% free. And it isn't doing anything unusual: it's serving Nextcloud, transcoding in Jellyfin, indexing photos in Immich and running n8n workflows for clients.

Free memory isn't wasted memory either: the system uses it as disk cache. If you look at `free -h` you'll see that "free" is low but "available" is high. That's normal and it's healthy.

The important thing: **there is no swap**. Zero. I never reached a point where the system had to push pages to disk for lack of memory.

![TrueNAS screenshot](../../../assets/posts/truenas_captura.png)

## Where it does fall short

This is where the post becomes useful instead of a fantasy.

My server's bottleneck **is not memory. It's the processor.** A two-core i3 from 2011 falls short when Immich indexes a new library, when Jellyfin transcodes without hardware acceleration, or when three n8n workflows process at the same time.

If I have 56 dollars to spend, I don't put them into reaching 32 GB of RAM. I put them into a **used i7-3770**: same socket, four cores and eight threads, and today you can find one for 25 dollars. It's the biggest upgrade for the smallest money that exists on this platform.

That's the trap of the RAM conversation: people buy memory on reflex when the problem is somewhere else. If your server swaps, RAM is the problem. If your processor is at 100% and memory at 60%, buying RAM won't save your day.

## What they don't tell you about old hardware

It's not all upside, and it would be dishonest to sell it that way.

- **No ECC.** Error-correcting memory is what you want in a server. My board doesn't support it. It's a real long-term risk, especially with ZFS.
- **SATA only.** No NVMe. The disks are slow and backups feel it.
- **Fifteen-year-old hardware.** A board that fails at this point doesn't get replaced: it gets retired. I have to assume that any day it won't boot.
- **Power draw.** This is the part almost nobody calculates. My UPS reads about 60 VA of load, which comes out to roughly 50 or 55 watts. That's about 39 kWh a month. At ENSA's base rate (B/. 0.17581 per kWh, first half of 2026), that's around **B/. 6.85 a month** before the Tariff Stabilization Fund credit. About 82 dollars a year.

Cheap to buy isn't the same as free to run. A modern machine would use half the power, but it would cost twenty times more. The full math has to include both numbers.

And there's the risk that actually worries me: **a single machine**. I have no redundancy. If that board dies, the server dies with it.

## The rule I use now

After going back and forth, I settled on a simple rule:

1. **If there's swap, buy RAM.** It's the only symptom that justifies the purchase without discussion.
2. **If the CPU is at 100%, buy CPU.** Memory doesn't fix a saturated processor.
3. **If neither is happening, buy nothing.** And even less in 2026, with prices where they are.

And a fourth one, the one I had the hardest time accepting: **budget for the replacement, not just the purchase**. Old hardware isn't an eternal strategy; it's a way to buy time while you save up for the good stuff.

## Closing

I'm not writing this to convince anyone to build their homelab with 2011 parts. I'm writing it because I spent weeks looking at memory prices, convinced my server was short on RAM, and the measurement told me otherwise.

The server wasn't short on RAM. It was short on cores.

Before buying memory this year, open a terminal and look at two numbers: how much memory you really have available, and how hard your processor is working. The answer is usually in the second one.
