---
title: "From StackOverflow to AI: how can a junior learn to program when AI already writes code"
description: "AI speeds up programming, but learning still demands judgment, practice, and curiosity. How can a junior developer evolve?"
date: 2026-10-12
tags:
  ["programming", "artificial intelligence", "software development", "learning"]
image: "/img/posts/stackoverflowtoia.jpg"
draft: false
lang: en
translationKey: "stackoverflowtoia"
---

For years, when we got stuck while programming, we looked for an answer on Google or Stack Overflow. We found an example in C#, Python, or Node.js, adapted it, and kept trying until it solved our problem.

The tool has changed. Now we can describe what we want and ask an AI to generate the code. In some cases, it can also explain how it works, detect errors, and suggest alternatives. The cycle that once could take hours can now happen in minutes.

But there is a question that speed does not make disappear: **who is actually developing the program?**

## From looking for answers to asking for explanations

AI knows many languages, libraries, and programming patterns. It can help us with syntax and produce code that looks convincing. That frees the developer from having to remember every detail of every technology.

And it makes sense that we delegate memory. A person cannot keep all the documentation, commands, and quirks of every language in their head. Our strength lies in analyzing, connecting ideas, and deciding which solution makes sense. AI, by contrast, can retrieve and combine information at a speed no human can match.

In that sense, AI resembles Stack Overflow: it helps us move from an idea to an implementation. The difference is that now we do not receive only an answer found by another person. We can converse with a tool that adapts the explanation, generates variants, and tries again when something fails.

That can speed up learning enormously. It can also create a dangerous illusion: just because the code works does not mean we understand the problem or that we have learned to solve it.

## Code is not the whole of development

Let's imagine we want to create a simple application to organize our daily tasks. We can ask the AI to generate a task list, allow marking them as completed, and save the data.

But before writing code there are decisions that do not come from syntax: how do we want to organize the day? What does it mean for a task to be a priority? What should happen if we forget a date? What information should be easy to find? How should the experience of using the application feel?

AI can suggest answers, but it needs someone to communicate the purpose and evaluate whether its proposals fit. A program does not become useful just because it compiles. It has to respond to a real need and do so in a way that is understandable to whoever uses it.

That is why developing is not only producing lines of code. It is also understanding the problem, defining a structure, making decisions, and taking responsibility for the result. AI can collaborate on those tasks, but it does not remove the need for human judgment.

## The pressure on those who review

This difference is already generating debates in free software communities. In [QGIS proposal QEP 428](https://github.com/qgis/QGIS-Enhancement-Proposals/pull/387), a strict policy against contributions made with AI is proposed.

The discussion does not come down to whether AI can write correct code. Among the concerns expressed are the number of proposals that maintainers must review, the difficulty of verifying generated code, and the risk of weakening the relationship of trust between the person who contributes and the person who reviews. In a community project, review time is limited too.

A comment from someone who had submitted AI-assisted changes describes another concern: the tool can give a beginner the impression that they can already solve complex problems, even though they still lack the foundations to understand all the consequences of those changes. If someone delivers a solution they cannot explain or maintain, the reviewer ends up carrying much of the responsibility.

The QGIS proposal does not prove that all projects should ban AI. It does show that the speed of generation has a cost for those who receive, evaluate, and maintain the work. In some environments, explaining how a solution was reached can be as important as presenting the code.

## The junior's paradox

The [Xataka article on employment and AI](https://www.xataka.com/empresas-y-economia/gran-paradoja-ia-que-creara-empleo-que-destruye-problema-que-casi-nadie-esta-preparado) gathers McKinsey estimates for the United States: by 2035, automation could amount to 36 million jobs' worth of work hours. The article distinguishes between tasks that would change within the same job and workers who would need to retrain to move into another profession. It also points to a particular difficulty in software development: demand may recover, but it may favor experienced profiles more than those just starting out.

There lies one of the paradoxes: AI can take on basic tasks that once served as practice for juniors. If we automate those tasks, how do the people who are still learning acquire experience?

I do not believe juniors are going to disappear. I believe what is expected of them is changing. It will no longer be enough to know how to find an example, copy it, and get it to work. A junior will have to develop more quickly the ability to understand what they are doing and to explain why they chose a solution.

## AI as a mentor, not as autopilot

AI can be the private mentor many of us never had: one available to explain a concept several times, compare two approaches, or review an error without getting impatient. But to take advantage of it, you have to do more than ask it to solve the task.

A junior can use it to:

- ask for a line-by-line explanation and then verify it.
- compare different solutions and understand their advantages and limits.
- try to solve the problem first and ask for hints when stuck.
- request tests that reveal edge cases.
- explain the generated code in their own words.
- modify it and observe what changes, instead of accepting the answer as final.

The most useful question is not always "can you write this program?" It is often "what concepts do I need to solve it?" or "what mistakes could I make with this solution?"

That requires a hunger to learn. You do not need to memorize every API or write everything from scratch. You do need to build a foundation of logic and programming in order to recognize when an answer makes sense, when it hides a problem, and what questions still need to be asked.

## Learning to think with a new tool

We have moved from searching for code on Stack Overflow to conversing with an AI that can generate it. That change reduces the time between the idea and the first prototype, but it does not eliminate the work of understanding, testing, and deciding.

AI can write code. The developer still has to understand what it is for, how it fits into the system, and what experience it produces for people. For those starting out, the opportunity is enormous: they have a tool capable of accompanying their learning. The risk is confusing moving fast with learning.

The junior who adapts best will not necessarily be the one who writes the most code without help. It will be the one who uses AI to learn more, keeps their curiosity, and knows how to explain what they build. Because when the tool can deliver an answer in seconds, **understanding the answer becomes part of the craft**.

---

## Sources

- [QGIS proposal QEP 428 on AI contributions](https://github.com/qgis/QGIS-Enhancement-Proposals/pull/387)
- [Xataka: "The great paradox of AI is that it will create more jobs than it destroys. The problem is that almost no one is prepared"](https://www.xataka.com/empresas-y-economia/gran-paradoja-ia-que-creara-empleo-que-destruye-problema-que-casi-nadie-esta-preparado)
