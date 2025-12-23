# Technical Specification Document
# Scientific Calculator Web Application

## 문서 정보
- **프로젝트명**: Scientific Calculator
- **버전**: 1.0
- **작성일**: 2025-12-23
- **작성자**: Engineering Team
- **작성자**: Engineering Team
- **개발 원칙**: TDD (Test-Driven Development), SOLID 원칙 준수
- **관련 문서**: [PRD.md](./PRD.md), [Project Rules](./PROJECT_RULES.md)

---

## 목차
1. [기술 스택](#1-기술-스택)
2. [아키텍처 설계](#2-아키텍처-설계)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [핵심 컴포넌트 설계](#4-핵심-컴포넌트-설계)
5. [상태 관리](#5-상태-관리)
6. [계산 엔진](#6-계산-엔진)
7. [UI 컴포넌트](#7-ui-컴포넌트)
8. [스타일링 시스템](#8-스타일링-시스템)
9. [테스트 전략](#9-테스트-전략)
10. [빌드 및 배포](#10-빌드-및-배포)
11. [성능 최적화](#11-성능-최적화)
12. [보안 고려사항](#12-보안-고려사항)

---

## 1. 기술 스택

### 1.1 Core Technologies

#### Frontend Framework
```json
{
  "framework": "React",
  "version": "^18.3.0",
  "language": "TypeScript",
  "typescript-version": "^5.6.0"
}
```

**선택 이유**:
- ✅ 컴포넌트 기반 아키텍처로 재사용성 극대화
- ✅ TypeScript로 타입 안정성 확보
- ✅ 풍부한 생태계 및 커뮤니티 지원
- ✅ React Hooks로 상태 관리 단순화

#### Build Tool
```json
{
  "tool": "Vite",
  "version": "^6.0.0"
}
```

**선택 이유**:
- ⚡ 빠른 개발 서버 시작 (Cold Start < 1s)
- ⚡ HMR (Hot Module Replacement) 지원
- 📦 최적화된 프로덕션 빌드
- 🔧 간단한 설정

### 1.2 Styling

#### CSS Framework
```json
{
  "framework": "Tailwind CSS",
  "version": "^3.4.0",
  "plugins": ["@tailwindcss/forms"]
}
```

**커스텀 설정**:
```javascript
// tailwind.config.js
{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#136dec',
        'background-light': '#f6f7f8',
        'background-dark': '#101822',
        'surface-dark': '#1b2531',
        'surface-dark-hover': '#25303e'
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif']
      }
    }
  }
}
```

### 1.3 Mathematics Library

#### Math.js
```json
{
  "library": "mathjs",
  "version": "^13.0.0"
}
```

**사용 기능**:
- 수식 파싱 및 평가
- 삼각함수 (sin, cos, tan)
- 로그 함수 (ln, log)
- 고급 연산 (제곱근, 거듭제곱)
- 각도 단위 변환 (DEG/RAD)

### 1.4 Development Tools

```json
{
  "linting": "ESLint ^9.0.0",
  "formatting": "Prettier ^3.0.0",
  "testing": {
    "unit": "Vitest ^2.0.0"
  },
  "git-hooks": "husky ^9.0.0",
  "commit-lint": "@commitlint/cli ^19.0.0"
}
```

### 1.5 Deployment

```json
{
  "platform": "GitHub Pages",
  "ci-cd": "GitHub Actions"
}
```

---

## 2. 아키텍처 설계

### 2.1 개발 원칙

#### TDD (Test-Driven Development)
- **코어 로직**(UI 제외)은 반드시 TDD 방식으로 개발한다.
- **Cycle**: 실패하는 테스트 작성(Red) → 테스트 통과 코드 작성(Green) → 리팩토링(Refactor)
- **목표**: 코어 로직 테스트 커버리지 100%

#### SOLID 원칙 준수
1. **S (SRP)**: 기능별로 클래스/함수 분리 (Calculator, Formatter, Validator 등).
2. **O (OCP)**: 새로운 연산 및 함수 추가 시 기존 코드 수정을 최소화하도록 설계.
3. **L (LSP)**: 인터페이스와 구체 클래스 간의 타입 일관성 유지.
4. **I (ISP)**: 클라이언트가 필요한 메서드만 포함된 작은 인터페이스 사용.
5. **D (DIP)**: 의존성 주입(Dependency Injection)을 통한 결합도 완화.

### 2.2 전체 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Header     │  │   Display    │  │   Controls   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   State Management                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  useCalculator Hook (Custom Hook)                │  │
│  │  - currentValue                                   │  │
│  │  - expression                                     │  │
│  │  - history                                        │  │
│  │  - angleMode (DEG/RAD)                           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Business Logic                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Calculator  │  │   Formatter  │  │   Validator  │  │
│  │   Engine     │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   External Libraries                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Math.js (수식 평가 및 수학 함수)                │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 2.2 데이터 플로우

```
User Input (Button Click)
    │
    ▼
Event Handler
    │
    ▼
State Update (useCalculator)
    │
    ├─→ Expression Builder
    │       │
    │       ▼
    │   Validator
    │       │
    │       ▼
    │   Calculator Engine (Math.js)
    │       │
    │       ▼
    │   Result
    │
    ▼
UI Re-render
    │
    ├─→ Display Component (Result)
    ├─→ Expression Component (Input)
    └─→ History Component (Optional)
```

---

## 3. 프로젝트 구조

```
calculator-demo/
├── public/
│   ├── favicon.ico
│   └── fonts/
│       ├── space-grotesk/
│       └── noto-sans/
├── src/
│   ├── components/
│   │   ├── Calculator/
│   │   │   ├── Calculator.tsx          # 메인 컨테이너
│   │   │   ├── Display.tsx             # 결과 표시
│   │   │   ├── Expression.tsx          # 수식 표시
│   │   │   ├── Controls.tsx            # 버튼 컨테이너
│   │   │   ├── Header.tsx              # 헤더 (모드, 히스토리)
│   │   │   └── index.ts
│   │   ├── Buttons/
│   │   │   ├── NumberButton.tsx        # 숫자 버튼
│   │   │   ├── OperatorButton.tsx      # 연산자 버튼
│   │   │   ├── FunctionButton.tsx      # 함수 버튼
│   │   │   ├── SpecialButton.tsx       # AC, = 등
│   │   │   └── index.ts
│   │   ├── UI/
│   │   │   ├── AngleToggle.tsx         # DEG/RAD 토글
│   │   │   ├── IconButton.tsx          # 아이콘 버튼
│   │   │   ├── Modal.tsx               # 히스토리 모달
│   │   │   └── index.ts
│   │   └── Layout/
│   │       ├── Container.tsx           # 레이아웃 컨테이너
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useCalculator.ts            # 계산기 상태 관리
│   │   ├── useHistory.ts               # 히스토리 관리
│   │   ├── useKeyboard.ts              # 키보드 입력
│   │   └── index.ts
│   ├── utils/
│   │   ├── calculator.ts               # 계산 로직
│   │   ├── formatter.ts                # 숫자 포맷팅
│   │   ├── validator.ts                # 입력 검증
│   │   ├── constants.ts                # 상수 정의
│   │   └── index.ts
│   ├── types/
│   │   ├── calculator.ts               # 타입 정의
│   │   └── index.ts
│   ├── styles/
│   │   ├── globals.css                 # 전역 스타일
│   │   └── tailwind.css                # Tailwind 진입점
│   ├── App.tsx                         # 루트 컴포넌트
│   ├── main.tsx                        # 진입점
│   └── vite-env.d.ts
├── tests/
│   ├── unit/
│   │   ├── calculator.test.ts
│   │   ├── formatter.test.ts
│   │   └── validator.test.ts
│   ├── integration/
│   │   └── Calculator.test.tsx
│   └── e2e/
│       └── calculator.spec.ts
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docs/
│   ├── PRD.md
│   ├── TechSpec.md
│   └── API.md
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## 4. 핵심 컴포넌트 설계

### 4.1 Calculator (메인 컨테이너)

```typescript
// src/components/Calculator/Calculator.tsx
import React from 'react';
import { useCalculator } from '@/hooks/useCalculator';
import { Header } from './Header';
import { Display } from './Display';
import { Expression } from './Expression';
import { Controls } from './Controls';

export const Calculator: React.FC = () => {
  const {
    currentValue,
    expression,
    angleMode,
    handleNumberInput,
    handleOperatorInput,
    handleFunctionInput,
    handleEquals,
    handleClear,
    handleBackspace,
    toggleAngleMode,
  } = useCalculator();

  return (
    <div className="relative flex h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-hidden bg-background-light dark:bg-background-dark">
      <Header 
        mode="Standard" 
        onHistoryClick={() => {/* TODO */}}
      />
      
      <div className="flex-1 flex flex-col justify-end items-end px-6 pb-6 w-full relative z-0">
        <Expression value={expression} />
        <Display value={currentValue} />
      </div>

      <Controls
        angleMode={angleMode}
        onAngleModeToggle={toggleAngleMode}
        onNumberClick={handleNumberInput}
        onOperatorClick={handleOperatorInput}
        onFunctionClick={handleFunctionInput}
        onEqualsClick={handleEquals}
        onClearClick={handleClear}
        onBackspaceClick={handleBackspace}
      />
    </div>
  );
};
```

### 4.2 Display (결과 표시)

```typescript
// src/components/Calculator/Display.tsx
import React from 'react';
import { formatNumber } from '@/utils/formatter';

interface DisplayProps {
  value: string | number;
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  const formattedValue = formatNumber(value);

  return (
    <div 
      className="text-right w-full break-all text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white"
      role="status"
      aria-live="polite"
      aria-label={`Current result: ${formattedValue}`}
    >
      {formattedValue}
    </div>
  );
};
```

### 4.3 Controls (버튼 컨테이너)

```typescript
// src/components/Calculator/Controls.tsx
import React from 'react';
import { AngleToggle } from '@/components/UI/AngleToggle';
import { IconButton } from '@/components/UI/IconButton';
import { NumberButton } from '@/components/Buttons/NumberButton';
import { OperatorButton } from '@/components/Buttons/OperatorButton';
import { FunctionButton } from '@/components/Buttons/FunctionButton';
import { SpecialButton } from '@/components/Buttons/SpecialButton';
import { AngleMode } from '@/types/calculator';

interface ControlsProps {
  angleMode: AngleMode;
  onAngleModeToggle: () => void;
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: string) => void;
  onFunctionClick: (fn: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onBackspaceClick: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  angleMode,
  onAngleModeToggle,
  onNumberClick,
  onOperatorClick,
  onFunctionClick,
  onEqualsClick,
  onClearClick,
  onBackspaceClick,
}) => {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6 bg-background-light dark:bg-background-dark rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-10">
      {/* Tools Row */}
      <div className="flex justify-between items-center py-2 pt-4">
        <AngleToggle mode={angleMode} onToggle={onAngleModeToggle} />
        <IconButton icon="backspace" onClick={onBackspaceClick} />
      </div>

      {/* Scientific Functions Grid */}
      <div className="grid grid-cols-5 gap-2.5">
        <FunctionButton label="sin" onClick={() => onFunctionClick('sin')} />
        <FunctionButton label="cos" onClick={() => onFunctionClick('cos')} />
        <FunctionButton label="tan" onClick={() => onFunctionClick('tan')} />
        <FunctionButton label="π" onClick={() => onFunctionClick('pi')} />
        <FunctionButton label="e" onClick={() => onFunctionClick('e')} />
        
        <FunctionButton label="ln" onClick={() => onFunctionClick('ln')} />
        <FunctionButton label="log" onClick={() => onFunctionClick('log')} />
        <FunctionButton label="1/x" onClick={() => onFunctionClick('1/x')} />
        <FunctionButton label="√" onClick={() => onFunctionClick('sqrt')} />
        <FunctionButton label="^" onClick={() => onFunctionClick('^')} />
      </div>

      {/* Separator */}
      <div className="h-px bg-slate-200 dark:bg-white/5 w-full my-1" />

      {/* Main Keypad */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <SpecialButton label="AC" variant="clear" onClick={onClearClick} />
        <OperatorButton label="( )" onClick={() => onOperatorClick('()')} />
        <OperatorButton label="%" onClick={() => onOperatorClick('%')} />
        <OperatorButton label="÷" onClick={() => onOperatorClick('/')} />

        {/* Row 2 */}
        <NumberButton label="7" onClick={() => onNumberClick('7')} />
        <NumberButton label="8" onClick={() => onNumberClick('8')} />
        <NumberButton label="9" onClick={() => onNumberClick('9')} />
        <OperatorButton label="×" onClick={() => onOperatorClick('*')} />

        {/* Row 3 */}
        <NumberButton label="4" onClick={() => onNumberClick('4')} />
        <NumberButton label="5" onClick={() => onNumberClick('5')} />
        <NumberButton label="6" onClick={() => onNumberClick('6')} />
        <OperatorButton label="−" onClick={() => onOperatorClick('-')} />

        {/* Row 4 */}
        <NumberButton label="1" onClick={() => onNumberClick('1')} />
        <NumberButton label="2" onClick={() => onNumberClick('2')} />
        <NumberButton label="3" onClick={() => onNumberClick('3')} />
        <OperatorButton label="+" onClick={() => onOperatorClick('+')} />

        {/* Row 5 */}
        <NumberButton label="0" onClick={() => onNumberClick('0')} />
        <NumberButton label="." onClick={() => onNumberClick('.')} />
        <SpecialButton 
          label="=" 
          variant="equals" 
          onClick={onEqualsClick}
          className="col-span-2"
        />
      </div>
    </div>
  );
};
```

---

## 5. 상태 관리

### 5.1 useCalculator Hook

```typescript
// src/hooks/useCalculator.ts
import { useState, useCallback } from 'react';
import { evaluate, formatExpression } from '@/utils/calculator';
import { AngleMode, CalculatorState } from '@/types/calculator';

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    expression: '',
    previousValue: null,
    operator: null,
    angleMode: 'DEG',
    shouldResetDisplay: false,
  });

  const handleNumberInput = useCallback((num: string) => {
    setState((prev) => {
      if (prev.shouldResetDisplay) {
        return {
          ...prev,
          currentValue: num,
          shouldResetDisplay: false,
        };
      }

      const newValue = prev.currentValue === '0' && num !== '.' 
        ? num 
        : prev.currentValue + num;

      return {
        ...prev,
        currentValue: newValue,
        expression: prev.expression + num,
      };
    });
  }, []);

  const handleOperatorInput = useCallback((op: string) => {
    setState((prev) => ({
      ...prev,
      operator: op,
      previousValue: prev.currentValue,
      expression: prev.expression + ` ${op} `,
      shouldResetDisplay: true,
    }));
  }, []);

  const handleFunctionInput = useCallback((fn: string) => {
    setState((prev) => {
      const newExpression = `${fn}(${prev.currentValue})`;
      const result = evaluate(newExpression, prev.angleMode);
      
      return {
        ...prev,
        currentValue: result,
        expression: prev.expression + fn,
        shouldResetDisplay: true,
      };
    });
  }, []);

  const handleEquals = useCallback(() => {
    setState((prev) => {
      try {
        const result = evaluate(prev.expression, prev.angleMode);
        return {
          ...prev,
          currentValue: result,
          expression: '',
          shouldResetDisplay: true,
        };
      } catch (error) {
        return {
          ...prev,
          currentValue: 'Error',
          shouldResetDisplay: true,
        };
      }
    });
  }, []);

  const handleClear = useCallback(() => {
    setState({
      currentValue: '0',
      expression: '',
      previousValue: null,
      operator: null,
      angleMode: state.angleMode,
      shouldResetDisplay: false,
    });
  }, [state.angleMode]);

  const handleBackspace = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentValue: prev.currentValue.slice(0, -1) || '0',
      expression: prev.expression.slice(0, -1),
    }));
  }, []);

  const toggleAngleMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      angleMode: prev.angleMode === 'DEG' ? 'RAD' : 'DEG',
    }));
  }, []);

  return {
    currentValue: state.currentValue,
    expression: state.expression,
    angleMode: state.angleMode,
    handleNumberInput,
    handleOperatorInput,
    handleFunctionInput,
    handleEquals,
    handleClear,
    handleBackspace,
    toggleAngleMode,
  };
};
```

---

## 6. 계산 엔진

### 6.1 Calculator Utility

```typescript
// src/utils/calculator.ts
import { create, all } from 'mathjs';
import { AngleMode } from '@/types/calculator';

