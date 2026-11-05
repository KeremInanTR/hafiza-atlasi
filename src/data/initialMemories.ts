import { MemoryEntry, MatchPair, QuizQuestion, MemoryEra, EvidenceLevel, MemoryCategory } from '../types/memory';

export const ERA_LABELS: Record<MemoryEra, string> = {
  '2021-kasim': 'Kasım–Aralık 2021 (5 Yıl Önce)',
  '2026-ilkbahar-yaz': 'Mart–Haziran 2026 (Kuramsal & Geçiş)',
  '2026-ekim-kasim': 'Ekim–Kasım 2026 (Güncel Gündem)',
  'kisisel-zaman': 'Kişisel Zaman Kapsülü',
};

export const EVIDENCE_LABELS: Record<EvidenceLevel, { label: string; badgeClass: string; description: string }> = {
  'dogrulanmis-iz': {
    label: 'Doğrulanmış Tarihli İz',
    badgeClass: 'badge-verified',
    description: 'Saat dilimi, üstbilgi veya işlem kaydıyla desteklenen somut tarihli iz; kapsamı aşan genelleme yapılmaz.',
  },
  'gorev-baglami': {
    label: 'Görev & Araştırma Bağlamı',
    badgeClass: 'badge-context',
    description: 'O tarihte üzerinde çalışılan soru, senaryo veya inceleme; kalıcı kişisel karar veya mülkiyet kanıtı sayılmaz.',
  },
  'kisisel-not': {
    label: 'Kişisel Zaman Kapsülü Notu',
    badgeClass: 'badge-personal',
    description: 'Doğrudan bu cihazda oluşturulan kişisel düşünce ve gündem kaydı.',
  },
};

export const CATEGORY_LABELS: Record<MemoryCategory, string> = {
  'konum-yasam': 'Konum & Yaşam Düzeni',
  'dijital-kurulum': 'Dijital Ekosistem & Sistemler',
  'konut-mimari': 'Konut & Yenileme Analizi',
  'arac-mobilite': 'Araç & Mobilite',
  'kuramsal-kultur': 'Kuramsal Düşünce & Kültür',
  'finans-idari': 'Finans & İdari Süreçler',
};

