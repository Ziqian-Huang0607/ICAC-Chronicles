// Rank definitions
export const RANKS = [
  { code: 'PC', name: 'Police Constable', nameZh: '警员', level: 1 },
  { code: 'SPC', name: 'Senior Police Constable', nameZh: '高级警员', level: 2 },
  { code: 'SGT', name: 'Sergeant', nameZh: '警长', level: 3 },
  { code: 'SSGT', name: 'Station Sergeant', nameZh: '警署警长', level: 4 },
  { code: 'IP', name: 'Inspector of Police', nameZh: '督察', level: 5 },
  { code: 'SIP', name: 'Senior Inspector', nameZh: '高级督察', level: 6 },
  { code: 'CIP', name: 'Chief Inspector', nameZh: '总督察', level: 7 },
  { code: 'SP', name: 'Superintendent', nameZh: '警司', level: 8 },
  { code: 'SSP', name: 'Senior Superintendent', nameZh: '高级警司', level: 9 },
  { code: 'CSP', name: 'Chief Superintendent', nameZh: '总警司', level: 10 },
  { code: 'ACP', name: 'Assistant Commissioner', nameZh: '助理警务处长', level: 11 },
  { code: 'SACP', name: 'Senior Assistant Commissioner', nameZh: '高级助理警务处长', level: 12 },
  { code: 'DCP', name: 'Deputy Commissioner', nameZh: '警务处副处长', level: 13 },
  { code: 'CP', name: 'Commissioner of Police', nameZh: '警务处处长', level: 14 }
];

// District IDs
export const DISTRICTS = {
  CENTRAL: 'central',
  WAN_CHAI: 'wan_chai',
  MONG_KOK: 'mong_kok',
  YAU_MA_TEI: 'yau_ma_tei',
  TSIM_SHA_TSUI: 'tsim_sha_tsui',
  WALLED_CITY: 'walled_city',
  NEW_TERRITORIES: 'new_territories',
  NORTH_POINT: 'north_point',
  ARSENAL_STREET: 'arsenal_street'
};

// Cover states
export const COVER_STATES = {
  CLEAR: 'clear',
  STRAINED: 'strained',
  FRACTURED: 'fractured',
  PARANOID: 'paranoid',
  EXPOSED: 'exposed'
};

// Psychological states
export const PSYCH_STATES = {
  STEADY: 'steady',
  TENSE: 'tense',
  STRESSED: 'stressed',
  TRAUMATIZED: 'traumatized'
};

// Network edge types
export const EDGE_TYPES = {
  BRIBE: 'bribe',
  ALLIANCE: 'alliance',
  BLACKMAIL: 'blackmail',
  FAMILY: 'family',
  PROTECTION: 'protection',
  RIVALRY: 'rivalry'
};

// Node types
export const NODE_TYPES = {
  OFFICER: 'officer',
  TRIAD: 'triad',
  BUSINESS: 'business',
  OFFICIAL: 'official',
  ICAC: 'icac',
  INFORMANT: 'informant'
};

// Choice consequence types
export const CONSEQUENCE_TYPES = {
  STAT_CHANGE: 'stat_change',
  RELATIONSHIP: 'relationship',
  COVER: 'cover',
  FLAG: 'flag',
  TRIGGER: 'trigger',
  NEXT_MISSION: 'next_mission',
  ITEM: 'item',
  RANK_XP: 'rank_xp',
  DISTRICT: 'district',
  NETWORK: 'network'
};

// Stats keys
export const STATS = {
  INTEGRITY: 'integrity',
  MONEY: 'money',
  PUBLIC_TRUST: 'publicTrust',
  CREDIBILITY: 'credibility',
  XP: 'xp',
  RISK: 'risk',
  PSYCH: 'psychological'
};

// Scene keys
export const SCENES = {
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
  MENU: 'MenuScene',
  GAME: 'GameScene',
  MISSION: 'MissionScene',
  DEBRIEF: 'DebriefScene',
  RANK: 'RankScene',
  SETTINGS: 'SettingsScene'
};

// LocalStorage keys
export const STORAGE_KEYS = {
  SAVE_PREFIX: 'icac_save_',
  SETTINGS: 'icac_settings',
  USER: 'icac_user',
  AUTH: 'icac_auth_state'
};

// Event keys
export const EVENTS = {
  CHOICE_MADE: 'choice-made',
  CONSEQUENCE_APPLIED: 'consequence-applied',
  RANK_UP: 'rank-up',
  COVER_CHANGE: 'cover-change',
  NETWORK_CHANGE: 'network-change',
  MISSION_START: 'mission-start',
  MISSION_COMPLETE: 'mission-complete',
  DEBRIEF_TRIGGER: 'debrief-trigger',
  SAVE_COMPLETE: 'save-complete',
  AUTH_CHANGE: 'auth-change',
  NOTIFICATION: 'notification',
  LANGUAGE_CHANGE: 'language-change'
};

// Sun Tzu chapters
export const SUNZI_CHAPTERS = [
  { id: 'shiji', name: '始计篇', nameEn: 'Laying Plans', number: 1 },
  { id: 'zuozhan', name: '作战篇', nameEn: 'Waging War', number: 2 },
  { id: 'mougong', name: '谋攻篇', nameEn: 'Attack by Stratagem', number: 3 },
  { id: 'junxing', name: '军形篇', nameEn: 'Tactical Dispositions', number: 4 },
  { id: 'bingshi', name: '兵势篇', nameEn: 'Energy', number: 5 },
  { id: 'xushi', name: '虚实篇', nameEn: 'Weak Points and Strong', number: 6 },
  { id: 'junzheng', name: '军争篇', nameEn: 'Maneuvering', number: 7 },
  { id: 'jiubian', name: '九变篇', nameEn: 'Variation in Tactics', number: 8 },
  { id: 'xingjun', name: '行军篇', nameEn: 'The Army on the March', number: 9 },
  { id: 'dixing', name: '地形篇', nameEn: 'Terrain', number: 10 },
  { id: 'jiudi', name: '九地篇', nameEn: 'The Nine Situations', number: 11 },
  { id: 'huogong', name: '火攻篇', nameEn: 'Attack by Fire', number: 12 },
  { id: 'yongjian', name: '用间篇', nameEn: 'Use of Spies', number: 13 }
];

// Leader IDs
export const LEADERS = [
  'deng_xiaoping',
  'lee_kuan_yew',
  'churchill',
  'fdr',
  'thatcher',
  'mandela',
  'stalin',
  'mao',
  'chiang_kai_shek'
];

export default {
  RANKS,
  DISTRICTS,
  COVER_STATES,
  PSYCH_STATES,
  EDGE_TYPES,
  NODE_TYPES,
  CONSEQUENCE_TYPES,
  STATS,
  SCENES,
  STORAGE_KEYS,
  EVENTS,
  SUNZI_CHAPTERS,
  LEADERS
};
