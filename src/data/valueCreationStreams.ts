import {
  StreamCaseStudy,
  WargameRound,
  StressScenario,
  CommunicationChallenge,
  SpecialistRoleId,
} from '../types/valueCreation';

export const SPECIALIST_META: Record<
  SpecialistRoleId,
  { label: string; badge: string; focus: string }
> = {
  organizer: {
    label: 'Günlük Planlayıcı (organizer)',
    badge: 'Planlama & Lojistik',
    focus: 'Kapıdan çıkış saatleri, kontrol listeleri ve aşama takibi',
  },
  finance: {
    label: 'Kişisel Bütçe (finance)',
    badge: 'Sermaye & TCO',
    focus: 'Tek seferlik vs. tekrarlayan maliyet, resmî ücret vs. tahmini bütçe',
  },
  research: {
    label: 'Araştırma (research)',
    badge: 'Kaynak & Karşılaştırma',
    focus: 'Hollandaca terim analizi, alternatif senaryo ve kaynak doğrulaması',
  },
  analyst: {
    label: 'Analist (analyst)',
    badge: 'Risk & Marjinal Fayda',
    focus: 'Teknik/hukuki risk sınıflandırması, 5x kaldıraç ve varsayım denetimi',
  },
  reviewer: {
    label: 'Denetleyici (reviewer)',
    badge: 'Kalite & İletişim',
    focus: 'Kısa ama eksiksiz yazışma, Show Don’t Tell ve gizlilik sınırı denetimi',
  },
  twin_developer: {
    label: 'Geliştirici Asistanı (twin_developer)',
    badge: 'Mimari & Otomasyon',
    focus: 'Super Agent kurgusu, API veri çıkarımı, RAG ve izole uygulama mimarisi',
  },
};

export const FIVE_X_METHODOLOGY_PILLARS = [
  {
    stage: '1x' as const,
    name: 'Kanıt & Sınır Ayrımı',
    subtitle: 'Evidence & Cost Baseline',
    summary:
      'Tarihli görev/araştırma bağlamını doğrulanmış kalıcı olgudan ayır; tek seferlik vs. tekrarlayan ve resmî vs. tahmini maliyeti ayrıştır.',
    sourceTag: '00 - Özel Alan · 03 - Taslak §5',
  },
  {
    stage: '2x' as const,
    name: 'Sıfır Boşluklu Nedensel Zincir',
    subtitle: 'Zero-Gap Reasoning & Audit',
    summary:
      'Hiçbir mantıksal aşamayı atlamadan düşünce deneyini kur; teknik/servis raporlarının soruyu gerçekten yanıtlayıp yanıtlamadığını denetle.',
    sourceTag: 'OH005 · EX063',
  },
  {
    stage: '3x' as const,
    name: 'Asimetrik Marjinal Kaldıraç',
    subtitle: 'Low-Capex High-Marginal Utility',
    summary:
      'Yüksek maliyetli kaba kuvvet yerine en düşük yatırımla en büyük marjinal kazanımı sağlayan akıllı alternatifi ve ontolojik ağ kısayolunu seç.',
    sourceTag: 'EX065 · OH008',
  },
  {
    stage: '4x' as const,
    name: 'Hassas İcra & "Show, Don’t Tell"',
    subtitle: 'Precision Execution & Brevity',
    summary:
      'Kısa ama hiçbir kritik noktayı kaybetmeyen keskin müzakere dili kullan; soyut övgü yerine somut kanıt göster ve kapıdan çıkış saatini netleştir.',
    sourceTag: 'EX062 · OH060 · EX068',
  },
  {
    stage: '5x' as const,
    name: 'Otonom Sistem & Bileşik Değer',
    subtitle: 'Compounding Agentic Architecture',
    summary:
      'Veri izolasyonunu koruyan uzman ajan grupları, RAG/skill modülleri ve ustaya/karar vericiye doğrudan teslim edilebilir doğrulama paketleriyle değeri 5x’e katla.',
    sourceTag: 'OH019 · OH057 · U4',
  },
];

