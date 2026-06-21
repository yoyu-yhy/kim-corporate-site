
export type NavItem = {
  label: string;
  href: string;
};

export type VisualAsset = {
  src?: string;
  alt: string;
};

export type ApproachItem = {
  title: string;
  description: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type CompanyProfileItem = {
  label: string;
  value: string;
};

function resolvePublicAsset(relativePath: string) {
  return `/${relativePath}`;
}

function resolveFirstPublicAsset(relativePaths: string[]) {
  return resolvePublicAsset(relativePaths[0]);
}

export const siteConfig = {
  name: "株式会社KIM",
  shortName: "KIM",
  englishName: "KIM Inc.",
  concept: "Knowledge is money",
  mission: "知識を価値に変え、事業の売上成長を加速させる。",
  description:
    "株式会社KIMは、知識・発信・テクノロジーを掛け合わせ、企業やブランドの価値を正しく届けるマーケティングカンパニーです。",
  address: "〒160-0023 東京都新宿区西新宿３丁目３−１３ 西新宿 水間ビル 6階",
  representative: "代表取締役　宮上開",
} as const;

export const navigation: NavItem[] = [
  { label: "Mission", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Clients", href: "/clients" },
  { label: "Company", href: "/company" },
];

export const visualAssets = {
  heroTypography: resolveFirstPublicAsset([
    "images/hero/kim-main-visual-text.svg",
    "images/hero/kim-main-visual-text.webp",
  ]),
  heroVisual: resolvePublicAsset("images/hero/hero-visual.jpg"),
  conceptVisual: resolvePublicAsset("images/concept/knowledge-is-money.jpg"),
  noise: resolvePublicAsset("images/backgrounds/noise.png"),
} as const;

export const homeHero = {
  title: "知識を価値に変え、売上成長を加速させる。",
  description:
    "株式会社KIMは、知識・発信・テクノロジーを掛け合わせ、企業やブランドの価値を正しく届けるマーケティングカンパニーです。",
  visual: {
    src: visualAssets.heroVisual,
    alt: "株式会社KIMのブランドイメージ",
  } satisfies VisualAsset,
} as const;

export const approachItems: ApproachItem[] = [
  {
    title: "Knowledge",
    description: "価値の核を整理する",
  },
  {
    title: "Communication",
    description: "伝わる形に変換する",
  },
  {
    title: "Technology",
    description: "成果につながる仕組みを整える",
  },
];

export const homeProofContent = {
  title: "事業成長に必要な領域を、横断的に支援する。",
  description:
    "SNS、WEB、動画、MEO、AI、インフルエンサー施策まで、目的に応じて必要な手段を組み合わせます。",
  serviceTags: [
    "Marketing",
    "SNS",
    "Movie",
    "Web / LP",
    "MEO",
    "AI Telephone",
    "Influencer",
  ],
} as const;

export const services: ServiceItem[] = [
  {
    title: "マーケティング支援",
    description: "事業課題を整理し、売上成長に向けた戦略と実行計画を設計します。",
  },
  {
    title: "SNSコンサルティング / 運用代行",
    description: "ブランド理解に基づき、日々の発信から改善まで継続的に支援します。",
  },
  {
    title: "動画制作・動画編集",
    description: "伝えたい価値を短く強く届ける動画コンテンツを制作します。",
  },
  {
    title: "WEBサイト、LP制作",
    description: "ブランドの信頼感と導線設計を両立したWeb体験を構築します。",
  },
  {
    title: "Google MEO対策",
    description: "検索接点を整え、来店・問い合わせ・認知拡大につながる基盤を作ります。",
  },
  {
    title: "AIテレフォンサービス",
    description: "機会損失を減らし、業務効率と顧客体験の両方を支援します。",
  },
  {
    title: "インフルエンサーマーケティング",
    description: "ブランドと相性の良い発信者を活用し、共感と購買行動を後押しします。",
  },
];

export const clients = [
  "VF COSMETICS",
  "新日本製薬",
  "medicube",
  "Torriden",
  "MEDIHEAL",
  "cos:mura",
  "obsero",
  "ONE THING",
  "REJURAN",
  "Anua",
  "Easydew",
  "mixsoon",
  "LAKA",
  "Hince",
  "amuse",
  "dasique",
] as const;

export const clientsNote =
  "※掲載企業・ブランド名は実績紹介用のテキスト表示です。正式公開時には掲載許諾・ロゴ利用規定をご確認ください。";

export const messageContent = {
  title: "成果に向き合うマーケティングパートナーへ。",
  body:
    "私たちは、単なる制作会社や運用代行会社ではなく、事業の成果に向き合うマーケティングパートナーでありたいと考えています。",
  signature: [siteConfig.name, siteConfig.representative],
  visual: {
    src: resolvePublicAsset("images/message/partner-network.jpg"),
    alt: "株式会社KIMのパートナーシップを表現するビジュアル",
  } satisfies VisualAsset,
} as const;

export const closingStatement = {
  title: siteConfig.concept,
  description: "知識・発信・テクノロジーで、事業成長を支援する。",
  backgroundSrc: resolvePublicAsset("images/backgrounds/closing-bg.jpg"),
} as const;

export const aboutContent = {
  introBody:
    "知識・発信・テクノロジーを掛け合わせ、企業や個人が持つ価値を正しく届けるマーケティングカンパニーです。",
  missionTitle: "知識を価値に変え、事業の売上成長を加速させる。",
  missionBody:
    "知識を価値に変え、事業の売上成長を加速させる。\n株式会社KIMは、マーケティング、SNSコンサルティング、動画編集、WEB制作、Google MEO、AIテレフォンサービスを通じて、企業や個人が持つ価値を正しく届け、売上につながる仕組みづくりを支援します。\n情報が溢れる時代において、本当に必要なのは「知っていること」ではなく、「知識をどう活かし、成果に変えるか」です。\nKIMは、Knowledge is money の理念のもと、知識・発信・テクノロジーを掛け合わせ、クライアントの成長を実現するマーケティングカンパニーを目指します。",
  representativeTitle: "代表挨拶",
  representativeMessage: [
    "株式会社KIMは、Knowledge is money を理念に、知識・発信・テクノロジーを掛け合わせ、企業の成長を支援する会社です。",
    "SNS、動画、WEB、MEO、AIなど、時代に合わせて変化する手段を活用しながら、クライアントの価値を正しく届け、売上につながる仕組みをつくることを使命としています。",
    "私たちは、単なる制作会社や運用代行会社ではなく、事業の成果に向き合うマーケティングパートナーでありたいと考えています。",
    "今後も、知識を価値に変え、クライアントの可能性を最大化できる会社を目指してまいります。",
  ],
  officeVisual: {
    src: resolvePublicAsset("images/office/tokyo-office.jpg"),
    alt: "株式会社KIMのオフィスイメージ",
  } satisfies VisualAsset,
} as const;

export const companyProfile: CompanyProfileItem[] = [
  { label: "会社名", value: siteConfig.name },
  { label: "英語名", value: siteConfig.englishName },
  { label: "代表", value: siteConfig.representative },
  { label: "所在地", value: siteConfig.address },
];
