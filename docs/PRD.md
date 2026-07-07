# **오늘물줘 MVP PRD**

## **1\. 프로젝트 개요**

### **서비스명**

오늘물줘

### **한 줄 설명**

초보 식집사가 인기 식물을 선택하면 기본 물주기 계획이 자동 생성되고, 오늘 물 줄 식물을 확인·기록할 수 있는 식물 물주기 관리 앱.

### **MVP 목표**

사용자가 식물을 등록하고, 다음 물주기 날짜를 확인하며, 물주기 완료 기록을 남길 수 있는 정적 웹앱을 구현한다.

### **기술 스택**

* Vite  
* React  
* TypeScript  
* Tailwind CSS  
* LocalStorage  
* GitHub Pages

### **프로젝트 문서 구조**

Cursor는 아래 문서를 함께 참조한다.

library/  
└── docs/  
    ├── PRD.md  
    ├── scr\_design.md  
    └── navigation\_design.md

### **문서별 역할**

* `PRD.md`: 제품 요구사항, 기능 범위, 데이터 구조, 핵심 로직 정의  
* `scr_design.md`: 화면 구성, UI 요소, 레이아웃 상세 정의  
* `navigation_design.md`: 페이지 이동 구조, 라우팅, 사용자 흐름 정의

---

## **2\. 핵심 사용자**

### **타겟 사용자**

대중적인 반려식물을 처음 키우는 초보 식집사.

### **사용자 상황**

사용자는 몬스테라, 스투키, 스킨답서스 등 인기 식물을 키우지만 물을 언제, 얼마나, 어떻게 줘야 하는지 잘 모른다.

### **핵심 문제**

사용자는 마지막으로 물을 준 날짜를 기억하지 못하고, 오늘 어떤 식물에 물을 줘야 하는지 판단하기 어렵다.

### **핵심 가치**

식물 선택만으로 기본 물주기 계획을 만들고, 오늘 해야 할 물주기를 놓치지 않게 한다.

---

## **3\. MVP 핵심 범위**

이번 MVP는 아래 3개 기능만 핵심 구현 범위로 한다.

1. 식물 등록 및 기본 물주기 계획 생성  
2. 홈 화면에서 물주기 상태 확인  
3. 물주기 완료 및 기록 저장

---

# **4\. Must 기능 요구사항**

## **4.1 식물 등록 및 기본 물주기 계획 생성**

### **목적**

사용자가 인기 식물 Top5 중 하나를 선택하고, 식물 별명과 마지막 물 준 날짜를 입력해 나만의 식물을 등록한다.

### **요구사항**

* 인기 식물 Top5를 제공한다.  
* 각 식물은 이름, 이미지, 기본 물주기 주기, 물주는 양, 물주는 방식, 빛 조건, 관리 팁, 주의사항을 가진다.  
* 사용자는 식물 하나를 선택할 수 있다.  
* 선택한 식물의 기본 물주기 정보가 표시되어야 한다.  
* 사용자는 식물 별명을 입력해야 한다.  
* 사용자는 마지막 물 준 날짜를 입력해야 한다.  
* 저장 시 다음 물주기 날짜를 자동 계산한다.  
* 등록된 식물은 LocalStorage에 저장한다.

### **인기 식물 Top5**

| 식물 | 이미지 파일명 | 기본 주기 | 물주는 양 | 물주는 방식 |
| ----- | ----- | ----- | ----- | ----- |
| 몬스테라 | `monstera.jpg` | 7일 | 보통 | 흙에 직접 주기 |
| 스투키 | `stuckyi.jpg` | 14일 | 적게 | 흙에 직접 주기 |
| 스킨답서스 | `scindapsus.jpg` | 7일 | 보통 | 흙에 직접 주기 |
| 산세베리아 | `sansevieria.jpg` | 14일 | 적게 | 흙에 직접 주기 |
| 행운목 | `dracaena.jpg` | 10일 | 보통 | 흙에 직접 주기 |

---

## **4.2 홈 화면에서 물주기 상태 확인**

### **목적**

