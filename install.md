---
title: Get Started
menus: header
layout: page
permalink: /get-started/
---

## Getting Started - Deploying your blog using devlopr-jekyll

Steps to create your blog using devlopr-jekyll and Host using Github Pages :

>  **Step 1.**  Fork the repo - [click here](https://github.com/sujaykundu777/devlopr-jekyll/fork)


![Devlopr Jekyll Repo](/assets/img/posts/fork1.png){:class="img-fluid"}

> **Step 2.** Use **your-github-username.github.io** as the new repo  ( Replace your-github-username with yours). Remember if you use the name other than your-github-username.github.io , your blog will be built using gh-pages branch.

![Devlopr Jekyll Repo](/assets/img/posts/fork2.png){:class="img-fluid"}

![Devlopr Jekyll Repo](/assets/img/posts/fork3.png){:class="img-fluid"}

> **Step 3.** Clone the new repo locally to make changes :

![Devlopr Jekyll Repo](/assets/img/posts/fork31.png){:class="img-fluid"}

![Devlopr Jekyll Repo](/assets/img/posts/fork32.png){:class="img-fluid"}

![Devlopr Jekyll Repo](/assets/img/posts/fork33.png){:class="img-fluid"}

```bash
 $ git clone https://github.com/yourusername/yourusername.github.io
 $ cd yourusername.github.io
 $ code .
```

> **Step 4.** Open the files using VSCode and edit _config.yml and edit with your details:

- _config.yml file - replace with your own details
- _posts - Add your blog posts here
- _includes - You can replace the contents of the files with your data. (contains widgets)
- _assets/img - Add all your images here

![Devlopr Jekyll Repo](/assets/img/posts/fork34.png){:class="img-fluid"}

> **Step 5** - Install the development requirements:

Let's first set up our development environment, You might need to install the following tools:

1. [Git](https://git-scm.com/)
2. [Ruby](https://www.ruby-lang.org/) and [Bundler](https://bundler.io/)
3. [VSCode](https://code.visualstudio.com/download)

We need ruby and bundler to build our site locally. After installation check if its working:

For ruby :

```bash
$ ruby -v
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-linux-gnu]
```
For bundler :

```bash
$ bundler -v
Bundler version 2.1.4
```
Add jekyll :

```bash
$ bundle add jekyll
```
 This command will add the Jekyll gem to our Gemfile and install it to the ./vendor/bundle/ folder.

You can check the jekyll version

```
$ bundle exec jekyll -v
jekyll 4.0.0
```

> **Step 6.** Install the gem dependencies by running the following command

```bash
$ bundle update
$ bundle install
```

> **Step 7.** Serve the site locally by running the following command below:

```bash
$ bundle exec jekyll serve
```
or you can also serve using :

```bash
$ jekyll serve
```

Visit [http://localhost:4000](http://localhost:4000) for development server

![Devlopr Jekyll Repo](/assets/img/posts/fork4.png){:class="img-fluid"}

![Devlopr Jekyll Repo](/assets/img/posts/fork41.png){:class="img-fluid"}

Once happy with your blog changes. Push your changes to master branch.

> **Step 8.** Push Your Local Changes

```bash
 $ git add .
 $ git commit -m "my new blog using devlopr-jekyll"
 $ git push origin master
```

Visit your Github Repo settings ! Enable master branch as Github Pages Branch :

![Devlopr Jekyll Repo](/assets/img/posts/fork6.png){:class="img-fluid"}

> **Step 9.** Deploy your Blog :

![Devlopr Jekyll Repo](/assets/img/posts/fork7.png){:class="img-fluid"}

> Congrats ! On your new shining Blog !

You can visit the blog using [http://your-github-username.github.io](http://your-github-username.github.io).