export const STREAM_CASE_STUDIES: StreamCaseStudy[] = [
  {
    id: 'stream-housing',
    code: 'STR-01',
    shortTitle: 'Konut & Renovasyon 5x',
    title: 'Konut Arama, Oda Oda Renovasyon ve Marjinal Kazanım Mimarisi',
    subtitle:
      'Wassenaar / Den Haag çevresi konut kriterleri, Hollandaca teknik/hukuki terimlerin çözümü ve düşük yatırımla en yüksek marjinal faydayı üreten akıllı senaryo.',
    eraSpan: 'Ekim 2026 (EX064, EX065, G1)',
    sourceRefs: ['EX064', 'EX065', '03 - ChatGPT Taslağı', '04 - Genişletilmiş Profil'],
    evidenceBadge: 'Kaynaklı Görev & Karar Bağlamı',
    recommendedSpecialist: 'analyst',
    baseMultiplier: 1.35,
    targetMultiplier: 5.0,
    coreInsight:
      'Ağır yıkım ve belirsiz müteahhit bütçesi (1x) yerine; oda oda görsel kapsam, iki karşılaştırılabilir senaryo ve düşük yatırımla en büyük marjinal yaşam alanı kazanımını sağlayan modüler cam bahçe/kozmetik optimizasyon (5x) modeli.',
    historicalBridge: {
      from2021:
        'Kasım 2021: GMT+7 (Güneydoğu Asya) saat diliminde mobil düzen ve dijital bulut/abonelik kurulumu.',
      to2026:
        'Ekim 2026: GMT+1 Hollanda (Wassenaar / ASH ~10 dk erişim) bağlamında 200 m² yaşam / 500 m² bahçe kriter analizi ve oda oda yatırım/maliyet mühendisliği.',
    },
    fiveXStages: [
      {
        stage: '1x',
        title: 'Kriter & Terim Normalizasyonu',
        principle: '200 m² / 500 m² Çelişki Kontrolü & Hollandaca Terim Çözümü',
        description:
          '200 m² yaşam alanı ve 500 m² arsa kriterinin tek zorunlu filtre mi yoksa iki ayrı kategori mi olduğunu ayrıştır; bouwkundige keuring, erfpacht ve overdrachtsbelasting terimlerini netleştir.',
        metricImpact: 'Yanlış ilan elemelerinde %40 zaman tasarrufu',
      },
      {
        stage: '2x',
        title: 'Oda Oda Eksiksiz Görsel ve Teknik Kapsam',
        principle: 'Hiçbir Odayı ve Bahçe Açısını Atlamayan Denetim [EX065]',
        description:
          'Yalnızca salon/mutfak değil, tüm odaları, çatı/tesisat noktalarını ve bahçe açılarını kapsayan eksiksiz durum matrisi oluştur.',
        metricImpact: 'Gizli tadilat sürprizlerinde %65 azalma',
      },
      {
        stage: '3x',
        title: 'İki Senaryo + Düşük Yatırımlı Akıllı Alternatif',
        principle: 'En Yüksek Marjinal Fayda Kaldıracı [EX065]',
        description:
          'Tam kapsamlı ağır inşaat (Senaryo A) ve orta yenileme (Senaryo B) yanına, kısa vadede ağır yıkıma girmeden maksimum değer üreten "5x Akıllı Çözüm" (stratejik yüzey + aydınlatma + modüler cam bahçe/serre hazırlığı) ekle.',
        metricImpact: 'Birim Euro başına 3.4x marjinal kullanım değeri',
      },
      {
        stage: '4x',
        title: 'Tek Seferlik / Tekrarlayan & Resmî / Tahmini Ayrımı',
        principle: 'Finansal Şeffaflık & Toplam Sahip Olma Maliyeti [Taslak §5]',
        description:
          'Tapu devir vergisi ve noter gibi resmî tek seferlik kalemleri, tahmini usta işçiliğinden ve yıllık enerji/bakım giderlerinden kesin çizgiyle ayır.',
        metricImpact: 'Bütçe sapma bandının ±%25’ten ±%7’ye çekilmesi',
      },
      {
        stage: '5x',
        title: 'Ustaya Doğrudan Teslim Edilebilir İcra Paketi',
        principle: 'Uçtan Uca Teslim Edilmiş PDF/Dosya Standardı [EX065]',
        description:
          'Soyut tavsiye yerine doğrudan yükleniciye/ustaya verilebilecek oda oda iş kalemi, malzeme kodu ve faz planı içeren doğrulama paketi.',
        metricImpact: '5.0x Bileşik Karar & İcra Hızı',
      },
    ],
    levers: [
      {
        id: 'housing-smart-scope',
        label: 'Düşük Yatırım / Yüksek Marjinal Kazanım Oranı',
        unit: '%',
        min: 10,
        max: 100,
        step: 5,
        defaultValue: 55,
        optimalValue: 85,
        description:
          'Ağır yapısal yıkım yerine yüksek marjinal faydalı akıllı dokunuş ve modüler cam bahçe (serre) odaklı kapsam oranı.',
      },
      {
        id: 'housing-room-coverage',
        label: 'Oda Oda & Bahçe Görsel/Teknik Kapsam Tamlığı',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 60,
        optimalValue: 100,
        description:
          'Tüm odaların, ıslak hacimlerin ve bahçe açılarının ustaya aktarılabilir netlikte belgelenme düzeyi.',
      },
      {
        id: 'housing-legal-audit',
        label: 'Hollandaca Teknik/Hukuki Terim & Ekspertiz Derinliği',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 50,
        optimalValue: 95,
        description:
          'Bouwkundige keuring, erfpacht, asbest ve belediye imar (bestemmingsplan) kontrollerinin karar öncesi tamamlanma oranı.',
      },
    ],
    costSplit: [
      {
        id: 'hc-1',
        label: 'Devir Vergisi (Overdrachtsbelasting %2) & Noter/Kayıt',
        category: 'tek-seferlik',
        certainty: 'resmi-ucret',
        baselineAmountEur: 28500,
        optimized5xAmountEur: 28500,
        note: 'Hollanda resmî alım harçları; 1x ve 5x senaryolarında sabit yasal tabandır.',
      },
      {
        id: 'hc-2',
        label: 'Yapısal Ekspertiz (Bouwkundige Keuring) & Değerleme',
        category: 'tek-seferlik',
        certainty: 'resmi-ucret',
        baselineAmountEur: 1450,
        optimized5xAmountEur: 1950,
        note: '5x modelinde kapsamlı termal/çatı/nem taraması eklenerek gizli kusur riski erken elenir.',
      },
      {
        id: 'hc-3',
        label: 'Oda Oda İç Renovasyon & Mutfak/Banyo Yenileme',
        category: 'tek-seferlik',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 145000,
        optimized5xAmountEur: 62000,
        note: 'Ağır duvar yıkımı yerine mevcut tesisat aksını koruyan akıllı yüzey, ışık ve modüler yenileme.',
      },
      {
        id: 'hc-4',
        label: 'Bahçe Düzenlemesi & İleri Faz Kapalı Cam Uzantı (Serre) Hazırlığı',
        category: 'tek-seferlik',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 58000,
        optimized5xAmountEur: 29000,
        note: '13 Ekim 2026 notuna uygun olarak kısa vadede ağır inşaat yerine fazlandırılmış prefabrike cam bahçe altyapısı.',
      },
      {
        id: 'hc-5',
        label: 'Yıllık Enerji, Isıtma ve Hane Bakım Gideri',
        category: 'tekrarlayan',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 7800,
        optimized5xAmountEur: 4900,
        note: 'Yüksek marjinal faydalı yalıtım bandı ve akıllı ısı kontrolü ile yıllık tekrarlayan tasarruf.',
      },
      {
        id: 'hc-6',
        label: 'Belediye Emlak/Atık Vergileri (OZB & Waterschapsbelasting)',
        category: 'tekrarlayan',
        certainty: 'resmi-ucret',
        baselineAmountEur: 2400,
        optimized5xAmountEur: 2400,
        note: 'Belediye tarifesine bağlı yıllık resmî tekrarlayan gider.',
      },
    ],
    decisionMatrix: {
      need: 'Wassenaar / Den Haag hattında (ASH erişimi gözetilerek) yaşam alanı/bahçe dengesini sağlayan, kısa vadede ağır inşaat kaosuna sokmadan en yüksek yaşam ve sermaye değerini üreten konut ve renovasyon kararı.',
      options: [
        {
          name: 'Tam Yıkım & Ağır Yeniden İnşaat',
          tag: 'Senaryo A (1x)',
          summary: 'Taşıyıcı planı değiştiren, 6–9 ay süren yüksek bütçeli ve izin bağımlı tam tadilat.',
          multiplier: '1.2x',
        },
        {
          name: 'Standart Oda Oda Yenileme',
          tag: 'Senaryo B (2.5x)',
          summary: 'Mevcut planı koruyarak tüm odalarda standart müteahhit paketiyle orta ölçekli yenileme.',
          multiplier: '2.5x',
        },
        {
          name: 'Marjinal Kazanım Odaklı Akıllı Fazlandırma + Serre Opsiyonu',
          tag: '5x Akıllı Alternatif',
          summary: 'Kritik odalarda yüksek etkili kozmetik/fonksiyonel dönüşüm, ustaya hazır oda oda şartname ve ileride eklenecek kapalı cam bahçe (serre) fazlandırması.',
          multiplier: '5.0x',
        },
      ],
      advantages: [
        'Kısa vadede taşınmayı geciktiren ağır inşaat ve ruhsat darboğazını ortadan kaldırır.',
        'Tek seferlik tahmini renovasyon sermayesinde ~112.000 € nakit koruma sağlar.',
        'Ustaya doğrudan teslim edilebilir oda oda görsel/metraj paketiyle fiyat şişirmesini önler.',
      ],
      technicalAndLegalRisks: [
        {
          type: 'Teknik Risk',
          item: 'Eski Hollanda konutlarında çatı/nem, kurşun boru veya asbest kalıntısı',
          mitigation: 'Teklif şerhine kapsamlı Bouwkundige Keuring maddesi eklenmesi.',
        },
        {
          type: 'Hukuki / İdari Risk',
          item: 'Kapalı cam bahçe (serre) uzantısının belediye imar (Vergunningsvrij vs. Omgevingsvergunning) sınırı',
          mitigation: 'Arka bahçe derinliği ve komşu sınırına göre ruhsatsız yapılabilecek m² sınırının önceden teyidi.',
        },
        {
          type: 'Finansal / Bilgi Asimetrisi',
          item: '200 m² yaşam alanı ve 500 m² arsa kriterinin ilanlarda brüt/net (GO vs. BVO) farklı yazılması',
          mitigation: 'NEN 2580 ölçüm raporunun ilan verisiyle birebir karşılaştırılması.',
        },
      ],
      expertInspectionsRequired: [
        'Bağımsız Yapı Eksperi (Bouwkundige Keuring - NEN 2767)',
        'Hollanda İpotek & Vergi Danışmanı (Hypotheekadviseur / Notaris)',
        'Cam Bahçe / Yüklenici Teknik Keşif Uzmanı',
      ],
      certaintyVsProbability: {
        verifiedFacts: [
          'Ekim 2026’da Wassenaar ve ASH (~10 dk sürüş) çevresinde konut araştırması ve oda oda 2 senaryolu + düşük yatırımlı alternatif talebi kayıtlıdır [EX064, EX065].',
          '13 Ekim 2026 kaydında kısa vadede büyük yeniden inşaat istenmediği, ileride kapalı cam bahçe/oda uzantısının düşünülebileceği belirtilmiştir.',
        ],
        probabilitiesAndAssumptions: [
          'Herhangi bir evin fiilen satın alındığı veya renovasyon bütçesinin onaylandığı varsayılmaz (tarihli görev bağlamıdır).',
          'Tahmini usta maliyetleri 2026 Hollanda piyasa medyanına göre modellenmiş olup kesin teklif yerine geçmez.',
        ],
      },
      recommendationAndRationale:
        'Karar öncesi 200 m² / 500 m² filtresini NEN 2580 net kullanım alanına göre sabitleyip, ağır inşaat yerine "5x Akıllı Alternatif" (oda oda ustaya hazır şartname + fazlandırılmış cam bahçe) ile ilerlemek sermaye ve zaman çarpanını maksimize eder.',
      preDecisionVerifications: [
        '200 m² yaşam ve 500 m² bahçe kriteri birlikte zorunlu mu, iki ayrı kategori mi netleştirildi mi?',
        'NEN 2580 net metrekare ve Energielabel sınıfı resmi belgeden kontrol edildi mi?',
        'Bouwkundige Keuring raporunda tek seferlik acil onarım kalemleri ayrıştırıldı mı?',
        'Ustaya verilecek oda oda + bahçe görsel şartnamesi PDF olarak tamamlandı mı?',
      ],
    },
    kpiUnit: '€ Optimize Sermaye',
    baseUtilityScore: 88,
  },
  {
    id: 'stream-mobility',
    code: 'STR-02',
    shortTitle: 'Mobilite & Keskin Müzakere 5x',
    title: 'Araç Teknik Rapor Denetimi, Değişim Analizi ve "Kısa Ama Eksiksiz" İletişim',
    subtitle:
      'Car Issues Review (onarım/boya geçmişi yeterlilik denetimi), 2024→2026 model değişim bağlamı, şarj operasyonu ve bilgi kaybı sıfır olan keskin müzakere standardı.',
    eraSpan: 'Eylül – 5 Kasım 2026 (EX062, EX063, G1)',
    sourceRefs: ['EX062', 'EX063', 'OH014', '03 - ChatGPT Taslağı'],
    evidenceBadge: 'Doğrulanmış Tarihli İz + Görev Bağlamı',
    recommendedSpecialist: 'reviewer',
    baseMultiplier: 1.4,
    targetMultiplier: 5.0,
    coreInsight:
      'Servis raporundaki yuvarlak ifadeleri olduğu gibi kabul etmek (1x) veya mesajı kısaltırken kritik teknik tespitleri düşürmek yerine; raporun soruyu gerçekten yanıtlayıp yanıtlamadığını denetleyen ve "kısa ama hiçbir önemli noktayı atlamayan" 5x müzakere protokolü.',
    historicalBridge: {
      from2021:
        'Kasım 2021: Bireysel hesap/abonelik bildirimleri ve yerel şehir içi ulaşım düzeni.',
      to2026:
        'Ekim–Kasım 2026: Hollanda elektrikli/hibrit mobilite (BMW Charging ödeme akışı, 2024 BMW 750e → 2026 model değişim bağlamı) ve teknik rapor denetimi.',
    },
    fiveXStages: [
      {
        stage: '1x',
        title: 'Ham Rapor & Abonelik Envanteri',
        principle: 'Mevcut Kayıt ve Fatura Durumunun Tespiti',
        description:
          'Araç kontrol PDF raporunu, şarj aboneliği ödeme durumunu ve değişim anlaşması notlarını tek dosyada topla; raporda yazmayanı kesin gerçek sayma.',
        metricImpact: 'Belge dağınıklığının %100 giderilmesi',
      },
      {
        stage: '2x',
        title: 'Yanıt Yeterlilik Denetimi (Soru vs. Rapor)',
        principle: 'Rapor Soruyu Gerçekten Yanıtlıyor mu? [EX063]',
        description:
          'Onarım ve boya geçmişi hakkındaki teknik raporun sorulan spesifik soruları kapatıp kapatmadığını madde madde denetle; açık kalan mikron/parça sorularını işaretle.',
        metricImpact: 'Bilgi asimetrisinde %75 düşüş',
      },
      {
        stage: '3x',
        title: 'TCO & Değişim Kaldıracı Analizi',
        principle: 'Tek Seferlik Fark vs. Tekrarlayan Şarj/Garanti Maliyeti',
        description:
          '2024 modelden 2026 modele geçiş anlaşmasındaki tek seferlik nakit/takas farkını, garanti uzatımı, BPM/MRB vergi etkisi ve şarj maliyetleriyle karşılaştır.',
        metricImpact: '3 yıllık TCO öngörülebilirliğinde 3.2x artış',
      },
      {
        stage: '4x',
        title: '"Kısa Ama Eksiksiz" Müzakere Taslağı',
        principle: 'Yüksek Bilgi Yoğunluklu Keskin İletişim [EX062]',
        description:
          '3 Kasım 2026 ilkesi: E-postayı satıcı/servis için kısa ve keskin tutarken, kısaltma sırasında hiçbir teknik kusur veya garanti şartının düşmesine izin verme.',
        metricImpact: 'Müzakere geri dönüş hızında 4.1x iyileşme',
      },
      {
        stage: '5x',
        title: 'Sözleşme & Teslimat Doğrulama Kalkanı',
        principle: 'Açık Onaylı İcra ve Garanti Kapanışı',
        description:
          'Herhangi bir ödeme/onay öncesi eksik rapor sorularını kapatan, şarj/fatura otomasyonunu doğrulayan ve teslimat statüsünü kanıta bağlayan 5x kontrol standardı.',
        metricImpact: '5.0x Hukuki ve Finansal Koruma',
      },
    ],
    levers: [
      {
        id: 'mob-audit-depth',
        label: 'Teknik Rapor & Boya/Onarım Yanıt Yeterlilik Denetimi',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 60,
        optimalValue: 95,
        description:
          'Servis raporunun sorulan soruyu gerçekten yanıtlayıp yanıtlamadığını satır satır sorgulama keskinliği [EX063].',
      },
      {
        id: 'mob-brevity-completeness',
        label: '"Kısa Ama Eksiksiz" Yazışma Bilgi Yoğunluğu',
        unit: '%',
        min: 30,
        max: 100,
        step: 5,
        defaultValue: 65,
        optimalValue: 100,
        description:
          'Gereksiz dolgu cümlelerini atarken kritik teknik/hukuki maddelerin %100 korunma oranı [EX062].',
      },
      {
        id: 'mob-tco-optimization',
        label: 'Garanti, Değişim & Şarj TCO Optimizasyonu',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 55,
        optimalValue: 90,
        description:
          'Tek seferlik değişim maliyeti ile tekrarlayan şarj, sigorta ve bakım kalemlerinin birlikte optimize edilmesi.',
      },
    ],
    costSplit: [
      {
        id: 'mc-1',
        label: 'Model Değişim / Değer Kaybı & Teslimat Farkı Karşılığı',
        category: 'tek-seferlik',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 18500,
        optimized5xAmountEur: 7500,
        note: 'Eksiksiz teknik rapor denetimi ve kusur/geçmiş belgeleriyle güçlendirilmiş müzakere pozisyonu.',
      },
      {
        id: 'mc-2',
        label: 'Bağımsız Ekspertiz / Boya Mikron & Batarya SoH Teyidi',
        category: 'tek-seferlik',
        certainty: 'resmi-ucret',
        baselineAmountEur: 0,
        optimized5xAmountEur: 420,
        note: '1x senaryoda atlanan, 5x senaryoda belirsizliği kapatan bağımsız kontrol ücreti.',
      },
      {
        id: 'mc-3',
        label: 'Yıllık Hollanda Yol Vergisi (MRB) & Tescil Harçları',
        category: 'tekrarlayan',
        certainty: 'resmi-ucret',
        baselineAmountEur: 1680,
        optimized5xAmountEur: 1680,
        note: 'PHEV/EV ağırlık ve emisyon sınıfına göre belirlenen resmî vergi kalemi.',
      },
      {
        id: 'mc-4',
        label: 'Yıllık Şarj (BMW Charging / Ev / Hızlı Şarj) & Enerji',
        category: 'tekrarlayan',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 3100,
        optimized5xAmountEur: 1950,
        note: 'Doğru tarife ve abonelik yapılandırmasıyla optimize edilen yıllık enerji gideri.',
      },
      {
        id: 'mc-5',
        label: 'Garanti Dışı Beklenmeyen Onarım / Değer Kaybı Riski',
        category: 'tekrarlayan',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 4800,
        optimized5xAmountEur: 900,
        note: 'Onarım/boya geçmişinin yazılı teyit altına alınmasıyla düşürülen yıllık risk karşılığı.',
      },
    ],
    decisionMatrix: {
      need: 'Araç kontrol raporundaki açık noktaları netleştirmek, 2024→2026 değişim/teslimat sürecindeki belirsizlikleri kapatmak ve karşı tarafa kısa ama hiçbir kritik detayı atlamayan keskin bir bildirim yapmak.',
      options: [
        {
          name: 'Mevcut Servis Raporunu Sorgulamadan Kabul',
          tag: 'Senaryo A (1x)',
          summary: 'Rapordaki genel ifadeleri yeterli sayıp ek soru sormadan süreci kapatmak.',
          multiplier: '1.0x',
        },
        {
          name: 'Uzun ve Dağınık Hukuki İhtar Metni',
          tag: 'Senaryo B (2.5x)',
          summary: 'Tüm detayları içeren ancak ana talebi gölgeleyen 3 sayfalık bürokratik metin.',
          multiplier: '2.3x',
        },
        {
          name: 'Yanıt Yeterlilik Matrisi + "Kısa ve Eksiksiz" Müzakere Protokolü',
          tag: '5x Akıllı Alternatif',
          summary: 'Raporun yanıtlamadığı 3 kritik soruyu nokta atışı listeleyen, kendi doğal/keskin tonunda ve sıfır bilgi kayıplı mesaj + TCO doğrulaması.',
          multiplier: '5.0x',
        },
      ],
      advantages: [
        'Kısaltma nedeniyle kritik teknik tespitlerin (boya/onarım geçmişi, garanti kapsamı) metinden düşmesini engeller [EX062].',
        'Raporda bulunmayan bilginin araç hakkında kesin olumlu/olumsuz hüküm gibi kaydedilmesini önler [EX063].',
        'Şarj aboneliği ve ödeme güncellemeleri gibi operasyonel adımları tek akışta kapatır.',
      ],
      technicalAndLegalRisks: [
        {
          type: 'Teknik Risk',
          item: 'Servis raporunda kozmetik görünen işlemin yapısal veya sensör/kalibrasyon etkisi taşıması',
          mitigation: 'Parça kodu ve boya kalınlık (mikron) tablosunun yazılı ek olarak talep edilmesi.',
        },
        {
          type: 'Hukuki / İdari Risk',
          item: '2024→2026 değişim anlaşmasındaki teslim tarihi ve garanti başlangıç şartlarının muğlak kalması',
          mitigation: 'Kısa ve eksiksiz e-postada teslimat/garanti teyidinin açık maddelerle bağlanması.',
        },
        {
          type: 'Finansal / Bilgi Asimetrisi',
          item: 'İkinci el / takas değerlemesinde geçmiş onarım kaydının sonradan değer düşürmesi',
          mitigation: 'Hasarsızlık ve onarım niteliğinin satıcı tarafından yazılı beyan altına alınması.',
        },
      ],
      expertInspectionsRequired: [
        'Yetkili Servis Başteknisyeni / Boya & Gövde Rapor Doğrulaması',
        'Hollanda Otomotiv Tüketici Hukuku / Sözleşme Kontrolü (BOVAG şartları)',
      ],
      certaintyVsProbability: {
        verifiedFacts: [
          '3 Kasım 2026’da Car Issues Review kapsamında kısa, keskin ama hiçbir önemli noktayı atlamayan e-posta taslağı istendiği doğrulanmıştır [EX062].',
          '5 Kasım 2026’da BMW Charging fatura ödeme güncelleme bilgilerinin e-posta olarak iletildiği doğrulanmıştır.',
        ],
        probabilitiesAndAssumptions: [
          '2026 model yeni aracın fiilen teslim edildiği veya eski araç dosyasının tamamen kapandığı kanıt olmadan varsayılmaz [03 - Taslak].',
        ],
      },
      recommendationAndRationale:
        'Raporda cevabı net olmayan her onarım/boya kalemi için ek soru hakkını kullanmak ve mesajı "kısa ama sıfır kayıplı" formatta göndermek, hem zaman hem müzakere gücünü 5x seviyesine çıkarır.',
      preDecisionVerifications: [
        'Teknik rapor sorulan onarım/boya sorusunu doğrudan ve kanıtlı yanıtlıyor mu?',
        'Kısaltılan e-posta taslağında düşen hiçbir teknik bulgu veya tarih kalmadığı doğrulandı mı?',
        '2024 → 2026 araç değişim anlaşmasının güncel teslimat ve garanti statüsü teyit edildi mi?',
        'Şarj aboneliği ödeme yöntemi güncellemesi portal üzerinden nihai onay aldı mı?',
      ],
    },
    kpiUnit: '€ Risk & TCO Koruması',
    baseUtilityScore: 91,
  },
  {
    id: 'stream-super-agent',
    code: 'STR-03',
    shortTitle: 'Super Agent & Otomasyon 5x',
    title: 'Çoklu Ajan (Super Agent) Mimarisi, Veri İzolasyonu ve Finansal Veri Çıkarımı',
    subtitle:
      'Kasım 2021 bulut kurulumundan Nisan 2026 Super Agent spesifikasyonuna, P&L API otomasyonuna ve Özel/İş/Startup alanlarını kesin ayıran otonom ajan mimarisine geçiş.',
    eraSpan: 'Kasım 2021 → Nisan–Kasım 2026 (OH019, OH057, U4)',
    sourceRefs: ['OH019', 'OH057', '00 - Özel Alan', '2021-Dijital-Kurulum'],
    evidenceBadge: 'Doğrulanmış Tarihli İz + Görev Bağlamı',
    recommendedSpecialist: 'twin_developer',
    baseMultiplier: 1.5,
    targetMultiplier: 5.0,
    coreInsight:
      'Her görevde sıfırdan tekil sohbet açmak (1x) yerine; kullanıcı isteğine göre uzman ajanlar, görev grupları, RAG/dosya araçları ve skills oluşturan, alanlar arası veri izolasyonunu (personal ≠ work ≠ startup) koruyan 5x Super Agent sistemi.',
    historicalBridge: {
      from2021:
        'Kasım 2021: OneDrive / Microsoft 365 ve Apple bulut aboneliklerinin kurulması, "Deneme" e-postası ile ilk kişisel dijital omurganın testi.',
      to2026:
        'Nisan–Kasım 2026: Super Agent mimari spesifikasyonu [OH019], kamuya açık şirket P&L API çıkarımı [OH057] ve yerel/bulut hibrit KeremTwin özel alan orkestrasyonu.',
    },
    fiveXStages: [
      {
        stage: '1x',
        title: 'Temel Bulut & Hesap Omurgası',
        principle: 'Dijital Erişim ve Depolama Standardizasyonu (Kasım 2021)',
        description:
          'E-posta, bulut depolama ve cihaz senkronizasyonunun güvenli şekilde devreye alınması.',
        metricImpact: 'Temel veri erişilebilirliği (1.0x)',
      },
      {
        stage: '2x',
        title: 'Kesin Veri İzolasyonu & Kanıt Seviyesi Etiketleme',
        principle: 'Personal ≠ Danone ≠ UNIQLM Ayrımı [00 - Özel Alan]',
        description:
          'Özel işler hafızasını iş ve startup alanlarından fiziksel ve mantıksal olarak ayır; tarihli görev bağlamını kalıcı kişisel gerçek gibi kopyalama.',
        metricImpact: 'Bağlam kirlenmesi ve gizlilik riskinde %100 koruma',
      },
      {
        stage: '3x',
        title: 'Dinamik Uzman Ajanlar, Görev Grupları ve Skills',
        principle: 'Super Agent Spesifikasyonu [OH019 - 27 Nisan 2026]',
        description:
          'Tek bir genel model yerine organizer, finance, research, analyst, reviewer ve twin_developer uzmanlarını görev grupları ve tanımlı skill dosyalarıyla koordine et.',
        metricImpact: 'Karmaşık araştırmalarda 3.5x paralel hız',
      },
      {
        stage: '4x',
        title: 'Yapılandırılmış API & Finansal Tablo Otomasyonu',
        principle: 'Ücretsiz API + VPS/Termux ile P&L Çıkarımı [OH057 - 3 Haziran 2026]',
        description:
          'Kamuya açık finansal tabloları ve yapılandırılmış kaynakları manuel kopyala-yapıştır yerine otomatik şema doğrulamasıyla analiz et.',
        metricImpact: 'Veri işleme hatasında %90 azalma',
      },
      {
        stage: '5x',
        title: 'Onay Kapılı Uçtan Uca İcra & Canlı Web Uygulamaları',
        principle: 'Araştırma Serbest, Dış İşlem Açık Onaylı [Taslak §8]',
        description:
          'Analizleri tek tuşla interaktif web uygulamasına dönüştüren, dış yazma/ödeme/gönderim adımlarında ise Telegram onay kapısını zorunlu tutan 5x otonom sistem.',
        metricImpact: '5.0x Kişisel Karar & Üretim Kaldıracı',
      },
    ],
    levers: [
      {
        id: 'agent-skill-modularity',
        label: 'Uzman Ajan (Specialist) & Skill Modülerliği [OH019]',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 70,
        optimalValue: 95,
        description:
          'Görevlerin tekil sohbet yerine uzman ajan profilleri, RAG araçları ve modüler skill tanımlarıyla yürütülme oranı.',
      },
      {
        id: 'agent-domain-isolation',
        label: 'Alan İzolasyonu & Kanıt Sınırı Disiplini [U4, D1]',
        unit: '%',
        min: 40,
        max: 100,
        step: 5,
        defaultValue: 80,
        optimalValue: 100,
        description:
          'Özel alan verisinin iş/startup alanlarından ayrılması ve doğrulanmamış AI taslaklarının gerçek kayıt sayılmaması.',
      },
      {
        id: 'agent-api-automation',
        label: 'API / Veri Çıkarımı & İnteraktif Uygulama Otomasyonu [OH057]',
        unit: '%',
        min: 10,
        max: 100,
        step: 5,
        defaultValue: 60,
        optimalValue: 90,
        description:
          'Tekrarlayan veri inceleme ve karar tablolarının interaktif araçlara ve API iş akışlarına dönüştürülme düzeyi.',
      },
    ],
    costSplit: [
      {
        id: 'ac-1',
        label: 'Çoklu Ajan & Skill Mimarisi Kurulum / Spesifikasyon Yatırımı',
        category: 'tek-seferlik',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 4200,
        optimized5xAmountEur: 950,
        note: 'Modüler skill ve yerel/bulut orkestrasyon şablonlarıyla kurulum süresinin 4 kat kısaltılması.',
      },
      {
        id: 'ac-2',
        label: 'Bulut Depolama & Temel Dijital Abonelikler (M365 / OneDrive vb.)',
        category: 'tekrarlayan',
        certainty: 'resmi-ucret',
        baselineAmountEur: 240,
        optimized5xAmountEur: 240,
        note: 'Kasım 2021’den bu yana süregelen temel bulut ve yedekleme altyapı maliyeti.',
      },
      {
        id: 'ac-3',
        label: 'Yıllık Manuel Araştırma, Belge Tasnifi ve Bağlam Kaybı Maliyeti',
        category: 'tekrarlayan',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 14400,
        optimized5xAmountEur: 2400,
        note: 'Tarihli hafıza indeksleme, uzman ajan delegasyonu ve karar matrisleriyle yılda ~240 saatlik odak kazanımı.',
      },
      {
        id: 'ac-4',
        label: 'Hafif Sunucu / VPS & Ücretsiz API Entegrasyon Gideri [OH057]',
        category: 'tekrarlayan',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 1800,
        optimized5xAmountEur: 180,
        note: 'Kamuya açık finansal veri çıkarımında pahalı kurumsal terminaller yerine ücretsiz API + hafif sunucu kullanımı.',
      },
    ],
    decisionMatrix: {
      need: 'Kişisel araştırmaları, belge/finans analizlerini ve uygulama fikirlerini; gizlilik sınırlarını (personal scope) asla ihlal etmeden 5x hızla çalışan modüler bir Super Agent sistemine dönüştürmek.',
      options: [
        {
          name: 'Tekil ve Hafızasız Sohbet Oturumları',
          tag: 'Senaryo A (1x)',
          summary: 'Her konuyu sıfırdan anlatmayı gerektiren, geçmiş karar ölçütlerini unutan klasik kullanım.',
          multiplier: '1.0x',
        },
        {
          name: 'Sınırsız Ortak Hafızalı Tek Ajan (Veri Karışımı Riski)',
          tag: 'Senaryo B (2.5x)',
          summary: 'İş, startup ve özel verileri tek havuzda toplayan; halüsinasyon ve mahremiyet riski yüksek model.',
          multiplier: '2.1x',
        },
        {
          name: 'Alan İzolasyonlu Super Agent + Skill & Onay Kapısı Mimarisi',
          tag: '5x Akıllı Alternatif',
          summary: 'Yalnızca Ozel hafızasıyla çalışan, 6 uzman ajanı koordine eden, tarihli bağlamı kanıttan ayıran ve dış işlemleri Telegram onayına bağlayan mimari.',
          multiplier: '5.0x',
        },
      ],
      advantages: [
        'Kullanıcının iletişim ve karar tercihlerini ("kısa ama eksiksiz", "düşük yatırımla marjinal fayda", "show don’t tell") her görevde otomatik uygular.',
        'Danone ve UNIQLM verileriyle kişisel verilerin birbirine karışmasını mimari düzeyde engeller.',
        'Kamuya açık veri çıkarımı (ör. P&L tabloları) ve interaktif simülasyon araçlarını dakikalar içinde üretir.',
      ],
      technicalAndLegalRisks: [
        {
          type: 'Teknik Risk',
          item: 'AI tarafından üretilen taslakların (ör. 03 - ChatGPT Taslağı) doğrulanmış kullanıcı gerçeği sanılması',
          mitigation: 'Her kayda kaynak kodu (EX/OH/LM) ve kanıt düzeyi rozeti zorunluluğu getirilmesi.',
        },
        {
          type: 'Hukuki / İdari Risk',
          item: 'Üçüncü kişilere veya çocuklara ait özel bilgilerin ya da şifrelerin model bağlamına girmesi',
          mitigation: 'En az veri ilkesi; şifre ve kimlik numaralarının hafızaya yazılmasının kesin olarak engellenmesi.',
        },
        {
          type: 'Finansal / Bilgi Asimetrisi',
          item: 'Eski bir araştırma sorusunun (ör. hisse P&L API sorusu) aktif yatırım portföyü veya işlem izni sanılması',
          mitigation: 'Tarihli görev bağlamı ile açık işlem yetkisinin birbirinden ayrılması.',
        },
      ],
      expertInspectionsRequired: [
        'Geliştirici Asistanı (twin_developer) — Skill ve Ajan Mimarisi Denetimi',
        'Denetleyici (reviewer) — Veri İzolasyonu ve Gizlilik Sınırı Kontrolü',
      ],
      certaintyVsProbability: {
        verifiedFacts: [
          '27 Nisan 2026’da uzman ajanlar, görev grupları, RAG ve skills içeren Super Agent spesifikasyonu talep edilmiştir [OH019].',
          '3 Haziran 2026’da Borsa İstanbul şirketlerinin kamuya açık kâr/zarar tablolarını ücretsiz API ile çıkaran uygulama araştırılmıştır [OH057].',
        ],
        probabilitiesAndAssumptions: [
          '27 Nisan’daki tarihsel Super Agent fikrinin bugünkü sistemle birebir aynı ticari ürün olduğu veya P&L uygulamasının kişisel portföy kanıtı olduğu varsayılmaz.',
        ],
      },
      recommendationAndRationale:
        'Super Agent mimarisini "sıkı alan izolasyonu + kanıt düzeyi etiketleme + uzman ajan delegasyonu" üçlüsüyle çalıştırmak, hem güvenliği %100 korur hem de kişisel karar hızını 5x seviyesine taşır.',
      preDecisionVerifications: [
        'Hafıza notlarında kişisel beyan ile AI taslağı birbirinden net ayrıldı mı?',
        'Şifre, kimlik numarası ve üçüncü kişi verileri genel hafıza dışına çıkarıldı mı?',
        'Dışarıya e-posta/ödeme/yayın adımları açık kullanıcı onayına bağlandı mı?',
        'Uygulama ve analiz çıktıları otomatik test (Vitest + Playwright) ile doğrulandı mı?',
      ],
    },
    kpiUnit: '€ Zaman & Sistem Değeri',
    baseUtilityScore: 94,
  },
  {
    id: 'stream-global-logistics',
    code: 'STR-04',
    shortTitle: 'Küresel Geçiş & Lojistik 5x',
    title: 'GMT+7 → GMT+1 Küresel Geçiş, Kapıdan Çıkış Lojistiği ve "Show, Don’t Tell"',
    subtitle:
      'Cakarta → Hollanda evcil hayvan taşıma prosedürü, aktarmalı ulaşımda kapıdan çıkış saati mühendisliği ve ev sahibi tanıtım mektubunda somut kanıt ("Show, Don’t Tell") standardı.',
    eraSpan: 'Kasım 2021 (GMT+7) → Mayıs–Ekim 2026 (GMT+1)',
    sourceRefs: ['OH052', 'OH060', 'EX066', 'EX068', '2021-GMT7'],
    evidenceBadge: 'Doğrulanmış Tarihli İz + Görev Bağlamı',
    recommendedSpecialist: 'organizer',
    baseMultiplier: 1.3,
    targetMultiplier: 5.0,
    coreInsight:
      'Ulaşımda yalnız hat adını söylemek veya tanıtım mektubunda soyut/yapay övgüler yazmak (1x) yerine; uçuş ve aktarmadan geriye doğru "kapıdan çıkış saatini" hesaplayan ve geçmişi küçümsemeden somut örnekle konuşan ("Show, Don’t Tell") 5x geçiş lojistiği.',
    historicalBridge: {
      from2021:
        'Kasım 2021: GMT+7 (Cakarta / Bangkok) saat diliminde yürüyen günlük işlemler, HSBC Indonesia ve bölge içi bildirimler.',
      to2026:
        'Mayıs–Ekim 2026: Cakarta → Hollanda köpek taşıma süreci [OH052], Hollanda tanıtım yazısı [OH060] ve Avrupa içi kapıdan kapıya ulaşım/aktarma planlaması [EX066, EX068].',
    },
    fiveXStages: [
      {
        stage: '1x',
        title: 'Rota ve Belge Listesi Başlangıcı',
        principle: 'Temel Seyahat & Taşınma Gereksinimleri',
        description:
          'Uçuş/otobüs saatlerinin ve uluslararası taşınma için gereken temel belge başlıklarının listelenmesi.',
        metricImpact: 'Temel görünürlük (1.0x)',
      },
      {
        stage: '2x',
        title: 'Biyolojik & İdari Takvim Kilidi (AB Pet Import)',
        principle: 'Cakarta → Hollanda Köpek Taşıma Sıralaması [OH052]',
        description:
          'ISO mikroçip, kuduz aşısı, akredite laboratuvar titrasyon (kan) testi ve AB sağlık sertifikası sürelerini hiçbir adımı atlamadan geriye doğru takvimle.',
        metricImpact: 'Karantina ve belge reddi riskinde %95 düşüş',
      },
      {
        stage: '3x',
        title: 'Kapıdan Çıkış Saati (Door-to-Door Reverse Buffer)',
        principle: 'Yalnız Rota Değil, Kapıdan Çıkış Saati [EX066, EX068]',
        description:
          'Hedef uçuş veya varış saatinden geriye doğru; bagaj, aktarma peronu, istasyona erişim modu ve güvenlik tamponunu hesaplayarak kesin "evden/kapıdan çıkış saatini" sabitle.',
        metricImpact: 'Aktarma kaçırma riskinde %90 azalma',
      },
      {
        stage: '4x',
        title: '"Show, Don’t Tell" Tanıtım & İletişim Standardı',
        principle: 'Somut Örnek Kullan, Geçmişi Küçümseme [OH060 - 17 Haziran 2026]',
        description:
          'Ev sahibi tanıtım mektubunda modelin uydurduğu yapay "dönüşüm/geçmişte saygısızdı" imalarını reddet; mülk özeni ve yaşam düzenini doğrudan somut örneklerle göster.',
        metricImpact: 'Karşı taraf güven ve kabul oranında 4.2x artış',
      },
      {
        stage: '5x',
        title: 'Çoklu Saat Dilimi & Operasyon Senkronizasyonu',
        principle: 'GMT+7 ↔ GMT+3 ↔ GMT+1 Sıfır Sürtünmeli Geçiş',
        description:
          'Ulaşım, konaklama, evcil hayvan evrakı ve yerel idari kayıt adımlarını tek bir zaman çizelgesinde birleştiren 5x lojistik protokolü.',
        metricImpact: '5.0x Lojistik Kesinlik & Huzur',
      },
    ],
    levers: [
      {
        id: 'log-door-buffer',
        label: 'Kapıdan Çıkış & Aktarma Tersine Tamponu [EX068]',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 65,
        optimalValue: 95,
        description:
          'Yalnızca kalkış saatine değil, istasyon erişimi ve aktarma yürüme sürelerine göre kapıdan çıkış saatinin netleştirilme düzeyi.',
      },
      {
        id: 'log-show-dont-tell',
        label: '"Show, Don’t Tell" Somut Kanıt Oranı [OH060]',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 60,
        optimalValue: 100,
        description:
          'Tanıtım ve başvuru metinlerinde soyut sıfatlar veya yapay klişeler yerine doğrulanabilir somut örnek kullanma oranı.',
      },
      {
        id: 'log-compliance-leadtime',
        label: 'Uluslararası Evrak & Pet Taşıma Takvim Uyumu [OH052]',
        unit: '%',
        min: 30,
        max: 100,
        step: 5,
        defaultValue: 70,
        optimalValue: 95,
        description:
          'Cakarta → AB evcil hayvan taşıma ve sınır geçiş belgelerinin yasal bekleme sürelerine uyum oranı.',
      },
    ],
    costSplit: [
      {
        id: 'lc-1',
        label: 'AB Evcil Hayvan Akredite Titrasyon Testi, Veteriner & Sertifikasyon',
        category: 'tek-seferlik',
        certainty: 'resmi-ucret',
        baselineAmountEur: 950,
        optimized5xAmountEur: 950,
        note: 'AB NVWA giriş kuralları gereği zorunlu resmî veteriner ve laboratuvar harçları.',
      },
      {
        id: 'lc-2',
        label: 'Son Dakika Uçuş/Aktarma Değişikliği & Karantina Gecikme Maliyeti',
        category: 'tek-seferlik',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 6400,
        optimized5xAmountEur: 350,
        note: 'Kapıdan çıkış saati mühendisliği ve eksiksiz belge takvimiyle sıfıra yaklaştırılan aksama maliyeti.',
      },
      {
        id: 'lc-3',
        label: 'Uluslararası Taşınma & Geçici Konaklama Tampon Bütçesi',
        category: 'tek-seferlik',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 12500,
        optimized5xAmountEur: 5800,
        note: '"Show, Don’t Tell" tanıtım dosyası ile doğru konut kabulünün hızlanması ve geçici konaklama süresinin kısalması.',
      },
      {
        id: 'lc-4',
        label: 'Bölgesel Ulaşım (Tren / FlixBus / Havalimanı Erişim) Yıllık Planlama',
        category: 'tekrarlayan',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 3200,
        optimized5xAmountEur: 1850,
        note: 'Erken rota/kapıdan çıkış optimizasyonu ile düşürülen yıllık ulaşım maliyeti.',
      },
    ],
    decisionMatrix: {
      need: 'Kıtalararası ve Avrupa içi geçişlerde (evcil hayvan prosedürü, aktarmalı ulaşım ve ev sahibi iletişimi dahil) belirsizliği ve son dakika sürprizlerini ortadan kaldıran 5x operasyon standardı.',
      options: [
        {
          name: 'Standart Harita/Bilet Saatiyle Hareket & Genel Şablon Mektup',
          tag: 'Senaryo A (1x)',
          summary: 'Sadece bilet kalkış saatine bakan ve ev sahibine klişe AI şablonu gönderen yaklaşım.',
          multiplier: '1.1x',
        },
        {
          name: 'Aşırı Erken Bilet / Yüksek Maliyetli Özel Transfer',
          tag: 'Senaryo B (2.5x)',
          summary: 'Belirsizliği para harcayarak kapatmaya çalışan ancak belge/iletişim kalitesini artırmayan yöntem.',
          multiplier: '2.4x',
        },
        {
          name: 'Kapıdan Çıkış Tersine Mühendisliği + "Show, Don’t Tell" Dosyası',
          tag: '5x Akıllı Alternatif',
          summary: 'Hedef varıştan geriye kapıdan çıkış saatini netleştiren, AB pet takvimini kilitleyen ve somut örnekli tanıtım mektubu sunan sistem.',
          multiplier: '5.0x',
        },
      ],
      advantages: [
        'Ulaşımda "hangi hat var" sorusunu "saat kaçta kapıdan çıkmalıyım" kesinliğine dönüştürür [EX068].',
        'Kişisel tanıtım yazısında geçmişi küçümseyen yapay cümleleri eler, somut güven inşa eder [OH060].',
        'Üçüncü ülke (Endonezya) → AB (Hollanda) evcil hayvan girişinde telafisi zor belge hatalarını önler [OH052].',
      ],
      technicalAndLegalRisks: [
        {
          type: 'Hukuki / İdari Risk',
          item: 'Cakarta → AB köpek girişinde kuduz titrasyon testi sonrası bekleme süresinin (3 ay kuralı) eksik hesaplanması',
          mitigation: 'Uçuş tarihinden önce laboratuvar numune tarihi ve NVWA giriş kontrolünün yapılması.',
        },
        {
          type: 'Teknik Risk',
          item: 'Aktarmalı ulaşımda (FlixBus / tren → havalimanı) peron değişimi ve bagaj süresinin atlanması',
          mitigation: 'Kapıdan çıkış saatine minimum 35–45 dk modlar arası aktarma tamponu eklenmesi.',
        },
        {
          type: 'Finansal / Bilgi Asimetrisi',
          item: 'Geçmişteki bir seyahat/vize sorusunun güncel ikamet veya vize sahipliği kanıtı sanılması',
          mitigation: 'Tarihli seyahat sorularının güncel konum verisinden ayrı tutulması [04 - Genişletilmiş Profil].',
        },
      ],
      expertInspectionsRequired: [
        'AB / NVWA Akredite Veteriner & Uluslararası Pet Lojistik Uzmanı',
        'Günlük Planlayıcı (organizer) & Metin Yazarı (writer)',
      ],
      certaintyVsProbability: {
        verifiedFacts: [
          'Kasım 2021’de GMT+7 saat dilimi izi, Mayıs–Haziran 2026’da Cakarta→Hollanda köpek taşıma [OH052] ve "Show, Don’t Tell" tanıtım mektubu [OH060] talepleri kayıtlıdır.',
          'Ekim 2026’da ulaşımda kapıdan çıkış saatinin ve aktarmaların netleştirilmesi istenmiştir [EX066, EX068].',
        ],
        probabilitiesAndAssumptions: [
          'Taşınmanın kesin tamamlanma tarihi veya güncel evcil hayvan durumu ek kanıt olmadan kalıcı olgu olarak varsayılmaz.',
        ],
      },
      recommendationAndRationale:
        'Her lojistik ve resmi iletişim adımında "tersine zaman tamponu (kapıdan çıkış)" ile "somut kanıt (show, don’t tell)" ilkelerini birleştirmek, operasyonel sürtünmeyi 5x oranında düşürür.',
      preDecisionVerifications: [
        'Hedef varış saatinden geriye doğru istasyon erişimi ve kapıdan çıkış saati hesaplandı mı?',
        'Tanıtım metninde soyut iddialar ve geçmişi küçümseyen yapay ifadeler tamamen temizlendi mi?',
        'Evcil hayvan mikroçip, titrasyon testi ve AB sağlık sertifikası tarihleri birbiriyle uyumlu mu?',
        'Tarihli seyahat soruları ile güncel konum/belge durumu birbirinden ayrıldı mı?',
      ],
    },
    kpiUnit: '€ Lojistik & Zaman Koruması',
    baseUtilityScore: 89,
  },
  {
    id: 'stream-projectivity',
    code: 'STR-05',
    shortTitle: 'Projectivity & Kültür Sentezi 5x',
    title: 'Projectivity, Ontolojik vs. Metrik Mesafe ve Karşılaştırmalı Kültür Sentezi',
    subtitle:
      'Ağ bağlantısı sayısının uzaklık olarak modellenmesi (ontolojik vs. metrik mesafe), aşama atlamayan düşünce deneyi, Adıyaman/Avrupa masal paralellikleri ve interaktif öğrenme.',
    eraSpan: 'Mart – Ekim 2026 (OH004–OH009, EX072, EX073, EX076)',
    sourceRefs: ['OH005', 'OH008', 'EX072', 'EX073', 'EX076'],
    evidenceBadge: 'Kaynaklı Görev & Karar Bağlamı',
    recommendedSpecialist: 'research',
    baseMultiplier: 1.45,
    targetMultiplier: 5.0,
    coreInsight:
      'Kavramları ve kültürleri yalnızca fiziksel/coğrafi yakınlıkla (metrik mesafe) veya kopuk özetlerle ele almak (1x) yerine; düğümler arası bağlantı sayısını (ontolojik mesafe) ölçen ve hiçbir mantıksal aşamayı atlamadan uçtan uca sentezleyen 5x düşünce mimarisi.',
    historicalBridge: {
      from2021:
        'Aralık 2021: GMT+3 saat diliminden paylaşılan çevrimiçi üniversite (Zoom) toplantı bağlantısı ve akademik iletişim izi.',
      to2026:
        'Nisan–Ekim 2026: Projectivity ve ontolojik/metrik mesafe ayrımı [OH008], aşama atlamayan düşünce deneyleri [OH005], Adıyaman–Avrupa karşılaştırmalı halk anlatıları [EX073] ve dokunmatik piyano uygulaması [EX072].',
    },
    fiveXStages: [
      {
        stage: '1x',
        title: 'Ham Kavramsal Notlar & Anlatı Seçkisi',
        principle: 'Farklı Disiplinlerden Girdilerin Toplanması',
        description:
          'Fizik/ontoloji soruları, şiir/aforizma metinleri, bölgesel masal motifleri ve interaktif müzik/tasarım fikirlerinin ham olarak kaydedilmesi.',
        metricImpact: 'Çok disiplinli fikir havuzu (1.0x)',
      },
      {
        stage: '2x',
        title: 'Ontolojik Mesafe vs. Metrik Mesafe Ayrımı',
        principle: 'Ağ Bağlantısı Sayısı Olarak Uzaklık [OH008 - 6 Nisan 2026]',
        description:
          'İki kavram, insan veya kültür arasındaki uzaklığı coğrafi kilometreyle (metrik) değil, aralarındaki nedensel/anlamsal ağ bağlantısı sayısıyla (ontolojik) modelle.',
        metricImpact: 'Disiplinlerarası örüntü yakalamada 2.8x derinlik',
      },
      {
        stage: '3x',
        title: 'Hiçbir Aşamayı Atlamayan Düşünce Deneyi',
        principle: 'Mantıksal Boşlukları Kapatma [OH005 - 5 Nisan 2026]',
        description:
          'Farklı düşünceleri tek bir aşamalı düşünce deneyinde birleştirirken, öncülden sonuca giden zincirde hiçbir ara basamağı atlama.',
        metricImpact: 'Kuramsal tutarlılık ve argüman sağlamlığında 3.6x artış',
      },
      {
        stage: '4x',
        title: 'Karşılaştırmalı Kültür & Arketip Eşleştirmesi',
        principle: 'Yerel Anlatılar ↔ Avrupa Masal Paralellikleri [EX073]',
        description:
          'Adıyaman ve Anadolu halk anlatılarını Avrupa masal motifleriyle ontolojik düğüm benzerliği üzerinden karşılaştır; kimlik/köken indirgemesi yapmadan yapısal paralellikleri çıkar.',
        metricImpact: 'Kültürel ve anlatısal sentez kalitesinde 4.3x kaldıraç',
      },
      {
        stage: '5x',
        title: 'Dokunmatik & İnteraktif Deneyime Dönüştürme',
        principle: 'Kuramdan Çalışan Etkileşimli Uygulamaya [EX072, OH027]',
        description:
          'Soyut modelleri, müzik/piyano öğrenimini ve estetik tasarımları (ör. sade tuğra formu veya interaktif simülatör) doğrudan dokunulabilir/oynanabilir arayüzlere dönüştür.',
        metricImpact: '5.0x Bilişsel ve Yaratıcı Değer Üretimi',
      },
    ],
    levers: [
      {
        id: 'proj-zero-gap',
        label: 'Aşama Atlamayan Mantıksal Zincir Tamlığı [OH005]',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 65,
        optimalValue: 100,
        description:
          'Düşünce deneylerinde ve kuramsal modellerde ara basamakların atlanmadan gerekçelendirilme oranı.',
      },
      {
        id: 'proj-ontological-link',
        label: 'Ontolojik vs. Metrik Mesafe Ağ Modellemesi [OH008]',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 60,
        optimalValue: 95,
        description:
          'Fiziksel mesafe yerine kavramsal ve anlatısal düğüm bağlantılarının (graph distance) kullanılma derinliği.',
      },
      {
        id: 'proj-interactive-craft',
        label: 'İnteraktif Deneyim & Karşılaştırmalı Sentez Oranı [EX072, EX073]',
        unit: '%',
        min: 20,
        max: 100,
        step: 5,
        defaultValue: 55,
        optimalValue: 90,
        description:
          'Kuramsal ve kültürel araştırmaların etkileşimli arayüzlere ve karşılaştırmalı tablolara dönüştürülme düzeyi.',
      },
    ],
    costSplit: [
      {
        id: 'pc-1',
        label: 'İnteraktif Prototip & Görsel/İşitsel Simülasyon Geliştirme',
        category: 'tek-seferlik',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 5500,
        optimized5xAmountEur: 1200,
        note: 'Modüler web bileşenleri ile interaktif düşünce deneyi ve öğrenme araçlarının hızlı inşası.',
      },
      {
        id: 'pc-2',
        label: 'Akademik Kaynak, Arşiv & Karşılaştırmalı Literatür Erişimi',
        category: 'tekrarlayan',
        certainty: 'resmi-ucret',
        baselineAmountEur: 650,
        optimized5xAmountEur: 650,
        note: 'Veritabanı, yayın ve birincil kaynak erişim giderleri.',
      },
      {
        id: 'pc-3',
        label: 'Dağınık Notların Sentezlenmesi ve Argüman Boşluğu Maliyeti',
        category: 'tekrarlayan',
        certainty: 'tahmini-maliyet',
        baselineAmountEur: 8400,
        optimized5xAmountEur: 1500,
        note: 'Aşama atlamayan yapılandırılmış sentez şablonuyla kazanılan yıllık araştırma zamanı değeri.',
      },
    ],
    decisionMatrix: {
      need: 'Projectivity (ontolojik vs. metrik mesafe), aşama atlamayan düşünce deneyleri ve karşılaştırmalı kültür/sanat incelemelerini; bilimsel veya kişisel sınırları aşmadan 5x derinlikte sentezlemek.',
      options: [
        {
          name: 'Yüzeysel Özet & Aşama Atlayan Kısa Geçişler',
          tag: 'Senaryo A (1x)',
          summary: 'Ara mantıksal basamakları atlayarak doğrudan sonuca zıplayan standart AI özeti.',
          multiplier: '1.1x',
        },
        {
          name: 'Sınırları Belirsiz Spekülatif Genelleme',
          tag: 'Senaryo B (2.5x)',
          summary: 'Kuramsal soruları kullanıcının kesin inancı veya kanıtlanmış fizik teorisi gibi sunan yaklaşım.',
          multiplier: '2.0x',
        },
        {
          name: 'Sıfır Boşluklu Ontolojik Ağ Modeli + Karşılaştırmalı Sentez',
          tag: '5x Akıllı Alternatif',
          summary: 'Ontolojik ve metrik mesafeyi ayıran, hiçbir aşamayı atlamadan düşünce deneyini kuran ve kanıt sınırını koruyan interaktif model.',
          multiplier: '5.0x',
        },
      ],
      advantages: [
        '5 Nisan 2026 talebine uygun olarak kavramsal zincirdeki tüm mantıksal boşlukları kapatır [OH005].',
        '6 Nisan 2026 notundaki ontolojik mesafe (ağ bağlantı sayısı) ile metrik mesafe ayrımını somutlaştırır [OH008].',
        'Kültürel ve edebi incelemeleri kimlik/psikoloji indirgemesi yapmadan yüksek analitik değerle işler [EX073, EX074].',
      ],
      technicalAndLegalRisks: [
        {
          type: 'Finansal / Bilgi Asimetrisi',
          item: 'Paylaşılan kuramsal veya edebi bir metnin kullanıcının kendi yayımlanmış teorisi veya değişmez inancı sayılması',
          mitigation: 'Metinlerin "kuramsal inceleme ve düşünce deneyi bağlamı" olarak etiketlenmesi [06 - Eski Geçmiş].',
        },
        {
          type: 'Teknik Risk',
          item: 'Uzun yapıştırılmış metinlerde araç sınırları nedeniyle ara argümanların kesilmesi',
          mitigation: 'Bölüm bazlı aşamalı okuma ve eksik eklerin açıkça belirtilmesi [OH004–OH007].',
        },
        {
          type: 'Hukuki / İdari Risk',
          item: 'Karşılaştırmalı kültür/şive denemelerinden etnik kimlik veya ikamet çıkarımı yapılması',
          mitigation: 'Görev bağlamı dışına çıkan kişisel profil çıkarımlarının kesin olarak engellenmesi [OH023, EX073].',
        },
      ],
      expertInspectionsRequired: [
        'Araştırma Uzmanı (research) — Karşılaştırmalı Anlatı ve Kuramsal Zincir Kontrolü',
        'Analist (analyst) — Ontolojik Ağ ve Metodolojik Tutarlılık Denetimi',
      ],
      certaintyVsProbability: {
        verifiedFacts: [
          '5 Nisan 2026’da düşüncelerin hiçbir aşama atlanmadan tek bir düşünce deneyinde birleştirilmesi istenmiştir [OH005].',
          '6 Nisan 2026’da ağ bağlantısı sayısının uzaklık olarak düşünülmesi ve ontolojik mesafe ile metrik mesafenin ayrılması yazılmıştır [OH008].',
          '19 Ekim 2026’da halk masallarının farklı bölge ve Avrupa anlatılarıyla paralelliklerinin araştırılması istenmiştir [EX073].',
        ],
        probabilitiesAndAssumptions: [
          'İncelenen kuramsal/felsefi metinlerin bilimsel olarak doğrulanmış nihai sonuç veya psikolojik profil olduğu varsayılmaz.',
        ],
      },
      recommendationAndRationale:
        'Kavramsal ve kültürel çalışmalarda "Ontolojik Ağ Uzaklığı + Sıfır Boşluklu Zincir + Kanıt Sınırı Koruma" formülünü uygulamak, analitik derinliği 5x seviyesine çıkarır.',
      preDecisionVerifications: [
        'Düşünce deneyinde öncüllerden sonuca giderken atlanan herhangi bir ara basamak kaldı mı?',
        'Ontolojik mesafe (düğüm/bağlantı sayısı) ile metrik mesafe birbirinden açıkça ayrıldı mı?',
        'Kuramsal inceleme metni ile doğrulanmış kişisel olgu arasındaki sınır korundu mu?',
        'Soyut kavramları test edilebilir kılan görsel veya interaktif bir model eklendi mi?',
      ],
    },
    kpiUnit: '€ Araştırma & Sentez Değeri',
    baseUtilityScore: 90,
  },
];

