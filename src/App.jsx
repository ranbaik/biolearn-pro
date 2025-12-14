import React, { useState, useEffect } from 'react';
import { 
  Book, ChevronRight, CheckCircle, XCircle, RefreshCw, Menu, ArrowLeft, 
  Brain, Activity, Heart, Shield, Database, Zap, Baby, Star, BookOpen, 
  Award, TrendingUp, Bookmark, Search, Filter, Clock, Target, Lightbulb,
  BarChart3, Users, Sparkles, Play, Pause, RotateCcw, Eye, EyeOff
} from 'lucide-react';

const EnhancedBioLearningApp = () => {
  // 기본 상태
  const [currentScreen, setCurrentScreen] = useState('menu'); // menu, quiz, result, study, progress
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  
  // 새로운 학습 기능 상태
  const [studyMode, setStudyMode] = useState(false); // 학습 모드 vs 퀴즈 모드
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(new Set());
  const [reviewMode, setReviewMode] = useState(false); // 오답 노트
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showHints, setShowHints] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(3);
  const [totalScore, setTotalScore] = useState(0);

  // 퀴즈 데이터 (난이도 추가)
  const quizData = [
  {
  id: 'intro',
  title: '생명과학의 기초',
  sub: 'Chapter 1',
  icon: <Sparkles className="w-6 h-6" />,
  color: 'from-blue-500 to-cyan-500',
  questions: [
    {
      id: 1,
      question: "생명체가 가지는 공통적인 특징이 아닌 것은?",
      options: ["물질대사", "생장과 발생", "자극에 대한 반응", "무한한 수명"],
      correctIndex: 3,
      difficulty: 'easy',
      hint: "모든 생명체는 결국 죽음을 맞이합니다.",
      rationale: "모든 생명체는 유한한 수명을 가지며, 결국 죽음을 맞이합니다. 물질대사, 생장과 발생, 자극에 대한 반응은 생명체의 기본 특징입니다.",
      studyContent: "생명의 특성에는 7가지가 있습니다: (1) 세포로 구성 (2) 물질대사를 통한 에너지 획득 (3) 항상성 유지 (4) 생장과 발생 (5) 생식을 통한 유전 (6) 자극에 대한 반응 (7) 환경에 대한 적응과 진화. 이러한 특성들이 모두 있어야 생명체로 간주됩니다.",
      relatedTopics: ["생명의 특성", "항상성", "물질대사"]
    },
    {
      id: 2,
      question: "생물의 분류 체계에서 가장 작은 단위는?",
      options: ["속(Genus)", "종(Species)", "과(Family)", "문(Phylum)"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "생물학적으로 교배 가능한 개체군의 단위입니다.",
      rationale: "종(Species)은 생물 분류의 기본 단위이며, 자연 상태에서 교배하여 생식 능력이 있는 자손을 낳을 수 있는 개체군을 의미합니다.",
      studyContent: "린네의 이명법(Binomial nomenclature)은 속명과 종소명으로 생물의 학명을 표기합니다. 예를 들어, 사람은 Homo sapiens(호모 사피엔스)입니다. 분류 계층은 역-계-문-강-목-과-속-종 순서이며, 종이 가장 구체적인 단위입니다.",
      relatedTopics: ["분류학", "이명법", "생물다양성"]
    },
    {
      id: 3,
      question: "과학적 방법의 올바른 순서는?",
      options: [
        "관찰 → 가설 설정 → 실험 → 결론",
        "실험 → 관찰 → 가설 → 결론",
        "가설 → 관찰 → 실험 → 결론",
        "결론 → 가설 → 실험 → 관찰"
      ],
      correctIndex: 0,
      difficulty: 'medium',
      hint: "먼저 현상을 관찰하고, 예측을 세운 후 검증합니다.",
      rationale: "과학적 방법은 관찰을 통해 문제를 인식하고, 가설을 세우고, 실험을 통해 검증한 후, 결론을 도출하는 순서로 진행됩니다.",
      studyContent: "과학적 방법은 체계적인 탐구 과정입니다: (1) 관찰과 질문 (2) 가설 설정 (예측 가능한 설명) (3) 실험 설계 (대조군과 실험군 설정) (4) 데이터 수집 및 분석 (5) 결론 도출 (6) 결과 공유 및 재현. 가설은 검증 가능해야 하며, 실험은 통제된 조건에서 이루어져야 합니다.",
      relatedTopics: ["과학적 사고", "가설", "대조 실험"]
    },
    {
      id: 4,
      question: "항상성(Homeostasis)에 대한 설명으로 옳은 것은?",
      options: [
        "외부 환경과 동일한 상태를 유지하는 것",
        "내부 환경을 일정하게 유지하려는 성질",
        "외부 자극을 완전히 차단하는 것",
        "체온을 항상 낮게 유지하는 것"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "몸의 '내부' 환경을 안정적으로 유지하는 것입니다.",
      rationale: "항상성은 외부 환경이 변해도 생명체의 내부 환경을 일정하게 유지하려는 생명의 특성입니다.",
      studyContent: "항상성은 체온, 혈당, pH, 삼투압 등을 일정 범위로 유지하는 능력입니다. 음성 피드백(negative feedback) 메커니즘이 주로 작용하며, 예를 들어 체온이 오르면 땀을 흘려 체온을 낮추고, 체온이 내려가면 떨림을 통해 열을 생산합니다. 항상성 실패는 질병으로 이어질 수 있습니다.",
      relatedTopics: ["음성 피드백", "체온 조절", "혈당 조절"]
    },
    {
      id: 5,
      question: "생명체의 구조와 기능의 관계를 가장 잘 설명한 것은?",
      options: [
        "구조는 기능과 무관하다",
        "구조가 기능을 결정한다",
        "기능이 먼저 생기고 구조가 따라간다",
        "구조와 기능은 별개로 진화한다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "'형태는 기능을 따른다'는 생물학의 중요한 원리입니다.",
      rationale: "생물학에서는 구조가 기능을 결정한다는 원리가 적용됩니다. 예를 들어, 새의 날개 구조는 비행 기능에 적합하게 설계되어 있습니다.",
      studyContent: "구조-기능 관계는 생물학의 핵심 원리입니다. 분자 수준(효소의 활성 부위), 세포 수준(적혈구의 오목한 원반 형태), 기관 수준(폐포의 넓은 표면적), 개체 수준(치타의 유선형 몸체)에서 모두 관찰됩니다. 진화 과정에서 특정 기능에 최적화된 구조가 선택됩니다.",
      relatedTopics: ["적응", "진화", "자연선택"]
    },
    {
      id: 6,
      question: "세포 이론(Cell Theory)의 내용이 아닌 것은?",
      options: [
        "모든 생물은 하나 이상의 세포로 구성된다",
        "세포는 생명의 기본 단위이다",
        "모든 세포는 기존의 세포로부터 생긴다",
        "모든 세포는 동일한 크기를 가진다"
      ],
      correctIndex: 3,
      difficulty: 'easy',
      hint: "세포의 크기는 매우 다양합니다.",
      rationale: "세포 이론은 (1) 모든 생물은 세포로 구성 (2) 세포는 생명의 기본 단위 (3) 세포는 기존 세포로부터 생성, 이 세 가지가 핵심입니다. 세포의 크기는 종류에 따라 매우 다양합니다.",
      studyContent: "세포 이론은 Schleiden, Schwann, Virchow에 의해 확립되었습니다. 세포 크기는 박테리아(1-10 μm)부터 타조 알(수 cm)까지 다양합니다. 작은 세포는 표면적/부피 비율이 커서 물질 교환에 유리합니다.",
      relatedTopics: ["세포", "현미경", "생물학 역사"]
    },
    {
      id: 7,
      question: "진화의 증거로 볼 수 없는 것은?",
      options: [
        "화석 기록",
        "상동 기관",
        "흔적 기관",
        "생물의 현재 개체 수"
      ],
      correctIndex: 3,
      difficulty: 'medium',
      hint: "진화는 오랜 시간에 걸친 변화를 의미합니다.",
      rationale: "화석 기록, 상동 기관(공통 조상의 증거), 흔적 기관(퇴화된 기관)은 모두 진화의 증거입니다. 현재 개체 수는 진화와 직접적 관련이 없습니다.",
      studyContent: "진화의 증거: (1) 화석 - 시간에 따른 변화 기록 (2) 해부학적 증거 - 상동기관(공통조상), 상사기관(수렴진화) (3) 분자생물학적 증거 - DNA 유사성 (4) 발생학적 증거 - 배아 발생 유사성 (5) 생물지리학 - 지역별 종 분포.",
      relatedTopics: ["자연선택", "다윈", "적응"]
    },
    {
      id: 8,
      question: "물질대사(Metabolism)에 대한 설명으로 옳은 것은?",
      options: [
        "에너지를 소비하는 반응만 포함한다",
        "동화작용과 이화작용을 모두 포함한다",
        "오직 식물에서만 일어난다",
        "효소 없이도 빠르게 진행된다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "합성과 분해 반응을 모두 포함합니다.",
      rationale: "물질대사는 동화작용(에너지 저장, 합성)과 이화작용(에너지 방출, 분해)을 모두 포함하는 생체 내 모든 화학 반응입니다.",
      studyContent: "동화작용(Anabolism): 작은 분자→큰 분자, 에너지 흡수 (예: 광합성, 단백질 합성). 이화작용(Catabolism): 큰 분자→작은 분자, 에너지 방출 (예: 세포호흡, 소화). 두 과정은 ATP를 매개로 연결되며, 효소가 필수적입니다.",
      relatedTopics: ["ATP", "효소", "에너지"]
    },
    {
      id: 9,
      question: "유전 정보의 전달 방향을 옳게 나타낸 것은?",
      options: [
        "DNA → RNA → 단백질",
        "RNA → DNA → 단백질",
        "단백질 → RNA → DNA",
        "DNA → 단백질 → RNA"
      ],
      correctIndex: 0,
      difficulty: 'easy',
      hint: "중심 원리(Central Dogma)라고 합니다.",
      rationale: "유전 정보는 DNA에서 RNA로 전사되고, RNA에서 단백질로 번역됩니다. 이를 분자생물학의 중심 원리라고 합니다.",
      studyContent: "중심 원리: DNA(유전정보 저장) → 전사 → mRNA(정보 전달) → 번역 → 단백질(기능 수행). 예외: 역전사효소를 가진 일부 바이러스는 RNA→DNA 가능. 유전암호는 3개 염기(코돈)가 1개 아미노산을 지정합니다.",
      relatedTopics: ["전사", "번역", "유전암호"]
    },
    {
      id: 10,
      question: "생태계에서 생산자의 역할은?",
      options: [
        "유기물을 분해하여 무기물로 만든다",
        "무기물로부터 유기물을 합성한다",
        "다른 생물을 잡아먹는다",
        "질소를 고정한다"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "광합성을 통해 스스로 양분을 만듭니다.",
      rationale: "생산자(주로 식물)는 광합성을 통해 무기물(CO₂, H₂O)로부터 유기물(포도당)을 합성하여 생태계의 에너지 흐름을 시작합니다.",
      studyContent: "생태계 구성: (1) 생산자 - 광합성 생물(식물, 조류) (2) 소비자 - 1차(초식), 2차/3차(육식) (3) 분해자 - 세균, 곰팡이. 에너지는 태양→생산자→소비자 순으로 흐르며, 각 단계에서 약 90%가 손실됩니다. 물질은 순환하지만 에너지는 일방향입니다.",
      relatedTopics: ["광합성", "먹이사슬", "에너지 흐름"]
    }
  ]
},
  {
  id: 'chemistry',
  title: '생명의 화학적 기초',
  sub: 'Chapter 2',
  icon: <Zap className="w-6 h-6" />,
  color: 'from-cyan-500 to-blue-500',
  questions: [
    {
      id: 1,
      question: "생명체를 구성하는 주요 원소 4가지는?",
      options: [
        "C, H, O, N",
        "C, H, O, S",
        "C, N, P, S",
        "H, O, N, P"
      ],
      correctIndex: 0,
      difficulty: 'easy',
      hint: "탄소, 수소, 산소, 그리고 단백질의 주요 구성 원소입니다.",
      rationale: "생명체의 96% 이상은 탄소(C), 수소(H), 산소(O), 질소(N) 4가지 원소로 구성되어 있습니다.",
      studyContent: "생명체의 주요 원소(CHON)는 공유결합을 통해 복잡한 생체 분자를 만듭니다. 탄소는 4개의 공유결합을 형성할 수 있어 다양한 유기화합물의 골격을 이룹니다. 그 외 인(P), 황(S), 칼슘(Ca), 칼륨(K), 나트륨(Na) 등도 중요한 역할을 합니다.",
      relatedTopics: ["원소", "공유결합", "유기화합물"]
    },
    {
      id: 2,
      question: "물 분자가 극성을 띠는 이유는?",
      options: [
        "산소와 수소의 전기음성도 차이",
        "분자량이 작아서",
        "투명하기 때문에",
        "액체 상태이기 때문에"
      ],
      correctIndex: 0,
      difficulty: 'medium',
      hint: "산소 원자가 전자를 더 강하게 끌어당깁니다.",
      rationale: "산소는 수소보다 전기음성도가 커서 공유전자쌍을 더 강하게 끌어당기므로, 산소 쪽은 부분적 음전하(-δ), 수소 쪽은 부분적 양전하(+δ)를 띠게 됩니다.",
      studyContent: "물의 극성은 생명 현상의 핵심입니다. 극성으로 인해 (1) 수소결합 형성 (2) 높은 비열과 증발열 (3) 뛰어난 용매 능력 (4) 응집력과 부착력 (5) 표면장력 등의 특성이 나타납니다. 물은 '생명의 용매'라 불리며, 세포 내 대부분의 화학 반응이 물에서 일어납니다.",
      relatedTopics: ["극성", "수소결합", "용매"]
    },
    {
      id: 3,
      question: "pH 7인 용액은 무엇인가?",
      options: ["강산성", "약산성", "중성", "염기성"],
      correctIndex: 2,
      difficulty: 'easy',
      hint: "순수한 물의 pH입니다.",
      rationale: "pH 7은 중성이며, 수소이온(H+)과 수산화이온(OH-)의 농도가 같습니다. pH < 7은 산성, pH > 7은 염기성입니다.",
      studyContent: "pH는 수소이온 농도의 음의 로그값(pH = -log[H+])입니다. 생명체는 좁은 pH 범위에서만 생존 가능하며, 인체 혈액의 pH는 약 7.4로 유지됩니다. 완충용액(buffer)은 pH 변화를 최소화하여 항상성을 유지합니다. 위산은 pH 2, 소장은 pH 8 정도로 각 기관마다 최적 pH가 다릅니다.",
      relatedTopics: ["산과 염기", "완충용액", "항상성"]
    },
    {
      id: 4,
      question: "공유결합에 대한 설명으로 옳은 것은?",
      options: [
        "전자를 완전히 주고받는 결합",
        "전자쌍을 공유하는 결합",
        "정전기적 인력에 의한 결합",
        "약한 인력에 의한 결합"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "전자를 '공유'합니다.",
      rationale: "공유결합은 두 원자가 전자쌍을 공유하여 형성되는 강한 화학 결합입니다. 대부분의 유기 분자는 공유결합으로 이루어져 있습니다.",
      studyContent: "공유결합은 생체 분자의 골격을 형성하는 강한 결합(약 400 kJ/mol)입니다. 비극성 공유결합(전기음성도 차이 < 0.5)과 극성 공유결합(차이 0.5-1.7)이 있습니다. 단일결합, 이중결합, 삼중결합으로 나뉘며, 결합 수가 많을수록 결합이 강하고 짧습니다.",
      relatedTopics: ["화학결합", "전기음성도", "분자"]
    },
    {
      id: 5,
      question: "수소결합이 일어날 수 있는 분자 사이의 조합은?",
      options: [
        "물 - 물",
        "메테인 - 메테인",
        "산소 - 산소",
        "헬륨 - 헬륨"
      ],
      correctIndex: 0,
      difficulty: 'medium',
      hint: "극성 분자 사이에서 일어납니다.",
      rationale: "물 분자는 극성을 띠기 때문에 물 분자 간에 수소결합이 형성될 수 있습니다. 수소결합은 H와 N, O, F 같은 전기음성도가 큰 원자 사이에 형성됩니다.",
      studyContent: "수소결합은 약 20 kJ/mol의 약한 결합이지만, 많은 수가 모이면 강력한 힘을 발휘합니다. DNA의 이중나선 구조, 단백질의 2차 구조, 물의 독특한 성질 등이 수소결합 덕분입니다. 수소결합은 쉽게 끊어졌다 다시 형성되어 생체 분자의 유연성을 제공합니다.",
      relatedTopics: ["분자간 힘", "극성", "물의 성질"]
    },
    {
      id: 6,
      question: "탄소 원자가 생명체의 골격을 이루는 이유는?",
      options: [
        "가장 가벼운 원소이기 때문에",
        "4개의 공유결합을 형성할 수 있기 때문에",
        "물에 잘 녹기 때문에",
        "방사성 동위원소가 있기 때문에"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "탄소의 원자가 전자가 4개입니다.",
      rationale: "탄소는 4개의 공유결합을 형성할 수 있어 다양하고 복잡한 유기 분자의 골격을 만들 수 있습니다.",
      studyContent: "탄소의 특성: (1) 4개의 공유결합 가능 (2) C-C 결합 형성으로 긴 사슬, 가지, 고리 구조 생성 (3) 단일, 이중, 삼중 결합 가능 (4) 안정적인 결합. 이로 인해 탄수화물, 지질, 단백질, 핵산 등 모든 유기 분자가 탄소 골격을 가집니다.",
      relatedTopics: ["유기화합물", "탄소 화합물", "분자 다양성"]
    },
    {
      id: 7,
      question: "이온결합에 대한 설명으로 옳은 것은?",
      options: [
        "전자쌍을 공유하는 결합",
        "전자를 주고받아 형성되는 결합",
        "약한 결합력을 가진다",
        "비극성 분자 사이에 형성된다"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "양이온과 음이온 사이의 정전기적 인력입니다.",
      rationale: "이온결합은 전자를 잃은 양이온과 전자를 얻은 음이온 사이의 정전기적 인력으로 형성되는 강한 결합입니다.",
      studyContent: "이온결합의 예: NaCl (Na+ + Cl-), CaCl₂ (Ca²+ + 2Cl-). 금속 원소가 전자를 잃고 비금속 원소가 전자를 얻어 형성됩니다. 결정 구조를 만들며, 물에 녹으면 이온으로 해리됩니다. 생체에서 Na+, K+, Ca²+, Cl- 등의 이온이 중요한 역할을 합니다.",
      relatedTopics: ["이온", "전기음성도", "염"]
    },
    {
      id: 8,
      question: "물의 높은 비열이 생명체에 중요한 이유는?",
      options: [
        "빠르게 가열되고 냉각된다",
        "온도 변화를 완충하여 안정적 환경 제공",
        "물이 쉽게 증발한다",
        "물이 얼기 쉽다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "체온을 일정하게 유지하는 데 도움을 줍니다.",
      rationale: "물의 높은 비열(4.18 J/g·°C)은 많은 에너지를 흡수해야 온도가 변하므로, 생명체의 체온을 안정적으로 유지하고 환경의 급격한 온도 변화를 완충합니다.",
      studyContent: "물의 열적 특성: (1) 높은 비열 - 온도 안정성 (2) 높은 증발열 - 발한을 통한 냉각 (3) 높은 융해열 - 얼음→물 변화 시 에너지 흡수. 수소결합을 끊는 데 많은 에너지가 필요하기 때문입니다. 이로 인해 바다는 지구의 온도 조절기 역할을 합니다.",
      relatedTopics: ["비열", "증발열", "온도 조절"]
    },
    {
      id: 9,
      question: "물의 응집력(cohesion)이 나타나는 현상은?",
      options: [
        "물이 유리에 달라붙는다",
        "물방울이 둥근 모양을 유지한다",
        "물에 소금이 녹는다",
        "물이 끓는다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "물 분자끼리 서로 끌어당기는 힘입니다.",
      rationale: "응집력은 같은 종류의 분자끼리 끌어당기는 힘으로, 물 분자 간 수소결합으로 인해 물방울이 둥근 모양을 유지하고 표면장력이 생깁니다.",
      studyContent: "응집력과 부착력: (1) 응집력 - 물분자끼리의 인력, 표면장력, 모세관 현상의 일부 (2) 부착력 - 물과 다른 물질의 인력, 물이 벽에 달라붙음. 식물의 물관에서 물이 뿌리에서 잎까지 올라가는 것은 응집력과 부착력의 조합 덕분입니다.",
      relatedTopics: ["수소결합", "표면장력", "모세관 현상"]
    },
    {
      id: 10,
      question: "완충용액(Buffer)의 역할은?",
      options: [
        "pH를 급격히 변화시킨다",
        "pH 변화를 최소화한다",
        "물을 산성으로 만든다",
        "염기를 중화시킨다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "생체 내 pH를 일정하게 유지합니다.",
      rationale: "완충용액은 약산과 그 짝염기(또는 약염기와 그 짝산)의 혼합물로, 산이나 염기가 첨가되어도 pH 변화를 최소화합니다.",
      studyContent: "생체 완충계: (1) 중탄산 완충계 - 혈액 pH 7.4 유지 (H₂CO₃/HCO₃⁻) (2) 인산 완충계 - 세포 내 pH 조절 (3) 단백질 완충계 - 헤모글로빈. 완충용액은 H+를 흡수하거나 방출하여 pH를 일정 범위로 유지합니다. 혈액 pH가 7.0 이하나 7.8 이상이 되면 생명이 위험합니다.",
      relatedTopics: ["pH", "항상성", "혈액"]
    }
  ]
},
  {
  id: 'biochem',
  title: '생체 분자',
  sub: 'Chapter 3',
  icon: <Activity className="w-6 h-6" />,
  color: 'from-green-500 to-emerald-500',
  questions: [
    {
      id: 1,
      question: "생체 고분자가 아닌 것은?",
      options: ["탄수화물", "단백질", "지질", "핵산"],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "지질은 중합체가 아니라 소수성 분자입니다.",
      rationale: "지질은 반복 단위로 이루어진 고분자가 아니며, 주로 소수성 분자들의 집합체입니다. 탄수화물, 단백질, 핵산은 모두 단량체가 중합된 고분자입니다.",
      studyContent: "생체 고분자(Biopolymer)는 단량체(monomer)가 반복적으로 결합한 중합체(polymer)입니다. (1) 탄수화물: 단당류 연결 (2) 단백질: 아미노산 연결 (3) 핵산: 뉴클레오타이드 연결. 지질은 다양한 구조를 가지며, 주로 긴 탄화수소 사슬을 포함합니다.",
      relatedTopics: ["중합", "탈수 축합", "가수분해"]
    },
    {
      id: 2,
      question: "단백질의 1차 구조란 무엇인가?",
      options: [
        "아미노산의 배열 순서",
        "알파 나선 구조",
        "입체적 구조",
        "여러 폴리펩타이드의 결합"
      ],
      correctIndex: 0,
      difficulty: 'medium',
      hint: "가장 기본적인 서열 정보입니다.",
      rationale: "1차 구조(primary structure)는 아미노산이 펩타이드 결합으로 연결된 선형 배열 순서이며, 이것이 단백질의 모든 고차 구조를 결정합니다.",
      studyContent: "단백질 구조: (1) 1차 - 아미노산 서열 (2) 2차 - α-나선, β-병풍구조 (수소결합) (3) 3차 - 입체 구조 (이황화결합, 소수성 상호작용) (4) 4차 - 여러 폴리펩타이드 결합 (헤모글로빈). 1차 구조 변화(돌연변이)는 단백질 기능 상실 가능.",
      relatedTopics: ["단백질 구조", "아미노산", "펩타이드 결합"]
    },
    {
      id: 3,
      question: "효소의 작용을 설명하는 모델은?",
      options: [
        "자물쇠-열쇠 모델",
        "유도 적합 모델",
        "둘 다 맞다",
        "둘 다 틀리다"
      ],
      correctIndex: 2,
      difficulty: 'hard',
      hint: "두 모델 모두 효소 작용을 설명합니다.",
      rationale: "자물쇠-열쇠 모델(고정적 결합)과 유도 적합 모델(효소가 기질에 맞춰 변형)은 모두 효소-기질 상호작용을 설명하는 모델입니다.",
      studyContent: "효소-기질 결합: (1) 자물쇠-열쇠 모델 - 활성 부위와 기질이 완벽히 맞음 (2) 유도 적합 모델 - 기질 결합 시 활성 부위 변형, 더 정확함. 효소 특성: 특이성(특정 기질), 재사용 가능, 활성화 에너지 낮춤, 온도·pH 영향받음.",
      relatedTopics: ["효소", "촉매", "활성 부위"]
    },
    {
      id: 4,
      question: "DNA와 RNA의 차이점이 아닌 것은?",
      options: [
        "당의 종류",
        "가닥 수",
        "염기 종류",
        "둘 다 단백질이다"
      ],
      correctIndex: 3,
      difficulty: 'easy',
      hint: "DNA와 RNA는 모두 핵산입니다.",
      rationale: "DNA와 RNA는 둘 다 핵산이며 단백질이 아닙니다. 당의 종류, 염기 구성, 가닥 수에서 차이가 있습니다.",
      studyContent: "DNA vs RNA: (1) 당 - 디옥시리보스 vs 리보스 (2) 염기 - A,G,C,T vs A,G,C,U (3) 가닥 - 이중 vs 단일 (4) 기능 - 유전정보 저장 vs 전달·번역 (5) 안정성 - 안정 vs 불안정. RNA 종류: mRNA, tRNA, rRNA.",
      relatedTopics: ["핵산", "DNA", "RNA"]
    },
    {
      id: 5,
      question: "인지질 이중층의 소수성 부분은?",
      options: [
        "인산기 머리",
        "글리세롤",
        "지방산 꼬리",
        "당 사슬"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "물을 싫어하는 부분입니다.",
      rationale: "지방산 꼬리는 비극성 탄화수소 사슬로 이루어져 소수성(친유성)을 띱니다. 인산기를 포함한 머리 부분은 친수성입니다.",
      studyContent: "인지질 구조: 친수성 머리(인산기+글리세롤) + 소수성 꼬리(2개 지방산). 수용액에서 자발적으로 이중층 형성 → 세포막. 유동성: 인지질은 측면 이동 가능(유동 모자이크 모델). 콜레스테롤은 유동성 조절.",
      relatedTopics: ["인지질", "세포막", "양친매성"]
    },
    {
      id: 6,
      question: "단당류의 예가 아닌 것은?",
      options: ["포도당", "과당", "엿당", "갈락토스"],
      correctIndex: 2,
      difficulty: 'easy',
      hint: "엿당은 이당류입니다.",
      rationale: "엿당(말토스)은 포도당 2개가 결합한 이당류입니다. 포도당, 과당, 갈락토스는 모두 단당류(C₆H₁₂O₆)입니다.",
      studyContent: "탄수화물 분류: (1) 단당류 - 포도당(혈당), 과당(과일), 갈락토스(유당 구성) (2) 이당류 - 엿당(포도당+포도당), 설탕(포도당+과당), 유당(포도당+갈락토스) (3) 다당류 - 녹말, 글리코겐, 셀룰로스. 기본 화학식: (CH₂O)ₙ.",
      relatedTopics: ["탄수화물", "단당류", "이당류"]
    },
    {
      id: 7,
      question: "아미노산의 종류는 몇 개인가?",
      options: ["10개", "20개", "30개", "100개"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "생명체에서 단백질을 구성하는 표준 아미노산입니다.",
      rationale: "생명체에서 단백질을 구성하는 표준 아미노산은 20종류입니다.",
      studyContent: "20개 아미노산: (1) 비극성(소수성) - 글라이신, 알라닌, 발린 등 (2) 극성(친수성) - 세린, 트레오닌 등 (3) 산성 - 아스파르트산, 글루탐산 (4) 염기성 - 라이신, 아르기닌. 필수 아미노산 9개는 체내 합성 불가, 식품 섭취 필요.",
      relatedTopics: ["아미노산", "단백질", "필수 아미노산"]
    },
    {
      id: 8,
      question: "포화지방산과 불포화지방산의 차이는?",
      options: [
        "이중결합의 유무",
        "길이의 차이",
        "색깔의 차이",
        "맛의 차이"
      ],
      correctIndex: 0,
      difficulty: 'medium',
      hint: "탄소-탄소 결합의 종류입니다.",
      rationale: "포화지방산은 이중결합이 없고(C-C), 불포화지방산은 하나 이상의 이중결합(C=C)을 가집니다.",
      studyContent: "지방산 종류: (1) 포화 - 이중결합 없음, 직선, 고체(동물성), 높은 녹는점 (2) 불포화 - 이중결합 있음, 꺾임, 액체(식물성), 낮은 녹는점. 트랜스 지방은 인공적으로 만든 고체 불포화지방으로 건강에 해롭습니다.",
      relatedTopics: ["지방산", "지질", "영양"]
    },
    {
      id: 9,
      question: "뉴클레오타이드의 구성 성분이 아닌 것은?",
      options: ["당", "인산기", "염기", "아미노기"],
      correctIndex: 3,
      difficulty: 'medium',
      hint: "DNA와 RNA의 기본 단위입니다.",
      rationale: "뉴클레오타이드는 5탄당(리보스/디옥시리보스), 인산기, 질소 염기(A, G, C, T/U)로 구성됩니다. 아미노기는 아미노산의 구성 성분입니다.",
      studyContent: "뉴클레오타이드 구조: (1) 5탄당 - 리보스(RNA), 디옥시리보스(DNA) (2) 인산기 - 음전하, 골격 형성 (3) 염기 - 퓨린(A, G), 피리미딘(C, T, U). 기능: DNA/RNA 구성, ATP(에너지), NAD+/FAD(조효소).",
      relatedTopics: ["뉴클레오타이드", "DNA", "RNA"]
    },
    {
      id: 10,
      question: "탈수 축합 반응의 결과는?",
      options: [
        "물이 생성되고 단량체가 분리된다",
        "물이 소비되고 중합체가 형성된다",
        "물이 생성되고 중합체가 형성된다",
        "물이 소비되고 단량체가 분리된다"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "물이 빠지면서 결합이 형성됩니다.",
      rationale: "탈수 축합(dehydration synthesis)은 단량체가 결합하면서 물 분자가 제거되어 중합체가 형성되는 반응입니다.",
      studyContent: "탈수 축합: 단량체 + 단량체 → 중합체 + H₂O. 예: (1) 단당류 → 다당류 (2) 아미노산 → 단백질 (3) 뉴클레오타이드 → 핵산. 역반응: 가수분해(hydrolysis) - 물 첨가로 중합체 분해. 소화는 대부분 가수분해 반응.",
      relatedTopics: ["탈수 축합", "가수분해", "중합"]
    }
  ]
},
  {
  id: 'cell',
  title: '세포의 구조와 기능',
  sub: 'Chapter 4 & 5',
  icon: <Database className="w-6 h-6" />,
  color: 'from-purple-500 to-pink-500',
  questions: [
    {
      id: 1,
      question: "핵막이 없어 유전물질이 세포질에 퍼져 있는 세포 형태는?",
      options: ["진핵세포", "원핵세포", "동물세포", "식물세포"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "박테리아가 이에 해당합니다.",
      rationale: "원핵세포(prokaryotic cell)는 핵막이 없어 핵이 구별되지 않고 유전물질이 세포질에 존재합니다. 세균(박테리아)이 이에 속합니다.",
      studyContent: "원핵세포 특징: (1) 핵막 없음 - DNA가 핵양체에 응축 (2) 막으로 둘러싸인 세포소기관 없음 (3) 작음(1-10 μm) (4) 리보솜(70S) (5) 세포벽(펩티도글리칸). 진핵세포: 핵막 있음, 세포소기관 발달, 큼(10-100 μm).",
      relatedTopics: ["원핵세포", "진핵세포", "세균"]
    },
    {
      id: 2,
      question: "리보솜이 생성되는 장소는?",
      options: ["핵소체", "골지체", "소포체", "리소좀"],
      correctIndex: 0,
      difficulty: 'medium',
      hint: "핵 안에 있는 작은 구조물입니다.",
      rationale: "핵소체(nucleolus)는 핵 속에서 rRNA를 합성하고 리보솜을 조립하는 역할을 합니다.",
      studyContent: "핵소체 기능: (1) rRNA 유전자 전사 (2) rRNA 가공 (3) 리보솜 소단위 조립. 활발히 성장하는 세포는 큰 핵소체 보유. 리보솜은 대소 2개 소단위로 구성, 단백질 합성 장소. 진핵세포 리보솜: 80S, 원핵세포: 70S.",
      relatedTopics: ["핵소체", "리보솜", "단백질 합성"]
    },
    {
      id: 3,
      question: "가수분해 효소를 함유하여 세포 내 소화를 담당하는 소기관은?",
      options: ["미토콘드리아", "리소좀", "중심체", "엽록체"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "'세포의 위장'이라고 불립니다.",
      rationale: "리소좀(lysosome)은 여러 가수분해 효소를 가지고 있어 세포 내 소화 및 방어 작용을 담당합니다.",
      studyContent: "리소좀 기능: (1) 식균작용으로 들어온 물질 분해 (2) 자가포식(autophagy) - 손상된 세포소기관 제거 (3) 세포사멸(apoptosis) (4) 골 재형성. 산성 환경(pH 4.5-5.0) 유지. 리소좀 저장 질환: 효소 결핍으로 물질 축적.",
      relatedTopics: ["리소좀", "가수분해", "자가포식"]
    },
    {
      id: 4,
      question: "세포막의 구조 모델은?",
      options: ["샌드위치 모델", "단위막 모델", "유동 모자이크 모델", "고정 막 모델"],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "막 구성 요소들이 움직입니다.",
      rationale: "유동 모자이크 모델(Fluid Mosaic Model)은 세포막이 고정되어 있지 않고 구성 성분들이 유동적으로 움직인다는 이론입니다.",
      studyContent: "유동 모자이크 모델: (1) 인지질 이중층 - 유동적 '바다' (2) 막 단백질 - '모자이크'처럼 박혀 있음 (3) 측면 이동 가능, 뒤집기는 드묾 (4) 콜레스테롤 - 유동성 조절. 온도↑ → 유동성↑. 기능: 수송, 효소 활성, 신호 전달, 세포 인식.",
      relatedTopics: ["세포막", "인지질", "막 단백질"]
    },
    {
      id: 5,
      question: "농도 기울기에 역행하여 ATP를 소모하는 물질 이동 방식은?",
      options: ["단순 확산", "촉진 확산", "삼투", "능동 수송"],
      correctIndex: 3,
      difficulty: 'medium',
      hint: "에너지가 필요한 '펌프' 방식입니다.",
      rationale: "능동 수송(active transport)은 저농도에서 고농도로 물질을 이동시키기 위해 ATP 에너지를 사용합니다.",
      studyContent: "수송 메커니즘: (1) 수동 수송(에너지 불필요) - 단순 확산(O₂, CO₂), 촉진 확산(포도당), 삼투(물) (2) 능동 수송(ATP 필요) - Na+-K+ 펌프(3Na+ 방출, 2K+ 흡수), Ca²+ 펌프. 2차 능동수송: 농도 기울기 이용.",
      relatedTopics: ["능동 수송", "ATP", "Na+-K+ 펌프"]
    },
    {
      id: 6,
      question: "세포 호흡을 통해 ATP를 생산하는 소기관은?",
      options: ["리보솜", "미토콘드리아", "골지체", "중심체"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "'세포의 발전소'라고 불립니다.",
      rationale: "미토콘드리아는 세포 호흡을 통해 포도당을 분해하고 ATP를 생산하는 소기관입니다.",
      studyContent: "미토콘드리아 구조: (1) 이중막 - 외막(매끄러움), 내막(주름=크리스테) (2) 기질 - 크렙스 회로 (3) 내막 - 전자전달계, ATP 합성효소. 자체 DNA 보유(모계 유전). 활동 많은 세포(근육, 간)에 많음. 1 포도당 → 최대 38 ATP.",
      relatedTopics: ["미토콘드리아", "ATP", "세포 호흡"]
    },
    {
      id: 7,
      question: "단백질을 합성하고 운반하는 소포체는?",
      options: ["매끄러운 소포체", "거친 소포체", "골지체", "중심체"],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "표면에 리보솜이 붙어 있습니다.",
      rationale: "거친 소포체(rough ER)는 표면에 리보솜이 붙어 있어 단백질을 합성하고 가공합니다.",
      studyContent: "소포체 종류: (1) 거친 소포체(RER) - 리보솜 부착, 분비 단백질·막 단백질 합성 (2) 매끄러운 소포체(SER) - 지질 합성, 해독, 칼슘 저장. RER에서 만든 단백질은 소포로 골지체 이동. 근육세포의 SER은 근소포체로 Ca²+ 저장.",
      relatedTopics: ["소포체", "단백질 합성", "리보솜"]
    },
    {
      id: 8,
      question: "세포 내에서 물질을 분류, 변형, 포장하는 소기관은?",
      options: ["리보솜", "소포체", "골지체", "리소좀"],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "'세포의 우체국'이라고 불립니다.",
      rationale: "골지체(Golgi apparatus)는 단백질과 지질을 변형, 분류, 포장하여 목적지로 보내는 역할을 합니다.",
      studyContent: "골지체 기능: (1) 단백질 변형 - 당 첨가(당단백질), 인산화 (2) 지질 변형 (3) 분류 및 포장 - 소포 형성 (4) 리소좀 형성. 구조: cis면(수용), medial(가공), trans면(분비). 분비세포(췌장, 침샘)에 발달.",
      relatedTopics: ["골지체", "소포", "분비"]
    },
    {
      id: 9,
      question: "선택적 투과성을 갖는 세포막이 통과시키기 어려운 물질은?",
      options: ["산소", "이산화탄소", "물", "큰 극성 분자"],
      correctIndex: 3,
      difficulty: 'medium',
      hint: "크고 전하를 띤 물질입니다.",
      rationale: "세포막은 작고 비극성인 분자(O₂, CO₂)는 쉽게 통과하지만, 큰 극성 분자나 이온은 통과하기 어려워 수송 단백질이 필요합니다.",
      studyContent: "막 투과성: (1) 쉬움 - 작은 비극성(O₂, CO₂, N₂), 작은 극성(물, 에탄올) (2) 어려움 - 큰 극성(포도당), 이온(Na+, K+, Cl-), 큰 분자(단백질). 투과 경로: 인지질층 통과 vs 수송 단백질(채널, 운반체).",
      relatedTopics: ["선택적 투과성", "확산", "세포막"]
    },
    {
      id: 10,
      question: "식물 세포에만 있는 소기관은?",
      options: ["미토콘드리아", "리보솜", "엽록체", "골지체"],
      correctIndex: 2,
      difficulty: 'easy',
      hint: "광합성을 하는 소기관입니다.",
      rationale: "엽록체(chloroplast)는 식물과 조류 세포에만 있으며, 광합성을 통해 빛 에너지를 화학 에너지로 전환합니다.",
      studyContent: "엽록체 구조: (1) 이중막 (2) 틸라코이드 - 명반응(광계, 전자전달계) (3) 스트로마 - 암반응(캘빈 회로). 엽록소가 빛 흡수. 자체 DNA 보유(모계 유전). 식물 세포만의 구조: 세포벽(셀룰로스), 엽록체, 큰 액포.",
      relatedTopics: ["엽록체", "광합성", "식물세포"]
    }
  ]
},
  {
  id: 'gene',
  title: '유전자와 DNA',
  sub: 'Chapter 9 & 10',
  icon: <Zap className="w-6 h-6" />,
  color: 'from-yellow-500 to-orange-500',
  questions: [
    {
      id: 1,
      question: "DNA의 이중나선 구조를 발견한 과학자는?",
      options: ["멘델", "왓슨과 크릭", "다윈", "파스퇴르"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "1953년에 DNA 구조를 밝혔습니다.",
      rationale: "제임스 왓슨(James Watson)과 프란시스 크릭(Francis Crick)이 1953년 DNA의 이중나선 구조를 발견했습니다.",
      studyContent: "DNA 이중나선의 특징: (1) 두 가닥이 서로 반대 방향(antiparallel) (2) 인산-당 골격이 바깥쪽 (3) 염기가 안쪽에서 수소결합 (4) A-T 2개, G-C 3개 수소결합 (5) 오른쪽으로 꼬인 나선. 로절린드 프랭클린의 X선 회절 사진이 구조 발견에 결정적 역할을 했습니다.",
      relatedTopics: ["DNA 구조", "이중나선", "염기쌍"]
    },
    {
      id: 2,
      question: "DNA 복제 시 새로 합성된 가닥과 원래 가닥이 함께 존재하는 방식은?",
      options: ["보존적 복제", "반보존적 복제", "분산적 복제", "연속적 복제"],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "각 DNA 분자가 한 가닥은 원본, 한 가닥은 새 것입니다.",
      rationale: "DNA는 반보존적 복제(semiconservative replication)를 하여, 복제 후 각 DNA 분자는 원래 가닥 하나와 새로 합성된 가닥 하나로 구성됩니다.",
      studyContent: "DNA 복제 과정: (1) 헬리케이스가 이중나선 풀기 (2) 프라이머 결합 (3) DNA 중합효소가 5'→3' 방향으로 합성 (4) 선도 가닥: 연속 합성 (5) 지연 가닥: 오카자키 절편으로 불연속 합성 (6) DNA 연결효소가 절편 연결. 복제 속도: 초당 약 1000개 뉴클레오타이드.",
      relatedTopics: ["DNA 복제", "DNA 중합효소", "반보존적 복제"]
    },
    {
      id: 3,
      question: "DNA의 유전정보가 RNA로 전달되는 과정은?",
      options: ["복제", "전사", "번역", "역전사"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "DNA → RNA 과정입니다.",
      rationale: "전사(transcription)는 DNA의 유전정보를 mRNA로 복사하는 과정입니다.",
      studyContent: "전사 과정: (1) 개시 - RNA 중합효소가 프로모터에 결합 (2) 신장 - DNA 주형 가닥을 읽고 RNA 합성 (3) 종결 - 종결 신호에서 RNA 방출. 진핵생물은 전사 후 가공(5' cap, poly-A tail, 스플라이싱)을 거쳐 성숙 mRNA가 됩니다. 인트론(제거)과 엑손(유지) 구분이 중요합니다.",
      relatedTopics: ["전사", "RNA 중합효소", "프로모터"]
    },
    {
      id: 4,
      question: "mRNA의 유전정보를 읽어 단백질을 합성하는 과정은?",
      options: ["복제", "전사", "번역", "전환"],
      correctIndex: 2,
      difficulty: 'easy',
      hint: "RNA → 단백질 과정입니다.",
      rationale: "번역(translation)은 mRNA의 정보를 읽어 아미노산 서열로 된 단백질을 합성하는 과정입니다.",
      studyContent: "번역 과정: (1) 개시 - 리보솜이 mRNA의 AUG(개시코돈)에 결합 (2) 신장 - tRNA가 아미노산 운반, 펩타이드 결합 형성 (3) 종결 - 종결코돈(UAA, UAG, UGA)에서 단백질 방출. 리보솜의 A, P, E 자리에서 tRNA가 순차적으로 이동합니다. 한 mRNA에 여러 리보솜이 붙어 폴리솜 형성 가능.",
      relatedTopics: ["번역", "리보솜", "tRNA"]
    },
    {
      id: 5,
      question: "3개의 염기로 이루어진 유전암호 단위를 무엇이라 하는가?",
      options: ["코돈", "안티코돈", "인트론", "엑손"],
      correctIndex: 0,
      difficulty: 'easy',
      hint: "mRNA에서 하나의 아미노산을 지정합니다.",
      rationale: "코돈(codon)은 mRNA의 3개 연속 염기로 구성되며, 하나의 아미노산 또는 종결 신호를 지정합니다.",
      studyContent: "유전암호의 특징: (1) 3개 염기 = 1개 아미노산 (2) 64개 코돈 (4³) (3) 61개는 아미노산, 3개는 종결코돈 (4) 축퇴성(degeneracy) - 한 아미노산을 여러 코돈이 지정 (5) 보편성 - 거의 모든 생물이 같은 암호 사용 (6) AUG가 개시코돈이자 메티오닌 지정.",
      relatedTopics: ["유전암호", "코돈", "번역"]
    },
    {
      id: 6,
      question: "돌연변이에 대한 설명으로 옳은 것은?",
      options: [
        "항상 해롭다",
        "DNA 염기서열의 변화이다",
        "환경에 적응하기 위해 의도적으로 발생한다",
        "단백질에서만 일어난다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "유전정보의 변화입니다.",
      rationale: "돌연변이는 DNA 염기서열의 변화로, 자연적으로 또는 돌연변이원에 의해 무작위로 발생합니다. 유익, 해로움, 중립적일 수 있습니다.",
      studyContent: "돌연변이 종류: (1) 점돌연변이 - 한 염기 치환, 삽입, 결실 (2) 염색체 돌연변이 - 결실, 중복, 역위, 전좌. 영향: 침묵(동의), missense(다른 아미노산), nonsense(종결코돈 생성), frameshift(읽기틀 변화). 진화의 원료이며, 암 발생의 원인이기도 합니다.",
      relatedTopics: ["돌연변이", "진화", "암"]
    },
    {
      id: 7,
      question: "진핵세포에서 DNA가 히스톤 단백질에 감겨 응축된 구조를 무엇이라 하는가?",
      options: ["뉴클레오솜", "리보솜", "센트로미어", "텔로미어"],
      correctIndex: 0,
      difficulty: 'medium',
      hint: "염색질의 기본 구조 단위입니다.",
      rationale: "뉴클레오솜(nucleosome)은 DNA가 히스톤 8량체를 감고 있는 염색질의 기본 단위입니다.",
      studyContent: "염색질 구조: (1) 1차 - 뉴클레오솜(DNA 147bp + 히스톤 8개), '염주 목걸이' (2) 2차 - 30nm 섬유 (3) 3차 - 루프 구조 (4) 4차 - 응축 염색체. 히스톤 변형(아세틸화, 메틸화)은 유전자 발현 조절에 중요합니다. 이를 후성유전학(epigenetics)이라 합니다.",
      relatedTopics: ["염색질", "히스톤", "후성유전학"]
    },
    {
      id: 8,
      question: "대장균의 젖당 오페론에서 억제자가 결합하는 부위는?",
      options: ["프로모터", "작동자", "구조 유전자", "종결자"],
      correctIndex: 1,
      difficulty: 'hard',
      hint: "프로모터와 구조 유전자 사이에 위치합니다.",
      rationale: "작동자(operator)는 억제자 단백질이 결합하는 부위로, 결합 시 RNA 중합효소의 진행을 막아 전사를 억제합니다.",
      studyContent: "lac 오페론 조절: (1) 젖당 없음 - 억제자가 작동자 결합 → 전사 차단 (2) 젖당 있음 - 젖당이 억제자에 결합 → 억제자가 작동자에서 떨어짐 → 전사 진행 (3) 포도당 없음 - CAP-cAMP가 프로모터 결합 → 전사 촉진. 이는 음성 조절과 양성 조절의 조합입니다.",
      relatedTopics: ["오페론", "유전자 발현 조절", "원핵생물"]
    },
    {
      id: 9,
      question: "RNA의 종류가 아닌 것은?",
      options: ["mRNA", "tRNA", "rRNA", "dRNA"],
      correctIndex: 3,
      difficulty: 'easy',
      hint: "dRNA는 존재하지 않습니다.",
      rationale: "RNA의 주요 종류는 mRNA(전령), tRNA(운반), rRNA(리보솜)입니다. dRNA는 존재하지 않는 용어입니다.",
      studyContent: "RNA 종류와 기능: (1) mRNA - DNA 정보를 리보솜으로 전달 (2) tRNA - 아미노산 운반, 안티코돈으로 코돈 인식 (3) rRNA - 리보솜 구성, 펩타이드 결합 촉매 (4) 기타 - miRNA(유전자 발현 조절), snRNA(스플라이싱), siRNA(RNA 간섭).",
      relatedTopics: ["RNA", "전사", "번역"]
    },
    {
      id: 10,
      question: "DNA 손상 복구 메커니즘이 실패하면 발생할 수 있는 것은?",
      options: ["광합성 증가", "세포 성장 촉진", "암 발생", "면역력 증가"],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "돌연변이가 축적되면 위험합니다.",
      rationale: "DNA 손상 복구 실패는 돌연변이 축적으로 이어지며, 특히 종양 억제 유전자나 암 유전자에 돌연변이가 생기면 암이 발생할 수 있습니다.",
      studyContent: "DNA 복구 메커니즘: (1) 직접 복구 - 손상 부위 직접 수정 (2) 염기 절제 복구 - 잘못된 염기 제거 후 재합성 (3) 뉴클레오타이드 절제 복구 - 손상 구간 제거 후 재합성 (4) 불일치 복구 - 복제 오류 수정. p53 단백질은 '게놈의 수호자'로 DNA 손상 감지 시 복구 또는 세포사멸 유도합니다.",
      relatedTopics: ["DNA 복구", "암", "돌연변이"]
    }
  ]
},
  {
  id: 'digest',
  title: '영양과 소화',
  sub: 'Chapter 12',
  icon: <Activity className="w-6 h-6" />,
  color: 'from-orange-500 to-red-500',
  questions: [
    {
      id: 1,
      question: "입안에서 분비되는 침에 포함되어 녹말을 엿당으로 분해하는 효소는?",
      options: ["펩신", "아밀라아제", "리파아제", "트립신"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "탄수화물을 분해하는 효소입니다.",
      rationale: "침샘에서 분비되는 아밀라아제(amylase)는 탄수화물인 녹말을 화학적으로 분해하기 시작합니다.",
      studyContent: "침샘 아밀라아제(ptyalin)는 소화의 첫 단계에서 전분(녹말)을 말토스(엿당)와 덱스트린으로 분해합니다. 최적 pH는 약 6.8이며, 위의 산성 환경에서는 활성을 잃습니다. 침은 또한 리소자임(항균 작용)과 점액(윤활 작용)도 포함합니다.",
      relatedTopics: ["탄수화물 소화", "효소", "소화계"]
    },
    {
      id: 2,
      question: "위에서 단백질을 분해하는 주요 효소는?",
      options: ["아밀라아제", "펩신", "트립신", "리파아제"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "위의 강한 산성 환경에서 활성화됩니다.",
      rationale: "펩신(pepsin)은 위에서 분비되는 단백질 분해 효소로, pH 2 정도의 산성 환경에서 활성이 최대입니다.",
      studyContent: "펩신 분비와 활성화: (1) 주세포에서 펩시노겐(불활성) 분비 (2) 위산(HCl)에 의해 펩신(활성) 전환 (3) 단백질을 펩타이드로 분해. 위산은 벽세포에서 분비되며 pH 1.5-3.5 유지, 세균 살균 효과도 있습니다. 점액층이 위벽을 보호합니다.",
      relatedTopics: ["단백질 소화", "위산", "효소 활성화"]
    },
    {
      id: 3,
      question: "소장에서 영양소 흡수가 잘 일어나는 이유는?",
      options: [
        "표면이 매끄럽다",
        "융모와 미세융모로 표면적이 넓다",
        "길이가 짧다",
        "소화효소가 없다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "표면적을 극대화하는 구조입니다.",
      rationale: "소장 내벽의 융모(villi)와 미세융모(microvilli)는 표면적을 약 600배 증가시켜 효율적인 흡수를 가능하게 합니다.",
      studyContent: "소장 구조: (1) 길이 약 6-7m (2) 주름→융모→미세융모로 표면적 확대 (3) 융모 내 모세혈관과 림프관. 흡수 방법: 단순 확산(지질), 촉진 확산(과당), 능동 수송(포도당, 아미노산). 소장은 십이지장(소화효소 분비), 공장, 회장(흡수)으로 구분됩니다.",
      relatedTopics: ["흡수", "융모", "표면적"]
    },
    {
      id: 4,
      question: "췌장에서 분비되는 소화효소가 아닌 것은?",
      options: ["트립신", "아밀라아제", "리파아제", "펩신"],
      correctIndex: 3,
      difficulty: 'medium',
      hint: "펩신은 위에서 분비됩니다.",
      rationale: "췌장은 트립신(단백질), 아밀라아제(탄수화물), 리파아제(지방) 등을 분비하지만, 펩신은 위에서만 분비됩니다.",
      studyContent: "췌장액의 구성: (1) 중탄산염 - pH 조절(산성→약염기성) (2) 트립신, 키모트립신 - 단백질→아미노산 (3) 췌장 아밀라아제 - 전분→말토스 (4) 리파아제 - 지방→지방산+글리세롤 (5) 뉴클레아제 - 핵산 분해. 십이지장으로 분비되어 소화를 완성합니다.",
      relatedTopics: ["췌장", "소화효소", "pH 조절"]
    },
    {
      id: 5,
      question: "담즙의 주요 기능은?",
      options: [
        "단백질 분해",
        "지방 유화",
        "탄수화물 합성",
        "비타민 파괴"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "지방을 작은 입자로 만듭니다.",
      rationale: "담즙은 지방을 유화하여 작은 입자로 만들어 리파아제의 작용을 돕습니다. 담즙 자체는 효소가 아닙니다.",
      studyContent: "담즙의 특징: (1) 간에서 생성, 쓸개에 저장 (2) 담즙산염이 지방 유화 (3) 지용성 비타민(A, D, E, K) 흡수 촉진 (4) 콜레스테롤, 빌리루빈 배출. 담즙산은 장간순환으로 재흡수되어 재사용됩니다. 담석은 콜레스테롤이나 빌리루빈이 굳어진 것입니다.",
      relatedTopics: ["간", "지방 소화", "유화"]
    },
    {
      id: 6,
      question: "대장의 주요 기능은?",
      options: [
        "영양소 소화",
        "수분 흡수와 대변 형성",
        "호르몬 분비",
        "혈액 생성"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "소화되지 않은 물질을 처리합니다.",
      rationale: "대장은 남은 수분과 무기염류를 흡수하고, 소화되지 않은 물질로 대변을 형성합니다.",
      studyContent: "대장의 기능: (1) 수분 흡수 - 하루 1L 정도 (2) 전해질 흡수 - Na+, Cl- (3) 장내 세균 - 비타민 K, B 합성, 식이섬유 분해 (4) 대변 형성 및 저장. 맹장, 결장(상행, 횡행, 하행, S자), 직장으로 구성. 장내 미생물은 면역에도 중요합니다.",
      relatedTopics: ["수분 흡수", "장내 세균", "배설"]
    },
    {
      id: 7,
      question: "3대 영양소가 아닌 것은?",
      options: ["탄수화물", "단백질", "지방", "비타민"],
      correctIndex: 3,
      difficulty: 'easy',
      hint: "에너지를 제공하는 영양소입니다.",
      rationale: "3대 영양소는 탄수화물, 단백질, 지방으로, 모두 에너지원입니다. 비타민은 조절 영양소입니다.",
      studyContent: "영양소 분류: (1) 3대 영양소(에너지) - 탄수화물(4 kcal/g), 단백질(4 kcal/g), 지방(9 kcal/g) (2) 조절 영양소 - 비타민, 무기질 (3) 물. 탄수화물은 주 에너지원, 단백질은 성장·회복, 지방은 고에너지·지용성 비타민 흡수에 필요합니다.",
      relatedTopics: ["영양소", "에너지", "균형 식단"]
    },
    {
      id: 8,
      question: "비타민 D의 결핍으로 생기는 질병은?",
      options: ["각기병", "괴혈병", "구루병", "야맹증"],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "뼈의 발달과 관련이 있습니다.",
      rationale: "비타민 D는 칼슘 흡수를 돕는데, 결핍 시 어린이는 구루병(뼈 발달 장애), 성인은 골연화증이 발생합니다.",
      studyContent: "비타민 종류: (1) 지용성 - A(시력), D(뼈), E(항산화), K(혈액응고) (2) 수용성 - B복합체(에너지 대사), C(콜라겐 합성). 결핍증: A-야맹증, B1-각기병, C-괴혈병, D-구루병. 비타민 D는 햇빛으로 피부에서 합성 가능합니다.",
      relatedTopics: ["비타민", "결핍증", "영양"]
    },
    {
      id: 9,
      question: "무기질 중 혈액의 헤모글로빈 구성 성분은?",
      options: ["칼슘", "철", "나트륨", "칼륨"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "산소 운반에 필수적입니다.",
      rationale: "철(Fe)은 헤모글로빈의 구성 성분으로, 산소와 결합하여 운반하는 역할을 합니다. 결핍 시 빈혈이 발생합니다.",
      studyContent: "주요 무기질: (1) 칼슘 - 뼈, 치아, 근육 수축 (2) 철 - 헤모글로빈, 산소 운반 (3) 나트륨 - 삼투압, 신경 전달 (4) 칼륨 - 세포 내 삼투압 (5) 인 - 뼈, ATP (6) 요오드 - 갑상선 호르몬. 미량 원소도 효소 활성에 중요합니다.",
      relatedTopics: ["무기질", "헤모글로빈", "빈혈"]
    },
    {
      id: 10,
      question: "소화기관을 음식물이 지나가는 올바른 순서는?",
      options: [
        "입 → 식도 → 위 → 소장 → 대장",
        "입 → 위 → 식도 → 소장 → 대장",
        "입 → 식도 → 소장 → 위 → 대장",
        "입 → 위 → 소장 → 식도 → 대장"
      ],
      correctIndex: 0,
      difficulty: 'easy',
      hint: "위가 식도 다음입니다.",
      rationale: "소화기관의 정상적인 순서는 입 → 식도 → 위 → 소장(십이지장, 공장, 회장) → 대장 → 항문입니다.",
      studyContent: "소화 과정: (1) 입 - 기계적 소화(씹기), 화학적 소화(아밀라아제) (2) 식도 - 연동운동으로 이동 (3) 위 - 펩신, 위산 분비, 저장 (4) 소장 - 주요 소화·흡수 (5) 대장 - 수분 흡수, 대변 형성. 전체 길이 약 9m, 통과 시간 24-72시간입니다.",
      relatedTopics: ["소화계", "연동운동", "소화 순서"]
    }
  ]
},
  {
  id: 'circ',
  title: '순환과 호흡',
  sub: 'Chapter 13',
  icon: <Heart className="w-6 h-6" />,
  color: 'from-red-500 to-pink-500',
  questions: [
    {
      id: 1,
      question: "심장의 4개 방 중 전신으로 혈액을 뿜어내기 위해 가장 두꺼운 근육벽을 가진 곳은?",
      options: ["우심방", "우심실", "좌심방", "좌심실"],
      correctIndex: 3,
      difficulty: 'easy',
      hint: "가장 높은 압력이 필요한 곳입니다.",
      rationale: "좌심실은 높은 압력으로 온몸에 혈액을 보내야 하므로 가장 두꺼운 근육벽을 가집니다.",
      studyContent: "좌심실벽의 두께는 약 8-12mm로 우심실(3-5mm)의 약 3배입니다. 이는 체순환이 폐순환보다 훨씬 더 높은 압력(약 120mmHg vs 25mmHg)을 필요로 하기 때문입니다. 좌심실 비대는 고혈압의 결과로 나타날 수 있습니다.",
      relatedTopics: ["심장 구조", "혈압", "순환계"]
    },
    {
      id: 2,
      question: "혈액의 성분 중 산소 운반을 담당하는 것은?",
      options: ["백혈구", "적혈구", "혈소판", "혈장"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "헤모글로빈을 포함하고 있습니다.",
      rationale: "적혈구는 헤모글로빈을 포함하여 산소를 운반합니다. 오목한 원반 모양으로 표면적이 넓어 효율적입니다.",
      studyContent: "적혈구의 특징: (1) 핵이 없음 - 산소 운반 공간 확보 (2) 오목한 원반(biconcave disc) - 표면적↑ (3) 수명 120일 (4) 골수에서 생성, 비장에서 파괴 (5) 헤모글로빈(Hb) 포함 - 철 이온에 O₂ 결합. 1μL 혈액에 남성 500만, 여성 450만개. 고산지대 거주자는 적혈구 수 증가.",
      relatedTopics: ["적혈구", "헤모글로빈", "산소 운반"]
    },
    {
      id: 3,
      question: "폐포에서 산소와 이산화탄소의 교환이 일어나는 원리는?",
      options: ["능동 수송", "촉진 확산", "단순 확산", "삼투"]
      correctIndex: 2,
      difficulty: 'medium',
      hint: "농도 기울기를 따라 움직입니다.",
      rationale: "폐포와 모세혈관 사이의 가스 교환은 농도 기울기에 따른 단순 확산으로 일어납니다.",
      studyContent: "가스 교환: (1) 폐포 - O₂ 고농도, CO₂ 저농도 (2) 혈액 - O₂ 저농도, CO₂ 고농도 (3) O₂는 폐포→혈액, CO₂는 혈액→폐포로 확산. 효율적 교환 조건: 얇은 막(0.5μm), 넓은 표면적(약 70m²), 습한 환경. 폐포는 계면활성제로 붕괴 방지.",
      relatedTopics: ["가스 교환", "확산", "폐포"]
    },
    {
      id: 4,
      question: "백혈구의 기능은?",
      options: ["산소 운반", "면역 작용", "혈액 응고", "영양소 운반"],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "병원체로부터 몸을 보호합니다.",
      rationale: "백혈구는 면역 작용을 담당하여 병원체를 제거하고 몸을 보호합니다.",
      studyContent: "백혈구 종류: (1) 과립구 - 호중구(세균 식균), 호산구(기생충, 알레르기), 호염기구(히스타민 분비) (2) 무과립구 - 림프구(T세포, B세포, NK세포), 단핵구(대식세포로 분화). 정상 수: 4,000-11,000/μL. 너무 많으면 백혈병, 적으면 면역저하.",
      relatedTopics: ["백혈구", "면역", "식균작용"]
    },
    {
      id: 5,
      question: "혈관의 종류 중 혈압이 가장 높은 곳은?",
      options: ["동맥", "정맥", "모세혈관", "림프관"],
      correctIndex: 0,
      difficulty: 'easy',
      hint: "심장에서 나가는 혈관입니다.",
      rationale: "동맥은 심장에서 혈액이 뿜어져 나오는 혈관으로, 가장 높은 압력을 받아 탄력성 있는 두꺼운 벽을 가집니다.",
      studyContent: "혈관 비교: (1) 동맥 - 두꺼운 벽, 탄력성, 고압, 산소 풍부한 혈액 (대동맥 제외) (2) 정맥 - 얇은 벽, 판막, 저압, 이산화탄소 많은 혈액 (3) 모세혈관 - 매우 얇음(한 층 세포), 물질 교환. 동맥경화는 동맥벽이 딱딱해지는 질환입니다.",
      relatedTopics: ["혈관", "혈압", "순환"]
    },
    {
      id: 6,
      question: "폐포의 구조적 특징이 아닌 것은?",
      options: [
        "표면적이 넓다",
        "벽이 얇다",
        "모세혈관이 둘러싸고 있다",
        "두꺼운 근육층이 있다"
      ],
      correctIndex: 3,
      difficulty: 'medium',
      hint: "가스 교환에 최적화되어 있습니다.",
      rationale: "폐포는 얇은 벽(한 층의 편평상피세포)을 가져 가스 교환에 유리합니다. 두꺼운 근육층은 없습니다.",
      studyContent: "폐포의 특징: (1) 수: 약 3-5억 개 (2) 표면적: 약 70m² (테니스 코트 크기) (3) 벽 두께: 0.2-0.5μm (4) 모세혈관망 발달 (5) 계면활성제(surfactant) 분비 - 표면장력 감소, 붕괴 방지. 폐기종은 폐포 파괴 질환입니다.",
      relatedTopics: ["폐포", "호흡", "표면적"]
    },
    {
      id: 7,
      question: "호흡 운동을 조절하는 중추는?",
      options: ["대뇌", "소뇌", "연수", "척수"],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "뇌간에 위치합니다.",
      rationale: "연수의 호흡 중추가 혈액의 CO₂ 농도를 감지하여 호흡 운동을 자동으로 조절합니다.",
      studyContent: "호흡 조절: (1) 연수의 호흡 중추 - 자동 조절 (2) CO₂ 증가 감지 - 화학수용기 (3) 호흡 속도·깊이 증가 (4) 의식적 조절도 가능(대뇌). CO₂가 O₂보다 호흡 조절에 더 중요합니다. 과호흡 시 CO₂ 감소로 호흡 억제, 무호흡 발생 가능.",
      relatedTopics: ["호흡 조절", "연수", "CO₂"]
    },
    {
      id: 8,
      question: "혈압을 측정할 때 최고 혈압은?",
      options: ["심장이 수축할 때", "심장이 이완할 때", "호흡할 때", "운동 후"],
      correctIndex: 0,
      difficulty: 'easy',
      hint: "수축기 혈압입니다.",
      rationale: "수축기 혈압(최고 혈압)은 심실이 수축하여 혈액을 내보낼 때 측정되며, 정상 성인은 약 120mmHg입니다.",
      studyContent: "혈압: (1) 수축기 혈압 - 심실 수축 시, 정상 120mmHg (2) 이완기 혈압 - 심실 이완 시, 정상 80mmHg (3) 고혈압 - 140/90 이상, 심혈관질환 위험 (4) 저혈압 - 90/60 이하, 어지럼증. 혈압은 나이, 운동, 스트레스, 자세에 영향받습니다.",
      relatedTopics: ["혈압", "심장 박동", "고혈압"]
    },
    {
      id: 9,
      question: "심장 박동을 시작시키는 곳은?",
      options: ["동방결절", "방실결절", "히스다발", "푸르킨예 섬유"],
      correctIndex: 0,
      difficulty: 'medium',
      hint: "'심장의 페이스메이커'라고 불립니다.",
      rationale: "동방결절(SA node)은 자발적으로 전기 신호를 만들어 심장 박동을 시작시키는 자율 조직입니다.",
      studyContent: "심장 전도계: (1) 동방결절(SA node) - 우심방, 분당 70회 신호 (2) 방실결절(AV node) - 신호 지연 (3) 히스다발 → (4) 푸르킨예 섬유 → (5) 심실 근육 수축. 부정맥은 전도계 이상. 인공 심박조율기는 동방결절 기능 대체.",
      relatedTopics: ["심장 박동", "동방결절", "전도계"]
    },
    {
      id: 10,
      question: "호흡할 때 폐로 공기가 들어오는 과정은?",
      options: [
        "횡격막이 올라가고 가슴이 좁아진다",
        "횡격막이 내려가고 가슴이 넓어진다",
        "횡격막이 움직이지 않는다",
        "폐가 스스로 팽창한다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "흡기는 폐의 부피를 증가시킵니다.",
      rationale: "흡기 시 횡격막이 수축하여 아래로 내려가고, 갈비뼈가 올라가며 가슴이 넓어져 폐의 부피가 증가하고 압력이 감소하여 공기가 들어옵니다.",
      studyContent: "호흡 메커니즘: (1) 흡기 - 횡격막 수축(하강), 늑간근 수축(가슴 확장), 폐 압력 감소, 공기 유입 (2) 호기 - 근육 이완, 탄성 반동, 폐 압력 증가, 공기 배출. 폐 자체는 근육이 없어 수동적입니다. 폐활량: 성인 남성 4-5L, 여성 3-4L.",
      relatedTopics: ["호흡 운동", "횡격막", "흡기"]
    }
  ]
},
  {
  id: 'immune',
  title: '면역',
  sub: 'Chapter 14',
  icon: <Shield className="w-6 h-6" />,
  color: 'from-green-500 to-teal-500',
  questions: [
    {
      id: 1,
      question: "항체를 생산하여 체액성 면역을 주도하는 세포는?",
      options: ["T세포", "B세포", "NK세포", "대식세포"],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "형질세포로 분화하여 항체를 만듭니다.",
      rationale: "B세포는 항원 자극을 받으면 형질세포로 분화하여 항체를 대량 생산합니다.",
      studyContent: "B림프구는 골수에서 성숙하며, 각각 특정 항원을 인식하는 항체를 표면에 가지고 있습니다. 활성화되면 형질세포(항체 분비)와 기억 B세포(장기 면역)로 분화합니다. 한 형질세포는 초당 약 2,000개의 항체를 생산할 수 있습니다.",
      relatedTopics: ["항체", "체액성 면역", "형질세포"]
    },
    {
      id: 2,
      question: "T세포가 성숙하는 장소는?",
      options: ["골수", "비장", "가슴샘(흉선)", "림프절"],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "T세포의 'T'는 이 기관의 첫 글자입니다.",
      rationale: "T세포는 골수에서 생성되지만 가슴샘(Thymus)에서 성숙하며, 여기서 자기 항원을 공격하지 않도록 교육받습니다.",
      studyContent: "T세포 발달: (1) 골수에서 생성 (2) 흉선으로 이동 (3) 양성 선택 - MHC 인식 능력 (4) 음성 선택 - 자기 항원 반응 제거 (5) 성숙 T세포 방출. 흉선은 사춘기 이후 퇴화합니다. T세포 종류: 보조 T세포(CD4), 세포독성 T세포(CD8), 조절 T세포.",
      relatedTopics: ["T세포", "흉선", "세포성 면역"]
    },
    {
      id: 3,
      question: "선천 면역의 특징이 아닌 것은?",
      options: [
        "태어날 때부터 가지고 있다",
        "비특이적 방어",
        "항체를 생산한다",
        "식균작용을 한다"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "항체는 후천 면역의 특징입니다.",
      rationale: "선천 면역은 비특이적 방어로 항체를 생산하지 않습니다. 항체 생산은 후천 면역(적응 면역)의 특징입니다.",
      studyContent: "선천 면역: (1) 물리적 장벽 - 피부, 점막 (2) 화학적 장벽 - 위산, 리소자임 (3) 식균세포 - 호중구, 대식세포 (4) NK세포 - 감염·암세포 파괴 (5) 염증 반응 (6) 보체계. 즉각 반응하지만 기억 없음. 모든 병원체에 동일하게 반응.",
      relatedTopics: ["선천 면역", "식균작용", "염증"]
    },
    {
      id: 4,
      question: "후천 면역의 특징은?",
      options: [
        "비특이적이다",
        "즉시 반응한다",
        "항원 특이적이며 기억한다",
        "모든 동물이 가지고 있다"
      ],
      correctIndex: 2,
      difficulty: 'easy',
      hint: "특정 병원체를 기억하고 빠르게 대응합니다.",
      rationale: "후천 면역(적응 면역)은 특정 항원에 대해 특이적으로 반응하며, 면역 기억을 형성하여 재감염 시 빠르고 강하게 대응합니다.",
      studyContent: "후천 면역 특징: (1) 특이성 - 항원 인식 (2) 다양성 - 수백만 종 항원 대응 (3) 기억 - 2차 반응 빠름 (4) 자기/비자기 구별. 1차 반응: 7-10일, 2차 반응: 2-3일. 체액성(B세포, 항체)과 세포성(T세포) 면역으로 구분.",
      relatedTopics: ["후천 면역", "면역 기억", "항원 특이성"]
    },
    {
      id: 5,
      question: "백신의 원리는?",
      options: [
        "병원체를 직접 주입한다",
        "약화되거나 죽은 병원체로 면역 기억 형성",
        "항생제를 미리 투여한다",
        "면역세포를 파괴한다"
      ],
      correctIndex: 1,
      difficulty: 'easy',
      hint: "미리 연습하여 면역 체계를 준비시킵니다.",
      rationale: "백신은 약화되거나 죽은 병원체, 또는 그 일부를 주입하여 질병을 일으키지 않으면서 면역 기억을 형성합니다.",
      studyContent: "백신 종류: (1) 약독화 생백신 - 약화된 살아있는 병원체 (MMR) (2) 사백신 - 죽은 병원체 (독감) (3) 톡소이드 - 무독화 독소 (파상풍) (4) 아단위 백신 - 병원체 일부 (B형 간염) (5) mRNA 백신 - 유전정보 (COVID-19). 집단면역으로 사회 전체 보호.",
      relatedTopics: ["백신", "면역 기억", "예방접종"]
    },
    {
      id: 6,
      question: "알레르기 반응은 어떤 면역 반응인가?",
      options: [
        "정상적인 면역 반응",
        "면역 결핍",
        "무해한 항원에 대한 과민 반응",
        "자가면역 반응"
      ],
      correctIndex: 2,
      difficulty: 'medium',
      hint: "꽃가루, 먼지 등 무해한 물질에 과도하게 반응합니다.",
      rationale: "알레르기는 꽃가루, 먼지, 음식 등 무해한 항원(알레르겐)에 대해 면역계가 과도하게 반응하는 것입니다.",
      studyContent: "알레르기 메커니즘: (1) 1차 노출 - IgE 항체 생성, 비만세포에 결합 (2) 2차 노출 - 알레르겐이 IgE 결합 (3) 비만세포에서 히스타민 방출 (4) 증상 - 가려움, 부종, 호흡곤란. 아나필락시스는 전신 알레르기로 생명 위협. 항히스타민제가 치료제.",
      relatedTopics: ["알레르기", "과민 반응", "히스타민"]
    },
    {
      id: 7,
      question: "자가면역질환의 예는?",
      options: ["독감", "류마티스 관절염", "결핵", "말라리아"],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "면역계가 자기 조직을 공격합니다.",
      rationale: "자가면역질환은 면역계가 자기 몸의 정상 조직을 항원으로 인식하여 공격하는 질환입니다. 류마티스 관절염이 대표적입니다.",
      studyContent: "자가면역질환 예: (1) 류마티스 관절염 - 관절 공격 (2) 제1형 당뇨병 - 췌장 베타세포 파괴 (3) 다발성 경화증 - 신경 수초 공격 (4) 전신 홍반 루푸스 - 다양한 조직. 원인: 유전, 환경, 감염. 치료: 면역억제제, 항염증제.",
      relatedTopics: ["자가면역", "류마티스", "면역 조절"]
    },
    {
      id: 8,
      question: "항원-항체 반응의 특징은?",
      options: [
        "비특이적이다",
        "한 항체가 모든 항원과 결합한다",
        "특정 항원과 항체가 특이적으로 결합한다",
        "영구적 결합이다"
      ],
      correctIndex: 2,
      difficulty: 'easy',
      hint: "열쇠와 자물쇠 관계입니다.",
      rationale: "항원-항체 반응은 특이적이어서, 특정 항체는 그에 맞는 특정 항원과만 결합합니다(lock and key).",
      studyContent: "항체 구조와 기능: (1) Y자 형태 (2) 2개의 항원 결합 부위 (3) 가변 영역 - 항원 특이성 (4) 불변 영역 - 효과 기능. 항원-항체 복합체 형성: 중화(독소), 응집(세균), 침전, 보체 활성화, 식균작용 촉진(옵소닌화).",
      relatedTopics: ["항원", "항체", "특이성"]
    },
    {
      id: 9,
      question: "면역 기억 세포의 역할은?",
      options: [
        "처음 감염 시 즉시 반응",
        "재감염 시 빠르고 강한 면역 반응",
        "항원을 생산한다",
        "염증을 일으킨다"
      ],
      correctIndex: 1,
      difficulty: 'medium',
      hint: "한 번 걸린 병에 다시 안 걸리는 이유입니다.",
      rationale: "기억 세포는 1차 감염 후 오래 생존하며, 같은 항원에 재노출 시 빠르고 강한 2차 면역 반응을 일으킵니다.",
      studyContent: "면역 기억: (1) 1차 반응 - 7-10일, 항체 적음, B/T세포 활성화 (2) 기억세포 형성 - 수년~평생 생존 (3) 2차 반응 - 2-3일, 항체 많음, 강함. 홍역, 수두 등 한 번 걸리면 다시 안 걸림. 백신은 이 원리 이용.",
      relatedTopics: ["기억세포", "2차 반응", "백신"]
    },
    {
      id: 10,
      question: "면역계의 주요 기관이 아닌 것은?",
      options: ["흉선", "비장", "림프절", "췌장"],
      correctIndex: 3,
      difficulty: 'easy',
      hint: "췌장은 소화와 혈당 조절 기관입니다.",
      rationale: "췌장은 소화효소와 인슐린을 분비하는 기관으로 면역계와 직접 관련이 없습니다. 흉선, 비장, 림프절은 면역 기관입니다.",
      studyContent: "면역계 기관: (1) 1차 림프기관 - 골수(B세포), 흉선(T세포) 성숙 (2) 2차 림프기관 - 비장(혈액 여과, 면역반응), 림프절(림프 여과, 면역반응), 편도, 페이어판(장). 림프계는 조직액 배출, 지방 흡수, 면역 기능.",
      relatedTopics: ["면역 기관", "림프계", "비장"]
    }
  ]
}
];

  // 타이머
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // 시간 포맷팅
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 북마크 토글
  const toggleBookmark = (chapterId, questionId) => {
    const key = `${chapterId}-${questionId}`;
    const newBookmarks = new Set(bookmarkedQuestions);
    if (newBookmarks.has(key)) {
      newBookmarks.delete(key);
    } else {
      newBookmarks.add(key);
    }
    setBookmarkedQuestions(newBookmarks);
  };

  // 퀴즈 시작
  const startQuiz = (chapter, isStudy = false) => {
    setSelectedChapter(chapter);
    setStudyMode(isStudy);
    setCurrentScreen(isStudy ? 'study' : 'quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setTimeSpent(0);
    setTimerActive(true);
  };

  // 답안 제출
  const handleAnswerSubmit = (answerIndex) => {
    if (showExplanation) return;
    
    setSelectedOption(answerIndex);
    const currentQuestion = selectedChapter.questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctIndex;
    
    if (isCorrect) {
      setScore(score + 1);
      setTotalScore(totalScore + 10);
    } else {
      // 오답 저장
      setWrongAnswers([...wrongAnswers, {
        chapter: selectedChapter.title,
        question: currentQuestion,
        selectedAnswer: answerIndex
      }]);
    }
    
    setShowExplanation(true);
  };

  // 다음 문제
  const handleNext = () => {
    if (currentQuestionIndex < selectedChapter.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setTimerActive(false);
      const newHistory = {
        chapter: selectedChapter.title,
        score: score,
        total: selectedChapter.questions.length,
        timeSpent: timeSpent,
        date: new Date().toLocaleString('ko-KR')
      };
      setQuizHistory([...quizHistory, newHistory]);
      setCurrentScreen('result');
    }
  };

  // 메뉴로
  const backToMenu = () => {
    setCurrentScreen('menu');
    setSelectedChapter(null);
    setTimerActive(false);
  };

  // ============ 화면 렌더링 ============

  // 메인 메뉴
  const renderMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* 헤더 */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-bold">동물보건학과 전용 학습 플랫폼</span>
          </div>
          <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
            BioLearn Pro
          </h1>
          <p className="text-xl text-purple-200 font-medium">스마트하게 배우고, 확실하게 기억하세요</p>
        </header>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-black">{dailyStreak}</span>
            </div>
            <p className="text-sm text-purple-200">연속 학습일</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-black">{totalScore}</span>
            </div>
            <p className="text-sm text-purple-200">총 획득 점수</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-black">{quizHistory.length}</span>
            </div>
            <p className="text-sm text-purple-200">완료한 퀴즈</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Bookmark className="w-8 h-8 text-pink-400" />
              <span className="text-3xl font-black">{bookmarkedQuestions.size}</span>
            </div>
            <p className="text-sm text-purple-200">북마크</p>
          </div>
        </div>

        {/* 챕터 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quizData.map((chapter) => (
            <div
              key={chapter.id}
              className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* 그라데이션 배경 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${chapter.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${chapter.color} rounded-2xl mb-4 shadow-lg`}>
                  {chapter.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{chapter.title}</h3>
                <p className="text-sm text-purple-200 mb-6">{chapter.sub} • {chapter.questions.length}문제</p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => startQuiz(chapter, false)}
                    className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-xl font-bold text-sm transition-all border border-white/30"
                  >
                    <Play className="w-4 h-4 inline mr-2" />
                    퀴즈
                  </button>
                  <button
                    onClick={() => startQuiz(chapter, true)}
                    className="flex-1 bg-white text-slate-900 hover:bg-purple-100 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg"
                  >
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    학습
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 오답 노트 */}
        {wrongAnswers.length > 0 && (
          <div className="bg-red-500/10 backdrop-blur-md rounded-3xl p-8 border border-red-500/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 rounded-xl p-3">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">오답 노트</h3>
                  <p className="text-sm text-purple-200">틀린 문제를 다시 복습하세요</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setReviewMode(true);
                  setCurrentQuestionIndex(0);
                  setCurrentScreen('quiz');
                }}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition-all"
              >
                복습 시작
              </button>
            </div>
            <div className="text-sm text-purple-200">
              총 {wrongAnswers.length}개의 문제를 틀렸습니다
            </div>
          </div>
        )}

        {/* 최근 기록 */}
        {quizHistory.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6" />
              최근 학습 기록
            </h3>
            <div className="grid gap-4">
              {quizHistory.slice(-3).reverse().map((record, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg mb-1">{record.chapter}</h4>
                    <p className="text-sm text-purple-200">{record.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-green-400 mb-1">
                      {Math.round((record.score / record.total) * 100)}%
                    </div>
                    <div className="text-sm text-purple-200">
                      {record.score}/{record.total} • {formatTime(record.timeSpent)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );

  // 학습 모드
  const renderStudyMode = () => {
    const currentQuestion = selectedChapter.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedChapter.questions.length) * 100;
    const isBookmarked = bookmarkedQuestions.has(`${selectedChapter.id}-${currentQuestion.id}`);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={backToMenu}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">돌아가기</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Clock className="w-4 h-4 inline mr-2" />
                <span className="font-mono font-bold">{formatTime(timeSpent)}</span>
              </div>
              <button
                onClick={() => toggleBookmark(selectedChapter.id, currentQuestion.id)}
                className={`p-3 rounded-full transition-all ${
                  isBookmarked 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white/10 text-white/60 hover:text-white'
                }`}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* 진행률 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-white">{selectedChapter.title}</h2>
              <span className="text-sm font-bold text-purple-200">
                {currentQuestionIndex + 1} / {selectedChapter.questions.length}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 학습 카드 */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl mb-8">
            {/* 난이도 배지 */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentQuestion.difficulty === 'easy' ? '초급' :
                 currentQuestion.difficulty === 'medium' ? '중급' : '고급'}
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                학습 모드
              </span>
            </div>

            {/* 문제 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-black text-lg flex-shrink-0">
                  Q{currentQuestion.id}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 leading-relaxed flex-1">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* 힌트 */}
              {showHints && currentQuestion.hint && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg mb-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-900 mb-1">힌트</p>
                      <p className="text-sm text-amber-800">{currentQuestion.hint}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 학습 내용 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
              <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                핵심 개념
              </h4>
              <p className="text-slate-700 leading-relaxed mb-6">
                {currentQuestion.studyContent}
              </p>
              
              {/* 관련 주제 */}
              <div className="flex flex-wrap gap-2">
                {currentQuestion.relatedTopics.map((topic, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-purple-700 border border-purple-200">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* 정답 */}
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-bold text-green-900 mb-2">정답</p>
                  <p className="text-lg font-bold text-slate-800 mb-3">
                    {currentQuestion.options[currentQuestion.correctIndex]}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {currentQuestion.rationale}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                }
              }}
              disabled={currentQuestionIndex === 0}
              className="flex-1 bg-white/20 backdrop-blur-md text-white py-4 px-6 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/30 transition-all border border-white/30"
            >
              이전
            </button>
            <button
              onClick={() => {
                if (currentQuestionIndex < selectedChapter.questions.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                  backToMenu();
                }
              }}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl transition-all"
            >
              {currentQuestionIndex < selectedChapter.questions.length - 1 ? '다음' : '완료'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 퀴즈 모드
  const renderQuiz = () => {
    const currentQuestion = selectedChapter.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedChapter.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* 상단 바 */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={backToMenu}
              className="text-white/80 hover:text-white transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-mono font-bold">
                {formatTime(timeSpent)}
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white font-bold">
                {currentQuestionIndex + 1}/{selectedChapter.questions.length}
              </div>
            </div>
          </div>

          {/* 진행 바 */}
          <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 문제 카드 */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl mb-8">
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl w-14 h-14 flex items-center justify-center font-black text-xl flex-shrink-0">
                Q{currentQuestion.id}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 leading-relaxed flex-1 mt-2">
                {currentQuestion.question}
              </h3>
            </div>

            {/* 선택지 */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === currentQuestion.correctIndex;
                const showResult = showExplanation;

                let buttonClass = "w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 font-medium text-lg ";

                if (!showResult) {
                  buttonClass += isSelected
                    ? "border-purple-500 bg-purple-50 text-slate-800 shadow-lg scale-105"
                    : "border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-slate-700 hover:scale-102";
                } else {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-50 text-green-900 shadow-lg";
                  } else if (isSelected) {
                    buttonClass += "border-red-500 bg-red-50 text-red-900";
                  } else {
                    buttonClass += "border-slate-200 bg-slate-50 text-slate-400";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSubmit(index)}
                    disabled={showExplanation}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle className="w-7 h-7 text-green-600" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-7 h-7 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 해설 */}
          {showExplanation && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white mb-8 shadow-2xl animate-fade-in">
              <div className="flex items-start gap-4">
                {selectedOption === currentQuestion.correctIndex ? (
                  <div className="bg-white/20 rounded-2xl p-3">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="bg-white/20 rounded-2xl p-3">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-2xl font-black mb-3">
                    {selectedOption === currentQuestion.correctIndex ? "정답입니다! 🎉" : "아쉬워요 😢"}
                  </h4>
                  <p className="text-lg leading-relaxed opacity-90">
                    {currentQuestion.rationale}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 다음 버튼 */}
          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              {currentQuestionIndex < selectedChapter.questions.length - 1 ? (
                <>다음 문제 <ChevronRight className="w-6 h-6 inline ml-2" /></>
              ) : (
                <>결과 확인 <Award className="w-6 h-6 inline ml-2" /></>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  // 결과 화면
  const renderResult = () => {
    const percentage = Math.round((score / selectedChapter.questions.length) * 100);
    
    let grade, message, emoji;
    if (percentage >= 90) {
      grade = "S";
      message = "완벽합니다!";
      emoji = "🏆";
    } else if (percentage >= 80) {
      grade = "A";
      message = "훌륭해요!";
      emoji = "🎉";
    } else if (percentage >= 70) {
      grade = "B";
      message = "잘했어요!";
      emoji = "👍";
    } else if (percentage >= 60) {
      grade = "C";
      message = "괜찮아요!";
      emoji = "💪";
    } else {
      grade = "D";
      message = "다시 도전!";
      emoji = "📚";
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* 메인 결과 카드 */}
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center mb-8">
            <div className="text-8xl mb-6">{emoji}</div>
            <h2 className="text-4xl font-black text-slate-800 mb-2">{message}</h2>
            <p className="text-lg text-slate-600 mb-8">{selectedChapter.title} 완료</p>

            {/* 등급 */}
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl">
              <span className="text-6xl font-black text-white">{grade}</span>
            </div>

            {/* 점수 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-black text-purple-600 mb-2">{score}</div>
                  <div className="text-sm text-slate-600">정답</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-pink-600 mb-2">{percentage}%</div>
                  <div className="text-sm text-slate-600">정답률</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-blue-600 mb-2">{formatTime(timeSpent)}</div>
                  <div className="text-sm text-slate-600">소요시간</div>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-4">
              <button
                onClick={() => startQuiz(selectedChapter, false)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                다시 풀기
              </button>
              <button
                onClick={() => startQuiz(selectedChapter, true)}
                className="flex-1 bg-slate-100 text-slate-800 py-4 px-6 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                <BookOpen className="w-5 h-5 inline mr-2" />
                복습하기
              </button>
              <button
                onClick={backToMenu}
                className="flex-1 bg-white border-2 border-slate-200 text-slate-700 py-4 px-6 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                <Menu className="w-5 h-5 inline mr-2" />
                메뉴
              </button>
            </div>
          </div>

          {/* 격려 메시지 */}
          <div className="text-center text-white/80">
            <p className="text-lg">
              {percentage >= 80 
                ? "🌟 완벽한 실력입니다! 다른 챕터도 도전해보세요!" 
                : percentage >= 60
                ? "💡 좋아요! 복습을 통해 더 나아질 수 있어요!"
                : "📚 포기하지 마세요! 학습 모드로 개념을 다시 익혀보세요!"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // 오답 노트 복습 모드 렌더링
  const renderReviewMode = () => {
    if (wrongAnswers.length === 0) {
      setReviewMode(false);
      setCurrentScreen('menu');
      return null;
    }

    const currentWrong = wrongAnswers[currentQuestionIndex];
    if (!currentWrong) {
      setReviewMode(false);
      setCurrentQuestionIndex(0);
      setCurrentScreen('menu');
      return null;
    }

    const progress = ((currentQuestionIndex + 1) / wrongAnswers.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => {
                setReviewMode(false);
                setCurrentQuestionIndex(0);
                setCurrentScreen('menu');
              }}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">돌아가기</span>
            </button>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="font-bold text-red-300">오답 복습 모드</span>
            </div>
          </div>

          {/* 진행률 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-400" />
                틀린 문제 다시 풀기
              </h2>
              <span className="text-sm font-bold text-purple-200">
                {currentQuestionIndex + 1} / {wrongAnswers.length}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 문제 카드 */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl mb-8">
            {/* 오답 표시 */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                이전에 틀린 문제
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                {currentWrong.chapter}
              </span>
            </div>

            {/* 문제 */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-black text-lg flex-shrink-0">
                  Q
                </div>
                <h3 className="text-2xl font-bold text-slate-800 leading-relaxed flex-1">
                  {currentWrong.question}
                </h3>
              </div>

              {/* 이전 선택 (틀린 답) */}
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-900 mb-1">이전에 선택한 답</p>
                    <p className="text-sm text-red-800">{currentWrong.yourAnswer}</p>
                  </div>
                </div>
              </div>

              {/* 정답 표시 */}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-green-900 mb-1">정답</p>
                    <p className="text-sm text-green-800 font-bold">{currentWrong.correctAnswer}</p>
                  </div>
                </div>
              </div>

              {/* 해설 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  해설
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  {currentWrong.rationale}
                </p>
              </div>

              {/* 학습 내용 */}
              {currentWrong.studyContent && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    심화 학습
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    {currentWrong.studyContent}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <div className="flex gap-4">
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-6 rounded-2xl transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                이전 문제
              </button>
            )}
            
            {currentQuestionIndex < wrongAnswers.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-6 rounded-2xl transition-all shadow-lg shadow-pink-500/50 flex items-center justify-center gap-2"
              >
                다음 문제
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setReviewMode(false);
                  setCurrentQuestionIndex(0);
                  setCurrentScreen('menu');
                }}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-6 rounded-2xl transition-all shadow-lg shadow-green-500/50 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                복습 완료
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 메인 렌더링
  return (
    <div className="font-sans antialiased">
      {currentScreen === 'menu' && renderMenu()}
      {currentScreen === 'study' && renderStudyMode()}
      {currentScreen === 'quiz' && !reviewMode && renderQuiz()}
      {currentScreen === 'quiz' && reviewMode && renderReviewMode()}
      {currentScreen === 'result' && renderResult()}
    </div>
  );
};

export default EnhancedBioLearningApp;