const math = create(all);

/**
 * 수식을 평가하여 결과를 반환
 * @param expression - 계산할 수식
 * @param angleMode - 각도 단위 (DEG 또는 RAD)
 * @returns 계산 결과 (문자열)
 */
export const evaluate = (expression: string, angleMode: AngleMode): string => {
  try {
    // 각도 단위 설정
    if (angleMode === 'DEG') {
      math.config({ angles: 'deg' });
    } else {
      math.config({ angles: 'rad' });
    }

    // 수식 전처리
    const processedExpression = preprocessExpression(expression);

    // 계산 실행
    const result = math.evaluate(processedExpression);

    // 결과 포맷팅
    return formatResult(result);
  } catch (error) {
    throw new Error('Invalid expression');
  }
};

/**
 * 수식 전처리 (UI 표기 → Math.js 표기)
 */
const preprocessExpression = (expr: string): string => {
  return expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/\^/g, '^')
    .replace(/1\/x/g, '1/')
    .replace(/\(\)/g, ''); // 빈 괄호 제거
};

/**
 * 결과 포맷팅
 */
const formatResult = (result: number | string): string => {
  if (typeof result === 'string') return result;
  
  // 매우 큰 수나 작은 수는 지수 표기
  if (Math.abs(result) > 1e10 || (Math.abs(result) < 1e-10 && result !== 0)) {
    return result.toExponential(6);
  }

  // 소수점 10자리까지 표시
  return parseFloat(result.toFixed(10)).toString();
};
```

### 6.2 Formatter Utility

```typescript
// src/utils/formatter.ts