export const WARGAME_ROUNDS: WargameRound[] = [
  // STREAM 1: HOUSING
  {
    id: 'wg-housing-1',
    streamId: 'stream-housing',
    roundNumber: 1,
    stageBadge: 'STR-01 · Tur 1/3 · Kriter & Terim Kilidi',
    title: 'Wassenaar İlan Filtresi ve 200 m² / 500 m² Çelişki Kontrolü',
    scenarioContext:
      'American School of The Hague’a ~10 dk sürüş mesafesinde iki aday konut var. İlanlarda Hollandaca "erfpacht", "bouwkundige keuring" ve brüt/net metrekare (BVO vs. GO) ifadeleri geçiyor. Geçmiş kayıtlarda 200 m² yaşam ve 500 m² bahçe kriterinin birlikte mi yoksa iki ayrı kategori mi olduğu belirsiz.',
    constraintAlert:
      'Kısıt: Tarihli filtreyi doğrulamadan tek tip uygularsan doğru evi eleyebilir veya gizli arsa kira (erfpacht) maliyetine yakalanabilirsin.',
    sliderLabel: 'Ön Eleme & Hollandaca Terim Doğrulama Yoğunluğu (%)',
    sliderHint: '5x Optimum Aralık: %75 – %95 (Hem kriter çelişkisini çözer hem NEN 2580/erfpacht kontrolü yapar)',
    options: [
      {
        id: 'wg-h1-opt1',
        label: 'Yalnızca İlan Başlığındaki m²’ye Göre Hızlı Teklif Hazırla',
        strategyArchetype: 'Yüzeysel Kestirme / Gizli Risk',
        description: 'Hollandaca alt maddeleri ve 200/500 m² kategori ayrımını sorgulamadan doğrudan ilk ilana odaklan.',
        multiplierDelta: -0.15,
        capitalDelta: -18,
        bandwidthDelta: 5,
        integrityDelta: -25,
        optimalSliderRange: [10, 40],
        causalDebrief:
          'İlandaki alanın brüt (BVO) olduğu ve arsanın süreli erfpacht içerdiği sonradan ortaya çıktı. Kanıt bütünlüğü ve sermaye puanı düştü.',
        methodologyPrinciple: '1x Kanıt & Sınır Ayrımı: Tarihli filtreleri çelişki kontrolü yapmadan uygulama [03 - Taslak §2].',
      },
      {
        id: 'wg-h1-opt2',
        label: 'Tüm İlanlar İçin Tam Hukuki Tercüme Bürosu ve Eksper Tut',
        strategyArchetype: '1x Geleneksel / Yüksek Maliyet',
        description: 'Daha ön eleme yapmadan 8 ilanın tamamına ücretli ekspertiz ve harici tercüme başlat.',
        multiplierDelta: 0.25,
        capitalDelta: -22,
        bandwidthDelta: -20,
        integrityDelta: 10,
        optimalSliderRange: [50, 75],
        causalDebrief:
          'Doğruluk sağlandı ancak ön eleme öncesi aşırı sermaye ve zaman harcandı; marjinal fayda düşük kaldı.',
        methodologyPrinciple: 'Maliyet/Fayda Dengesi: Uzman incelemesini doğru daraltılmış aday havuzunda kullan.',
      },
      {
        id: 'wg-h1-opt3',
        label: 'Hollandaca Terimleri Sade Türkçeyle Çöz + 200/500 m² İkili Kriter Matrisi Kur',
        strategyArchetype: '5x Asimetrik Kaldıraç',
        description:
          'Özel İşler ajanıyla erfpacht/VvE/NEN 2580 terimlerini normalize et, 200 m² daire ile 500 m² bahçeli evi iki karşılaştırılabilir kategoride puanla.',
        multiplierDelta: 0.85,
        capitalDelta: 8,
        bandwidthDelta: 10,
        integrityDelta: 15,
        optimalSliderRange: [75, 95],
        causalDebrief:
          'Mükemmel 5x hamlesi! Kriter çelişkisi şeffaflaştırıldı, gizli erfpacht maliyeti elendi ve en güçlü 2 aday sıfır bütçe kaybıyla seçildi.',
        methodologyPrinciple: 'EX064 & Taslak §3: Hollanda’ya özgü teknik/hukuki terimleri sade Türkçeyle açıkla ve çelişkileri görünür kıl.',
      },
    ],
  },
  {
    id: 'wg-housing-2',
    streamId: 'stream-housing',
    roundNumber: 2,
    stageBadge: 'STR-01 · Tur 2/3 · Renovasyon & Marjinal Fayda',
    title: 'Oda Oda Renovasyon ve "Düşük Yatırımla Yüksek Marjinal Kazanım" Seçimi',
    scenarioContext:
      'Seçilen konutun fotoğrafları incelendi. Kısa vadede ağır yeniden inşaat istenmiyor ancak yaşam kalitesini hızla artıracak ve ileride kapalı cam bahçe (serre) uzantısına izin verecek bir plan gerekiyor.',
    constraintAlert:
      'Kısıt: Yalnızca tek bir pahalı müteahhit paketi sunmak veya bahçeyi/odaları eksik bırakmak [EX065] karar ölçütüne aykırıdır.',
    sliderLabel: 'Akıllı Marjinal Çözüm (Low-Capex / High-Utility) Ağırlığı (%)',
    sliderHint: '5x Optimum Aralık: %80 – %95 (İki ana senaryo + düşük yatırımlı yüksek kazanım alternatifi)',
    options: [
      {
        id: 'wg-h2-opt1',
        label: 'Taşıyıcı Duvarları Yıkan Tek Seçenekli Lüks Mimari Proje (145.000 €)',
        strategyArchetype: '1x Geleneksel / Yüksek Maliyet',
        description: '6 ay sürecek, belediye ruhsatı gerektiren tek bir ağır inşaat senaryosu hazırla.',
        multiplierDelta: 0.15,
        capitalDelta: -28,
        bandwidthDelta: -22,
        integrityDelta: -5,
        optimalSliderRange: [20, 50],
        causalDebrief:
          '13 Ekim 2026 "kısa vadede büyük yeniden inşaat istememe" tercihiyle çelişti; sermaye ve zaman bandı ağır darbe aldı.',
        methodologyPrinciple: 'EX065: Tek bir pahalı seçenek yerine karşılaştırılabilir senaryolar ve düşük yatırımlı alternatif üret.',
      },
      {
        id: 'wg-h2-opt2',
        label: 'Sadece Salon ve Mutfağı Kapsayan Hızlı Boya/Tadilat Özeti',
        strategyArchetype: 'Yüzeysel Kestirme / Gizli Risk',
        description: 'Diğer odaları ve bahçe açılarını atlayarak ucuz bir yüzeysel liste çıkar.',
        multiplierDelta: -0.1,
        capitalDelta: 5,
        bandwidthDelta: 8,
        integrityDelta: -22,
        optimalSliderRange: [10, 40],
        causalDebrief:
          'Üst kat banyo tesisatı ve bahçe drenajı atlandığı için ustadan gelen ek maliyetlerle bütçe patladı.',
        methodologyPrinciple: 'EX065: Tüm odaları, gerekli açıları ve bahçeyi kapsayan eksiksiz görsel kapsam şarttır.',
      },
      {
        id: 'wg-h2-opt3',
        label: 'Oda Oda 2 Senaryo + Düşük Yatırımlı 5x Akıllı Alternatif (Fazlı Serre + Ustaya Hazır PDF)',
        strategyArchetype: '5x Asimetrik Kaldıraç',
        description:
          'Tüm odaları ve bahçeyi kapsayan 2 karşılaştırılabilir senaryo kur; yanına ağır yıkımsız en yüksek marjinal kazanımı veren 3. akıllı alternatifi ve ustaya teslim edilebilir dosyayı ekle.',
        multiplierDelta: 0.95,
        capitalDelta: 14,
        bandwidthDelta: 12,
        integrityDelta: 18,
        optimalSliderRange: [80, 95],
        causalDebrief:
          'Tam 5x isabeti! ~83.000 € tek seferlik sermaye korundu, tüm odalar/bahçe kapsandı ve ustaya doğrudan verilebilir dosya üretildi.',
        methodologyPrinciple: 'EX065: İki karşılaştırılabilir senaryo + düşük yatırımla en büyük marjinal kazanımı sağlayan akıllı çözüm.',
      },
    ],
  },
  // STREAM 2: MOBILITY
  {
    id: 'wg-mobility-1',
    streamId: 'stream-mobility',
    roundNumber: 1,
    stageBadge: 'STR-02 · Tur 1/3 · Teknik Rapor Denetimi',
    title: 'Car Issues Review: Onarım-Boya Geçmişi Raporu Soruyu Yanıtlıyor mu?',
    scenarioContext:
      'Satıcı/servis tarafından gönderilen araç kontrol PDF raporunda genel bir "araç standartlara uygundur, lokal işlem yapılmıştır" ifadesi var. Ancak hangi parçada kaç mikron boya olduğu ve yapısal onarım bulunup bulunmadığı açık değil.',
    constraintAlert:
      'Kısıt: Raporda bulunmayan bilgiyi kesin durum gibi kaydetmek veya kısaltırken kritik soruları düşürmek yasaktır [EX062, EX063].',
    sliderLabel: 'Rapor Yanıt Yeterlilik Denetimi & Bilgi Yoğunluğu (%)',
    sliderHint: '5x Optimum Aralık: %85 – %100 (Sıfır bilgi kaybı + kısa ve keskin kendi tonunda mesaj)',
    options: [
      {
        id: 'wg-m1-opt1',
        label: 'Raporu "Sorunsuz" Olarak Kaydet ve Kibar/Kısa Bir Teşekkür E-postası At',
        strategyArchetype: 'Yüzeysel Kestirme / Gizli Risk',
        description: 'Mesajı çok kısa tutmak için boya/onarım detayı ve garanti sorularını metinden çıkar.',
        multiplierDelta: -0.25,
        capitalDelta: -20,
        bandwidthDelta: 10,
        integrityDelta: -30,
        optimalSliderRange: [10, 40],
        causalDebrief:
          'Kritik noktalar kısaltma sırasında kayboldu! EX062’de açıkça uyarılan "kısa ama eksik olmasın" ilkesi ihlal edildi.',
        methodologyPrinciple: 'EX062 & EX063: Raporun soruyu gerçekten yanıtlayıp yanıtlamadığını denetle; kısaltırken önemli noktaları kaybetme.',
      },
      {
        id: 'wg-m1-opt2',
        label: '4 Sayfalık Resmi Hukuki İhtarname ve Tam Ekspertiz Çağrısı Gönder',
        strategyArchetype: '1x Geleneksel / Yüksek Maliyet',
        description: 'Kullanıcının doğal tonuna uymayan, aşırı bürokratik ve süreci kilitleyen uzun bir metin hazırla.',
        multiplierDelta: 0.2,
        capitalDelta: -10,
        bandwidthDelta: -18,
        integrityDelta: 5,
        optimalSliderRange: [50, 75],
        causalDebrief:
          'Teknik noktalar korundu ancak aşırı resmi ve uzun dil iletişimi yavaşlattı.',
        methodologyPrinciple: 'Konuşma Tarzı & EX062: Kendi dil/tonuna uygun, doğrudan, kısa ve keskin yazışma.',
      },
      {
        id: 'wg-m1-opt3',
        label: 'Raporun Açık Bıraktığı 3 Noktayı Saptayan "Kısa, Keskin ve Eksiksiz" Taslak',
        strategyArchetype: '5x Asimetrik Kaldıraç',
        description:
          'Raporun hangi soruyu yanıtlamadığını net göster; parça/mikron tablosu, 2026 değişim/teslimat takvimi ve garanti teyidini tek paragrafta sıfır kayıpla iste.',
        multiplierDelta: 0.9,
        capitalDelta: 12,
        bandwidthDelta: 14,
        integrityDelta: 20,
        optimalSliderRange: [85, 100],
        causalDebrief:
          '5x Müzakere Gücü! Hem mesaj 120 kelimenin altında tutuldu hem de hiçbir teknik/garanti maddesi atlanmadı.',
        methodologyPrinciple: 'EX062 + EX063: Yanıt yeterliliği denetimi + kısa ama eksiksiz iletişim.',
      },
    ],
  },
  // STREAM 3: SUPER AGENT
  {
    id: 'wg-agent-1',
    streamId: 'stream-super-agent',
    roundNumber: 1,
    stageBadge: 'STR-03 · Tur 1/3 · Mimari & İzolasyon',
    title: 'Super Agent Kurulumu, P&L API Çıkarımı ve Veri İzolasyonu Kararı',
    scenarioContext:
      'Kullanıcı isteğine göre uzman ajanlar ve skills oluşturan Super Agent mimarisini [OH019] ve kamuya açık şirket kâr/zarar (P&L) tablolarını çeken aracı [OH057] devreye alıyorsun. Aynı anda Özel, Danone ve UNIQLM alanları mevcut.',
    constraintAlert:
      'Kısıt: Paylaşılan model sağlayıcısını ortak hafıza saymak veya AI taslağını doğrulanmış kullanıcı gerçeği olarak kaydetmek yasaktır.',
    sliderLabel: 'Alan İzolasyonu & Uzman Ajan Orkestrasyon Düzeyi (%)',
    sliderHint: '5x Optimum Aralık: %85 – %100 (Tam alan izolasyonu + ücretsiz API/skill otomasyonu)',
    options: [
      {
        id: 'wg-a1-opt1',
        label: 'Tüm Alanların (Özel + İş + Startup) Notlarını Tek Vektör Havuzunda Birleştir',
        strategyArchetype: 'Yüzeysel Kestirme / Gizli Risk',
        description: 'Ajanların her şeye anında erişmesi için Danone, UNIQLM ve Özel klasörlerini ortak belleğe aç.',
        multiplierDelta: -0.4,
        capitalDelta: 0,
        bandwidthDelta: 5,
        integrityDelta: -40,
        optimalSliderRange: [10, 30],
        causalDebrief:
          'Kritik sınır ihlali! [U4, D1] Özel alanın iş ve startup verilerinden kesin ayrımı kuralı bozuldu.',
        methodologyPrinciple: '00 - Özel Alan & Taslak §7: Yalnızca domain=personal kaynaklarını kullan; alanlar arası doğrudan erişim yasaktır.',
      },
      {
        id: 'wg-a1-opt2',
        label: 'Her Görevde Manuel Kopyala-Yapıştır ve Ücretli Kurumsal Veri Terminali Kullan',
        strategyArchetype: '1x Geleneksel / Yüksek Maliyet',
        description: 'İzolasyonu korumak için otomasyonu kapat, finansal tabloları elle indirip incele.',
        multiplierDelta: 0.2,
        capitalDelta: -20,
        bandwidthDelta: -25,
        integrityDelta: 10,
        optimalSliderRange: [45, 70],
        causalDebrief:
          'Veri izolasyonu korundu ancak yıllık yüzlerce saatlik manuel iş yükü ve gereksiz abonelik maliyeti oluştu.',
        methodologyPrinciple: 'OH019 & OH057: Uzman ajan grupları ve ücretsiz API/VPS otomasyonuyla kaldıraç kur.',
      },
      {
        id: 'wg-a1-opt3',
        label: 'İzole Özel Alan Hafızası + 6 Uzman Ajan/Skill + Ücretsiz Kamuya Açık API Mimarisi',
        strategyArchetype: '5x Asimetrik Kaldıraç',
        description:
          'Personal scope sınırını kilitle, görevleri specialist ajanlara (analyst/finance/twin_developer) dağıt ve kamuya açık P&L verisini şema doğrulamalı API ile çek.',
        multiplierDelta: 0.95,
        capitalDelta: 15,
        bandwidthDelta: 18,
        integrityDelta: 22,
        optimalSliderRange: [85, 100],
        causalDebrief:
          '5x Sistem Kaldıracı! Hem mahremiyet ve kanıt sınırları %100 korundu hem de otomasyon maliyeti minimize edildi.',
        methodologyPrinciple: 'OH019 + OH057 + U4: Super Agent modülerliği + sıkı veri izolasyonu.',
      },
    ],
  },
  // STREAM 4: GLOBAL LOGISTICS
  {
    id: 'wg-logistics-1',
    streamId: 'stream-global-logistics',
    roundNumber: 1,
    stageBadge: 'STR-04 · Tur 1/3 · Kapıdan Çıkış & Show Don’t Tell',
    title: 'Hollanda Geçişi: Kapıdan Çıkış Saati ve Ev Sahibi Tanıtım Mektubu',
    scenarioContext:
      'Bir yandan aktarmalı ulaşım (FlixBus/tren + uçuş) ve Cakarta→Hollanda köpek taşıma evrak takvimi [OH052, EX068], diğer yandan Hollanda’daki ev sahibi için kendini ve köpeğini tanıtan mektup [OH060] hazırlanıyor.',
    constraintAlert:
      'Kısıt: Ulaşımda yalnız rota adı vermek veya mektupta geçmişi küçümseyen soyut AI klişeleri kullanmak yasaktır.',
    sliderLabel: 'Tersine Zaman Tamponu & Somut Kanıt ("Show, Don’t Tell") Oranı (%)',
    sliderHint: '5x Optimum Aralık: %80 – %100 (Kesin kapıdan çıkış saati + somut örnekli tanıtım)',
    options: [
      {
        id: 'wg-l1-opt1',
        label: 'Genel Hat Adını Ver ve AI’ın "Artık Çok Daha Saygılı Biriyim" Taslağını Gönder',
        strategyArchetype: 'Yüzeysel Kestirme / Gizli Risk',
        description: 'Kapıdan çıkış saatini hesaplama; mektupta ise yapay dönüşüm hikayesi kullan.',
        multiplierDelta: -0.3,
        capitalDelta: -15,
        bandwidthDelta: -10,
        integrityDelta: -30,
        optimalSliderRange: [10, 40],
        causalDebrief:
          'OH060’ta açıkça itiraz edilen "geçmişi küçümseyen desteklenmemiş cümle" hatasına düşüldü ve aktarma tamponu olmadığı için bağlantı kaçırıldı.',
        methodologyPrinciple: 'OH060 & EX068: Show, don’t tell (somut örnek kullan) ve kapıdan çıkış saatini netleştir.',
      },
      {
        id: 'wg-l1-opt2',
        label: '1 Gün Önceden Otel Tut ve Lüks Emlak Ajansına Tanıtım Dosyası Yazdır',
        strategyArchetype: '1x Geleneksel / Yüksek Maliyet',
        description: 'Saat hesabı yapmak yerine ekstra konaklama ve yüksek ajans ücreti öde.',
        multiplierDelta: 0.25,
        capitalDelta: -22,
        bandwidthDelta: -8,
        integrityDelta: 8,
        optimalSliderRange: [50, 75],
        causalDebrief:
          'Sorun çözüldü ancak basit bir tersine zaman hesabı ve doğru mektupla korunabilecek bütçe harcandı.',
        methodologyPrinciple: 'Düşük Yatırım / Yüksek Marjinal Kazanım.',
      },
      {
        id: 'wg-l1-opt3',
        label: 'Hedef Varıştan Geriye "Kapıdan Çıkış Saati" + Somut Örnekli "Show, Don’t Tell" Mektubu',
        strategyArchetype: '5x Asimetrik Kaldıraç',
        description:
          'Uçuş ve aktarmadan geriye kapıdan çıkış dakikasını sabitle, AB pet titrasyon takvimini doğrula ve mektupta mülk/köpek sorumluluğunu somut örneklerle göster.',
        multiplierDelta: 0.9,
        capitalDelta: 12,
        bandwidthDelta: 16,
        integrityDelta: 20,
        optimalSliderRange: [80, 100],
        causalDebrief:
          '5x Lojistik & İletişim! Sıfır aktarma stresi, sıfır belge eksiği ve ev sahibinde yüksek güven bırakan somut mektup.',
        methodologyPrinciple: 'EX068 + OH052 + OH060: Kapıdan çıkış kesinliği + Show, Don’t Tell.',
      },
    ],
  },
  // STREAM 5: PROJECTIVITY & CULTURE
  {
    id: 'wg-projectivity-1',
    streamId: 'stream-projectivity',
    roundNumber: 1,
    stageBadge: 'STR-05 · Tur 1/3 · Ontolojik Mesafe & Sıfır Boşluk',
    title: 'Projectivity Düşünce Deneyi ve Karşılaştırmalı Masal Sentezi',
    scenarioContext:
      'Ağ bağlantısı sayısının uzaklık olarak düşünülmesi (ontolojik vs. metrik mesafe) [OH008] üzerine çok aşamalı bir düşünce deneyi [OH005] ve Adıyaman masalları ile Avrupa anlatılarının paralellik araştırması [EX073] yürütülüyor.',
    constraintAlert:
      'Kısıt: Ara mantıksal basamakları atlamak veya kuramsal/kültürel incelemeden kişisel kimlik/inanç profili çıkarmak yasaktır.',
    sliderLabel: 'Mantıksal Zincir Tamlığı & Ontolojik Ağ Derinliği (%)',
    sliderHint: '5x Optimum Aralık: %85 – %100 (Hiçbir aşamayı atlamayan sentez + sınır koruma)',
    options: [
      {
        id: 'wg-p1-opt1',
        label: 'Ara Basamakları Atlayarak 3 Maddelik Hızlı Sonuç Özeti Çıkar ve Kimlik Yorumu Ekle',
        strategyArchetype: 'Yüzeysel Kestirme / Gizli Risk',
        description: 'Düşünce deneyini kısaltıp masal/kuram ilgisinden psikolojik ve etnik profil çıkarımı yap.',
        multiplierDelta: -0.35,
        capitalDelta: 0,
        bandwidthDelta: 5,
        integrityDelta: -35,
        optimalSliderRange: [10, 40],
        causalDebrief:
          'Çifte ihlal! Hem OH005 "hiçbir aşamayı atlamama" talebi bozuldu hem de 00 - Özel Alan "psikolojik/kimlik çıkarımı üretmeme" sınırı aşıldı.',
        methodologyPrinciple: 'OH005 & 00 - Özel Alan: Aşama atlama ve görev bağlamından kimlik/inanç profili çıkarma.',
      },
      {
        id: 'wg-p1-opt2',
        label: 'Ham Metinleri Hiç Yapılandırmadan Olduğu Gibi Alt Alta Kopyala',
        strategyArchetype: '1x Geleneksel / Yüksek Maliyet',
        description: 'Boşlukları kapatmadan ve ontolojik/metrik ayrımını modellemeden ham arşiv tut.',
        multiplierDelta: 0.15,
        capitalDelta: -8,
        bandwidthDelta: -20,
        integrityDelta: 5,
        optimalSliderRange: [45, 70],
        causalDebrief:
          'Sınırlar korundu ancak düşünceler arası nedensel köprü kurulmadığı için analitik değer 1x’te kaldı.',
        methodologyPrinciple: 'OH008: Ontolojik mesafe ile metrik mesafeyi yapısal olarak ayır.',
      },
      {
        id: 'wg-p1-opt3',
        label: 'Sıfır Boşluklu Düşünce Deneyi + Ontolojik Ağ Grafiği & Kanıt Sınırlı Motif Matrisi',
        strategyArchetype: '5x Asimetrik Kaldıraç',
        description:
          'Öncülden sonuca tüm ara basamakları gerekçelendir, ontolojik (düğüm) uzaklığı metrik uzaklıktan ayır ve masal arketiplerini kimlik çıkarımı yapmadan eşleştir.',
        multiplierDelta: 0.95,
        capitalDelta: 10,
        bandwidthDelta: 15,
        integrityDelta: 22,
        optimalSliderRange: [85, 100],
        causalDebrief:
          '5x Kuramsal & Kültürel Sentez! Hiçbir mantıksal boşluk bırakılmadı ve hafıza/gizlilik sınırları eksiksiz korundu.',
        methodologyPrinciple: 'OH005 + OH008 + EX073: Aşama atlamayan nedensel zincir ve ontolojik ağ analizi.',
      },
    ],
  },
];

