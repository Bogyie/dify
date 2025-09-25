# Dify 프로젝트 커스터마이징 가이드

## 프로젝트 개요

Dify는 LLM 애플리케이션 개발을 위한 오픈소스 플랫폼으로, 마이크로서비스 아키텍처를 기반으로 구성되어 있습니다.

### 핵심 구성 요소
- **API 서버** (Python/Flask): 백엔드 비즈니스 로직
- **웹 프론트엔드** (Next.js/React): 사용자 인터페이스
- **워커 서비스** (Celery): 비동기 작업 처리
- **데이터베이스** (PostgreSQL): 메인 데이터 저장소
- **캐시** (Redis): 세션 및 임시 데이터
- **벡터 데이터베이스**: 임베딩 저장 (Weaviate, Qdrant 등)

## 프로젝트 구조

### 1. API 서버 (`/api`)

```
api/
├── configs/           # 설정 관리
├── controllers/       # API 엔드포인트
├── core/             # 핵심 비즈니스 로직
├── models/           # 데이터베이스 모델
├── services/         # 비즈니스 서비스 레이어
├── extensions/       # Flask 확장
├── tasks/            # Celery 작업
└── migrations/       # 데이터베이스 마이그레이션
```

#### 주요 커스터마이징 포인트

**1. 설정 관리 (`configs/`)**
- `app_config.py`: 메인 설정 클래스
- `feature/`: 기능별 설정
- `middleware/`: 미들웨어 설정
- `deploy/`: 배포 환경 설정

**2. API 컨트롤러 (`controllers/`)**
- `console/`: 관리자 콘솔 API
- `web/`: 웹 애플리케이션 API
- `service_api/`: 서비스 API
- `files/`: 파일 업로드/다운로드

**3. 핵심 로직 (`core/`)**
- `app/`: 애플리케이션 엔진
- `agent/`: AI 에이전트 로직
- `workflow/`: 워크플로우 엔진
- `rag/`: RAG 파이프라인
- `model_runtime/`: LLM 모델 런타임

**4. 서비스 레이어 (`services/`)**
- `app_service.py`: 앱 관리
- `dataset_service.py`: 데이터셋 관리
- `workflow_service.py`: 워크플로우 관리

### 2. 웹 프론트엔드 (`/web`)

```
web/
├── app/              # Next.js 앱 라우터
├── components/       # React 컴포넌트
├── service/          # API 클라이언트
├── context/          # React 컨텍스트
├── hooks/            # 커스텀 훅
├── i18n/            # 다국어 지원
└── utils/           # 유틸리티 함수
```

#### 주요 커스터마이징 포인트

**1. 컴포넌트 구조**
- `app/components/`: 공통 컴포넌트
- 페이지별 컴포넌트는 `app/` 하위 디렉토리에 위치

**2. API 클라이언트 (`service/`)**
- 백엔드 API와의 통신 로직
- 각 도메인별로 분리된 서비스 파일

**3. 상태 관리**
- React Context API 사용
- Zustand를 통한 전역 상태 관리

## 커스터마이징 시나리오별 가이드

### 1. 새로운 API 엔드포인트 추가

**백엔드 (API)**
1. `controllers/` 하위에 새 컨트롤러 추가
2. `services/` 하위에 비즈니스 로직 구현
3. 필요시 `models/` 하위에 새 모델 추가
4. `extensions/ext_blueprints.py`에 라우트 등록

**프론트엔드 (Web)**
1. `service/` 하위에 API 클라이언트 함수 추가
2. 필요한 컴포넌트에서 API 호출
3. 타입 정의는 `types/` 하위에 추가

### 2. 새로운 LLM 모델 프로바이더 추가

**위치**: `api/core/model_runtime/model_providers/`

1. 새 프로바이더 디렉토리 생성
2. 모델 클래스 구현 (LLM, 임베딩, 리랭킹 등)
3. 프로바이더 설정 YAML 파일 작성
4. 테스트 케이스 추가

### 3. 새로운 워크플로우 노드 타입 추가

**위치**: `api/core/workflow/nodes/`

1. 새 노드 클래스 구현
2. 노드 설정 스키마 정의
3. 프론트엔드 노드 컴포넌트 추가
4. 노드 팩토리에 등록

### 4. 커스텀 도구(Tool) 추가

