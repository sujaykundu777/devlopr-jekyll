---
layout: project
title: LRS 구축
project_id: lrs
permalink: /projects/lrs/
published: false # 초안: 내용을 다 채운 뒤 이 줄을 지우면 사이트에 공개됩니다
---

{% comment %}
  작성 가이드 (이 주석은 사이트에 출력되지 않습니다)
  - 위쪽의 제목·한 줄 요약·회사·기간·역할·상태·태그는 _data/projects.yml 의 id: lrs 항목에서 가져옵니다.
  - 회사 내부 시스템 이름, 내부 링크, 매출 같은 기밀은 빼고 공개 가능한 수준으로 일반화해서 적어 주세요.
  - 진행 중인 프로젝트라 결과 숫자 대신 목표·설계·현재까지 진행 상황 위주로 쓰고, 끝나면 결과를 추가하면 됩니다.
  - 그림은 assets/img/projects/lrs/ 폴더에 아래 파일 이름으로 넣으면 자동으로 표시됩니다.
    파일이 없으면 로컬 미리보기에서만 점선 상자로 자리가 보이고, 배포 사이트에서는 숨겨집니다.
{% endcomment %}

## 개요

{% comment %} 어떤 서비스의 학습 기록을 모으는지, 왜 필요한지, 프로젝트 목표를 2~3문장으로 {% endcomment %}
TODO: 프로젝트 배경과 목표

## 문제와 요구사항

{% comment %} 기존 방식의 문제, 꼭 만족해야 하는 조건 (예: 데이터 규모, 지연 시간, 표준 규격(xAPI 등), 개인정보 처리) {% endcomment %}
- TODO: 해결하려는 문제
- TODO: 요구사항과 제약 조건

## 설계

{% include project_figure.html src="/assets/img/projects/lrs/architecture.png" caption="LRS 아키텍처 (수집 → 저장 → 활용)" %}

{% comment %} 그림의 데이터 흐름을 단계별로: 학습 이벤트가 어디서 발생해 어떤 경로로 저장되고 어디에 쓰이는지 {% endcomment %}
TODO: 데이터 흐름과 각 구성 요소의 역할

### 데이터 모델

{% include project_figure.html src="/assets/img/projects/lrs/data-model.png" caption="학습 기록 데이터 모델" %}

{% comment %} 학습 기록 스키마(누가·무엇을·어떻게 했는지), 저장 단위, 파티션·보관 정책 등 {% endcomment %}
TODO: 스키마와 저장 구조

### 주요 설계 결정

| 결정 | 검토한 대안 | 선택 이유 |
| --- | --- | --- |
| TODO | TODO | TODO |
{: .table }

## 인프라

{% include project_figure.html src="/assets/img/projects/lrs/infrastructure.png" caption="인프라 구성도" %}

{% comment %} 사용한 클라우드 서비스·서버 구성, 배포 방식(CI/CD), 모니터링·알림, 확장 방법 {% endcomment %}
TODO: 인프라 구성과 운영 방식

## 구현

{% comment %} 직접 구현한 것 위주로: 수집 API, 적재·변환 파이프라인, 중복·순서 처리, 개인정보 처리 등 {% endcomment %}
- TODO: 주요 구현 내용

## 진행 상황

- **완료**: TODO
- **진행 중**: TODO
- **예정**: TODO

## 결과와 배운 점

{% comment %} 프로젝트가 끝나면: Before → After 숫자, 운영하며 겪은 문제와 해결, 다음에 다르게 할 점 {% endcomment %}
TODO: 프로젝트 완료 후 작성