export const STRESS_SCENARIOS: StressScenario[] = [
  {
    id: 'stress-housing-car',
    title: 'Senaryo Alfa: Konut Ekspertiz Sürprizi + Araç Raporu Belirsizliği',
    subtitle:
      'Wassenaar aday konutunda çatı/nem bulgusu çıkarken aynı hafta 2026 araç değişiminde boya/onarım raporu eksik geldi.',
    affectedStreams: ['stream-housing', 'stream-mobility'],
    severity: 'Yüksek',
    shockDescription:
      'Tek seferlik tahmini maliyetler ile resmî ücretler ayrıştırılmaz ve satıcıya kısa-eksiksiz teknik itiraz hemen yazılmazsa toplam 45.000 € değer kaybı riski doğar.',
    requiredCapitalMin: {
      'stream-housing': 25,
      'stream-mobility': 20,
      'stream-super-agent': 15,
      'stream-global-logistics': 15,
      'stream-projectivity': 10,
    },
    requiredBandwidthMin: {
      'stream-housing': 25,
      'stream-mobility': 25,
      'stream-super-agent': 15,
      'stream-global-logistics': 15,
      'stream-projectivity': 10,
    },
    idealSpecialists: {
      'stream-housing': 'analyst',
      'stream-mobility': 'reviewer',
      'stream-super-agent': 'twin_developer',
    },
    mitigationLesson:
      'Bouwkundige Keuring bulgularını "5x Akıllı Renovasyon" senaryosunda pazarlık kozuna çevir; araçta ise EX062/EX063 standardıyla eksik mikron/parça bilgisini yazılı teyide bağla.',
  },
  {
    id: 'stress-timezone-logistics',
    title: 'Senaryo Beta: Çoklu Saat Dilimi (GMT+7 → GMT+1) Aktarma & Evrak Darboğazı',
    subtitle:
      'Uluslararası uçuş/aktarma saatleri değişti, AB evcil hayvan sağlık sertifikası kontrolü ve ev sahibi tanıtım dosyası aynı 48 saate sıkıştı.',
    affectedStreams: ['stream-global-logistics', 'stream-super-agent'],
    severity: 'Yüksek',
    shockDescription:
      'Kapıdan çıkış saati geriye doğru yeniden hesaplanmaz ve tanıtım mektubu somut kanıtlarla ("Show, Don’t Tell") hemen teslim edilmezse hem aktarma hem konut kabulü riske girer.',
    requiredCapitalMin: {
      'stream-housing': 15,
      'stream-mobility': 15,
      'stream-super-agent': 20,
      'stream-global-logistics': 25,
      'stream-projectivity': 10,
    },
    requiredBandwidthMin: {
      'stream-housing': 15,
      'stream-mobility': 15,
      'stream-super-agent': 20,
      'stream-global-logistics': 30,
      'stream-projectivity': 10,
    },
    idealSpecialists: {
      'stream-global-logistics': 'organizer',
      'stream-super-agent': 'twin_developer',
      'stream-housing': 'finance',
    },
    mitigationLesson:
      'Organizer ajanı ile hedef varıştan geriye kapıdan çıkış saatini sabitle [EX068]; tanıtım mektubunda yapay klişeleri silip somut kanıt bloklarını gönder [OH060].',
  },
  {
    id: 'stress-full-portfolio',
    title: 'Senaryo Gama: 5-Stream Tam Kapsamlı Karar & İzolasyon Stres Testi',
    subtitle:
      'Konut, araç, uluslararası lojistik, kuramsal sentez ve P&L API otomasyonu aynı anda çıktı bekliyor; AI taslakları ile doğrulanmış kayıtların karışma riski var.',
    affectedStreams: [
      'stream-housing',
      'stream-mobility',
      'stream-super-agent',
      'stream-global-logistics',
      'stream-projectivity',
    ],
    severity: 'Kritik (Portföy Geneli)',
    shockDescription:
      'Dengeli sermaye/odak dağılımı ve doğru uzman ajan eşleşmesi yapılmazsa ya veri izolasyonu delinir ya da yüksek marjinal faydalı fırsatlar kaçar.',
    requiredCapitalMin: {
      'stream-housing': 22,
      'stream-mobility': 18,
      'stream-super-agent': 20,
      'stream-global-logistics': 18,
      'stream-projectivity': 12,
    },
    requiredBandwidthMin: {
      'stream-housing': 22,
      'stream-mobility': 18,
      'stream-super-agent': 20,
      'stream-global-logistics': 18,
      'stream-projectivity': 12,
    },
    idealSpecialists: {
      'stream-housing': 'analyst',
      'stream-mobility': 'reviewer',
      'stream-super-agent': 'twin_developer',
      'stream-global-logistics': 'organizer',
      'stream-projectivity': 'research',
    },
    mitigationLesson:
      '5x Super Agent orkestrasyonu: Her stream’i kendi uzman ajanına delege et, tarihli bağlamı doğrulanmış olgudan ayır ve dış işlemleri onay kapısına bağla.',
  },
];