export const INITIAL_MEMORIES: MemoryEntry[] = [
  {
    id: 'mem-2021-gmt7',
    title: 'Güneydoğu Asya Bağlantısı ve GMT+7 Saat Dilimi İzleri',
    dateLabel: '6–21 Kasım 2021',
    isoDate: '2021-11-06',
    era: '2021-kasim',
    category: 'konum-yasam',
    evidenceLevel: 'dogrulanmis-iz',
    timezone: 'GMT+7 (Cakarta / Bangkok)',
    region: 'Endonezya / Tayland Bağlantılı',
    summary:
      'Beş yıl önce Kasım ayında işlem üstbilgileri ve yerel servis bildirimleri GMT+7 saat diliminde yürüyen günlük düzene işaret ediyor.',
    details: [
      '6 Kasım ve 21 Kasım 2021 tarihli iletilerde saat dilimi GMT+7 olarak kaydedilmiş.',
      '8 Kasım 2021 tarihinde bölge içi günlük sipariş bildirimi ve 9–14 Kasım 2021 tarihlerinde Endonezya bankacılık bildirimleri yer alıyor.',
      'O döneme ait yazılı bir günlük metni bulunmadığından gündem, işlem ve konum izlerinden okunabiliyor.',
    ],
    boundaryNote:
      'Tarihli üstbilgi ve bildirim izidir; o günkü içsel düşünceleri veya uzun vadeli planları doğrudan anlatan yazılı bir metin değildir.',
    tags: ['Kasım 2021', 'GMT+7', 'Güneydoğu Asya', '5 Yıl Önce'],
    pinned: true,
  },
  {
    id: 'mem-2021-digital',
    title: 'Kişisel E-posta, Bulut Depolama ve Ekosistem Kurulumu',
    dateLabel: '6–23 Kasım 2021',
    isoDate: '2021-11-07',
    era: '2021-kasim',
    category: 'dijital-kurulum',
    evidenceLevel: 'dogrulanmis-iz',
    timezone: 'GMT+7',
    region: 'Dijital Altyapı',
    summary:
      'Kişisel e-posta hesaplarının test edilmesi, güvenlik bilgilerinin yenilenmesi ve OneDrive / Microsoft 365 ile Apple aboneliklerinin düzenlenmesi.',
    details: [
      '6 Kasım 2021: Yeni e-posta akışını doğrulamak için gönderilen "Deneme" başlıklı test iletisi.',
      '7 Kasım 2021: Microsoft hesabı güvenlik yenilemesi ve yeni cihaz giriş doğrulaması.',
      '21–23 Kasım 2021: Apple Kimliği güvenlik/fatura güncellemesi ve Microsoft 365 / OneDrive bulut depolama aboneliği aktivasyonu.',
    ],
    boundaryNote:
      'Hesap ve abonelik yapılandırma izidir; güvenlik gereği hesap adresleri ve kimlik bilgileri genel görünümden arındırılmıştır.',
    tags: ['Kasım 2021', 'Bulut', 'OneDrive', 'Dijital Düzen'],
    pinned: true,
  },
  {
    id: 'mem-2021-dec-zoom',
    title: 'Yıl Sonu GMT+3 Saat Dilimi ve Üniversite Toplantı Bağlantısı',
    dateLabel: '23 Aralık 2021',
    isoDate: '2021-12-23',
    era: '2021-kasim',
    category: 'kuramsal-kultur',
    evidenceLevel: 'dogrulanmis-iz',
    timezone: 'GMT+3 (Türkiye)',
    region: 'İstanbul / Çevrimiçi',
    summary:
      'Kasım 2021 GMT+7 kayıtlarının ardından Aralık sonunda GMT+3 saat diliminden gönderilen çevrimiçi üniversite toplantı (Zoom) bağlantısı.',
    details: [
      'Saat diliminin GMT+7’den GMT+3’e geçtiği yıl sonu e-posta kaydı.',
      'Üniversite odaklı çevrimiçi görüşme bağlantısı paylaşımı.',
    ],
    boundaryNote:
      'Tekil toplantı bağlantısı gönderimidir; tek başına akademik kadro veya program kaydı kanıtı sayılmaz.',
    tags: ['Aralık 2021', 'GMT+3', 'Akademik İletişim'],
  },
  {
    id: 'mem-2026-projectivity',
    title: 'Projectivity, Ontolojik vs. Metrik Mesafe ve Aşama Atlamayan Düşünce Deneyi',
    dateLabel: '5–20 Nisan 2026',
    isoDate: '2026-04-06',
    era: '2026-ilkbahar-yaz',
    category: 'kuramsal-kultur',
    evidenceLevel: 'gorev-baglami',
    timezone: 'Geçiş Dönemi',
    region: 'Kuramsal Çalışma',
    summary:
      'Ağ bağlantısı sayısının uzaklık olarak düşünülmesi, ontolojik mesafe ile metrik mesafenin ayrılması ve mantıksal boşluk bırakmayan düşünce deneyleri.',
    details: [
      '5 Nisan 2026: Farklı kavramsal notları hiçbir aşamayı atlamadan tek bir düşünce deneyinde birleştirme talebi.',
      '6 Nisan 2026: Ağ topolojisinde bağlantı sayısının uzaklık olarak modellenmesi; ontolojik mesafe ve metrik mesafe ayrımı.',
      '20 Nisan 2026: Gravitasyon, koşullu astronomi ve edebi/felsefi metinlerin bilinen kuramlarla karşılaştırılması.',
    ],
    boundaryNote:
      'Kuramsal inceleme ve düşünce deneyi bağlamıdır; kesinleşmiş akademik yayın veya psikolojik profil çıkarımı olarak kullanılmaz.',
    tags: ['Nisan 2026', 'Projectivity', 'Ontolojik Mesafe', 'Düşünce Deneyi'],
    pinned: true,
  },
  {
    id: 'mem-2026-super-agent',
    title: 'Çoklu Ajan (Super Agent) Mimarisi ve Finansal Tablo Analiz Fikirleri',
    dateLabel: '27 Nisan – 3 Haziran 2026',
    isoDate: '2026-04-27',
    era: '2026-ilkbahar-yaz',
    category: 'dijital-kurulum',
    evidenceLevel: 'gorev-baglami',
    timezone: 'Geçiş Dönemi',
    region: 'Yazılım & Otomasyon Tasarımı',
    summary:
      'Kullanıcı isteğine göre uzman ajanlar, görev grupları, RAG ve skill modülleri oluşturan Super Agent spesifikasyonu ile finansal tablo API aracı fikri.',
    details: [
      '27 Nisan 2026: Ajan profilleri, görev grupları ve kullanıcı tanımlı yetenekler (skills) içeren sistem mimarisi taslağı.',
      '3 Haziran 2026: Şirketlerin kamuya açık kâr/zarar tablolarını ücretsiz API üzerinden çeken analiz uygulaması araştırması.',
    ],
    boundaryNote:
      'Tarihsel ürün ve mimari tasarım araştırmasıdır; kişisel yatırım portföyü veya ticari ürün lansmanı kanıtı değildir.',
    tags: ['Nisan 2026', 'Super Agent', 'Otomasyon', 'Uygulama Fikri'],
  },
  {
    id: 'mem-2026-relocation',
    title: 'Hollanda’ya Taşınma Hazırlığı, Evcil Hayvan Lojistiği ve "Show, Don’t Tell" İlkesi',
    dateLabel: '28 Mayıs – 17 Haziran 2026',
    isoDate: '2026-06-17',
    era: '2026-ilkbahar-yaz',
    category: 'konum-yasam',
    evidenceLevel: 'gorev-baglami',
    timezone: 'GMT+7 → GMT+2',
    region: 'Cakarta → Hollanda Hattı',
    summary:
      'Uluslararası taşınma sürecinde evcil hayvan nakil adımları ve ev sahibi tanıtım mektubunda soyut iddialar yerine somut örnek ("show, don’t tell") kullanımı.',
    details: [
      '28 Mayıs 2026: Cakarta’dan Hollanda’ya köpek taşıma prosedürleri ve belge kontrolü.',
      '17 Haziran 2026: Tanıtım yazısında geçmişi küçümseyen yapay dönüşüm cümlelerinden kaçınma ve somut örneklerle anlatım ilkesi.',
    ],
    boundaryNote:
      'Taşınma hazırlığı dönemine ait görev bağlamıdır; güncel ikamet veya mülkiyet belgesi yerine geçmez.',
    tags: ['Haziran 2026', 'Hollanda', 'Lojistik', 'Show Dont Tell'],
  },
  {
    id: 'mem-2026-housing',
    title: 'Hollanda Konut Araştırması ve Oda Oda Yenileme / Marjinal Fayda Senaryoları',
    dateLabel: '5–27 Ekim 2026',
    isoDate: '2026-10-26',
    era: '2026-ekim-kasim',
    category: 'konut-mimari',
    evidenceLevel: 'gorev-baglami',
    timezone: 'GMT+1 / GMT+2 (Hollanda)',
    region: 'Wassenaar / Den Haag Çevresi',
    summary:
      'Yaşam alanı ve bahçe kriterleriyle konut incelemesi, Hollandaca emlak terimlerinin Türkçeleştirilmesi ve iki senaryolu oda oda renovasyon/maliyet analizi.',
    details: [
      '5–13 Ekim 2026: Geniş yaşam alanı/bahçe ölçütleri, okul erişim süresi ve Hollandaca teknik terimlerin sade açıklaması.',
      '26–27 Ekim 2026: Oda oda tasarım/bakım planı, karşılaştırılabilir iki yatırım senaryosu ve düşük yatırımla en yüksek marjinal kazanımı sağlayan akıllı alternatif.',
    ],
    boundaryNote:
      'Senaryo ve karar destek çalışmasıdır; konutun satın alındığı veya bütçenin kesinleştiği kanıt olmadan varsayılmaz.',
    tags: ['Ekim 2026', 'Wassenaar', 'Renovasyon', 'Marjinal Fayda'],
    pinned: true,
  },
  {
    id: 'mem-2026-folktales',
    title: 'Karşılaştırmalı Halk Masalları ve Anlatı Paralellikleri',
    dateLabel: '19 Ekim 2026',
    isoDate: '2026-10-19',
    era: '2026-ekim-kasim',
    category: 'kuramsal-kultur',
    evidenceLevel: 'gorev-baglami',
    timezone: 'GMT+2',
    region: 'Kültürel Araştırma',
    summary:
      'Yerel halk anlatıları ve Adıyaman masalları ile farklı coğrafya ve Avrupa anlatıları arasındaki motif paralelliklerinin incelenmesi.',
    details: [
      '19 Ekim 2026: Bölgelerarası masal ve anlatı arketiplerinin karşılaştırmalı analizi.',
      'Kayıtlı eski hafıza özetindeki yerel köken notlarıyla temas eden kültürel inceleme başlığı.',
    ],
    boundaryNote:
      'Karşılaştırmalı anlatı ve kültür araştırmasıdır; kimlik veya güncel yaşam yeri çıkarımı yapılmaz.',
    tags: ['Ekim 2026', 'Halk Masalları', 'Anlatı Analizi'],
  },
  {
    id: 'mem-2026-car-charging',
    title: 'Araç Teknik Rapor Analizi, Şarj Aboneliği ve "Kısa Ama Eksiksiz" İletişim',
    dateLabel: '1–5 Kasım 2026',
    isoDate: '2026-11-03',
    era: '2026-ekim-kasim',
    category: 'arac-mobilite',
    evidenceLevel: 'dogrulanmis-iz',
    timezone: 'GMT+1 (Hollanda)',
    region: 'Hollanda / Günlük Operasyon',
    summary:
      'Araç kontrol raporundaki onarım/boya geçmişinin incelenmesi, hiçbir kritik detayı atlamayan kısa yazışma standardı ve şarj aboneliği ödeme güncellemesi.',
    details: [
      '3 Kasım 2026: Car Issues Review kapsamında teknik raporun soruları yanıtlayıp yanıtlamadığının denetimi ve kısa-keskin e-posta taslağı.',
      '5 Kasım 2026: Hollanda şarj portalı ödeme yöntemi güncelleme adımlarının derlenmesi.',
    ],
    boundaryNote:
      'Güncel araç/abonelik takip ve iletişim tercihi kaydıdır; teslimat ve garanti süreçlerinin tamamlandığı ek kanıt olmadan varsayılmaz.',
    tags: ['Kasım 2026', 'Araç Analizi', 'İletişim İlkesi', 'Hollanda'],
    pinned: true,
  },
];

