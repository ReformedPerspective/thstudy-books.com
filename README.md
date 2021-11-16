# The Study ([thestudy-books.com](https://thestudy-books.com)) [![Netlify Status](https://api.netlify.com/api/v1/badges/5d3d197e-9266-46bb-836b-21364dc27a59/deploy-status)](https://app.netlify.com/sites/thestudybooks/deploys)

This is the website for **The Study**, a not-for-profit organization operated by members of the [Canadian Reformed Churches](https://canrc.org/).

## Table of Contents

- [How the Site is Built](#how-the-site-is-built)
  
  - [Hugo - Site Generator](#hugo---site-generator)
  
  - [Netlify - Automatic Deployment](#netlify---automatic-deployment)
  
  - [Netlify CMS - Headless Front-end](#netlify-cms---headless-front-end)

- [Development Setup](#development-setup)
  
  - [Install Hugo](#install-hugo)
  
  - [Clone the Site with Git](#clone-the-site-with-git)
  
  - [Site Layout](#site-layout)

# How the Site is Built

## Hugo - Site Generator

This site uses the [Hugo](https://gohugo.io/) open source static site generator. The [Hargo theme](https://gethugothemes.com/products/hargo/) was used as a starting point, but has been highly modified to the point where it isn't recognizable anymore ;-)

## GitHub - Version Control and Collaboration

The site is stored on GitHub under the Reformed Perspective 'Organization'.

## Netlify - Automatic Deployment

[Netlify](https://www.netlify.com) is used to deploy *thestudy-books.com* on GItHub commits to the **master** branch.

## Netlify CMS - Headless Front-end

[Netlify CMS](https://www.netlifycms.org) has been custom-made to support the creation and editing of books and content in a nicely laid-out user interface. Headless CMS rocks!

# Development Setup

In order to get things set up to work on thestudy-books.com you'll need Hugo, Git and some kind of text editor or IDE, likely one with Git integration, although that's not necessary.

## Install Hugo

The first thing you'll need is Hugo. Follow the [directions on the Hugo website]([Install Hugo | Hugo](https://gohugo.io/getting-started/installing)) to get it installed on your machine. Hugo is cross-platform and can easily be installed on [Linux](https://gohugo.io/getting-started/installing#linux), [MacOS](https://gohugo.io/getting-started/installing#macos) and [Windows](https://gohugo.io/getting-started/installing#windows).

## Clone the Site with Git

If you're on Windows install Git from the [official website](https://gitforwindows.org) or through Chocolatey. You'll have to get access to the Reformed Perspective GitHub organization. Contact tech@reformedperspective.ca if you haven't already.

You'll want to do one of:

- set up ssh keys on the GitHub repo so you can use Git from the command line
  
  - clone the repo with
    `git clone git@github.com:ReformedPerspective/thstudy-books.com.git`
  
  - use VSCode (or VSCodium) or another IDE to clone the repo using your SSH key

- use the GitHub Desktop app to clone the repo

- use the GitHub command line app
  
  - clone the repo with
    `gh repo clone ReformedPerspective/thstudy-books.com`

## Run Hugo

Run `hugo server` to have Hugo automatically create a temporary version of the site and monitor for changes. Connect to `http://localhost:1313` (or whatever Hugo says on the command line) to view the site.

## Site Layout

The directory structure for the site is as follows:

```bash
├── archetypes #base files for new pages
├── assets #javascript and scss for the Hugo pipeline
│   ├── js
│   └── scss
├── content
│   ├── about
│   ├── categories
│   ├── faq
│   ├── products #all the books live here
│   └── resources
├── data #yml files for certain pages' data
├── layouts #Hugo templates for pages
│   ├── _default
│   ├── about
│   ├── categories
│   ├── faq
│   ├── partials #partial template use elsewhere
│   ├── products
│   └── resources
├── static #static html files
│   ├── admin #Netlify CMS admin site
│   ├── images
│   └── uploads #folder for Netlify CMS uploads
│       ├── covers
│       └── previews
```