/**
 * 숫자를 천 단위 구분 기호와 함께 포맷팅
 * @param value - 포맷팅할 값
 * @returns 포맷팅된 문자열
 */
export const formatNumber = (value: string | number): string => {
  const strValue = String(value);

  // 에러 메시지는 그대로 반환
  if (strValue === 'Error' || strValue === 'Infinity' || strValue === '-Infinity') {
    return strValue;
  }

  // 숫자가 아닌 경우 그대로 반환
  if (isNaN(Number(strValue))) {
    return strValue;
  }

  const [integer, decimal] = strValue.split('.');
  
  // 천 단위 구분 기호 추가
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

/**
 * 수식을 사용자 친화적으로 포맷팅
 */
export const formatExpression = (expr: string): string => {
  return expr
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/-/g, '−')
    .replace(/pi/g, 'π');
};
```

### 6.3 Validator Utility

```typescript
// src/utils/validator.ts

/**
 * 입력 검증
 */
export const validateInput = (
  currentValue: string,
  input: string
): boolean => {
  // 소수점 중복 방지
  if (input === '.' && currentValue.includes('.')) {
    return false;
  }

  // 연산자 중복 방지
  const operators = ['+', '-', '*', '/', '%'];
  const lastChar = currentValue.slice(-1);
  if (operators.includes(input) && operators.includes(lastChar)) {
    return false;
  }

  return true;
};

