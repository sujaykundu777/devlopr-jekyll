---
layout: post
title: "Pipeline ML temps réel : détection de fraude bancaire"
author: hamiddorego
categories: [Machine Learning, MLOps]
tags: [XGBoost, FastAPI, Streamlit, Docker, Classification]
image: assets/img/fraud.png
description: "Construction d'un pipeline de détection de fraude bancaire en production : 83,63% de rappel, inférence < 100 ms, déployé avec FastAPI et Docker."
---

## Problématique

La détection de fraude est un problème de classification binaire fortement
déséquilibré : les transactions frauduleuses représentent moins de 0,2% des
données. L'enjeu est de maximiser le **rappel** (détecter un maximum de fraudes)
sans exploser le taux de fausse alerte.

## Pipeline complet

Données brutes (CSV)
│
▼
Preprocessing (normalisation, encodage, SMOTE)
│
▼
Entraînement XGBoost (validation croisée, tuning)
│
▼
API FastAPI (inférence temps réel)
│
▼
Dashboard Streamlit (monitoring, résultats)

## Stack technique

- **XGBoost** — modèle principal (gradient boosting)
- **Scikit-learn** — preprocessing, métriques, pipeline
- **SMOTE** — rééchantillonnage pour gérer le déséquilibre de classes
- **FastAPI** — API REST d'inférence
- **Streamlit** — interface de monitoring
- **Docker** — containerisation complète

## Performances

| Métrique | Valeur |
|---|---|
| Rappel | **83,63%** |
| Taux de fausse alerte | **0,023%** |
| Latence d'inférence | **< 100 ms** |

## Démo

👉 [Tester sur Hugging Face Spaces](https://huggingface.co/spaces/Hamiddorego/fraud-detection)
📂 [Code source GitHub](https://github.com/Hamiddorego/fraud-detection-ml)