사용자가 등록한 식물들의 물주기 상태를 홈 화면에서 빠르게 확인한다.

### **요구사항**

* 등록된 식물 목록을 카드 형태로 표시한다.  
* 각 식물 카드에는 식물 이미지, 별명, 식물명, 다음 물주기 날짜, 물주기 상태를 표시한다.  
* 오늘 물 줄 식물을 구분해 표시한다.  
* 물주기 예정일이 지난 식물을 지연 상태로 표시한다.  
* 등록된 식물이 없을 경우 빈 상태 안내를 표시한다.  
* 상태값은 LocalStorage에 저장하지 않고 화면 렌더링 시 계산한다.

### **상태 정의**

| 상태 | 조건 | 표시 문구 |
| ----- | ----- | ----- |
| `overdue` | 다음 물주기 날짜 \< 오늘 | 물주기 지연 |
| `today` | 다음 물주기 날짜 \= 오늘 | 오늘 물주기 |
| `upcoming` | 다음 물주기 날짜 \> 오늘 | 예정 |

---

## **4.3 물주기 완료 및 기록 저장**

### **목적**

사용자가 실제로 물을 준 뒤 완료 버튼을 눌러 기록을 남긴다.

### **요구사항**

* 식물별로 물주기 완료 버튼을 제공한다.  
* 완료 시 마지막 물 준 날짜를 오늘 날짜로 갱신한다.  
* 완료 시 물주기 기록을 추가한다.  
* 완료 시 다음 물주기 날짜를 다시 계산한다.  
* 완료 시 `updatedAt`을 현재 시각으로 갱신한다.  
* 변경된 데이터는 LocalStorage에 저장한다.

---

# **5\. Should 기능**

아래 기능은 MVP 구현에 포함하되, Must 기능보다 우선순위가 낮다.

## **5.1 식물 상세 확인**

* 식물 이미지, 별명, 식물명, 다음 물주기 날짜를 표시한다.  
* 물주기 주기, 물주는 양, 물주는 방식, 빛 조건, 관리 팁, 주의사항을 표시한다.  
* 물주기 기록 목록을 표시한다.

## **5.2 식물 삭제**

* 사용자는 등록한 식물을 삭제할 수 있다.  
* 삭제 시 LocalStorage에서 해당 식물을 제거한다.  
* 삭제 전 확인 UI는 `scr_design.md` 기준을 따른다.

---

# **6\. 제외 범위**

이번 MVP에서는 아래 기능을 구현하지 않는다.

* 로그인  
* 회원가입  
* 서버 DB  
* 백엔드 API  
* Gemini API  
* 날씨 API  
* 푸시 알림  
* 커뮤니티  
* 커머스  
* 전체 식물 도감 검색  
* IoT 센서 연동  
* 이미지 분석  
* AI 추천  
* 사용자 이미지 업로드  
* 이미지 편집  
* 계정 간 데이터 동기화

---

# **7\. 화면 범위**

화면 상세 설계는 `scr_design.md`를 기준으로 한다.  
PRD에서는 MVP에 필요한 화면 역할만 정의한다.

## **7.1 홈 화면**

### **목적**

등록된 식물과 물주기 상태를 확인한다.

### **포함 기능**

* 오늘 물 줄 식물 표시  
* 지연 식물 표시  
* 전체 식물 목록 표시  
* 식물 추가 진입 버튼  
* 물주기 완료 버튼

---

## **7.2 식물 등록 화면**

### **목적**

사용자가 식물을 선택하고 기본 물주기 계획을 저장한다.

### **포함 기능**

* 인기 식물 Top5 선택  
* 식물 이미지 표시  
* 선택한 식물의 기본 정보 표시  
* 식물 별명 입력  
* 마지막 물 준 날짜 입력  
* 저장 버튼

---

## **7.3 식물 상세 화면**

### **목적**

개별 식물의 물주기 계획과 기록을 확인한다.

### **포함 기능**