/**
 * 수식 유효성 검증
 */
export const validateExpression = (expr: string): boolean => {
  // 괄호 균형 확인
  const openCount = (expr.match(/\(/g) || []).length;
  const closeCount = (expr.match(/\)/g) || []).length;
  
  if (openCount !== closeCount) {
    return false;
  }

  // 빈 수식
  if (expr.trim() === '') {
    return false;
  }

  return true;
};
```

---

## 7. UI 컴포넌트

### 7.1 Button Components

```typescript
// src/components/Buttons/NumberButton.tsx
import React from 'react';

interface NumberButtonProps {
  label: string;
  onClick: () => void;
}

export const NumberButton: React.FC<NumberButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-16 rounded-2xl bg-white dark:bg-[#25303e] text-2xl font-semibold shadow-sm hover:brightness-110 transition-all active:scale-95"
      aria-label={`Number ${label}`}
    >
      {label}
    </button>
  );
};
```

```typescript
// src/components/Buttons/OperatorButton.tsx
import React from 'react';

interface OperatorButtonProps {
  label: string;
  onClick: () => void;
}

export const OperatorButton: React.FC<OperatorButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-16 rounded-2xl bg-slate-200 dark:bg-surface-dark text-primary text-2xl font-bold hover:brightness-110 transition-all active:scale-95"
      aria-label={`Operator ${label}`}
    >
      {label}
    </button>
  );
};
```

```typescript
// src/components/Buttons/FunctionButton.tsx
import React from 'react';

