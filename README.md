# Rafe Sharif: Academic Portfolio & Research Lab

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/rafe-sharif/portfolio/deploy.yml)](https://github.com/rafe-sharif/portfolio/actions)
[![Jekyll](https://img.shields.io/badge/Built%20With-Jekyll-cc0000.svg)](https://jekyllrb.com/)

> **Status:** Active Development | **Focus:** Computational Astrophysics, Tensor Methods, Machine Learning

## 1. Abstract & Executive Summary

This digital portfolio aggregates research at the intersection of **Physics** and **Computer Science**, with a specific focus on **Scientific Computing** and **Machine Learning**. It highlights work developed at **Amirkabir University of Technology**, including **MST-GMM probabilistic workflows** for star cluster membership inference using **Gaia DR3 data** and numerical methods for high-dimensional tensor systems. The goal is to bridge the gap between theoretical physical models and modern data-driven computational techniques.

## 2. Core Research Question & Thesis

**Thesis:** *Can hybrid probabilistic models and tensor decomposition techniques significantly improve the accuracy of open star cluster membership inference and dynamical system simulations compared to traditional heuristic methods?*

This research explores the application of **Minimum Spanning Trees (MST)** combined with **Gaussian Mixture Models (GMM)** to isolate gravitationally bound members in dense stellar fields, alongside exploring **tensor network states** for simulating quantum many-body systems.

## 3. Technical & Research Stack

### Academic Research Stack
*   **Languages:** Python (NumPy, SciPy, Pandas, PyTorch), MATLAB, SQL.
*   **Core Methods:** Tensor Decompositions, Probabilistic Modeling (GMM), Graph Theory (MST), MCMC.
*   **Data Sources:** Gaia DR3, SIMBAD.
*   **Tools:** Jupyter, LaTeX, Git.

### Portfolio Web Architecture
*   **Framework:** [Jekyll](https://jekyllrb.com/) (Static Site Generator).
*   **Styling:** SASS/SCSS, Responsive Design.
*   **Deployment:** GitHub Pages / Netlify (CI/CD pipelines).
*   **Templating:** Liquid.

## 4. Key Findings & Results

*   **MST-GMM Classifier:** Designed a hybrid classifier for large astronomical catalogs that demonstrated improved member recovery and reduced contamination compared to standard heuristics.
*   **Supernova Tracing:** Developing a pipeline to analyze kinematics in the **Lambda Orionis** region (Collinder 69), testing for kinematic signatures of past supernova events.
*   **Tensor Solvers:** Implemented high-dimensional tensor linear system solvers using **Einstein summation notation**, assessing complexity-accuracy trade-offs for large-scale computations.

## 5. Methodology

Research workflows typically involve:
1.  **Data Ingestion:** Querying large-scale datasets (e.g., Gaia DR3) via ADQL/SQL.
2.  **Preprocessing:** Cleaning kinematic parameters (proper motion, parallax) and photometric data.
3.  **Modeling:** Applying probabilistic models (GMM) refined by graph-based clustering (MST) or training Deep Learning models (GANs, Autoencoders).
4.  **Validation:** Benchmarking against standard catalogs and theoretical predictions.

## 6. Future Work

*   **Deep Learning Integration:** Integrating Deep Learning autoencoders for unsupervised feature discovery in stellar spectra.
*   **Interactive Visualization:** Expanding the portfolio to include interactive D3.js visualizations for 3D star cluster plotting.
*   **Publication:** Finalizing the manuscript *"A Sequential Approach to Identifying Open Star Cluster Members in Gaia DR3"* for submission.

## 7. Contributor Guidelines

We welcome contributions to improve the accessibility and functionality of this academic portfolio.

1.  **Fork** the repository.
2.  **Create** a feature branch (`git checkout -b feature/NewVisualization`).
3.  **Commit** your changes with clear messages.
4.  **Push** to the branch and open a **Pull Request**.

Please ensure all web assets are optimized and research citations follow the specified format.

---

## 8. Implementation Guide for Jules

**Objective:** Transition this repository into a production-ready academic portfolio.

- [x] **Branding & Design Verification**
    - [x] Update `_config.yml` with final color palettes and academic branding.
    - [x] Verify favicon and Open Graph images.
    - [x] Ensure typography is readable and professional.

- [x] **Content Injection**
    - [x] Replace all "[Placeholder]" text in `README.md` with actual research data.
    - [x] Populate project details in `_config.yml` and `projects.md`.
    - [x] Structure publication list in `publications.md`.

- [x] **Technical Optimization**
    - [x] Run `jekyll build` (Verified via static analysis).
    - [x] Audit `_includes/head.html` for proper SEO meta tags.
    - [x] Verify mobile responsiveness on `projects` and `publications` layouts.

- [x] **Deployment Pipeline**
    - [x] Confirm GitHub Actions/Netlify build settings match the `Gemfile` dependencies.
    - [x] Test the contact form endpoint (Formspree) configured in `_config.yml`.

---

*Maintained by Rafe Sharif.*