* 식물 이미지 표시  
* 식물 기본 정보 표시  
* 다음 물주기 날짜 표시  
* 관리 팁 표시  
* 주의사항 표시  
* 물주기 기록 표시  
* 물주기 완료 버튼  
* 삭제 버튼

---

# **8\. 네비게이션 범위**

네비게이션 상세 설계는 `navigation_design.md`를 기준으로 한다.  
PRD에서는 최소 라우트만 정의한다.

/                 홈 화면  
/add              식물 등록 화면  
/plants/:plantId  식물 상세 화면

---

# **9\. 이미지 데이터 설계**

## **9.1 이미지 사용 방식**

MVP에서는 사용자 이미지 업로드 기능을 구현하지 않는다.  
Top5 식물별 정적 이미지만 사용한다.

### **이미지 파일 위치**

library/  
└── public/  
    └── images/  
        └── plants/  
            ├── monstera.jpg  
            ├── stuckyi.jpg  
            ├── scindapsus.jpg  
            ├── sansevieria.jpg  
            ├── dracaena.jpg  
            └── placeholder.jpg

### **이미지 경로 규칙**

Vite 기준으로 `public` 폴더의 파일은 아래 경로로 참조한다.

/images/plants/monstera.jpg  
/images/plants/stuckyi.jpg  
/images/plants/scindapsus.jpg  
/images/plants/sansevieria.jpg  
/images/plants/dracaena.jpg  
/images/plants/placeholder.jpg

### **이미지 실패 처리**

* 이미지 로딩 실패 시 `/images/plants/placeholder.jpg`를 표시한다.  
* 이미지 `alt` 값은 `식물 별명` 또는 `식물명`으로 설정한다.

---

# **10\. 데이터 모델**

## **10.1 공통 타입**

export type WaterAmount \= '적게' | '보통' | '충분히';

export type Difficulty \= '쉬움' | '보통' | '어려움';

export type WateringStatus \= 'overdue' | 'today' | 'upcoming';

---

## **10.2 PlantPreset**

`PlantPreset`은 앱에 기본 포함되는 읽기 전용 식물 데이터다.

export type PlantPreset \= {  
  plantTypeId: string;  
  plantName: string;  
  imageUrl: string;

  defaultWateringCycle: number;  
  waterAmount: WaterAmount;  
  wateringMethod: string;

  lightCondition: string;  
  difficulty: Difficulty;  
  careTip: string;  
  caution: string;  
};

### **필드 설명**

| 필드명 | 설명 | 예시 |
| ----- | ----- | ----- |
| `plantTypeId` | 식물 유형 고유 ID | `monstera` |
| `plantName` | 식물명 | `몬스테라` |
| `imageUrl` | 식물 이미지 경로 | `/images/plants/monstera.jpg` |
| `defaultWateringCycle` | 기본 물주기 주기, 일 단위 | `7` |
| `waterAmount` | 기본 물주는 양 | `보통` |
| `wateringMethod` | 기본 물주는 방식 | `흙에 직접 주기` |
| `lightCondition` | 권장 빛 조건 | `밝은 간접광` |
| `difficulty` | 관리 난이도 | `쉬움` |
| `careTip` | 관리 팁 | `겉흙이 마르면 물을 주세요.` |
| `caution` | 주의사항 | `과습에 주의하세요.` |

---

## **10.3 UserPlant**

`UserPlant`는 사용자가 등록한 식물 데이터다.  
`PlantPreset`의 기본값과 사용자 입력값을 결합해 생성한다.

export type UserPlant \= {  
  id: string;

  plantTypeId: string;  
  plantName: string;  
  nickname: string;  
  imageUrl: string;

  wateringCycle: number;  
  waterAmount: WaterAmount;  
  wateringMethod: string;

  lightCondition: string;  
  difficulty: Difficulty;  
  careTip: string;  
  caution: string;

  lastWateredAt: string;  
  nextWateringAt: string;

  createdAt: string;  
  updatedAt: string;

  wateringLogs: WateringLog\[\];  
};

### **필드 설명**