interface FunctionButtonProps {
  label: string;
  onClick: () => void;
}

export const FunctionButton: React.FC<FunctionButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-10 rounded-lg bg-slate-200 dark:bg-surface-dark hover:bg-slate-300 dark:hover:bg-surface-dark-hover text-sm font-medium transition-colors active:scale-95"
      aria-label={`Function ${label}`}
    >
      {label}
    </button>
  );
};
```

### 7.2 AngleToggle Component

```typescript
// src/components/UI/AngleToggle.tsx
import React from 'react';
import { AngleMode } from '@/types/calculator';

interface AngleToggleProps {
  mode: AngleMode;
  onToggle: () => void;
}

export const AngleToggle: React.FC<AngleToggleProps> = ({ mode, onToggle }) => {
  return (
    <div className="flex bg-slate-200 dark:bg-surface-dark p-1 rounded-lg">
      <label className={`cursor-pointer relative z-10 px-3 py-1.5 rounded-md transition-all duration-200 ${
        mode === 'DEG' 
          ? 'bg-white dark:bg-[#2c3b4e] text-primary shadow-sm' 
          : 'text-slate-500 dark:text-slate-400'
      }`}>
        <span className="text-xs font-bold">DEG</span>
        <input
          type="radio"
          name="angle-mode"
          value="DEG"
          checked={mode === 'DEG'}
          onChange={onToggle}
          className="hidden"
        />
      </label>
      
      <label className={`cursor-pointer relative z-10 px-3 py-1.5 rounded-md transition-all duration-200 ${
        mode === 'RAD' 
          ? 'bg-white dark:bg-[#2c3b4e] text-primary shadow-sm' 
          : 'text-slate-500 dark:text-slate-400'
      }`}>
        <span className="text-xs font-bold">RAD</span>
        <input
          type="radio"
          name="angle-mode"
          value="RAD"
          checked={mode === 'RAD'}
          onChange={onToggle}
          className="hidden"
        />
      </label>
    </div>
  );
};
```

---

## 8. 스타일링 시스템

### 8.1 Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#136dec',
        'background-light': '#f6f7f8',
        'background-dark': '#101822',
        'surface-dark': '#1b2531',
        'surface-dark-hover': '#25303e',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### 8.2 Global Styles

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Font Face Declarations */
  @font-face {
    font-family: 'Space Grotesk';
    src: url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap');
  }

  @font-face {
    font-family: 'Noto Sans';
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap');
  }

  /* Body Styles */
  body {
    @apply font-display;
    min-height: max(884px, 100dvh);
  }

  /* Custom Scrollbar Hide */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

@layer components {
  /* Button Press Effect */
  button:active {
    transform: scale(0.96);
    transition: transform 0.1s;
  }
}
```

