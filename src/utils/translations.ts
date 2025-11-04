import { Language } from "../types";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    tasks: "Tasks",
    calendar: "Calendar",
    timer: "Timer",
    aiHelper: "AI Helper",
    profile: "Profile",

    // Home Screen
    welcomeBack: "Welcome Back",
    todayProgress: "Today's Progress",
    weeklyProgress: "Weekly Progress",
    tasksCompleted: "Tasks Completed",
    currentStreak: "Day Streak",
    motivationalQuote: "Quote of the Day",
    studyTip: "Study Tip",

    // Tasks
    addTask: "Add Task",
    editTask: "Edit Task",
    deleteTask: "Delete Task",
    taskTitle: "Task Title",
    taskDescription: "Description",
    category: "Category",
    dueDate: "Due Date",
    reminder: "Reminder",
    homework: "Homework",
    project: "Project",
    exam: "Exam",
    other: "Other",
    pending: "Pending",
    completed: "Completed",

    // Timer
    studySession: "Study Session",
    breakTime: "Break Time",
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    minutes: "minutes",
    backgroundMusic: "Background Music",

    // AI Helper
    askQuestion: "Ask a question...",
    chatMode: "Chat Mode",
    grammarMode: "Grammar Checker",
    checkGrammar: "Check Grammar",

    // Profile
    username: "Username",
    language: "Language",
    theme: "Theme",
    studyPalName: "Study Pal Name",
    studyPalAnimal: "Study Pal Animal",
    animations: "Animations",
    notifications: "Notifications",
    logout: "Logout",

    // Groups
    myGroups: "My Groups",
    createGroup: "Create Group",
    joinGroup: "Join Group",
    groupName: "Group Name",
    groupDescription: "Description",

    // Common
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    done: "Done",
    close: "Close",
    yes: "Yes",
    no: "No",
    settings: "Settings",

    // Animals
    cat: "Cat",
    bunny: "Bunny",
    bear: "Bear",
    dog: "Dog",
    fox: "Fox",
    panda: "Panda",
  },
  es: {
    // Navigation
    home: "Inicio",
    tasks: "Tareas",
    calendar: "Calendario",
    timer: "Temporizador",
    aiHelper: "Asistente IA",
    profile: "Perfil",

    // Home Screen
    welcomeBack: "Bienvenido de nuevo",
    todayProgress: "Progreso de hoy",
    weeklyProgress: "Progreso semanal",
    tasksCompleted: "Tareas completadas",
    currentStreak: "Racha de días",
    motivationalQuote: "Frase del día",
    studyTip: "Consejo de estudio",

    // Tasks
    addTask: "Añadir tarea",
    editTask: "Editar tarea",
    deleteTask: "Eliminar tarea",
    taskTitle: "Título de la tarea",
    taskDescription: "Descripción",
    category: "Categoría",
    dueDate: "Fecha de vencimiento",
    reminder: "Recordatorio",
    homework: "Deberes",
    project: "Proyecto",
    exam: "Examen",
    other: "Otro",
    pending: "Pendiente",
    completed: "Completado",

    // Timer
    studySession: "Sesión de estudio",
    breakTime: "Tiempo de descanso",
    start: "Iniciar",
    pause: "Pausar",
    resume: "Reanudar",
    stop: "Detener",
    minutes: "minutos",
    backgroundMusic: "Música de fondo",

    // AI Helper
    askQuestion: "Haz una pregunta...",
    chatMode: "Modo chat",
    grammarMode: "Corrector gramatical",
    checkGrammar: "Verificar gramática",

    // Profile
    username: "Nombre de usuario",
    language: "Idioma",
    theme: "Tema",
    studyPalName: "Nombre del compañero",
    studyPalAnimal: "Animal del compañero",
    animations: "Animaciones",
    notifications: "Notificaciones",
    logout: "Cerrar sesión",

    // Groups
    myGroups: "Mis grupos",
    createGroup: "Crear grupo",
    joinGroup: "Unirse a grupo",
    groupName: "Nombre del grupo",
    groupDescription: "Descripción",

    // Common
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    done: "Hecho",
    close: "Cerrar",
    yes: "Sí",
    no: "No",
    settings: "Configuración",

    // Animals
    cat: "Gato",
    bunny: "Conejo",
    bear: "Oso",
    dog: "Perro",
    fox: "Zorro",
    panda: "Panda",
  },
  fr: {
    // Navigation
    home: "Accueil",
    tasks: "Tâches",
    calendar: "Calendrier",
    timer: "Minuteur",
    aiHelper: "Assistant IA",
    profile: "Profil",

    // Home Screen
    welcomeBack: "Bon retour",
    todayProgress: "Progrès du jour",
    weeklyProgress: "Progrès hebdomadaire",
    tasksCompleted: "Tâches terminées",
    currentStreak: "Série de jours",
    motivationalQuote: "Citation du jour",
    studyTip: "Conseil d'étude",

    // Tasks
    addTask: "Ajouter une tâche",
    editTask: "Modifier la tâche",
    deleteTask: "Supprimer la tâche",
    taskTitle: "Titre de la tâche",
    taskDescription: "Description",
    category: "Catégorie",
    dueDate: "Date d'échéance",
    reminder: "Rappel",
    homework: "Devoirs",
    project: "Projet",
    exam: "Examen",
    other: "Autre",
    pending: "En attente",
    completed: "Terminé",

    // Timer
    studySession: "Session d'étude",
    breakTime: "Temps de pause",
    start: "Démarrer",
    pause: "Pause",
    resume: "Reprendre",
    stop: "Arrêter",
    minutes: "minutes",
    backgroundMusic: "Musique de fond",

    // AI Helper
    askQuestion: "Posez une question...",
    chatMode: "Mode chat",
    grammarMode: "Correcteur grammatical",
    checkGrammar: "Vérifier la grammaire",

    // Profile
    username: "Nom d'utilisateur",
    language: "Langue",
    theme: "Thème",
    studyPalName: "Nom du compagnon",
    studyPalAnimal: "Animal du compagnon",
    animations: "Animations",
    notifications: "Notifications",
    logout: "Se déconnecter",

    // Groups
    myGroups: "Mes groupes",
    createGroup: "Créer un groupe",
    joinGroup: "Rejoindre un groupe",
    groupName: "Nom du groupe",
    groupDescription: "Description",

    // Common
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    done: "Terminé",
    close: "Fermer",
    yes: "Oui",
    no: "Non",
    settings: "Paramètres",

    // Animals
    cat: "Chat",
    bunny: "Lapin",
    bear: "Ours",
    dog: "Chien",
    fox: "Renard",
    panda: "Panda",
  },
  de: {
    // Navigation
    home: "Startseite",
    tasks: "Aufgaben",
    calendar: "Kalender",
    timer: "Timer",
    aiHelper: "KI-Assistent",
    profile: "Profil",

    // Home Screen
    welcomeBack: "Willkommen zurück",
    todayProgress: "Heutiger Fortschritt",
    weeklyProgress: "Wöchentlicher Fortschritt",
    tasksCompleted: "Aufgaben erledigt",
    currentStreak: "Tage-Serie",
    motivationalQuote: "Zitat des Tages",
    studyTip: "Lerntipp",

    // Tasks
    addTask: "Aufgabe hinzufügen",
    editTask: "Aufgabe bearbeiten",
    deleteTask: "Aufgabe löschen",
    taskTitle: "Aufgabentitel",
    taskDescription: "Beschreibung",
    category: "Kategorie",
    dueDate: "Fälligkeitsdatum",
    reminder: "Erinnerung",
    homework: "Hausaufgaben",
    project: "Projekt",
    exam: "Prüfung",
    other: "Andere",
    pending: "Ausstehend",
    completed: "Erledigt",

    // Timer
    studySession: "Lernsitzung",
    breakTime: "Pausenzeit",
    start: "Starten",
    pause: "Pause",
    resume: "Fortsetzen",
    stop: "Stoppen",
    minutes: "Minuten",
    backgroundMusic: "Hintergrundmusik",

    // AI Helper
    askQuestion: "Stelle eine Frage...",
    chatMode: "Chat-Modus",
    grammarMode: "Grammatikprüfer",
    checkGrammar: "Grammatik prüfen",

    // Profile
    username: "Benutzername",
    language: "Sprache",
    theme: "Thema",
    studyPalName: "Name des Lernfreunds",
    studyPalAnimal: "Tier des Lernfreunds",
    animations: "Animationen",
    notifications: "Benachrichtigungen",
    logout: "Abmelden",

    // Groups
    myGroups: "Meine Gruppen",
    createGroup: "Gruppe erstellen",
    joinGroup: "Gruppe beitreten",
    groupName: "Gruppenname",
    groupDescription: "Beschreibung",

    // Common
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    edit: "Bearbeiten",
    done: "Fertig",
    close: "Schließen",
    yes: "Ja",
    no: "Nein",
    settings: "Einstellungen",

    // Animals
    cat: "Katze",
    bunny: "Hase",
    bear: "Bär",
    dog: "Hund",
    fox: "Fuchs",
    panda: "Panda",
  },
  zh: {
    // Navigation
    home: "首页",
    tasks: "任务",
    calendar: "日历",
    timer: "计时器",
    aiHelper: "AI助手",
    profile: "个人资料",

    // Home Screen
    welcomeBack: "欢迎回来",
    todayProgress: "今日进度",
    weeklyProgress: "每周进度",
    tasksCompleted: "已完成任务",
    currentStreak: "连续天数",
    motivationalQuote: "每日名言",
    studyTip: "学习技巧",

    // Tasks
    addTask: "添加任务",
    editTask: "编辑任务",
    deleteTask: "删除任务",
    taskTitle: "任务标题",
    taskDescription: "描述",
    category: "类别",
    dueDate: "截止日期",
    reminder: "提醒",
    homework: "作业",
    project: "项目",
    exam: "考试",
    other: "其他",
    pending: "待办",
    completed: "已完成",

    // Timer
    studySession: "学习时段",
    breakTime: "休息时间",
    start: "开始",
    pause: "暂停",
    resume: "继续",
    stop: "停止",
    minutes: "分钟",
    backgroundMusic: "背景音乐",

    // AI Helper
    askQuestion: "提出问题...",
    chatMode: "聊天模式",
    grammarMode: "语法检查器",
    checkGrammar: "检查语法",

    // Profile
    username: "用户名",
    language: "语言",
    theme: "主题",
    studyPalName: "学习伙伴名称",
    studyPalAnimal: "学习伙伴动物",
    animations: "动画",
    notifications: "通知",
    logout: "退出",

    // Groups
    myGroups: "我的小组",
    createGroup: "创建小组",
    joinGroup: "加入小组",
    groupName: "小组名称",
    groupDescription: "描述",

    // Common
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    done: "完成",
    close: "关闭",
    yes: "是",
    no: "否",
    settings: "设置",

    // Animals
    cat: "猫",
    bunny: "兔子",
    bear: "熊",
    dog: "狗",
    fox: "狐狸",
    panda: "熊猫",
  },
  ja: {
    // Navigation
    home: "ホーム",
    tasks: "タスク",
    calendar: "カレンダー",
    timer: "タイマー",
    aiHelper: "AIアシスタント",
    profile: "プロフィール",

    // Home Screen
    welcomeBack: "おかえりなさい",
    todayProgress: "今日の進捗",
    weeklyProgress: "週間進捗",
    tasksCompleted: "完了したタスク",
    currentStreak: "連続日数",
    motivationalQuote: "今日の名言",
    studyTip: "学習のヒント",

    // Tasks
    addTask: "タスクを追加",
    editTask: "タスクを編集",
    deleteTask: "タスクを削除",
    taskTitle: "タスク名",
    taskDescription: "説明",
    category: "カテゴリー",
    dueDate: "期限",
    reminder: "リマインダー",
    homework: "宿題",
    project: "プロジェクト",
    exam: "試験",
    other: "その他",
    pending: "保留中",
    completed: "完了",

    // Timer
    studySession: "学習セッション",
    breakTime: "休憩時間",
    start: "開始",
    pause: "一時停止",
    resume: "再開",
    stop: "停止",
    minutes: "分",
    backgroundMusic: "BGM",

    // AI Helper
    askQuestion: "質問してください...",
    chatMode: "チャットモード",
    grammarMode: "文法チェッカー",
    checkGrammar: "文法をチェック",

    // Profile
    username: "ユーザー名",
    language: "言語",
    theme: "テーマ",
    studyPalName: "学習パートナーの名前",
    studyPalAnimal: "学習パートナーの動物",
    animations: "アニメーション",
    notifications: "通知",
    logout: "ログアウト",

    // Groups
    myGroups: "マイグループ",
    createGroup: "グループを作成",
    joinGroup: "グループに参加",
    groupName: "グループ名",
    groupDescription: "説明",

    // Common
    save: "保存",
    cancel: "キャンセル",
    delete: "削除",
    edit: "編集",
    done: "完了",
    close: "閉じる",
    yes: "はい",
    no: "いいえ",
    settings: "設定",

    // Animals
    cat: "猫",
    bunny: "うさぎ",
    bear: "くま",
    dog: "犬",
    fox: "きつね",
    panda: "パンダ",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    tasks: "المهام",
    calendar: "التقويم",
    timer: "المؤقت",
    aiHelper: "مساعد الذكاء الاصطناعي",
    profile: "الملف الشخصي",

    // Home Screen
    welcomeBack: "مرحبًا بعودتك",
    todayProgress: "تقدم اليوم",
    weeklyProgress: "التقدم الأسبوعي",
    tasksCompleted: "المهام المكتملة",
    currentStreak: "سلسلة الأيام",
    motivationalQuote: "اقتباس اليوم",
    studyTip: "نصيحة للدراسة",

    // Tasks
    addTask: "إضافة مهمة",
    editTask: "تحرير المهمة",
    deleteTask: "حذف المهمة",
    taskTitle: "عنوان المهمة",
    taskDescription: "الوصف",
    category: "الفئة",
    dueDate: "تاريخ الاستحقاق",
    reminder: "تذكير",
    homework: "الواجب المنزلي",
    project: "مشروع",
    exam: "امتحان",
    other: "أخرى",
    pending: "قيد الانتظار",
    completed: "مكتمل",

    // Timer
    studySession: "جلسة دراسية",
    breakTime: "وقت الراحة",
    start: "بدء",
    pause: "إيقاف مؤقت",
    resume: "استئناف",
    stop: "إيقاف",
    minutes: "دقائق",
    backgroundMusic: "موسيقى الخلفية",

    // AI Helper
    askQuestion: "اطرح سؤالاً...",
    chatMode: "وضع الدردشة",
    grammarMode: "مدقق القواعد",
    checkGrammar: "التحقق من القواعد",

    // Profile
    username: "اسم المستخدم",
    language: "اللغة",
    theme: "المظهر",
    studyPalName: "اسم الرفيق الدراسي",
    studyPalAnimal: "حيوان الرفيق الدراسي",
    animations: "الرسوم المتحركة",
    notifications: "الإشعارات",
    logout: "تسجيل الخروج",

    // Groups
    myGroups: "مجموعاتي",
    createGroup: "إنشاء مجموعة",
    joinGroup: "الانضمام إلى مجموعة",
    groupName: "اسم المجموعة",
    groupDescription: "الوصف",

    // Common
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تحرير",
    done: "تم",
    close: "إغلاق",
    yes: "نعم",
    no: "لا",
    settings: "الإعدادات",

    // Animals
    cat: "قطة",
    bunny: "أرنب",
    bear: "دب",
    dog: "كلب",
    fox: "ثعلب",
    panda: "باندا",
  },
};

export const useTranslation = (language: Language) => {
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return { t };
};