| 필드명 | 설명 | 예시 |
| ----- | ----- | ----- |
| `id` | 사용자 등록 식물 고유 ID | `plant_abc123` |
| `plantTypeId` | 선택한 식물 유형 ID | `monstera` |
| `plantName` | 기본 식물명 | `몬스테라` |
| `nickname` | 사용자가 입력한 식물 별명 | `거실 몬스테라` |
| `imageUrl` | 식물 이미지 경로 | `/images/plants/monstera.jpg` |
| `wateringCycle` | 적용된 물주기 주기 | `7` |
| `waterAmount` | 적용된 물주는 양 | `보통` |
| `wateringMethod` | 적용된 물주는 방식 | `흙에 직접 주기` |
| `lightCondition` | 권장 빛 조건 | `밝은 간접광` |
| `difficulty` | 관리 난이도 | `쉬움` |
| `careTip` | 관리 팁 | `겉흙이 마르면 물을 주세요.` |
| `caution` | 주의사항 | `과습에 주의하세요.` |
| `lastWateredAt` | 마지막 물 준 날짜 | `2026-07-01` |
| `nextWateringAt` | 다음 물주기 날짜 | `2026-07-08` |
| `createdAt` | 등록 일시 | ISO string |
| `updatedAt` | 수정 일시 | ISO string |
| `wateringLogs` | 물주기 완료 기록 | `[]` |

---

## **10.4 WateringLog**

`WateringLog`는 사용자가 물주기 완료 버튼을 눌렀을 때 생성되는 기록이다.

export type WateringLog \= {  
  id: string;  
  wateredAt: string;  
  createdAt: string;  
};

### **필드 설명**

| 필드명 | 설명 | 예시 |
| ----- | ----- | ----- |
| `id` | 기록 고유 ID | `log_abc123` |
| `wateredAt` | 실제 물 준 날짜 | `2026-07-07` |
| `createdAt` | 기록 생성 일시 | ISO string |

---

# **11\. 목업데이터**

## **11.1 파일 위치**

src/data/plantPresets.ts

## **11.2 데이터**

import type { PlantPreset } from '../types/plant';

export const PLANT\_PRESETS: PlantPreset\[\] \= \[  
  {  
    plantTypeId: 'monstera',  
    plantName: '몬스테라',  
    imageUrl: '/images/plants/monstera.jpg',  
    defaultWateringCycle: 7,  
    waterAmount: '보통',  
    wateringMethod: '흙에 직접 주기',  
    lightCondition: '밝은 간접광',  
    difficulty: '쉬움',  
    careTip: '겉흙이 마르면 물을 주고 통풍이 잘되는 곳에 두세요.',  
    caution: '과습에 주의하세요.',  
  },  
  {  
    plantTypeId: 'stuckyi',  
    plantName: '스투키',  
    imageUrl: '/images/plants/stuckyi.jpg',  
    defaultWateringCycle: 14,  
    waterAmount: '적게',  
    wateringMethod: '흙에 직접 주기',  
    lightCondition: '밝은 곳 또는 반음지',  
    difficulty: '쉬움',  
    careTip: '흙이 충분히 마른 뒤 물을 주세요.',  
    caution: '물을 자주 주면 뿌리가 상할 수 있어요.',  
  },  
  {  
    plantTypeId: 'scindapsus',  
    plantName: '스킨답서스',  
    imageUrl: '/images/plants/scindapsus.jpg',  
    defaultWateringCycle: 7,  
    waterAmount: '보통',  
    wateringMethod: '흙에 직접 주기',  
    lightCondition: '반음지 가능',  
    difficulty: '쉬움',  
    careTip: '비교적 키우기 쉬우며 흙이 마르면 물을 주세요.',  
    caution: '직사광선은 피하는 것이 좋아요.',  
  },  
  {  
    plantTypeId: 'sansevieria',  
    plantName: '산세베리아',  
    imageUrl: '/images/plants/sansevieria.jpg',  
    defaultWateringCycle: 14,  
    waterAmount: '적게',  
    wateringMethod: '흙에 직접 주기',  
    lightCondition: '밝은 곳 또는 반음지',  
    difficulty: '쉬움',  
    careTip: '건조에 강하므로 물을 자주 주지 마세요.',  
    caution: '과습에 매우 약해요.',  
  },  
  {  
    plantTypeId: 'dracaena',  
    plantName: '행운목',  
    imageUrl: '/images/plants/dracaena.jpg',  
    defaultWateringCycle: 10,  
    waterAmount: '보통',  
    wateringMethod: '흙에 직접 주기',  
    lightCondition: '밝은 간접광',  
    difficulty: '보통',  
    careTip: '흙이 마르면 물을 주고 잎 끝 마름에 주의하세요.',  
    caution: '찬바람을 피해주세요.',  
  },  
\];