---

## 9. 테스트 전략

### 9.1 Unit Tests

```typescript
// tests/unit/calculator.test.ts
import { describe, it, expect } from 'vitest';
import { evaluate } from '@/utils/calculator';

describe('Calculator Engine', () => {
  describe('Basic Operations', () => {
    it('should add two numbers', () => {
      expect(evaluate('2 + 3', 'DEG')).toBe('5');
    });

    it('should subtract two numbers', () => {
      expect(evaluate('5 - 3', 'DEG')).toBe('2');
    });

    it('should multiply two numbers', () => {
      expect(evaluate('4 × 3', 'DEG')).toBe('12');
    });

    it('should divide two numbers', () => {
      expect(evaluate('10 ÷ 2', 'DEG')).toBe('5');
    });
  });

  describe('Scientific Functions', () => {
    it('should calculate sin(30) in DEG mode', () => {
      const result = evaluate('sin(30)', 'DEG');
      expect(parseFloat(result)).toBeCloseTo(0.5, 5);
    });

    it('should calculate cos(0) in RAD mode', () => {
      expect(evaluate('cos(0)', 'RAD')).toBe('1');
    });

    it('should calculate square root', () => {
      expect(evaluate('√16', 'DEG')).toBe('4');
    });

    it('should calculate power', () => {
      expect(evaluate('2^3', 'DEG')).toBe('8');
    });
  });

  describe('Error Handling', () => {
    it('should throw error for division by zero', () => {
      expect(() => evaluate('1 ÷ 0', 'DEG')).toThrow();
    });

    it('should throw error for invalid expression', () => {
      expect(() => evaluate('2 + + 3', 'DEG')).toThrow();
    });
  });
});
```

