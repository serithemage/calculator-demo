# Project Tasks & Roadmap

## Phase 1: Project Initialization 🛠️
- [ ] **Project Setup**
    - [ ] Initialize Vite project (React + TypeScript)
    - [ ] Cleanup default boilerplate code
    - [ ] Configure `tsconfig.json` (Path aliases `@/*`)
- [ ] **Dependencies & Tools**
    - [ ] Install Core: `mathjs`
    - [ ] Install Styling: `tailwindcss`, `postcss`, `autoprefixer`, `@tailwindcss/forms`
    - [ ] Install Testing: `vitest`, `jsdom` (Unit testing only)
    - [ ] Configure ESLint & Prettier with strict rules
- [ ] **CI/CD Ops**
    - [ ] Create simple "Hello World" test to verify Vitest
    - [ ] Verify GitHub Actions workflow execution
    - [ ] Confirm GitHub Pages deployment success

## Phase 2: Core Logic Implementation (TDD) 🧠
> **Rule**: Red (Fail Test) → Green (Pass) → Refactor.
> **Target**: 100% Coverage for `src/utils/*.ts`

### 2.1 Calculator Engine (`src/utils/calculator.ts`)
- [ ] **Basic Arithmetic**
    - [ ] Test & Implement: Addition & Subtraction (`+`, `-`)
    - [ ] Test & Implement: Multiplication & Division (`*`, `/`)
    - [ ] Test & Implement: Modulo (`%`)
- [ ] **Scientific Functions**
    - [ ] Test & Implement: Trigonometric (`sin`, `cos`, `tan`)
    - [ ] Test & Implement: Logarithmic (`log`, `ln`)
    - [ ] Test & Implement: Power & Root (`^`, `sqrt`)
    - [ ] Test & Implement: Inverse (`1/x`)
    - [ ] Test & Implement: Constants (`pi`, `e`)
- [ ] **Angle Modes**
    - [ ] Test & Implement: DEG mode calculation
    - [ ] Test & Implement: RAD mode calculation
- [ ] **Error & Edge Cases**
    - [ ] Test & Implement: Division by zero handling
    - [ ] Test & Implement: Floating point precision handling (rounding)

### 2.2 Input Validator (`src/utils/validator.ts`)
- [ ] **Input Constraints**
    - [ ] Test & Implement: Prevent multiple decimal points in one number
    - [ ] Test & Implement: Prevent consecutive operators (e.g., `++`, `*/`)
    - [ ] Test & Implement: Max input length check (optional)
- [ ] **Expression Validation**
    - [ ] Test & Implement: Parenthesis balancing check
    - [ ] Test & Implement: Check for empty or invalid start/end of expression

### 2.3 Formatter (`src/utils/formatter.ts`)
- [ ] **Number Formatting**
    - [ ] Test & Implement: Thousands separator (e.g., `1,234`)
    - [ ] Test & Implement: Decimal precision limitation (max 10 digits)
    - [ ] Test & Implement: Scientific notation for very large/small numbers
- [ ] **Expression Formatting**
    - [ ] Test & Implement: UI Symbol conversion (`*` -> `×`, `/` -> `÷`)

## Phase 3: UI Component Implementation 🎨
> **Focus**: Visual fidelity to design & Component reusability

- [ ] **Design System**
    - [ ] Setup Tailwind Config (Colors, Fonts, Shadows)
    - [ ] Implement `src/styles/globals.css` (Fonts, Resets)
    - [ ] Create `Layout/Container` component
- [ ] **Atomic Components**
    - [ ] Implement `Buttons/NumberButton`
    - [ ] Implement `Buttons/OperatorButton`
    - [ ] Implement `Buttons/FunctionButton`
    - [ ] Implement `Buttons/SpecialButton` (AC, Equals)
    - [ ] Implement `UI/AngleToggle`
    - [ ] Implement `UI/IconButton` (Backspace)
- [ ] **Composite Components**
    - [ ] Implement `Calculator/Display` (Result & Expression)
    - [ ] Implement `Calculator/Controls` (Grid Layout)
    - [ ] Implement `Calculator/Header`
    - [ ] Implement `Calculator/Calculator` (Main Container)

## Phase 4: Feature Integration & State 🧩
> **Focus**: Connecting Logic to UI via Hooks

- [ ] **State Logic (`useCalculator` Hook)**
    - [ ] Implement: `handleNumberInput` (Append numbers)
    - [ ] Implement: `handleOperatorInput` (Chaining calculations)
    - [ ] Implement: `handleFunctionInput` (Immediate execution vs Expression append)
    - [ ] Implement: `handleBackspace` & `handleClear`
    - [ ] Implement: `toggleAngleMode` state
    - [ ] Implement: `handleEquals` (Trigger evaluation)
- [ ] **Integration**
    - [ ] Connect `Controls` events to `useCalculator`
    - [ ] Connect `Display` props to `useCalculator` state
    - [ ] Verify Keyboard support (via `useKeyboard` hook)

## Phase 5: Quality Assurance & Launch 🚀

- [ ] **Manual Verification**
    - [ ] Unit Test Run (Final check for Core Logic)
    - [ ] Manual Check: `useCalculator` + Components interaction
    - [ ] Manual Check: Full user calculation flows
- [ ] **Polish**
    - [ ] Verify Dark/Light mode switching
    - [ ] Check Mobile responsiveness
    - [ ] Accessibility Audit (Tab nav, Aria labels)
- [ ] **Documentation**
    - [ ] Write Usage Guide in README
