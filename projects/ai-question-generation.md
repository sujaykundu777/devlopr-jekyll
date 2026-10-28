---
layout: project
title: AI 문제 생성
project_id: ai-question-generation
permalink: /projects/ai-question-generation/
published: false # 초안: 내용을 다 채운 뒤 이 줄을 지우면 사이트에 공개됩니다
---

{% comment %}
  작성 가이드 (이 주석은 사이트에 출력되지 않습니다)
  - 위쪽의 제목·한 줄 요약·회사·기간·역할·상태·태그는 _data/projects.yml 의 id: ai-question-generation 항목에서 가져옵니다.
  - 회사 내부 시스템 이름, 내부 링크, 매출 같은 기밀은 빼고 공개 가능한 수준으로 일반화해서 적어 주세요.
  - 진행 중인 프로젝트라 결과 숫자 대신 목표·설계·현재까지 진행 상황 위주로 쓰고, 끝나면 결과를 추가하면 됩니다.
  - 그림은 assets/img/projects/ai-question-generation/ 폴더에 아래 파일 이름으로 넣으면 자동으로 표시됩니다.
    파일이 없으면 로컬 미리보기에서만 점선 상자로 자리가 보이고, 배포 사이트에서는 숨겨집니다.
{% endcomment %}

## 개요

{% comment %} 어떤 문제(과목·학년 등 공개 가능한 수준)를 생성하는지, 프로젝트 목표, 그중 데이터 엔지니어로서 맡은 범위 {% endcomment %}
TODO: 프로젝트 배경과 목표

## 문제와 요구사항

{% comment %} 예: 문항 품질 기준, 처리량·비용, 검수 프로세스, 저작권·개인정보 같은 제약 {% endcomment %}
- TODO: 해결하려는 문제
- TODO: 요구사항과 제약 조건

## 설계

{% include project_figure.html src="/assets/img/projects/ai-question-generation/architecture.png" caption="AI 문제 생성 파이프라인" %}

{% comment %} 예: 원천 데이터 수집 → 전처리 → 생성 요청 → 품질 검증 → 저장·서빙, 각 단계의 역할 {% endcomment %}
TODO: 파이프라인 단계와 각 구성 요소의 역할

### 주요 설계 결정

| 결정 | 검토한 대안 | 선택 이유 |
| --- | --- | --- |
| TODO | TODO | TODO |
{: .table }

## 품질 관리

{% include project_figure.html src="/assets/img/projects/ai-question-generation/quality-flow.png" caption="생성 문항 검증·검수 흐름" %}

{% comment %} 생성된 문항을 어떻게 검증하는지: 자동 검증(형식·정답·중복 등)과 사람 검수 흐름, 품질 지표 {% endcomment %}
TODO: 검증 방법과 품질 기준

## 인프라

{% include project_figure.html src="/assets/img/projects/ai-question-generation/infrastructure.png" caption="인프라 구성도" %}

{% comment %} 사용한 클라우드 서비스, 배치·스케줄링, 모델 호출 방식, 비용 관리, 모니터링 {% endcomment %}
TODO: 인프라 구성과 운영 방식

## 구현

{% comment %} 직접 구현한 것 위주로: 데이터 전처리, 생성 파이프라인, 검증 자동화, 저장·서빙 등 {% endcomment %}
- TODO: 주요 구현 내용

## 진행 상황

- **완료**: TODO
- **진행 중**: TODO
- **예정**: TODO

## 결과와 배운 점

{% comment %} 프로젝트가 끝나면: Before → After 숫자, 운영하며 겪은 문제와 해결, 다음에 다르게 할 점 {% endcomment %}
TODO: 프로젝트 완료 후 작성
