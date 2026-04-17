---
layout: post
title: "Système RAG Multi-Agent : architecture et déploiement"
author: hamiddorego
categories: [IA, NLP, MLOps]
tags: [RAG, LangChain, FAISS, FastAPI, Docker, LLM]
image: assets/img/rag.png
description: "Comment j'ai conçu et déployé un système RAG multi-agents avec LangChain, FAISS et Meta-Llama-3-8B, accessible en production sur Hugging Face Spaces."
---

## Contexte

La génération augmentée par récupération (RAG) permet à un LLM de répondre à des
questions en s'appuyant sur une base documentaire externe, sans hallucination.
J'ai poussé ce principe plus loin en construisant une **architecture multi-agents**
où chaque agent a un rôle précis : récupération, raisonnement, synthèse.

## Architecture

Question utilisateur
│
▼
Agent Retriever (FAISS + fastembed)
│ top-k chunks
▼
Agent Reasoner (Meta-Llama-3-8B via Hugging Face)
│ contexte enrichi
▼
Agent Synthesizer → Réponse finale

## Stack technique

- **LangChain** — orchestration des agents et des chaînes de traitement
- **FAISS** — index vectoriel pour la recherche sémantique
- **fastembed** — embeddings légers et rapides
- **Meta-Llama-3-8B** — modèle de génération via Hugging Face Inference API
- **FastAPI** — exposition de l'API REST
- **Docker** — containerisation du service
- **Hugging Face Spaces** — déploiement public

## Résultats

- Latence end-to-end **< 3 secondes**
- Déployé et accessible publiquement
- Architecture extensible (ajout d'agents possible sans refonte)

## Démo

👉 [Tester sur Hugging Face Spaces](https://huggingface.co/spaces/Hamiddorego/agent-ia-rag-rh)
📂 [Code source GitHub](https://github.com/Hamiddorego/agent-ia-rag)