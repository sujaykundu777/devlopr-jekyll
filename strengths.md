---
layout: page
title: Strengths
permalink: /strengths/
---

## Strengths

### 데이터 엔지니어로서 제가 가장 중요하게 생각하는 강점입니다

엔드투엔드 데이터 파이프라인을 직접 설계·운영하며,  
대규모 트래픽 환경에서도 **안정성 · 확장성 · 운영성**을 함께 고려한  
데이터 시스템을 만들어왔습니다.

<!-- Strengths Summary Badges -->
<div class="strengths-badges">
  <span class="badge badge-pill badge-reliability">Reliability</span>
  <span class="badge badge-pill badge-scalability">Scalability</span>
  <span class="badge badge-pill badge-operability">Operability</span>
</div>


---

## 결과에 끝까지 책임지는 엔지니어

단순히 파이프라인을 “구현하는 것”이 아니라,  
**장애 상황에서도 계속 동작하는 구조를 만드는 것**을 가장 중요하게 생각합니다.

- Kafka–Logstash–S3/Elasticsearch 기반 엔드투엔드 로그 파이프라인 설계·운영
- 장애 발생 시 원인 분석 → 구조 개선 → 재발 방지까지 책임
- “돌아가는 코드”보다 **“계속 돌아가는 시스템”**을 우선하는 관점

{% include related_projects.html strength="결과에 끝까지 책임" %}

---

## 대규모 로그 환경을 구조로 해결

대규모 로그 환경의 문제는  
개별 튜닝이 아니라 **구조적인 분리와 역할 정의**로 해결해야 한다고 생각합니다.

- 단일 저장소 중심 구조를 목적별 저장소(S3 / ES / MongoDB)로 분리
- 실시간 처리와 배치 분석 워크로드를 분리해 안정성과 효율 동시 확보
- 데이터 증가 시에도 구조 변경 없이 확장 가능한 설계

{% include related_projects.html strength="대규모 로그를 구조로 해결" %}

---

## 운영과 협업을 고려한 설계

데이터 시스템은 개발자만을 위한 것이 아니라,  
**조직 전체가 활용할 수 있어야 가치가 있다고 생각합니다.**

- 기획·운영팀을 위한 Metabase 기반 데이터 조회 환경 구축
- 공통 지표 테이블 설계로 반복적인 통계 페이지 개발 제거
- 데이터 접근 권한과 사용성을 함께 고려한 구조 설계

{% include related_projects.html strength="운영/협업을 고려한 설계" %}