**위치**: `api/core/tools/provider/builtin/`

1. 새 도구 프로바이더 디렉토리 생성
2. 도구 클래스 구현
3. 도구 설정 YAML 파일 작성
4. 아이콘 및 문서 추가

### 5. UI 테마 및 브랜딩 커스터마이징

**위치**: `web/`

1. `tailwind.config.js`: 색상 팔레트 수정
2. `themes/`: 다크/라이트 테마 설정
3. `public/logo/`: 로고 파일 교체
4. `app/components/base/`: 기본 컴포넌트 스타일 수정

## 환경 설정 및 배포

### 1. 환경 변수 설정

**주요 설정 파일**
- `docker/.env.example`: Docker 환경 변수 템플릿
- `api/.env.example`: API 서버 환경 변수
- `web/.env.example`: 웹 프론트엔드 환경 변수

**핵심 설정 항목**
- 데이터베이스 연결 정보
- Redis 설정
- 벡터 데이터베이스 설정
- LLM API 키 및 엔드포인트
- 파일 저장소 설정

### 2. Docker 배포

**구성 파일**
- `docker/docker-compose.yaml`: 메인 서비스 정의
- `docker/docker-compose.middleware.yaml`: 미들웨어 서비스
- `api/Dockerfile`: API 서버 이미지
- `web/Dockerfile`: 웹 프론트엔드 이미지

### 3. 데이터베이스 마이그레이션

```bash
# 마이그레이션 생성
flask db migrate -m "migration message"

# 마이그레이션 적용
flask db upgrade
```

## 개발 환경 설정

### 1. API 서버 개발

```bash
cd api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```

### 2. 웹 프론트엔드 개발

```bash
cd web
pnpm install
pnpm dev
```

### 3. 워커 서비스 개발

```bash
cd api
celery -A celery_entrypoint.celery worker -l info
```

## 보안 고려사항

### 1. API 보안
- JWT 토큰 기반 인증
- CORS 설정 관리
- API 레이트 리미팅
- 입력 데이터 검증

### 2. 데이터 보안
- 데이터베이스 암호화
- 파일 업로드 검증
- 민감 정보 마스킹
- 감사 로그 기록

### 3. 네트워크 보안
- HTTPS 강제 사용
- SSRF 방지 프록시
- 내부 네트워크 격리

## 성능 최적화

### 1. 데이터베이스 최적화
- 인덱스 최적화
- 쿼리 성능 모니터링
- 커넥션 풀 설정

### 2. 캐싱 전략
- Redis 캐싱 활용
- API 응답 캐싱
- 정적 파일 CDN 사용

### 3. 스케일링
- 수평 확장 설계
- 로드 밸런싱
- 마이크로서비스 분리

## 모니터링 및 로깅

### 1. 로깅 설정
- 구조화된 로그 포맷
- 로그 레벨 관리
- 중앙화된 로그 수집

### 2. 메트릭 수집
- 애플리케이션 메트릭
- 시스템 리소스 모니터링
- 사용자 행동 분석

### 3. 알림 설정
- 에러 알림
- 성능 임계값 알림
- 시스템 상태 모니터링

## 테스트 전략

### 1. 단위 테스트
- API 엔드포인트 테스트
- 서비스 로직 테스트
- 컴포넌트 테스트

### 2. 통합 테스트
- 데이터베이스 연동 테스트
- 외부 API 연동 테스트
- 워크플로우 테스트

### 3. E2E 테스트
- 사용자 시나리오 테스트
- 브라우저 자동화 테스트

## 문제 해결 가이드

### 1. 일반적인 문제
- 데이터베이스 연결 오류
- Redis 연결 문제
- LLM API 호출 실패
- 파일 업로드 오류

### 2. 디버깅 도구
- Flask 디버그 모드
- 브라우저 개발자 도구
- 로그 분석 도구
- 성능 프로파일링

### 3. 커뮤니티 지원
- GitHub Issues
- Discord 커뮤니티
- 공식 문서
- 기술 블로그

---

이 가이드는 Dify 프로젝트의 커스터마이징을 위한 기본 참고 자료입니다. 
구체적인 요구사항에 따라 세부 구현 방법이 달라질 수 있으므로, 
실제 개발 시에는 공식 문서와 소스 코드를 함께 참조하시기 바랍니다.