---

# **12\. LocalStorage 설계**

## **12.1 Storage Key**

export const STORAGE\_KEY \= 'today-water-plants';

## **12.2 저장 타입**

export type AppStorage \= {  
  version: 1;  
  plants: UserPlant\[\];  
};

## **12.3 기본값**

export const DEFAULT\_STORAGE: AppStorage \= {  
  version: 1,  
  plants: \[\],  
};

## **12.4 저장 예시**

{  
  "version": 1,  
  "plants": \[  
    {  
      "id": "plant\_abc123",  
      "plantTypeId": "monstera",  
      "plantName": "몬스테라",  
      "nickname": "거실 몬스테라",  
      "imageUrl": "/images/plants/monstera.jpg",  
      "wateringCycle": 7,  
      "waterAmount": "보통",  
      "wateringMethod": "흙에 직접 주기",  
      "lightCondition": "밝은 간접광",  
      "difficulty": "쉬움",  
      "careTip": "겉흙이 마르면 물을 주고 통풍이 잘되는 곳에 두세요.",  
      "caution": "과습에 주의하세요.",  
      "lastWateredAt": "2026-07-01",  
      "nextWateringAt": "2026-07-08",  
      "createdAt": "2026-07-07T10:00:00.000Z",  
      "updatedAt": "2026-07-07T10:00:00.000Z",  
      "wateringLogs": \[\]  
    }  
  \]  
}

## **12.5 LocalStorage 요구사항**

* 앱 시작 시 LocalStorage에서 데이터를 불러온다.  
* 저장된 데이터가 없으면 `DEFAULT_STORAGE`를 사용한다.  
* JSON 파싱 실패 시 `DEFAULT_STORAGE`로 복구한다.  
* `version`이 없거나 맞지 않으면 `DEFAULT_STORAGE`로 복구한다.  
* 식물 등록, 물주기 완료, 삭제 시 LocalStorage를 갱신한다.

---

# **13\. 날짜 규칙**

## **13.1 날짜 형식 구분**

| 필드 | 형식 | 용도 |
| ----- | ----- | ----- |
| `lastWateredAt` | `YYYY-MM-DD` | 마지막 물 준 날짜 |
| `nextWateringAt` | `YYYY-MM-DD` | 다음 물주기 날짜 |
| `wateredAt` | `YYYY-MM-DD` | 물주기 기록 날짜 |
| `createdAt` | ISO string | 데이터 생성 시각 |
| `updatedAt` | ISO string | 데이터 수정 시각 |

## **13.2 날짜 처리 규칙**

* 날짜 비교와 계산에 쓰는 값은 `YYYY-MM-DD` 형식을 사용한다.  
* 생성/수정 시각은 ISO string을 사용한다.  
* 오늘 날짜는 사용자의 브라우저 로컬 날짜 기준으로 계산한다.  
* `YYYY-MM-DD` 문자열 비교가 가능하도록 항상 두 자리 월/일 형식을 유지한다.

---

# **14\. 핵심 로직**

## **14.1 ID 생성**

