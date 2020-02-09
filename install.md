---
title:  Get Started
layout: page
permalink: /get-started
---

## How to use devlopr-jekyll

Steps to create your blog using devlopr-jekyll :

>  **Step 1.**  Fork the [devlopr-jekyll](https://github.com/sujaykundu777/devlopr-jekyll/fork) repo or use the **Use this Template** button

![Devlopr Jekyll Repo](/assets/img/posts/fork1.png){:class="img-fluid"}

> **Step 2.** Use **your-github-username.github.io** as the new repo  ( Replace your-github-username with yours).

> **Step 3.** Clone the new repo locally to make changes :

```
 $ git clone https://github.com/yourusername/yourusername.github.io
 $ cd yourusername.github.io
 $ code .
```

> **Step 4.** Open the files using VSCode and edit _config.yml and edit with your details:

- _config.yml file - replace with your own details
- _posts - Add your blog posts here
- _includes - You can replace the contents of the files with your data. (contains widgets)
- _assets/img - Add all your images here

> **Step 5.** Install the gem dependencies by running the following command

`$ bundle update`
`$ bundle install`

> **Step 6.** Serve the site locally by running the following command below:

`$ jekyll serve`

![Devlopr Jekyll Repo](/assets/img/posts/fork4.png){:class="img-fluid"}

Visit [http://localhost:4000](http://localhost:4000) for development server

![Devlopr Jekyll Repo](/assets/img/posts/fork5.png){:class="img-fluid"}

Once happy with your blog changes. Push your changes to master branch.

> **Step 7.** Push Your Local Changes

```
 $ git add .
 $ git commit -m "my new blog using devlopr-jekyll"
 $ git push origin master
```
> **Step 8.** Visit your Blog - http://yourusername.github.io




