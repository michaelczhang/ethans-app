import type { AppLanguage } from "@/lib/display-settings";

export type TranslationKey =
  | "settings"
  | "settingsTitle"
  | "closeSettings"
  | "difficulty"
  | "answerMode"
  | "display"
  | "darkMode"
  | "darkModeDesc"
  | "blindMode"
  | "blindModeDesc"
  | "translation"
  | "translationDesc"
  | "pickCategory"
  | "byEcz"
  | "chooseGroup"
  | "difficultyLabel"
  | "modeLabel"
  | "quiz"
  | "quizzes"
  | "backToCategories"
  | "pickQuiz"
  | "backToHome"
  | "submit"
  | "nextQuestion"
  | "seeResults"
  | "visit"
  | "visits";

const STRINGS: Record<AppLanguage, Record<TranslationKey, string>> = {
  en: {
    settings: "Settings",
    settingsTitle: "Settings",
    closeSettings: "Close settings",
    difficulty: "Difficulty",
    answerMode: "Answer Mode",
    display: "Display",
    darkMode: "Dark Mode",
    darkModeDesc: "Dim the interface with darker panels and backgrounds",
    blindMode: "Blind Mode",
    blindModeDesc: "High contrast, larger text, and stronger borders for low vision",
    translation: "Translation",
    translationDesc: "Choose a language for menus and buttons",
    pickCategory: "Pick a Category",
    byEcz: "by ECZ",
    chooseGroup: "Choose a group to browse quizzes inside it.",
    difficultyLabel: "Difficulty",
    modeLabel: "Mode",
    quiz: "quiz",
    quizzes: "quizzes",
    backToCategories: "← Back to Categories",
    pickQuiz: "Pick a Quiz",
    backToHome: "← Back to Home",
    submit: "Submit",
    nextQuestion: "Next Question",
    seeResults: "See Results",
    visit: "visit",
    visits: "visits",
  },
  es: {
    settings: "Ajustes",
    settingsTitle: "Ajustes",
    closeSettings: "Cerrar ajustes",
    difficulty: "Dificultad",
    answerMode: "Modo de respuesta",
    display: "Pantalla",
    darkMode: "Modo oscuro",
    darkModeDesc: "Interfaz más oscura con paneles y fondos tenues",
    blindMode: "Modo para ciegos",
    blindModeDesc: "Alto contraste, texto más grande y bordes más marcados",
    translation: "Traducción",
    translationDesc: "Elige un idioma para menús y botones",
    pickCategory: "Elige una categoría",
    byEcz: "por ECZ",
    chooseGroup: "Elige un grupo para ver sus quizzes.",
    difficultyLabel: "Dificultad",
    modeLabel: "Modo",
    quiz: "quiz",
    quizzes: "quizzes",
    backToCategories: "← Volver a categorías",
    pickQuiz: "Elige un quiz",
    backToHome: "← Volver al inicio",
    submit: "Enviar",
    nextQuestion: "Siguiente",
    seeResults: "Ver resultados",
    visit: "visita",
    visits: "visitas",
  },
  fr: {
    settings: "Paramètres",
    settingsTitle: "Paramètres",
    closeSettings: "Fermer les paramètres",
    difficulty: "Difficulté",
    answerMode: "Mode de réponse",
    display: "Affichage",
    darkMode: "Mode sombre",
    darkModeDesc: "Interface plus sombre avec des panneaux atténués",
    blindMode: "Mode malvoyant",
    blindModeDesc: "Contraste élevé, texte plus grand et bordures marquées",
    translation: "Traduction",
    translationDesc: "Choisir la langue des menus et boutons",
    pickCategory: "Choisir une catégorie",
    byEcz: "par ECZ",
    chooseGroup: "Choisissez un groupe pour parcourir les quiz.",
    difficultyLabel: "Difficulté",
    modeLabel: "Mode",
    quiz: "quiz",
    quizzes: "quiz",
    backToCategories: "← Retour aux catégories",
    pickQuiz: "Choisir un quiz",
    backToHome: "← Retour à l'accueil",
    submit: "Valider",
    nextQuestion: "Question suivante",
    seeResults: "Voir les résultats",
    visit: "visite",
    visits: "visites",
  },
  de: {
    settings: "Einstellungen",
    settingsTitle: "Einstellungen",
    closeSettings: "Einstellungen schließen",
    difficulty: "Schwierigkeit",
    answerMode: "Antwortmodus",
    display: "Anzeige",
    darkMode: "Dunkelmodus",
    darkModeDesc: "Dunklere Oberfläche mit gedämpften Panels",
    blindMode: "Sehbehindertenmodus",
    blindModeDesc: "Hoher Kontrast, größerer Text und stärkere Ränder",
    translation: "Übersetzung",
    translationDesc: "Sprache für Menüs und Schaltflächen wählen",
    pickCategory: "Kategorie wählen",
    byEcz: "von ECZ",
    chooseGroup: "Wähle eine Gruppe, um Quizze zu durchsuchen.",
    difficultyLabel: "Schwierigkeit",
    modeLabel: "Modus",
    quiz: "Quiz",
    quizzes: "Quizze",
    backToCategories: "← Zurück zu Kategorien",
    pickQuiz: "Quiz wählen",
    backToHome: "← Zurück zur Startseite",
    submit: "Absenden",
    nextQuestion: "Nächste Frage",
    seeResults: "Ergebnisse anzeigen",
    visit: "Besuch",
    visits: "Besuche",
  },
  zh: {
    settings: "设置",
    settingsTitle: "设置",
    closeSettings: "关闭设置",
    difficulty: "难度",
    answerMode: "答题模式",
    display: "显示",
    darkMode: "深色模式",
    darkModeDesc: "使用较暗的界面和面板",
    blindMode: "盲人模式",
    blindModeDesc: "高对比度、更大文字和更粗边框",
    translation: "翻译",
    translationDesc: "选择菜单和按钮的语言",
    pickCategory: "选择类别",
    byEcz: "作者 ECZ",
    chooseGroup: "选择一个分组来浏览其中的测验。",
    difficultyLabel: "难度",
    modeLabel: "模式",
    quiz: "个测验",
    quizzes: "个测验",
    backToCategories: "← 返回类别",
    pickQuiz: "选择测验",
    backToHome: "← 返回首页",
    submit: "提交",
    nextQuestion: "下一题",
    seeResults: "查看结果",
    visit: "次访问",
    visits: "次访问",
  },
};

export function t(key: TranslationKey, language: AppLanguage): string {
  return STRINGS[language][key] ?? STRINGS.en[key];
}