export const COMMUNICATION_CHALLENGES: CommunicationChallenge[] = [
  {
    id: 'comm-car-review',
    streamId: 'stream-mobility',
    code: 'DUEL-01',
    title: 'Car Issues Review: "Kısa ve Keskin Ama Eksiksiz" E-posta İnşası',
    principleBadge: 'Kısa Ama Eksiksiz [EX062 · EX063]',
    sourceRef: '3 Kasım 2026 · Car Issues Review',
    context:
      'Servis raporunda onarım/boya geçmişi muğlak bırakılmış. Satıcıya/servise kelime bütçesini (maks. 62 kelime) aşmadan ama 3 kritik teknik/hukuki noktayı da eksiksiz içeren bir mesaj oluştur.',
    maxWordBudget: 62,
    requiredCriticalCount: 3,
    clauses: [
      {
        id: 'cc-1',
        text: 'İlettiğiniz kontrol raporunda sağ arka çamurluk ve kaput için parça bazlı boya mikron değerleri ile değişen parça kodu yer almıyor; bu tabloyu yazılı olarak rica ederim.',
        wordCount: 27,
        isCriticalFact: true,
        isFluffOrUnsupported: false,
        impactNote: 'Kritik Nokta 1: Raporun yanıtlamadığı boya/onarım sorusunu doğrudan hedefler [EX063].',
      },
      {
        id: 'cc-2',
        text: 'Ayrıca şasi, sensör kalibrasyonu ve batarya/hibrit ünitede garanti kapsamını etkileyecek herhangi bir geçmiş işlem bulunmadığının resmi teyidini bekliyorum.',
        wordCount: 18,
        isCriticalFact: true,
        isFluffOrUnsupported: false,
        impactNote: 'Kritik Nokta 2: Yapısal ve garanti bütünlüğünü hukuki kayıt altına alır.',
      },
      {
        id: 'cc-3',
        text: '2026 model değişim anlaşmamız kapsamındaki net teslim tarihini de bu teyitle birlikte paylaşmanızı rica ederim.',
        wordCount: 15,
        isCriticalFact: false,
        isFluffOrUnsupported: false,
        impactNote: 'Opsiyonel bağlam cümlesi; kelime bütçesini zorlayabilir.',
      },
      {
        id: 'cc-4',
        text: 'Eksik teknik tablolar ve yazılı garanti teyidi dosyaya eklenmeden teslim/kabul onayını tamamlayamayacağımı bilginize sunarım.',
        wordCount: 14,
        isCriticalFact: true,
        isFluffOrUnsupported: false,
        impactNote: 'Kritik Nokta 3: Karar öncesi doğrulama ve yetki sınırını netleştirir.',
      },
      {
        id: 'cc-5',
        text: 'Öncelikle değerli vaktiniz, kurumsal işbirliğiniz ve bugüne kadar gösterdiğiniz nazik ilgi için en içten teşekkürlerimi sunmak isterim.',
        wordCount: 17,
        isCriticalFact: false,
        isFluffOrUnsupported: true,
        impactNote: 'Gereksiz dolgu/törensel kalıp: Kelime bütçesini tüketir ve keskinliği bozar.',
      },
    ],
  },
  {
    id: 'comm-landlord-letter',
    streamId: 'stream-global-logistics',
    code: 'DUEL-02',
    title: 'Hollanda Ev Sahibi Tanıtım Mektubu: "Show, Don’t Tell" Düellosu',
    principleBadge: 'Show, Don’t Tell [OH060]',
    sourceRef: '17 Haziran 2026 · Introduction Letter Template',
    context:
      'Hollanda’daki ev sahibine gönderilecek tanıtım mektubunda geçmişi küçümseyen yapay dönüşüm ifadelerini ele; kelime bütçesi (maks. 65 kelime) içinde 3 somut kanıt bloğunu birleştir.',
    maxWordBudget: 65,
    requiredCriticalCount: 3,
    clauses: [
      {
        id: 'cl-1',
        text: 'Önceki konutlarımızda düzenli periyodik bakım ve bahçe özenini bizzat yürüttük; mevcut ev sahibimizden yazılı referans ve hasarsız teslim kaydını ekte paylaşıyorum.',
        wordCount: 21,
        isCriticalFact: true,
        isFluffOrUnsupported: false,
        impactNote: 'Somut Kanıt 1 (Show, Don’t Tell): Soyut "iyi kiracıyım" yerine doğrulanabilir referans gösterir.',
      },
      {
        id: 'cl-2',
        text: 'Köpeğimiz tüm AB/NVWA sağlık sertifikaları, mikroçip ve ev içi uyum eğitimi tamamlanmış, sessiz ev düzenine alışkın aile üyemizdir.',
        wordCount: 18,
        isCriticalFact: true,
        isFluffOrUnsupported: false,
        impactNote: 'Somut Kanıt 2: Evcil hayvan sorumluluğunu resmi belge ve somut alışkanlıkla kanıtlar [OH052, OH060].',
      },
      {
        id: 'cl-3',
        text: 'Hollanda’daki uzun vadeli çalışma ve okul düzenimiz kapsamında kira ve bakım yükümlülüklerini zamanında ve şeffaf biçimde yürütüyoruz.',
        wordCount: 17,
        isCriticalFact: true,
        isFluffOrUnsupported: false,
        impactNote: 'Somut Kanıt 3: Uzun vadeli istikrar ve finansal/idari güvenilirliği somutlaştırır.',
      },
      {
        id: 'cl-4',
        text: 'Geçmiş yıllarda mülk kurallarına ve temel saygıya pek dikkat etmezken artık tamamen değişip çok saygılı bir insan haline geldim.',
        wordCount: 19,
        isCriticalFact: false,
        isFluffOrUnsupported: true,
        impactNote: 'KESİN HATA [OH060]: Kullanıcının açıkça itiraz ettiği, geçmişi küçümseyen ve gerçeği yansıtmayan yapay AI cümlesi!',
      },
    ],
  },
];