export const FIVE_YEAR_COMPARISON = [
  {
    dimension: 'Saat Dilimi ve Coğrafi İz',
    nov2021: 'GMT+7 (Cakarta / Bangkok) · Güneydoğu Asya bağlantılı bildirim ve işlem akışı',
    nov2026: 'GMT+1 (Hollanda) · Wassenaar/Den Haag çevresi konut, araç ve günlük düzen takibi',
  },
  {
    dimension: 'Dijital ve Teknik Odak',
    nov2021: 'Kişisel e-posta kurulum testi, Microsoft 365 / OneDrive ve Apple bulut aboneliklerinin sıfırdan düzenlenmesi',
    nov2026: 'Çoklu ajan (KeremTwin / Super Agent) mimarisi, yerel hafıza sınırları, karar destek ve otomasyon araçları',
  },
  {
    dimension: 'Zihinsel & Kuramsal Gündem',
    nov2021: 'E-posta arşivinde yazılı günlük yok; Aralık sonunda GMT+3 üniversite çevrimiçi toplantı izi',
    nov2026: 'Projectivity (ontolojik vs. metrik mesafe), karşılaştırmalı halk anlatıları ve düşük yatırımla yüksek marjinal fayda modelleri',
  },
  {
    dimension: 'Kayıt ve Hafıza Disiplini',
    nov2021: 'Dağınık işlem ve abonelik e-postaları üzerinden geriye dönük iz sürme',
    nov2026: 'Tarihli kullanıcı beyanı, görev bağlamı ve doğrulanmamış varsayımları birbirinden ayıran yapılandırılmış hafıza sistemi',
  },
];

