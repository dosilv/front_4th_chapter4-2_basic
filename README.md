# 바닐라 JS 프로젝트 성능 개선

-   url: https://d2tu72bsyzf5r5.cloudfront.net/

## 성능 개선 보고서

#### 1. 개선 이유

-   웹 폰트 로딩 지연으로 인한 텍스트 가시성 확보 문제 발생
-   큰 용량의 이미지를 대량으로 로딩하여 레이아웃 시프트, 긴 LCP 발생

#### 2. 개선 방법

(1) 웹 폰트 최적화

-   `<link rel="preload">`를 사용하여 중요 폰트를 일찍 로드
-   `font-display: swap;` 속성으로 폰트 로드 중 텍스트 가시성 확보
-   폰트 서브셋을 통한 폴백 폰트 추가

(2) 이미지 최적화

-   `sharp` 라이브러리를 이용한 WebP 이미지 변환
-   레이아웃 시프트 방지를 위해 로딩 전 이미지 공간 확보
-   `<img loading="lazy">` 속성을 통한 지연 로딩 구현

(3) 리플로우 개선

-   경량 컨테이너인 `DocumentFragment`로 모든 요소를 메모리에서 구성
-   이후 한 번에 DOM에 추가하여 리플로우/리페인트 횟수 최소화

#### 3. 개선 후 향상된 지표

-   최적화 전
    https://pagespeed.web.dev/analysis/https-d2tu72bsyzf5r5-cloudfront-net/c7vw1gj6j2?form_factor=desktop

-   폰트 최적화 후
    https://pagespeed.web.dev/analysis/https-d2tu72bsyzf5r5-cloudfront-net/yymag7fzlz?form_factor=desktop

-   폰트 + 이미지 최적화 후
    https://pagespeed.web.dev/analysis/https-d2tu72bsyzf5r5-cloudfront-net/j1imqzawpw?form_factor=desktop

-   폰트 + 이미지 + 리플로우 개선 후
    https://pagespeed.web.dev/analysis/https-d2tu72bsyzf5r5-cloudfront-net/9zg9lc0m82?form_factor=desktop

측정 결과 요약

| 카테고리       | 최적화 전 | + 폰트 최적화 후 | + 이미지 최적화 후 | + 리플로우 개선 후 |
| -------------- | --------- | ---------------- | ------------------ | ------------------ |
| Performance    | 71 🟠     | 87 🟠            | 94 🟢              | 99 🟢              |
| Accessibility  | 82 🟠     | 89 🟠            | 91 🟢              | 91 🟢              |
| Best Practices | 96 🟢     | 96 🟢            | 96 🟢              | 96 🟢              |
| SEO            | 82 🟠     | 82 🟠            | 91 🟢              | 91 🟢              |

#### 4. 기타 고려 사항

-   앱 사이즈가 증가할 경우 코드 스플리팅을 통한 로딩 최적화 고려
-   페이지가 많아질 경우 각 페이지별 동적 임포트 고려