export function createId(prefix: string): string {  
  if (typeof crypto \!== 'undefined' && crypto.randomUUID) {  
    return \`${prefix}\_${crypto.randomUUID()}\`;  
  }

  return \`${prefix}\_${Date.now()}\_${Math.random().toString(36).slice(2)}\`;  
}

---

## **14.2 오늘 날짜 문자열 생성**

export function getTodayDateString(): string {  
  // 브라우저 로컬 날짜 기준으로 YYYY-MM-DD 형식 반환  
}

---

## **14.3 다음 물주기 날짜 계산**

export function calculateNextWateringDate(  
  lastWateredAt: string,  
  wateringCycle: number  
): string {  
  // lastWateredAt에 wateringCycle 일수를 더해 YYYY-MM-DD 형식으로 반환  
}

### **규칙**

* `lastWateredAt`은 `YYYY-MM-DD` 형식이다.  
* `wateringCycle`은 일 단위 숫자다.  
* 반환값은 `YYYY-MM-DD` 형식이다.

---

## **14.4 물주기 상태 계산**

export function getWateringStatus(nextWateringAt: string): WateringStatus {  
  const today \= getTodayDateString();

  if (nextWateringAt \< today) return 'overdue';  
  if (nextWateringAt \=== today) return 'today';  
  return 'upcoming';  
}

### **중요**

`WateringStatus`는 LocalStorage에 저장하지 않는다.  
상태는 날짜에 따라 매일 달라지므로 화면 렌더링 시 계산한다.

---

## **14.5 식물 등록 데이터 생성**

export function createUserPlant(params: {  
  preset: PlantPreset;  
  nickname: string;  
  lastWateredAt: string;  
}): UserPlant {  
  const now \= new Date().toISOString();

  return {  
    id: createId('plant'),

    plantTypeId: params.preset.plantTypeId,  
    plantName: params.preset.plantName,  
    nickname: params.nickname,  
    imageUrl: params.preset.imageUrl,

    wateringCycle: params.preset.defaultWateringCycle,  
    waterAmount: params.preset.waterAmount,  
    wateringMethod: params.preset.wateringMethod,

    lightCondition: params.preset.lightCondition,  
    difficulty: params.preset.difficulty,  
    careTip: params.preset.careTip,  
    caution: params.preset.caution,

    lastWateredAt: params.lastWateredAt,  
    nextWateringAt: calculateNextWateringDate(  
      params.lastWateredAt,  
      params.preset.defaultWateringCycle  
    ),

    createdAt: now,  
    updatedAt: now,

    wateringLogs: \[\],  
  };  
}

---

## **14.6 물주기 완료 처리**

export function completeWatering(plant: UserPlant): UserPlant {  
  const today \= getTodayDateString();  
  const now \= new Date().toISOString();

  return {  
    ...plant,  
    lastWateredAt: today,  
    nextWateringAt: calculateNextWateringDate(today, plant.wateringCycle),  
    updatedAt: now,  
    wateringLogs: \[  
      {  
        id: createId('log'),  
        wateredAt: today,  
        createdAt: now,  
      },  
      ...plant.wateringLogs,  
    \],  
  };  
}

---

# **15\. 입력값 검증**

## **15.1 식물 등록 검증**

| 상황 | 조건 | 메시지 |
| ----- | ----- | ----- |
| 식물 미선택 | 선택된 `PlantPreset` 없음 | 식물을 선택해주세요. |
| 별명 미입력 | `nickname.trim()`이 빈 값 | 식물 별명을 입력해주세요. |
| 날짜 미입력 | `lastWateredAt` 없음 | 마지막 물 준 날짜를 입력해주세요. |
| 미래 날짜 입력 | `lastWateredAt > today` | 마지막 물 준 날짜는 오늘 이후일 수 없어요. |

---

# **16\. 저장하지 않아야 하는 값**

아래 값은 LocalStorage에 저장하지 않는다.

WateringStatus  
todayLabel  
isOverdue  
isToday  
daysUntilWatering

이 값들은 현재 날짜에 따라 달라지므로 화면에서 계산한다.

---

# **17\. 완료 기준**

MVP 구현은 아래 조건을 모두 만족해야 한다.

* `npm run dev`로 실행 가능하다.  
* 홈 화면이 표시된다.  
* 식물 등록 화면으로 이동할 수 있다.  
* 인기 식물 Top5 중 하나를 선택할 수 있다.  
* 식물 이미지가 표시된다.  
* 이미지 로딩 실패 시 placeholder 이미지가 표시된다.  
* 별명과 마지막 물 준 날짜를 입력해 식물을 저장할 수 있다.  
* 저장된 식물이 홈 화면에 표시된다.  
* 저장된 식물 데이터가 LocalStorage에 유지된다.  
* 다음 물주기 날짜가 자동 계산된다.  
* 오늘, 지연, 예정 상태가 구분된다.  
* 물주기 상태는 저장값이 아니라 계산값으로 표시된다.  
* 물주기 완료 버튼을 누르면 기록이 추가된다.  
* 물주기 완료 후 다음 물주기 날짜가 갱신된다.  
* 새로고침 후에도 데이터가 유지된다.  
* 식물 상세 화면에서 기본 정보와 기록을 확인할 수 있다.  
* 식물을 삭제할 수 있다.  
* GitHub Pages에 배포 가능한 정적 앱 구조다.

---

# **18\. 구현 시 주의사항**

* PRD에 없는 기능을 임의로 추가하지 않는다.  
* 외부 API를 사용하지 않는다.  
* AI 기능을 구현하지 않는다.  
* 로그인과 서버 저장소를 구현하지 않는다.  
* 사용자 이미지 업로드를 구현하지 않는다.  
* Tailwind CSS로 모바일 우선 UI를 구현한다.  
* 날짜 비교는 `YYYY-MM-DD` 형식을 유지한 상태에서 처리한다.  
* 화면 UI 상세는 `scr_design.md`를 따른다.  
* 페이지 이동 구조는 `navigation_design.md`를 따른다.  
* 코드가 길어질 경우 컴포넌트와 유틸로 분리한다.  
* 확장 기능은 구현하지 말고 필요한 경우 TODO 주석으로만 남긴다.

---

# **19\. 권장 폴더 구조**

library/  
├── docs/  
│   ├── PRD.md  
│   ├── scr\_design.md  
│   └── navigation\_design.md  
├── public/  
│   └── images/  
│       └── plants/  
│           ├── monstera.jpg  
│           ├── stuckyi.jpg  
│           ├── scindapsus.jpg  
│           ├── sansevieria.jpg  
│           ├── dracaena.jpg  
│           └── placeholder.jpg  
├── src/  
│   ├── main.tsx  
│   ├── App.tsx  
│   ├── types/  
│   │   └── plant.ts  
│   ├── data/  
│   │   └── plantPresets.ts  
│   ├── utils/  
│   │   ├── date.ts  
│   │   ├── id.ts  
│   │   └── storage.ts  
│   ├── components/  
│   │   ├── EmptyState.tsx  
│   │   ├── PlantCard.tsx  
│   │   ├── PlantImage.tsx  
│   │   ├── PlantPresetCard.tsx  
│   │   └── StatusBadge.tsx  
│   ├── pages/  
│   │   ├── HomePage.tsx  
│   │   ├── AddPlantPage.tsx  
│   │   └── PlantDetailPage.tsx  
│   └── styles/  
│       └── index.css  
└── package.json

---

# **20\. Cursor 구현 지시 요약**

Cursor는 이 PRD와 `scr_design.md`, `navigation_design.md`를 기준으로 MVP를 구현한다.

## **구현 범위**

1. 식물 등록 및 기본 물주기 계획 생성  
2. 홈 화면 물주기 상태 확인  
3. 물주기 완료 및 기록 저장  
4. 식물 상세 확인  
5. 식물 삭제  
6. 정적 식물 이미지 표시  
7. LocalStorage 저장 및 복구

## **구현 금지**

* 로그인  
* 서버  
* DB  
* API  
* AI  
* 알림  
* 커뮤니티  
* 식물 검색  
* 이미지 분석  
* 사용자 이미지 업로드  
* 날씨 연동

## **최우선 원칙**

작동하는 MVP를 먼저 만든다.  
확장 기능은 TODO 주석으로만 남기고 구현하지 않는다.