export const MATCH_PAIRS: MatchPair[] = [
  {
    id: 'pair-1',
    prompt: 'Kasım 2021 Saat Dilimi İzi',
    match: 'GMT+7 · Cakarta / Bangkok',
    eraLabel: 'Kasım 2021',
  },
  {
    id: 'pair-2',
    prompt: '6 Nisan 2026 Kuramsal Ayrım',
    match: 'Ontolojik vs. Metrik Mesafe',
    eraLabel: 'Nisan 2026',
  },
  {
    id: 'pair-3',
    prompt: '26 Ekim 2026 Renovasyon Ölçütü',
    match: 'Düşük Yatırım · Yüksek Marjinal Fayda',
    eraLabel: 'Ekim 2026',
  },
  {
    id: 'pair-4',
    prompt: '17 Haziran 2026 Tanıtım Yazısı İlkesi',
    match: 'Show, Don’t Tell (Somut Örnek)',
    eraLabel: 'Haziran 2026',
  },
  {
    id: 'pair-5',
    prompt: '3 Kasım 2026 Araç Yazışma Standardı',
    match: 'Kısa Ama Eksiksiz İletişim',
    eraLabel: 'Kasım 2026',
  },
  {
    id: 'pair-6',
    prompt: '21–23 Kasım 2021 Dijital Düzenleme',
    match: 'OneDrive / M365 & Apple Kurulumu',
    eraLabel: 'Kasım 2021',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'Kasım 2021 (beş yıl önce) e-posta kayıtlarında işlemler hangi saat dilimiyle görünüyordu?',
    options: [
      'GMT+7 (Cakarta / Bangkok)',
      'GMT+1 (Amsterdam / Brüksel)',
      'GMT-5 (New York)',
      'GMT+9 (Tokyo / Seul)',
    ],
    correctAnswer: 'GMT+7 (Cakarta / Bangkok)',
    explanation: '6 ve 21 Kasım 2021 tarihli işlemlerde saat dilimi GMT+7 olarak kayıtlıdır; aynı dönemde Endonezya ve Tayland bildirimleri bulunur.',
  },
  {
    id: 'q-2',
    question: '6 Nisan 2026 tarihli kuramsal notlarda ağ bağlantısı sayısıyla ilgili hangi iki kavramın ayrılması vurgulanmıştı?',
    options: [
      'Ontolojik mesafe ile metrik mesafe',
      'Mutlak zaman ile biyolojik zaman',
      'Klasik mekanik ile termodinamik',
      'Sözdizimsel anlam ile pragmatik anlam',
    ],
    correctAnswer: 'Ontolojik mesafe ile metrik mesafe',
    explanation: '6 Nisan 2026 kaydında ağ bağlantısı sayısının uzaklık olarak düşünülmesi ve ontolojik mesafe ile metrik mesafenin ayrılması istenmiştir.',
  },
  {
    id: 'q-3',
    question: '26–27 Ekim 2026 tarihli ev yenileme ve bakım planlamasında iki ana senaryoya ek olarak hangi alternatif özellikle istenmişti?',
    options: [
      'Daha düşük yatırımla en büyük marjinal kazanımı sağlayan akıllı çözüm',
      'Evin tamamen yıkılıp sıfırdan çelik karkas yapılması',
      'Yalnızca bahçe peyzajını içeren tek odalı plan',
      'Mobilyasız kiralama senaryosu',
    ],
    correctAnswer: 'Daha düşük yatırımla en büyük marjinal kazanımı sağlayan akıllı çözüm',
    explanation: 'Oda oda maliyet ve iki karşılaştırılabilir senaryonun yanında, düşük yatırımla en yüksek marjinal faydayı sağlayan akıllı alternatif talep edilmiştir.',
  },
  {
    id: 'q-4',
    question: '3 Kasım 2026 araç kontrol raporu (Car Issues Review) yazışmasında vurgulanan temel iletişim tercihi neydi?',
    options: [
      'Kısa ve keskin olması ama hiçbir önemli noktanın eksilmemesi',
      'En az beş sayfalık hukuki ihtarname formatında yazılması',
      'Yalnızca madde işareti kullanmadan tek cümle yazılması',
      'Teknik rapordaki belirsizliklerin tamamen çıkarılması',
    ],
    correctAnswer: 'Kısa ve keskin olması ama hiçbir önemli noktanın eksilmemesi',
    explanation: 'Kısaltma sırasında kritik noktalar kaybolduğunda "kısa ama eksik olmasın" ilkesiyle tüm önemli tespitlerin korunması istenmiştir.',
  },
  {
    id: 'q-5',
    question: 'Özel alan hafıza ilkelerine göre geçmişteki bir konut, vize veya eğitim araştırması nasıl değerlendirilmelidir?',
    options: [
      'Tarihli görev bağlamı olarak tutulmalı; ek kanıt olmadan kesinleşmiş satın alma veya mezuniyet sayılmamalı',
      'Doğrudan kalıcı kişisel gerçek olarak tüm alanlara kopyalanmalı',
      'Üçüncü kişilere otomatik e-posta göndermek için yetki sayılmalı',
      'Tarihi silinerek güncel durum gibi raporlanmalı',
    ],
    correctAnswer: 'Tarihli görev bağlamı olarak tutulmalı; ek kanıt olmadan kesinleşmiş satın alma veya mezuniyet sayılmamalı',
    explanation: 'Özel İşler hafıza mimarisi tarihli araştırma/görev bağlamı ile doğrulanmış güncel gerçekleri kesin olarak birbirinden ayırır.',
  },
];
