---
title: Using Git Like Pro
layout: post
summary: Learn how to use all git commands
categories: 
    - git
    - web-development
thumbnail: posts/gitflow-workflow.png
author: Sujay Kundu
---

# Useful git commands

Remove a remote origin for the project

```
$ git remote -v
```

View current remotes

```
origin  https://github.com/OWNER/REPOSITORY.git (fetch)
origin  https://github.com/OWNER/REPOSITORY.git (push)
destination  https://github.com/FORKER/REPOSITORY.git (fetch)
destination  https://github.com/FORKER/REPOSITORY.git (push)
```

```
$ git remote rm origin
```

`$ git remote rm destination`

Add a remote origin for the project

`$ git remote add origin https://github.com/OWNER/REPOSITORY.git`

Check current remotes

```
origin https://github.com/OWNER/REPOSITORY.git (fetch)
origin https://github.com/OWNER/REPOSITORY.git (push)
```


Push a new local branch to a remote Git repository and track it too

Create a new branch:
```
git checkout -b feature_branch_name
```

Edit, add and commit your files.

Push your branch to the remote repository:

```
git push -u origin feature_branch_name
```