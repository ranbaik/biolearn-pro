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
          studyContent: "공유결합은 생체 분자의 골격을 형성하는 강한 결합(약 400 kJ/mol)입니다. 비극성 공유결합(전기음성도 차이 < 0.5)과 극성 공유결합(차이 0.5-1.7)이 있습니다. 단일결합, 이중결합, 삼중결합으로 나뉘며, 결합 수가 많을수록 결합이 강하고 짧습니다. 이온결합은 전자 이동, 수소결합은 약한 정전기적 인력입니다.",
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
          studyContent: "생체 고분자(Biopolymer)는 단량체(monomer)가 반복적으로 결합한 중합체(polymer)입니다. (1) 탄수화물: 단당류 연결 (2) 단백질: 아미노산 연결 (3) 핵산: 뉴클레오타이드 연결. 지질은 다양한 구조를 가지며, 주로 긴 탄화수소 사슬을 포함합니다. 탈수 축합 반응으로 합성되고, 가수분해로 분해됩니다.",
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
          studyContent: "단백질 구조는 4단계로 나뉩니다: (1) 1차: 아미노산 서열 (유전자에 암호화) (2) 2차: 규칙적 접힘(α-나선, β-병풍) - 수소결합 (3) 3차: 전체 입체 구조 - 이황화 결합, 소수성 상호작용 (4) 4차: 여러 폴리펩타이드 결합. 1차 구조 하나만 바뀌어도 기능이 완전히 달라질 수 있습니다(예: 겸상적혈구).",
          relatedTopics: ["아미노산", "펩타이드 결합", "단백질 구조"]
        },
        {
          id: 3,
          question: "효소의 주요 기능은?",
          options: [
            "에너지 저장",
            "유전정보 전달",
            "화학 반응 촉매",
            "세포막 구성"
          ],
          correctIndex: 2,
          difficulty: 'easy',
          hint: "반응 속도를 빠르게 합니다.",
          rationale: "효소는 생체 촉매로서 활성화 에너지를 낮춰 화학 반응 속도를 증가시킵니다. 효소 자신은 반응 전후에 변하지 않습니다.",
          studyContent: "효소는 대부분 단백질이며, 기질 특이성을 가집니다. 활성 부위(active site)에서 기질과 결합하여 효소-기질 복합체를 형성합니다. 유도 적합 모델(induced fit)에 따라 효소가 기질에 맞게 구조를 변화시킵니다. 온도, pH, 기질 농도, 저해제 등이 효소 활성에 영향을 줍니다. 조효소(coenzyme)나 보결분자단(prosthetic group)이 필요한 경우도 있습니다.",
          relatedTopics: ["촉매", "활성 부위", "활성화 에너지"]
        },
        {
          id: 4,
          question: "DNA와 RNA의 차이점이 아닌 것은?",
          options: [
            "DNA는 2중 나선, RNA는 단일 가닥",
            "DNA는 디옥시리보스, RNA는 리보스",
            "DNA는 티민, RNA는 우라실",
            "DNA는 단백질, RNA는 핵산"
          ],
          correctIndex: 3,
          difficulty: 'easy',
          hint: "DNA와 RNA는 모두 핵산입니다.",
          rationale: "DNA와 RNA는 둘 다 핵산이며 단백질이 아닙니다. 당의 종류, 염기 구성, 가닥 수에서 차이가 있습니다.",
          studyContent: "DNA(디옥시리보핵산)와 RNA(리보핵산)의 비교: DNA는 유전정보 저장(이중나선), RNA는 유전정보 전달 및 단백질 합성(단일가닥). DNA는 안정적(디옥시리보스의 2번 탄소에 H), RNA는 불안정(OH기). 염기: DNA는 A, G, C, T / RNA는 A, G, C, U. RNA 종류: mRNA(메신저), tRNA(운반), rRNA(리보솜).",
          relatedTopics: ["핵산", "뉴클레오타이드", "유전정보"]
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
          studyContent: "인지질은 양친매성 분자로, 친수성 머리(인산기 + 글리세롤)와 소수성 꼬리(2개의 지방산)를 가집니다. 수용액에서 자발적으로 이중층을 형성하여 세포막의 기본 구조를 만듭니다. 유동성을 가져 막 단백질이 이동할 수 있으며, 콜레스테롤은 막의 유동성을 조절합니다. 선택적 투과성으로 물질 출입을 조절합니다.",
          relatedTopics: ["지질", "세포막", "양친매성"]
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
          question: "핵막이 없어 유전물질이 세포질에 퍼져 있는 세포 형태는 무엇입니까?",
          options: ["진핵세포", "원핵세포", "동물세포", "식물세포"],
          correctIndex: 1,
          difficulty: 'easy',
          hint: "박테리아가 이에 해당합니다.",
          rationale: "원핵세포(Prokaryotic cell)는 핵막이 없어 핵이 구별되지 않고 유전물질이 세포질에 존재합니다. 세균(박테리아)이 이에 속합니다.",
          studyContent: "원핵세포는 세포 생물의 두 가지 주요 유형 중 하나입니다. 진핵세포와 달리 막으로 둘러싸인 핵이 없으며, DNA가 핵양체(nucleoid)라는 영역에 모여 있습니다. 대부분의 원핵생물은 단세포이며, 박테리아와 고세균이 이 범주에 속합니다.",
          relatedTopics: ["진핵세포", "세포막", "유전물질"]
        },
        {
          id: 2,
          question: "세포 소기관 중 단백질 합성을 담당하는 리보솜(Ribosome)이 생성되는 장소는?",
          options: ["핵소체(Nucleolus)", "골지체", "소포체", "리소좀"],
          correctIndex: 0,
          difficulty: 'medium',
          hint: "핵 안에 있는 작은 구조물입니다.",
          rationale: "핵 속에 있는 핵소체는 rRNA를 합성하고 리보솜을 조립하는 역할을 합니다.",
          studyContent: "핵소체는 세포핵 내에서 가장 두드러진 구조물입니다. 주요 기능은 리보솜 RNA(rRNA) 유전자의 전사, rRNA 처리, 그리고 리보솜 소단위체의 조립입니다. 활발히 성장하는 세포는 큰 핵소체를 가지고 있습니다.",
          relatedTopics: ["리보솜", "단백질 합성", "핵"]
        },
        {
          id: 3,
          question: "세포 내 소화 기관으로, 가수분해 효소를 함유하여 노폐물이나 이물질을 분해하는 곳은?",
          options: ["사립체", "용해소체(리소좀)", "중심체", "엽록체"],
          correctIndex: 1,
          difficulty: 'easy',
          hint: "'세포의 위장'이라고 불립니다.",
          rationale: "용해소체(Lysosome)는 여러 가수분해 효소를 가지고 있어 세포 내 소화 및 방어 작용을 담당합니다.",
          studyContent: "리소좀은 산성 환경(pH 4.5-5.0)을 유지하며 40가지 이상의 가수분해 효소를 포함합니다. 손상된 세포소기관 제거(자가포식), 식균작용으로 들어온 물질 분해, 세포 사멸 과정에 관여합니다. 리소좀 저장 질환은 이 효소들의 결핍으로 발생합니다.",
          relatedTopics: ["가수분해", "자가포식", "엔도사이토시스"]
        },
        {
          id: 4,
          question: "세포막의 구조를 설명하는 모델로, 인지질 이중층에 단백질이 박혀 움직이는 형태를 무엇이라 합니까?",
          options: ["샌드위치 모델", "단위막 모델", "유동 모자이크 모델", "고정 막 모델"],
          correctIndex: 2,
          difficulty: 'medium',
          hint: "막 구성 요소들이 고정되어 있지 않고 움직입니다.",
          rationale: "유동 모자이크 모델(Fluid Mosaic Model)은 세포막이 고정되어 있지 않고 구성 성분들이 유동적으로 움직인다는 이론입니다.",
          studyContent: "1972년 Singer와 Nicolson이 제안한 이 모델은 세포막을 '2차원 액체'로 설명합니다. 인지질은 측면으로 자유롭게 이동하며, 막 단백질도 인지질 바다에서 떠다니듯 움직입니다. 이 유동성은 온도에 영향을 받으며, 막의 기능(수송, 신호전달)에 필수적입니다.",
          relatedTopics: ["인지질", "막 단백질", "세포막 투과성"]
        },
        {
          id: 5,
          question: "농도 기울기에 역행하여 물질을 수송하며, 에너지(ATP)를 소모하는 물질 이동 방식은?",
          options: ["단순 확산", "촉진 확산", "삼투 현상", "능동 수송"],
          correctIndex: 3,
          difficulty: 'medium',
          hint: "에너지가 필요하며 '펌프' 방식입니다.",
          rationale: "능동 수송(Active transport)은 저농도에서 고농도로 물질을 이동시키기 위해 에너지를 사용합니다.",
          studyContent: "능동 수송은 ATP를 소비하여 농도 기울기를 거슬러 물질을 운반합니다. 대표적 예로 Na+-K+ 펌프가 있으며, 이는 신경 세포의 막전위 유지에 필수적입니다. 1차 능동수송(ATP 직접 사용)과 2차 능동수송(농도 기울기 이용)이 있습니다.",
          relatedTopics: ["ATP", "Na+-K+ 펌프", "막 수송"]
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
          question: "대장균의 젖당 오페론에서 억제자(Repressor)가 결합하여 전사를 막는 부위는?",
          options: ["프로모터(Promoter)", "작동자(Operator)", "구조 유전자", "조절 유전자"],
          correctIndex: 1,
          difficulty: 'hard',
          hint: "프로모터와 구조 유전자 사이에 위치합니다.",
          rationale: "작동자(Operator)는 프로모터와 구조 유전자 사이에 위치하며, 억제자가 결합하면 RNA 중합효소의 진행을 막습니다.",
          studyContent: "오페론은 원핵생물의 유전자 발현 조절 단위입니다. lac 오페론의 경우, 젖당이 없을 때 억제자가 작동자에 결합해 전사를 막고, 젖당이 있으면 젖당이 억제자에 결합해 작동자에서 떨어져 나가 전사가 시작됩니다. 이는 음성 조절의 대표적 예입니다.",
          relatedTopics: ["전사 조절", "원핵생물 유전자 발현", "lac 오페론"]
        },
        {
          id: 2,
          question: "진핵세포에서 DNA가 히스톤 단백질에 감겨 응축된 구조를 무엇이라 합니까?",
          options: ["뉴클레오솜", "리보솜", "폴리솜", "인트론"],
          correctIndex: 0,
          difficulty: 'medium',
          hint: "염색질의 기본 구조 단위입니다.",
          rationale: "뉴클레오솜(Nucleosome)은 DNA가 히스톤 8량체를 감고 있는 염색질의 기본 단위입니다.",
          studyContent: "뉴클레오솜은 8개의 히스톤 단백질(H2A, H2B, H3, H4 각 2개)로 이루어진 코어에 DNA 약 147bp가 1.65바퀴 감긴 구조입니다. 이는 염색질 구조의 첫 단계이며, '염주 목걸이' 모양을 형성합니다. 히스톤 변형은 유전자 발현 조절에 중요합니다.",
          relatedTopics: ["히스톤", "염색질", "후성유전학"]
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
          question: "입안에서 분비되는 침(Saliva)에 포함되어 녹말을 엿당으로 분해하는 효소는?",
          options: ["펩신", "아밀라아제", "리파아제", "트립신"],
          correctIndex: 1,
          difficulty: 'easy',
          hint: "탄수화물을 분해하는 효소입니다.",
          rationale: "침샘에서 분비되는 아밀라아제(Amylase)는 탄수화물인 녹말을 화학적으로 분해하기 시작합니다.",
          studyContent: "침샘 아밀라아제(ptyalin)는 소화의 첫 단계에서 전분(녹말)을 말토스(엿당)와 덱스트린으로 분해합니다. 최적 pH는 약 6.8이며, 위의 산성 환경에서는 활성을 잃습니다. 침은 또한 리소자임(항균 작용)과 점액(윤활 작용)도 포함합니다.",
          relatedTopics: ["탄수화물 소화", "효소", "소화계"]
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
          question: "항체(Antibody)를 생산하여 체액성 면역을 주도하는 세포는?",
          options: ["T세포", "B세포", "NK세포", "대식세포"],
          correctIndex: 1,
          difficulty: 'medium',
          hint: "형질세포로 분화하여 항체를 만듭니다.",
          rationale: "B세포는 항원 자극을 받으면 형질세포로 분화하여 항체를 대량 생산합니다.",
          studyContent: "B림프구는 골수에서 성숙하며, 각각 특정 항원을 인식하는 항체를 표면에 가지고 있습니다. 활성화되면 형질세포(항체 분비)와 기억 B세포(장기 면역)로 분화합니다. 한 형질세포는 초당 약 2,000개의 항체를 생산할 수 있습니다.",
          relatedTopics: ["항체", "체액성 면역", "형질세포"]
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
                onClick={() => setReviewMode(true)}
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

  // 메인 렌더링
  return (
    <div className="font-sans antialiased">
      {currentScreen === 'menu' && renderMenu()}
      {currentScreen === 'study' && renderStudyMode()}
      {currentScreen === 'quiz' && renderQuiz()}
      {currentScreen === 'result' && renderResult()}
    </div>
  );
};

export default EnhancedBioLearningApp;