### 9.2 UI & E2E Verification
- **UI Components**: Manual verification via Storybook or Browser (No automation).
- **E2E Flows**: Manual verification of critical user journeys.

### 9.3 Test Coverage Goals

| Category | Target Coverage |
|----------|----------------|
| Core Logic Unit Tests | 100% |
| UI Components | 0% (Manual) |
| Overall | N/A |

---

## 10. 빌드 및 배포

### 10.1 Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'math-vendor': ['mathjs'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
```

### 10.2 GitHub Actions CI/CD (GitHub Pages)

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 10.3 Package Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:unit": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "prepare": "husky install"
  }
}
```

---

## 11. 성능 최적화

### 11.1 Code Splitting

```typescript
// Lazy loading for future features
import { lazy, Suspense } from 'react';

const History = lazy(() => import('@/components/History'));

// Usage
<Suspense fallback={<div>Loading...</div>}>
  <History />
</Suspense>
```

### 11.2 Memoization

```typescript
// Memoize expensive calculations
import { useMemo, useCallback } from 'react';

const formattedValue = useMemo(
  () => formatNumber(currentValue),
  [currentValue]
);

const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### 11.3 Performance Metrics

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Time to Interactive (TTI) | < 3.0s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Total Bundle Size | < 200KB | Vite Bundle Analyzer |

---

## 12. 보안 고려사항

### 12.1 Input Sanitization

```typescript
// Prevent XSS attacks
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>\"']/g, '');
};
```

### 12.2 CSP Headers

```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
        }
      ]
    }
  ]
}
```

### 12.3 Dependency Security

```bash
# Regular security audits
npm audit
npm audit fix

# Use Dependabot for automated updates
```

---

## 13. 모니터링 및 로깅

### 13.1 Error Tracking

```typescript
// src/utils/errorTracking.ts
export const logError = (error: Error, context?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service (e.g., Sentry)
    console.error('Error:', error, context);
  } else {
    console.error('Error:', error, context);
  }
};
```

### 13.2 Analytics

```typescript
// Track user interactions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service (e.g., Vercel Analytics)
    console.log('Event:', eventName, properties);
  }
};
```

---

## 14. 개발 워크플로우

### 14.1 Git Workflow

```
main (production)
  ↑
develop (staging)
  ↑
feature/calculator-engine
feature/ui-components
bugfix/display-formatting
```

### 14.2 Commit Convention

```
feat: Add scientific function buttons
fix: Correct angle mode calculation
docs: Update API documentation
style: Format code with Prettier
refactor: Simplify calculator logic
test: Add unit tests for formatter
chore: Update dependencies
```

### 14.3 Code Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Accessibility requirements met
- [ ] Performance impact assessed
- [ ] Documentation updated

---

## 15. 향후 기술 개선

### 15.1 Phase 2 Enhancements

- **PWA Support**: Service Worker, Offline mode
- **Web Workers**: Heavy calculations in background
- **IndexedDB**: Persistent history storage

### 15.2 Phase 3 Enhancements

- **WebAssembly**: Ultra-fast calculations
- **Canvas/WebGL**: Graph visualization
- **Web Share API**: Share calculations

---

## 부록

### A. Type Definitions

```typescript
// src/types/calculator.ts
export type AngleMode = 'DEG' | 'RAD';

export type Operator = '+' | '-' | '*' | '/' | '%' | '^';

export type ScientificFunction = 
  | 'sin' | 'cos' | 'tan' 
  | 'ln' | 'log' 
  | 'sqrt' | '1/x';

export interface CalculatorState {
  currentValue: string;
  expression: string;
  previousValue: string | null;
  operator: Operator | null;
  angleMode: AngleMode;
  shouldResetDisplay: boolean;
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}
```

### B. Environment Variables

```bash
# .env.example
VITE_APP_NAME=Scientific Calculator
VITE_APP_VERSION=1.0.0
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

### C. Browser Support Matrix

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| iOS Safari | 14+ | ✅ Full |
| Chrome Mobile | 90+ | ✅ Full |

---

## 문서 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0 | 2025-12-23 | 초안 작성 | Engineering Team |

---

**End of Technical Specification Document**
