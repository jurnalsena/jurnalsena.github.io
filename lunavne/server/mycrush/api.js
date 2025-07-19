// Online Gift System
const onlineGiftRewards = [
    { time: 5, type: 'gold', amount: 500, description: '500 Gold', id: '5min' },
    { time: 15, type: 'exp', amount: 100, description: '100 Exp', id: '15min' },
    { time: 30, type: 'both', goldAmount: 500, expAmount: 150, description: '500 Gold + 150 Exp', id: '30min' }
];

// Game State
let gameState = {
    player: {
        name: '',
        level: 1,
        experience: 0,
        totalClicks: 0,
        totalLove: 0,
        totalGold: 0,
        playTime: 0,
        startTime: Date.now()
    },
    characters: {},
    items: {},
    outfits: {},
    settings: {
        soundEffects: true,
        backgroundMusic: true,
        particleEffects: true
    },
    currentCharacter: null,
    lovePoints: 0,
    gold: 0,
    autoClicker: 0,
    crushCoin: 0, // currency baru
    onlineGift: {
        sessionStartTime: Date.now(),
        totalOnlineTime: 0,
        claimedRewards: {
            '5min': false,
            '15min': false,
            '30min': false
        },
        lastReset: Date.now()
    },
    backgrounds: {
        default: true,
        room2: false
    },
    currentBackground: 'default',
    shopItems: [], // Array untuk menyimpan item shop yang di-unlock dengan redeem code
    usedRedeemCodes: []
};

// Character Data
const characters = [
    {
        id: 'luna',
        name: 'Luna',
        image: 'assets/img/characters/luna.png',
        requirement: 0,
        baseLovePerClick: 1,
        dialogs: [
            "Hello! I'm Luna! Nice to meet you! \u2764\ufe0f",
            "You're so kind to me... *blushes*",
            "I love spending time with you!",
            "You make my heart flutter! \uD83D\uDC96",
            "Let's go on an adventure together!",
            "You're my special someone! \u2728"
        ]
    },
    {
        id: 'tante-sherly',
        name: 'Tante Sherly',
        image: 'assets/img/characters/tante-sherly.png',
        requirement: 25,
        baseLovePerClick: 2,
        costGold: 10000,
        costCrushCoin: 150,
        levelRequired: 3,
        dialogs: [
            "Oh my, what a charming young person!",
            "You remind me of my younger days...",
            "Such a sweet child! *pats head*",
            "You have such a pure heart!",
            "Let me teach you about love! \u2764\ufe0f",
            "You're like family to me now! \u2728"
        ]
    },
    {
        id: 'angela',
        name: 'Angela',
        image: 'assets/img/characters/angela_default.png',
        requirement: 50,
        baseLovePerClick: 2,
        costGold: 25000,
        costCrushCoin: 250,
        levelRequired: 5,
        dialogs: [
            "Oh my, what a charming young person!",
            "You remind me of my younger days...",
            "Such a sweet child! *pats head*",
            "You have such a pure heart!",
            "Let me teach you about love! \u2764\ufe0f",
            "You're like family to me now! \u2728"
        ]
    },
    {
        id: 'anggita',
        name: 'Anggita',
        image: 'assets/img/characters/anggita_default.png',
        requirement: 75,
        baseLovePerClick: 1,
        costGold: 30000,
        costCrushCoin: 300,
        levelRequired: 7,
        dialogs: [
            "Hello! Nice to meet you! \u2764\ufe0f",
            "You're so kind to me... *blushes*",
            "I love spending time with you!",
            "You make my heart flutter! \uD83D\uDC96",
            "Let's go on an adventure together!",
            "You're my special someone! \u2728"
        ]
    },
    {
        id: 'karina',
        name: 'Karina',
        image: 'assets/img/characters/karina_default.png',
        requirement: 95,
        baseLovePerClick: 1,
        costGold: 50000,
        costCrushCoin: 450,
        levelRequired: 10,
        dialogs: [
            "Hello! Nice to meet you! \u2764\ufe0f",
            "You're so kind to me... *blushes*",
            "I love spending time with you!",
            "You make my heart flutter! \uD83D\uDC96",
            "Let's go on an adventure together!",
            "You're my special someone! \u2728"
        ]
    },
    {
        id: 'sghost',
        name: 'Cute Ghost',
        image: 'assets/img/characters/sghost_default.png',
        requirement: 100,
        baseLovePerClick: 1,
        costGold: 100000,
        costCrushCoin: 850,
        levelRequired: 12,
        dialogs: [
            "Hello! Nice to meet you! \u2764\ufe0f",
            "You're so kind to me... *blushes*",
            "I love spending time with you!",
            "You make my heart flutter! \uD83D\uDC96",
            "Let's go on an adventure together!",
            "You're my special someone! \u2728"
        ]
    },
    {
        id: 'nekochi',
        name: 'Nekochi',
        image: 'assets/img/characters/nekochi_default.png',
        requirement: 100,
        baseLovePerClick: 1,
        costGold: 90000,
        costCrushCoin: 750,
        levelRequired: 15,
        dialogs: [
            "Hello! Nice to meet you! \u2764\ufe0f",
            "You're so kind to me... *blushes*",
            "I love spending time with you!",
            "You make my heart flutter! \uD83D\uDC96",
            "Let's go on an adventure together!",
            "You're my special someone! \u2728"
        ]
    },
    {
        id: 'bella',
        name: 'Bella',
        image: 'assets/img/characters/bella_default.png',
        requirement: 100,
        baseLovePerClick: 1,
        costGold: 90000,
        costCrushCoin: 750,
        levelRequired: 15,
        dialogs: [
            "Hello! Nice to meet you! \u2764\ufe0f",
            "You're so kind to me... *blushes*",
            "I love spending time with you!",
            "You make my heart flutter! \uD83D\uDC96",
            "Let's go on an adventure together!",
            "You're my special someone! \u2728"
        ]
    }
];

// Outfits Data
const outfits = {
    luna: [
        {
            id: 'luna_default',
            name: 'Default Outfit',
            image: 'assets/img/characters/luna.png',
            costGold: 1,
            costCrushCoin: 0,
            levelRequired: 1,
            description: "Luna's original cute outfit",
            unlocked: true
        },
        {
            id: 'luna_naked',
            name: 'Naked Luna',
            image: 'assets/img/characters/luna-naked.png',
            costGold: 150000,
            costCrushCoin: 1500,
            levelRequired: 10,
            description: 'A cute naked Luna',
            unlocked: false
        },
        {
            id: 'luna_casual',
            name: 'Luna Casual Outfit',
            image: 'assets/img/characters/luna-casual.png',
            costGold: 25000,
            costCrushCoin: 250,
            levelRequired: 3,
            description: 'A casual outfit for Luna',
            unlocked: false
        },
        {
            id: 'luna_halloween',
            name: 'Luna Halloween Outfit',
            image: 'assets/img/characters/luna-halloween.png',
            costGold: 301000,
            costCrushCoin: 301,
            levelRequired: 20,
            description: 'Happy Halloween!',
            unlocked: false
        }
    ],
    'tante-sherly': [
        {
            id: 'tante-sherly_default',
            name: 'Default Outfit',
            image: 'assets/img/characters/tante-sherly.png',
            costGold: 1,
            costCrushCoin: 0,
            levelRequired: 1,
            description: "Tante Sherly's original elegant outfit",
            unlocked: true
        },
        {
            id: 'tante-sherly_night',
            name: 'Night Outfit',
            image: 'assets/img/characters/tante-sherly_night.png',
            costGold: 25000,
            costCrushCoin: 250,
            levelRequired: 4,
            description: 'A night outfit for Tante Sherly',
            unlocked: false
        },
        {
            id: 'tante-sherly_xmas',
            name: 'Xmas Outfit',
            image: 'assets/img/characters/tante-sherly_xmas.png',
            costGold: 250000,
            costCrushCoin: 250,
            levelRequired: 25,
            description: 'A xmas outfit for Tante Sherly',
            unlocked: false
        }
    ],
    angela: [
        {
            id: 'angela_default',
            name: 'Default Outfit',
            image: 'assets/img/characters/angela_default.png',
            costGold: 1,
            costCrushCoin: 0,
            levelRequired: 1,
            description: "Angela's original hoodie outfit",
            unlocked: true
        },
        {
            id: 'angela_bikini',
            name: 'Bikini Outfit',
            image: 'assets/img/characters/angela_bikini.png',
            costGold: 8000,
            costCrushCoin: 200,
            levelRequired: 5,
            description: 'A bikini outfit for Angela',
            unlocked: false
        }
    ],
    anggita: [
        {
            id: 'anggita_default',
            name: 'Default Outfit',
            image: 'assets/img/characters/anggita_default.png',
            costGold: 1,
            costCrushCoin: 0,
            levelRequired: 1,
            description: "Anggita's original outfit",
            unlocked: true
        },
        {
            id: 'anggita_xmas',
            name: 'Xmas Outfit',
            image: 'assets/img/characters/anggita_xmas.png',
            costGold: 250000,
            costCrushCoin: 250,
            levelRequired: 25,
            description: 'A xmas outfit for Anggita',
            unlocked: false
        }
    ],
    sghost: [
        {
            id: 'sghost_default',
            name: 'Default Outfit',
            image: 'assets/img/characters/sghost_default.png',
            costGold: 1,
            costCrushCoin: 0,
            levelRequired: 1,
            description: "An original outfit?",
            unlocked: true
        }
    ],
    karina: [
        {
            id: 'karina_default',
            name: 'Default Outfit',
            image: 'assets/img/characters/karina_default.png',
            costGold: 1,
            costCrushCoin: 0,
            levelRequired: 1,
            description: "Anggita's original outfit",
            unlocked: true
        },
        {
            id: 'karina_bikini',
            name: 'Bikini Outfit',
            image: 'assets/img/characters/karina_bikini.png',
            costGold: 20000,
            costCrushCoin: 200,
            levelRequired: 5,
            description: 'A bikini outfit for Karina',
            unlocked: false
        }
    ],
    nekochi: [
        {
            id: 'nekochi_default',
            name: 'Default Outfit',
            image: 'assets/img/characters/nekochi_default.png',
            costGold: 1,
            costCrushCoin: 0,
            levelRequired: 1,
            description: "Nekochi's original outfit",
            unlocked: true
        },
        {
            id: 'nekochi_xmas',
            name: 'Xmas Outfit',
            image: 'assets/img/characters/nekochi_xmas.png',
            costGold: 250000,
            costCrushCoin: 250,
            levelRequired: 25,
            description: 'A xmas outfit for Nekochi',
            unlocked: false
        }
    ],
    bella: [
        {
            id: 'bella_default',
            name: 'Default Outfit',
            image: 'assets/img/characters/bella_default.png',
            costGold: 1,
            costCrushCoin: 0,
            levelRequired: 1,
            description: "Nekochi's original outfit",
            unlocked: true
        },
        {
            id: 'bella_xmas',
            name: 'Xmas Outfit',
            image: 'assets/img/characters/bella_xmas.png',
            costGold: 250000,
            costCrushCoin: 250,
            levelRequired: 25,
            description: 'A xmas outfit for Bella',
            unlocked: false
        }
    ]
};

// Items Data
const items = [
    {
        id: 'hand',
        name: 'Gentle Hand',
        image: 'assets/img/items/hand.png',
        baseCost: 100,
        goldPerClick: 2,
        levelRequired: 1,
        description: 'A gentle touch that earns gold per click'
    },
    {
        id: 'praying',
        name: 'Vibra',
        image: 'assets/img/items/praying.png',
        baseCost: 250,
        lovePerSecond: 2,
        levelRequired: 2,
        description: 'Give your waifu to automatic love points per second'
    },
    {
        id: 'praying2',
        name: 'Lolipop',
        image: 'assets/img/items/praying2.png',
        baseCost: 500,
        goldPerSecond: 3,
        levelRequired: 5,
        description: 'A gift that earns gold per second'
    },
    {
        id: 'keris',
        name: 'Neck Ring',
        image: 'assets/img/items/keris.png',
        baseCost: 1000,
        lovePerClick: 5,
        levelRequired: 8,
        description: 'A gift that can boost love energy'
    },
    {
        id: 'holystick',
        name: 'Baby Oil',
        image: 'assets/img/items/holystick.png',
        baseCost: 2000,
        lovePerClick: 10,
        levelRequired: 12,
        description: 'Make your waifu oily that will radiates pure love'
    }
];

// Backgrounds Data
const backgrounds = [
  {
    id: 'default',
    name: 'Cute Room',
    image: 'assets/img/background/cute_room.png',
    costGold: 0,
    costCrushCoin: 0
  },
  {
    id: 'room2',
    name: 'Bedroom Day',
    image: 'assets/img/background/bedroom_day.png',
    costGold: 25000,
    costCrushCoin: 100
  }
  // Tambahkan background lain di sini
];

// Audio Elements
const audioElements = {
    click: new Audio('assets/audio/click.mp3'),
    // crit: new Audio('assets/audio/crit.mp3'),
    // salvo: new Audio('assets/audio/abilities/salvo.mp3'),
    // moan: new Audio('assets/audio/shot/moan10.mp3')
};

// Background Music System
const backgroundMusic = {
    currentTrack: null,
    volume: 0.3,
    isPlaying: false,
    tracks: [
        {
            id: 'relaxing',
            name: 'Leraxing',
            file: 'assets/audio/bgm/Menu_Master.ogg',
            audio: null
        }
        // Add more tracks here as they become available
    ],
    
    init() {
        this.tracks.forEach(track => {
            try {
                track.audio = new Audio(track.file);
                track.audio.loop = true;
                track.audio.volume = this.volume;
                
                // Handle audio loading errors
                track.audio.addEventListener('error', (e) => {
                    console.warn(`Failed to load audio track: ${track.name}`, e);
                });
            } catch (e) {
                console.warn(`Failed to create audio element for: ${track.name}`, e);
            }
        });
        
        // Set default track
        this.currentTrack = this.tracks[0];
    },
    
    play() {
        if (this.currentTrack && this.currentTrack.audio && gameState.settings.backgroundMusic) {
            this.currentTrack.audio.play().catch(e => {
                console.log('Background music play failed:', e);
                // Handle autoplay policy restrictions
                if (e.name === 'NotAllowedError') {
                    console.log('Autoplay blocked by browser. User interaction required.');
                    // Show a message to user that they need to click to enable music
                    this.showMusicEnableMessage();
                }
            });
            this.isPlaying = true;
        }
    },
    
    showMusicEnableMessage() {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'music-notification';
        notification.innerHTML = `
            <div class="music-notification-content">
                <span>🎵 Click to enable background music</span>
                <button onclick="this.parentElement.parentElement.remove(); backgroundMusic.play();">Enable</button>
            </div>
        `;
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    },
    
    pause() {
        if (this.currentTrack && this.currentTrack.audio) {
            this.currentTrack.audio.pause();
            this.isPlaying = false;
        }
    },
    
    stop() {
        if (this.currentTrack && this.currentTrack.audio) {
            this.currentTrack.audio.pause();
            this.currentTrack.audio.currentTime = 0;
            this.isPlaying = false;
        }
    },
    
    setVolume(volume) {
        this.volume = volume;
        this.tracks.forEach(track => {
            if (track.audio) {
                track.audio.volume = volume;
            }
        });
    },
    
    changeTrack(trackId) {
        this.stop();
        this.currentTrack = this.tracks.find(track => track.id === trackId) || this.tracks[0];
        if (gameState.settings.backgroundMusic) {
            this.play();
        }
    }
};

// Initialize Game
function initGame() {
    loadGameState();
    setupEventListeners();
    
    // Initialize background music
    backgroundMusic.init();
    
    updateUI();
    startGameLoop();
    
    // Check if player has a username and decide what to show
    if (gameState.player.name) {
        // Player has existing save data, go directly to game
        document.getElementById('mainMenuModal').classList.remove('active');
        document.getElementById('gameContainer').classList.remove('hidden');
        initializeCharacters();
        initializeItems();
        
        // Start background music if enabled
        if (gameState.settings.backgroundMusic) {
            backgroundMusic.play();
        }
    } else {
        // New player, show main menu
        showMainMenu();
    }
    updateBackgroundDisplay();
}

// Event Listeners Setup
function setupEventListeners() {
    // Main menu buttons
    document.getElementById('startGameBtn').addEventListener('click', showUsernameModal);
    document.getElementById('settingsBtn').addEventListener('click', () => showModal('settingsModal'));
    document.getElementById('aboutBtn').addEventListener('click', () => showModal('aboutModal'));

    // Username modal
    document.getElementById('confirmUsernameBtn').addEventListener('click', startGame);
    document.getElementById('usernameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startGame();
    });

    // Settings
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
    document.getElementById('resetProgressBtn').addEventListener('click', resetProgress);
    
    // Music volume slider
    document.getElementById('musicVolumeSlider').addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        backgroundMusic.setVolume(volume);
        document.getElementById('volumeDisplay').textContent = `${e.target.value}%`;
    });

    // Game buttons
    document.getElementById('menuBtn').addEventListener('click', showMainMenu);
    document.getElementById('settingsBtnGame').addEventListener('click', () => showModal('settingsModal'));
    document.getElementById('aboutBtnGame').addEventListener('click', () => showModal('aboutModal'));
    document.getElementById('characterSelectBtn').addEventListener('click', () => showModal('characterModal'));
    document.getElementById('outfitBtn').addEventListener('click', () => showModal('outfitModal'));
    document.getElementById('backgroundBtn').addEventListener('click', () => {
        showModal('backgroundModal');
        renderBackgroundModal();
    });
    
    // Music toggle button
    document.getElementById('musicToggleBtn').addEventListener('click', toggleBackgroundMusic);
    
    // Online gift button
    document.getElementById('onlineGiftBtn').addEventListener('click', showOnlineGiftModal);
    
    // Event listener tombol reset online gift
    const resetBtn = document.getElementById('resetOnlineGiftBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Reset online gift timer dan claimed
            gameState.onlineGift.totalOnlineTime = 0;
            gameState.onlineGift.sessionStartTime = Date.now();
            gameState.onlineGift.lastReset = Date.now();
            gameState.onlineGift.claimedRewards = {
                '5min': false,
                '15min': false,
                '30min': false
            };
            saveGameState();
            renderOnlineGiftRewards();
            updateUI();
        });
    }


    // Dialog
    document.getElementById('dialogCloseBtn').addEventListener('click', hideDialog);

    // Character click
    document.getElementById('characterDisplay').addEventListener('click', handleCharacterClick);
    document.getElementById('characterDisplay').addEventListener('contextmenu', function(e) {
        e.preventDefault();
        handleCharacterClick();
    });

    document.getElementById('exportSaveBtn').addEventListener('click', function() {
        const encrypted = encryptSaveData(gameState);
        const blob = new Blob([encrypted], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mycrush_save_data.json';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        showCenterToast('success', 'Encrypted save data exported!');
    });
    document.getElementById('importSaveBtn').addEventListener('click', function() {
        document.getElementById('importSaveInput').click();
    });
    document.getElementById('importSaveInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const imported = decryptSaveData(evt.target.result);
                if (!imported || typeof imported !== 'object' || !imported.player || !imported.characters) {
                    showCenterToast('error', 'Invalid or corrupt encrypted save file!');
                    return;
                }
                Object.assign(gameState, imported);
                saveGameState();
                updateUI();
                showCenterToast('success', 'Encrypted save data imported!');
            } catch (err) {
                showCenterToast('error', 'Failed to import encrypted save!');
            }
        };
        reader.readAsText(file);
    });

    // Event listener tombol Shop
    if (document.getElementById('shopBtn')) {
      document.getElementById('shopBtn').addEventListener('click', renderShopModal);
    }

    document.getElementById('exportPdfBtn')?.addEventListener('click', exportPlayerStatsPdf);

    // Redeem Code di bawah Change Outfit
    var redeemBtn = document.getElementById('redeemCodeBtn');
    if (redeemBtn) {
        redeemBtn.addEventListener('click', () => {
            document.getElementById('redeemCodeInput').value = '';
            document.getElementById('redeemCodeResult').textContent = '';
            showModal('redeemCodeModal');
            setTimeout(() => document.getElementById('redeemCodeInput').focus(), 200);
        });
    }
    document.getElementById('submitRedeemCodeBtn').addEventListener('click', handleRedeemCodeSubmit);
    document.getElementById('redeemCodeInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleRedeemCodeSubmit();
    });
}

// Sembunyikan section redeem code saat about modal ditutup
const aboutModal = document.getElementById('aboutModal');
if (aboutModal) {
    aboutModal.addEventListener('transitionend', function(e) {
        if (!aboutModal.classList.contains('active')) {
            document.getElementById('redeemCodeSection').style.display = 'none';
        }
    });
}

async function exportPlayerStatsPdf() {
    // Ambil playtime dari UI jika ada
    let playTimeValue = '';
    const playTimeElem = document.getElementById('statPlayTime');
    if (playTimeElem) {
        playTimeValue = playTimeElem.textContent.trim();
    } else {
        playTimeValue = formatPlayTime(gameState.player.playTime || 0);
    }
    // Data statistik
    const stats = [
        ['Username', gameState.player.name],
        ['Level', gameState.player.level],
        ['Experience', gameState.player.experience],
        ['Total Clicks', gameState.player.totalClicks],
        ['Total Love Points', gameState.player.totalLove],
        ['Total Gold Earned', gameState.player.totalGold],
        ['Total Crush Coin', gameState.crushCoin],
        ['Play Time', playTimeValue],
    ];
    // Data character progress (4 kolom: No, Nama Karakter, Level, Status)
    const charProgress = Object.entries(gameState.characters || {}).map(([id, data], idx) => {
        return [
            (idx + 1).toString(),
            id,
            data.level,
            data.unlocked ? 'Unlocked' : 'Locked'
        ];
    });
    // Siapkan PDF portrait A4
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    // Judul utama
    pdf.setFontSize(24);
    pdf.text('MyCrush - Player Report', pageWidth / 2, 60, { align: 'center' });
    // Judul Player Statistics
    pdf.setFontSize(18);
    pdf.text('Player Statistics', pageWidth / 2, 100, { align: 'center' });
    // Tabel statistik (2 kolom, rata tengah)
    let startY = 120;
    let rowHeight = 28;
    let tableWidth = 340;
    let col1X = (pageWidth - tableWidth) / 2;
    let col2X = col1X + tableWidth / 2;
    pdf.setFontSize(13);
    // Header tabel statistik
    pdf.setFillColor(255, 107, 157);
    pdf.setTextColor(255,255,255);
    pdf.rect(col1X, startY, tableWidth / 2, rowHeight, 'F');
    pdf.rect(col2X, startY, tableWidth / 2, rowHeight, 'F');
    pdf.text('Statistik', col1X + (tableWidth / 4), startY + 18, { align: 'center' });
    pdf.text('Value', col2X + (tableWidth / 4), startY + 18, { align: 'center' });
    // Isi tabel statistik
    pdf.setFontSize(12);
    pdf.setTextColor(60,60,60);
    let y = startY + rowHeight;
    stats.forEach(([label, value], i) => {
        if (i % 2 === 0) {
            pdf.setFillColor(255,245,250);
        } else {
            pdf.setFillColor(245,235,240);
        }
        pdf.rect(col1X, y, tableWidth / 2, rowHeight, 'F');
        pdf.rect(col2X, y, tableWidth / 2, rowHeight, 'F');
        pdf.text(label, col1X + 10, y + 18);
        pdf.text(String(value), col2X + 10, y + 18);
        y += rowHeight;
    });
    // Spasi ekstra sebelum garis pemisah
    y += 10;
    // Garis pemisah tebal
    pdf.setDrawColor(32, 201, 151);
    pdf.setLineWidth(2.5);
    pdf.line(col1X, y, col1X + tableWidth, y);
    // Spasi ekstra setelah garis pemisah
    y += 24;
    // Judul Character Progress
    pdf.setFontSize(16);
    pdf.setTextColor(32, 201, 151);
    pdf.text('Character Progress', pageWidth / 2, y, { align: 'center' });
    y += 18;
    // Tabel character progress (4 kolom, rata tengah, header hijau shadow)
    pdf.setFontSize(13);
    pdf.setFillColor(32, 201, 151);
    pdf.setTextColor(255,255,255);
    let charTableWidth = 350;
    let charCol1 = (pageWidth - charTableWidth) / 2;
    let charCol2 = charCol1 + 50;
    let charCol3 = charCol2 + 90;
    let charCol4 = charCol3 + 90;
    let charRowHeight = 24;
    // Header tabel character progress dengan efek shadow
    pdf.setDrawColor(0,0,0,0.12);
    pdf.setLineWidth(1);
    pdf.rect(charCol1+2, y+2, 50, charRowHeight, 'F');
    pdf.rect(charCol2+2, y+2, 130, charRowHeight, 'F');
    pdf.rect(charCol3+2, y+2, 100, charRowHeight, 'F');
    pdf.rect(charCol4+2, y+2, 115, charRowHeight, 'F');
    pdf.setFillColor(32, 201, 151);
    pdf.rect(charCol1, y, 50, charRowHeight, 'F');
    pdf.rect(charCol2, y, 130, charRowHeight, 'F');
    pdf.rect(charCol3, y, 100, charRowHeight, 'F');
    pdf.rect(charCol4, y, 115, charRowHeight, 'F');
    pdf.text('No', charCol1 + 25, y + 16, { align: 'center' });
    pdf.text('Nama Karakter', charCol2 + 40, y + 16, { align: 'center' });
    pdf.text('Level', charCol3 + 30, y + 16, { align: 'center' });
    pdf.text('Status', charCol4 + 40, y + 16, { align: 'center' });
    // Isi tabel character progress
    pdf.setFontSize(12);
    pdf.setTextColor(60,60,60);
    let charY = y + charRowHeight;
    charProgress.forEach((row, i) => {
        if (i % 2 === 0) {
            pdf.setFillColor(240,255,250);
        } else {
            pdf.setFillColor(230,250,240);
        }
        pdf.rect(charCol1, charY, 50, charRowHeight, 'F');
        pdf.rect(charCol2, charY, 130, charRowHeight, 'F');
        pdf.rect(charCol3, charY, 100, charRowHeight, 'F');
        pdf.rect(charCol4, charY, 115, charRowHeight, 'F');
        pdf.text(String(row[0]), charCol1 + 25, charY + 15, { align: 'center' });
        pdf.text(String(row[1]), charCol2 + 40, charY + 15, { align: 'center' });
        pdf.text(String(row[2]), charCol3 + 40, charY + 15, { align: 'center' });
        pdf.text(String(row[3]), charCol4 + 40, charY + 15, { align: 'center' });
        charY += charRowHeight;
    });
    // Simpan PDF
    // Tambahkan footer di bawah halaman
    pdf.setFontSize(10);
    pdf.setTextColor(120,120,120);
    pdf.text('MCrush - Idle Clicker © 2025 Cyberus Studio', pageWidth / 2, pdf.internal.pageSize.getHeight() - 24, { align: 'center' });
    pdf.save('mycrush_player_stats.pdf');
}

function formatPlayTime(ms) {
    let s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    s = s % 3600;
    const m = Math.floor(s / 60);
    s = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    if (modalId === 'aboutModal') {
        updateStatistics();
    } else if (modalId === 'outfitModal') {
        renderOutfitModal();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showMainMenu() {
    // Hide all modals and game container
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('usernameModal').classList.remove('active');
    document.getElementById('settingsModal').classList.remove('active');
    document.getElementById('aboutModal').classList.remove('active');
    
    // Show main menu
    document.getElementById('mainMenuModal').classList.add('active');
}

function showUsernameModal() {
    // Only show username modal if no username is set
    if (!gameState.player.name) {
        document.getElementById('mainMenuModal').classList.remove('active');
        document.getElementById('usernameModal').classList.add('active');
        document.getElementById('usernameInput').focus();
    } else {
        // If username already exists, start game directly
        startGame();
    }
}

function startGame() {
    // If username modal is active, get username from input
    if (document.getElementById('usernameModal').classList.contains('active')) {
        const username = document.getElementById('usernameInput').value.trim();
        if (username.length < 2) {
            alert('Please enter a username (at least 2 characters)');
            return;
        }
        gameState.player.name = username;
        document.getElementById('usernameModal').classList.remove('active');
    }
    
    document.getElementById('gameContainer').classList.remove('hidden');
    
    initializeCharacters();
    initializeItems();
    
    // Start background music if enabled
    if (gameState.settings.backgroundMusic) {
        backgroundMusic.play();
    }
    
    // updateUI dan saveGameState tetap dijalankan
    updateUI();
    saveGameState();
}

// Character Management
function initializeCharacters() {
    characters.forEach(char => {
        if (!gameState.characters[char.id]) {
            gameState.characters[char.id] = {
                lovePoints: 0,
                level: 0,
                unlocked: char.requirement === 0,
                currentOutfit: 'default'
            };
        }
    });
    initializeOutfits();
    renderCharacterList();
}

function initializeOutfits() {
    if (!gameState.outfits) {
        gameState.outfits = {};
    }
    
    Object.keys(outfits).forEach(characterId => {
        if (!gameState.outfits[characterId]) {
            gameState.outfits[characterId] = {
                unlocked: ['default'],
                current: 'default'
            };
        }
    });
}

// Fungsi untuk mendapatkan rank karakter berdasarkan level
function getCharacterRank(level) {
    if (level >= 251) return 'Soulmate 💞';
    if (level >= 191) return 'Lover 😘';
    if (level >= 151) return 'Crush 😍';
    if (level >= 101) return 'Close Friend 🥰';
    if (level >= 81) return 'Friend 🤪';
    if (level >= 51) return 'Acquaintance 😳';
    return 'Stranger 🙄';
}

function renderCharacterList() {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = '';
    characters.forEach(char => {
        const charData = gameState.characters[char.id];
        const card = document.createElement('div');
        card.className = `character-card ${charData.unlocked ? '' : 'locked'} ${gameState.currentCharacter === char.id ? 'selected' : ''}`;
        // Calculate love progress
        const maxLove = 100 + (charData.level * 50);
        const lovePercentage = (charData.lovePoints / maxLove) * 100;
        // Tambahkan rank di bawah level
        const rank = getCharacterRank(charData.level);
        card.innerHTML = `
            <img src="${char.image}" alt="${char.name}">
            <div class="name">${char.name}</div>
            <div class="level">Level ${charData.level}</div>
            <div class="rank" style="font-size:0.85em;color:#20c997;font-weight:700;margin-bottom:2px;">${rank}</div>
            <div class="love-progress">
                <div class="love-bar-small">
                    <div class="love-fill-small" style="width: ${lovePercentage}%"></div>
                </div>
                <div class="love-text-small">${charData.lovePoints} / ${maxLove}</div>
            </div>
            ${gameState.currentCharacter === char.id ? '<div class="selected-indicator">✓ Selected</div>' : ''}
        `;
        // Jika karakter belum terbuka dan bukan Luna, tampilkan tombol beli
        if (!charData.unlocked && char.id !== 'luna') {
            if (char.id === 'null') {
                // Bella hanya bisa di-unlock dengan kode
                const info = document.createElement('div');
                info.style = 'color:#ff6b9d;font-size:0.95em;margin-top:8px;font-weight:600;';
                info.textContent = 'Unlock with Pre-Register Code';
                card.appendChild(info);
            } else {
                // Tombol beli dengan gold (selalu tampil)
                const buyGoldBtn = document.createElement('button');
                buyGoldBtn.className = 'buy-character-gold';
                buyGoldBtn.innerHTML = `<img src="assets/img/gold.png" alt="Gold" style="width:18px;height:18px;vertical-align:middle;display:none;">${char.costGold} Gold,<br>(Min Lv ${char.levelRequired})`;
                if (gameState.player.level < char.levelRequired) {
                    buyGoldBtn.disabled = true;
                    buyGoldBtn.title = `Minimum level ${char.levelRequired} to unlock with Gold`;
                } else {
                    buyGoldBtn.onclick = function(e) {
                        e.stopPropagation();
                        buyCharacterWithGold(char.id);
                    };
                }
                card.appendChild(buyGoldBtn);
                // Tombol beli instan dengan Crush Coin (bypass syarat level/gold)
                const buyCCBtn = document.createElement('button');
                buyCCBtn.className = 'buy-character-cc';
                buyCCBtn.innerHTML = `<img src="assets/img/crushcoin2.png" alt="Crush Coin" style="width:18px;height:18px;vertical-align:middle;display:none;">Crush Coin (${char.costCrushCoin} CC)`;
                buyCCBtn.onclick = function(e) {
                    e.stopPropagation();
                    buyCharacterWithCrushCoin(char.id);
                };
                card.appendChild(buyCCBtn);
            }
        }
        if (charData.unlocked) {
            card.addEventListener('click', () => selectCharacter(char.id));
        }
        characterList.appendChild(card);
    });
}

function selectCharacter(characterId) {
    gameState.currentCharacter = characterId;
    gameState.lovePoints = gameState.characters[characterId].lovePoints;
    
    updateCharacterDisplay();
    updateCharacterInfo();
    renderCharacterList();
    closeModal('characterModal');
    saveGameState();
}

function updateCharacterDisplay() {
    if (!gameState.currentCharacter) return;
    
    const character = characters.find(c => c.id === gameState.currentCharacter);
    const charData = gameState.characters[gameState.currentCharacter];
    const outfitData = gameState.outfits[gameState.currentCharacter];
    
    // Get current outfit image
    let outfitImage = character && character.image ? character.image : '';
    if (outfitData && outfitData.current && outfitData.current !== 'default' && outfits[gameState.currentCharacter]) {
        const outfit = outfits[gameState.currentCharacter].find(o => o.id === outfitData.current);
        if (outfit && outfit.image) {
            outfitImage = outfit.image;
        }
    }
    // Fallback jika tidak ada gambar
    if (!outfitImage) {
        outfitImage = 'assets/img/placeholder.png';
    }
    const characterDisplay = document.getElementById('characterDisplay');
    characterDisplay.innerHTML = `<img src="${outfitImage}" alt="${character ? character.name : 'Character'}">`;
    // Show outfit button jika ada
    if (document.getElementById('outfitBtn')) {
        document.getElementById('outfitBtn').style.display = 'block';
    }
}

function updateCharacterInfo() {
    if (!gameState.currentCharacter) return;
    
    const character = characters.find(c => c.id === gameState.currentCharacter);
    const charData = gameState.characters[gameState.currentCharacter];
    // Tampilkan rank di sebelah kanan nama karakter
    const rank = getCharacterRank(charData.level);
    document.getElementById('currentCharacterName').innerHTML = `${character.name} <span style='font-size:0.7em;color:#20c997;font-weight:700;margin-left:8px;'>${rank}</span>`;
    document.getElementById('characterLevel').textContent = charData.level;
    
    const maxLove = 100 + (charData.level * 50);
    const lovePercentage = (gameState.lovePoints / maxLove) * 100;
    
    document.getElementById('loveFill').style.width = `${lovePercentage}%`;
    document.getElementById('loveText').textContent = `${gameState.lovePoints} / ${maxLove}`;
}

// Character Click Handler
function handleCharacterClick() {
    if (!gameState.currentCharacter) return;
    
    const character = characters.find(c => c.id === gameState.currentCharacter);
    const charData = gameState.characters[gameState.currentCharacter];
    
    // Calculate love points gained
    let loveGained = character.baseLovePerClick;
    let goldGained = 1; // Base 1 gold per click
    
    // Add item bonuses
    Object.keys(gameState.items).forEach(itemId => {
        const item = items.find(i => i.id === itemId);
        const itemData = gameState.items[itemId];
        
        if (item.goldPerClick && itemData.level > 0) {
            goldGained += item.goldPerClick * itemData.level;
        }
        if (item.lovePerClick && itemData.level > 0) {
            loveGained += item.lovePerClick * itemData.level;
        }
    });
    
    // Add love points and gold
    gameState.lovePoints += loveGained;
    gameState.gold += goldGained;
    gameState.player.totalLove += loveGained;
    gameState.player.totalGold += goldGained;
    gameState.player.totalClicks++;
    charData.lovePoints = gameState.lovePoints;
    
    // Check for level up
    const maxLove = 100 + (charData.level * 50);
    if (gameState.lovePoints >= maxLove) {
        levelUpCharacter();
    }
    
    // Effects
    createLoveParticles();
    
    if (gameState.settings.soundEffects) {
        playRandomSound();
    }
    
    // Random dialog
    if (Math.random() < 0.1) { // 10% chance
        showRandomDialog();
    }
    
    updateUI();
    renderItemsList(); // Update gold display
    saveGameState();
}

function levelUpCharacter() {
    const charData = gameState.characters[gameState.currentCharacter];
    charData.level++;
    gameState.lovePoints = 0;
    charData.lovePoints = 0;
    // Add player experience when character levels up
    const expGained = 10 + (charData.level * 5); // More exp for higher character levels
    gameState.player.experience += expGained;
    // Check for player level up
    checkPlayerLevelUp();
    // Hilangkan unlock otomatis karakter berdasarkan total love
    showDialog(characters.find(c => c.id === gameState.currentCharacter).name, 
               `Level up! I feel even closer to you now! ✨`);
}

// Update renderOutfitModal to support both currencies
function renderOutfitModal() {
    if (!gameState.currentCharacter) return;
    const character = characters.find(c => c.id === gameState.currentCharacter);
    const outfitData = gameState.outfits[gameState.currentCharacter];
    const characterOutfits = outfits[gameState.currentCharacter];
    // Render current outfit
    const currentOutfit = characterOutfits.find(o => o.id === outfitData.current) || characterOutfits[0];
    const currentOutfitDisplay = document.getElementById('currentOutfitDisplay');
    currentOutfitDisplay.innerHTML = `
        <img src="${currentOutfit.image}" alt="${currentOutfit.name}">
        <div class="outfit-info">
            <div class="outfit-name">${currentOutfit.name}</div>
            <div class="outfit-description">${currentOutfit.description}</div>
        </div>
    `;
    // Render outfit list
    const outfitList = document.getElementById('outfitList');
    outfitList.innerHTML = '';
    characterOutfits.forEach(outfit => {
        const isUnlocked = outfitData.unlocked.includes(outfit.id);
        const isSelected = outfitData.current === outfit.id;
        const canAffordGold = gameState.gold >= (outfit.costGold || 0);
        const canAffordCC = gameState.crushCoin >= (outfit.costCrushCoin || 0);
        const hasLevel = gameState.player.level >= outfit.levelRequired;
        const canBuy = !isUnlocked && hasLevel && ((outfit.costGold && canAffordGold) || (outfit.costCrushCoin && canAffordCC));
        const card = document.createElement('div');
        card.className = `outfit-card ${isSelected ? 'selected' : ''} ${!isUnlocked && !canBuy ? 'locked' : ''} ${canBuy ? 'available' : ''}`;
        // Create requirements text
        let requirementsText = '';
        if (!isUnlocked) {
            const requirements = [];
            if (!hasLevel) requirements.push(`Level ${outfit.levelRequired}`);
            if (outfit.costGold && !canAffordGold) requirements.push(`${outfit.costGold} gold`);
            if (outfit.costCrushCoin && !canAffordCC) requirements.push(`${outfit.costCrushCoin} crush coin`);
            requirementsText = requirements.join(' • ');
        }
        // Cost display (only if not unlocked)
        let costHtml = '';
        if (!isUnlocked) {
            if (outfit.costGold && outfit.costCrushCoin) {
                costHtml = `<div class="cost outfit-cost-btns"><button class="buy-outfit-gold" data-id="${outfit.id}"><img src='assets/img/gold.png' style='width:18px;vertical-align:middle;'> ${outfit.costGold} Gold</button> <span style='margin:0 8px;font-weight:600;color:#aaa;'>or</span> <button class="buy-outfit-cc" data-id="${outfit.id}"><img src='assets/img/crushcoin2.png' style='width:18px;vertical-align:middle;'> ${outfit.costCrushCoin} Crush Coin</button></div>`;
            } else if (outfit.costGold) {
                costHtml = `<div class="cost outfit-cost-btns"><button class="buy-outfit-gold" data-id="${outfit.id}"><img src='assets/img/gold.png' style='width:18px;vertical-align:middle;'> ${outfit.costGold} Gold</button></div>`;
            } else if (outfit.costCrushCoin) {
                costHtml = `<div class="cost outfit-cost-btns"><button class="buy-outfit-cc" data-id="${outfit.id}"><img src='assets/img/crushcoin2.png' style='width:18px;vertical-align:middle;'> ${outfit.costCrushCoin} Crush Coin</button></div>`;
            } else {
                costHtml = `<div class="cost">Free</div>`;
            }
        }
        card.innerHTML = `
            <img src="${outfit.image}" alt="${outfit.name}">
            <div class="name">${outfit.name}</div>
            <div class="description">${outfit.description}</div>
            ${costHtml}
            ${!isUnlocked ? `<div class="requirements">${requirementsText}</div>` : ''}
            <div class="status">${isUnlocked ? (isSelected ? 'Equipped' : 'Owned') : (canBuy ? 'Available' : 'Locked')}</div>
        `;
        if (isUnlocked) {
            card.addEventListener('click', () => selectOutfit(outfit.id));
        }
        outfitList.appendChild(card);
    });
    // Add event listeners for buy buttons
    outfitList.querySelectorAll('.buy-outfit-gold').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            buyOutfit(btn.getAttribute('data-id'), 'gold');
        });
    });
    outfitList.querySelectorAll('.buy-outfit-cc').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            buyOutfit(btn.getAttribute('data-id'), 'cc');
        });
    });
}

function selectOutfit(outfitId) {
    if (!gameState.currentCharacter) return;
    
    gameState.outfits[gameState.currentCharacter].current = outfitId;
    updateCharacterDisplay();
    renderOutfitModal();
    saveGameState();
}

// Update buyOutfit to support both currencies
function buyOutfit(outfitId, currency) {
    if (!gameState.currentCharacter) return;
    const characterOutfits = outfits[gameState.currentCharacter];
    const outfit = characterOutfits.find(o => o.id === outfitId);
    // Check level requirement
    if (gameState.player.level < outfit.levelRequired) {
        showCenterToast('warning', `You need to be level ${outfit.levelRequired} to buy this outfit!`);
        return;
    }
    if (currency === 'gold') {
        if (gameState.gold < outfit.costGold) {
            showCenterToast('error', 'Not enough gold!');
            return;
        }
        gameState.gold -= outfit.costGold;
        gameState.player.totalGold += outfit.costGold;
    } else if (currency === 'cc') {
        if (gameState.crushCoin < outfit.costCrushCoin) {
            showCenterToast('error', 'Not enough Crush Coin!');
            return;
        }
        gameState.crushCoin -= outfit.costCrushCoin;
    } else {
        showCenterToast('error', 'Invalid currency!');
        return;
    }
    gameState.outfits[gameState.currentCharacter].unlocked.push(outfitId);
    updateUI();
    renderOutfitModal();
    saveGameState();
    showCenterToast('success', 'Outfit unlocked!');
}

function checkPlayerLevelUp() {
    const currentLevel = gameState.player.level;
    const expNeeded = currentLevel * 100; // 100 exp per level
    
    if (gameState.player.experience >= expNeeded) {
        gameState.player.level++;
        gameState.player.experience -= expNeeded;
        
        // Show player level up notification
        showPlayerLevelUpDialog();
        
        // Check for additional level ups
        checkPlayerLevelUp();
    }
}

function showPlayerLevelUpDialog() {
    const dialogBox = document.getElementById('dialogBox');
    const dialogImg = document.getElementById('dialogCharacterImg');
    const dialogText = document.getElementById('dialogText');
    
    dialogImg.src = 'assets/img/level_up.png'; // Use logo for player level up
    dialogText.textContent = `🎉 Congratulations! You reached level ${gameState.player.level}! You're becoming a true love master! ✨`;
    
    dialogBox.classList.add('show');
    
    setTimeout(() => {
        dialogBox.classList.remove('show');
    }, 4000);
}

// Items Management
function initializeItems() {
    items.forEach(item => {
        if (!gameState.items[item.id]) {
            gameState.items[item.id] = {
                level: 0,
                owned: 0
            };
        }
    });
    renderItemsList();
}

function renderItemsList() {
    const itemsList = document.getElementById('itemsList');
    const boostsList = document.getElementById('boostsList');
    if (itemsList) itemsList.innerHTML = '';
    if (boostsList) boostsList.innerHTML = '';

    // Pisahkan item dan boost
    const itemCards = [];
    const boostCards = [];

    items.forEach(item => {
        const itemData = gameState.items[item.id] || { level: 0, owned: 0 };
        const card = document.createElement('div');
        card.className = `item-card${itemData.owned > 0 ? ' owned' : ''}${gameState.player.level < item.levelRequired ? ' locked' : ''}`;
        
        // Calculate upgrade cost
        const upgradeCost = Math.floor(item.baseCost * Math.pow(1.15, itemData.level));
        
        // Get effect description
        let effectText = '';
        let effectIcon = '';
        if (item.goldPerClick) {
            effectText = `+${item.goldPerClick * itemData.level} gold/click`;
            effectIcon = '💰';
        } else if (item.lovePerClick) {
            effectText = `+${item.lovePerClick * itemData.level} love/click`;
            effectIcon = '💖';
        } else if (item.goldPerSecond) {
            effectText = `+${item.goldPerSecond * itemData.level} gold/sec`;
            effectIcon = '💰';
        } else if (item.lovePerSecond) {
            effectText = `+${item.lovePerSecond * itemData.level} love/sec`;
            effectIcon = '💖';
        }
        
        // Check if player meets level requirement
        const meetsLevelRequirement = gameState.player.level >= item.levelRequired;
        const levelRequirementClass = meetsLevelRequirement ? 'requirement-met' : 'requirement-not-met';
        
        // Badge
        let badge = '';
        if (!meetsLevelRequirement) {
            badge = '<div class="badge badge-locked">Locked</div>';
        } else if (itemData.owned > 0) {
            badge = '<div class="badge badge-owned">Owned</div>';
        }
        
        // Tombol upgrade
        const canUpgrade = meetsLevelRequirement && gameState.gold >= upgradeCost;
        const upgradeBtn = `<button class="upgrade-btn" ${canUpgrade ? '' : 'disabled'}>Upgrade</button>`;
        
        // Card content
        card.innerHTML = `
            ${badge}
            <img src="${item.image}" alt="${item.name}">
            <div class="name">${item.name}</div>
            <div class="desc">${item.description}</div>
            <div class="level">Level ${itemData.level}</div>
            <div class="effect">${effectIcon} <span>${effectText}</span></div>
            <div class="level-requirement ${levelRequirementClass}">Level ${item.levelRequired} Required</div>
            <div class="cost">${upgradeCost} gold</div>
            <div class="upgrade-btn-container">${upgradeBtn}</div>
        `;
        // Tombol upgrade event
        card.querySelector('.upgrade-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            upgradeItem(item.id, e);
        });
        // Masukkan ke grid yang sesuai
        if (item.goldPerClick || item.lovePerClick) {
            itemCards.push(card);
        } else if (item.goldPerSecond || item.lovePerSecond) {
            boostCards.push(card);
        }
    });
    // Render ke grid
    itemCards.forEach(card => itemsList && itemsList.appendChild(card));
    boostCards.forEach(card => boostsList && boostsList.appendChild(card));
    // Update gold display
    document.getElementById('goldAmount').textContent = gameState.gold.toLocaleString();
    document.getElementById('goldAmountItems').textContent = gameState.gold.toLocaleString();
    // Update gold & crush coin display
    if (document.getElementById('goldAmountItems')) {
        document.getElementById('goldAmountItems').textContent = gameState.gold.toLocaleString();
    }
    if (document.getElementById('goldAmountBoosts')) {
        document.getElementById('goldAmountBoosts').textContent = gameState.gold.toLocaleString();
    }
    if (document.getElementById('crushCoinAmountItems')) {
        document.getElementById('crushCoinAmountItems').textContent = gameState.crushCoin.toLocaleString();
    }
    if (document.getElementById('crushCoinAmountBoosts')) {
        document.getElementById('crushCoinAmountBoosts').textContent = gameState.crushCoin.toLocaleString();
    }
}

// Perbaiki: upgradeItem menerima event opsional
function upgradeItem(itemId, event) {
    const item = items.find(i => i.id === itemId);
    const itemData = gameState.items[itemId] || { level: 0, owned: 0 };
    const upgradeCost = Math.floor(item.baseCost * Math.pow(1.15, itemData.level));
    
    // Check level requirement
    if (gameState.player.level < item.levelRequired) {
        let itemCard = null;
        if (event && event.target) {
            itemCard = event.target.closest('.item-card');
        } else {
            // fallback: cari card berdasarkan id
            const itemsList = document.getElementById('itemsList');
            itemCard = Array.from(itemsList.children).find(card => card.querySelector('.name')?.textContent === item.name);
        }
        if (itemCard) {
            itemCard.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => itemCard.style.animation = '', 500);
        }
        showCenterToast('warning', `You need to be level ${item.levelRequired} to upgrade this item!`);
        return;
    }
    
    if (gameState.gold >= upgradeCost) {
        gameState.gold -= upgradeCost;
        gameState.player.totalGold += upgradeCost;
        
        if (itemData.level === 0) {
            // First purchase
            itemData.owned = 1;
        }
        itemData.level += 1;
        gameState.items[item.id] = itemData;
        
        if (gameState.settings.soundEffects) {
            audioElements.crit?.play?.();
        }
        // Add visual feedback
        let itemCard = null;
        if (event && event.target) {
            itemCard = event.target.closest('.item-card');
        } else {
            // fallback: cari card berdasarkan id
            const itemsList = document.getElementById('itemsList');
            itemCard = Array.from(itemsList.children).find(card => card.querySelector('.name')?.textContent === item.name);
        }
        if (itemCard) {
            itemCard.classList.add('pulse');
            setTimeout(() => itemCard.classList.remove('pulse'), 300);
        }
        renderItemsList();
        updateUI();
        saveGameState();
        showCenterToast('success', 'Item upgraded!');
    } else {
        let itemCard = null;
        if (event && event.target) {
            itemCard = event.target.closest('.item-card');
        } else {
            // fallback: cari card berdasarkan id
            const itemsList = document.getElementById('itemsList');
            itemCard = Array.from(itemsList.children).find(card => card.querySelector('.name')?.textContent === item.name);
        }
        if (itemCard) {
            itemCard.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => itemCard.style.animation = '', 500);
        }
        showCenterToast('error', 'Not enough gold!');
    }
}

// Effects and Animations
function createLoveParticles() {
    if (!gameState.settings.particleEffects) return;
    
    const particlesContainer = document.getElementById('loveParticles');
    const particle = document.createElement('div');
    particle.className = 'love-particle';
    particle.textContent = '💕';
    
    const x = Math.random() * 200 + 100;
    const y = Math.random() * 200 + 100;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

function playRandomSound() {
    const sounds = [audioElements.click, audioElements.moan];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.currentTime = 0;
    randomSound.play().catch(() => {});
}

// Dialog System
function showRandomDialog() {
    if (!gameState.currentCharacter) return;
    
    const character = characters.find(c => c.id === gameState.currentCharacter);
    const dialog = character.dialogs[Math.floor(Math.random() * character.dialogs.length)];
    showDialog(character.name, dialog);
}

function showDialog(characterName, text) {
    const character = characters.find(c => c.name === characterName);
    const dialogBox = document.getElementById('dialogBox');
    const dialogImg = document.getElementById('dialogCharacterImg');
    const dialogText = document.getElementById('dialogText');
    
    dialogImg.src = character.image;
    dialogText.textContent = text;
    
    dialogBox.classList.add('show');
    
    setTimeout(() => {
        dialogBox.classList.remove('show');
    }, 5000);
}

function hideDialog() {
    document.getElementById('dialogBox').classList.remove('show');
}

// Background Music Control
function toggleBackgroundMusic() {
    if (backgroundMusic.isPlaying) {
        backgroundMusic.pause();
        document.getElementById('musicToggleBtn').textContent = '🔇';
        document.getElementById('musicToggleBtn').title = 'Music: Off';
    } else {
        backgroundMusic.play();
        document.getElementById('musicToggleBtn').textContent = '🎵';
        document.getElementById('musicToggleBtn').title = 'Music: On';
    }
}

function updateMusicButton() {
    const musicBtn = document.getElementById('musicToggleBtn');
    if (!musicBtn) return;
    
    if (backgroundMusic.isPlaying && gameState.settings.backgroundMusic) {
        musicBtn.textContent = '🎵';
        musicBtn.title = 'Music: On (Click to mute)';
        musicBtn.classList.add('music-playing');
    } else {
        musicBtn.textContent = '🔇';
        musicBtn.title = 'Music: Off (Click to play)';
        musicBtn.classList.remove('music-playing');
    }
}

// Settings
function saveSettings() {
    const previousMusicSetting = gameState.settings.backgroundMusic;
    
    gameState.settings.soundEffects = document.getElementById('soundToggle').checked;
    gameState.settings.backgroundMusic = document.getElementById('musicToggle').checked;
    gameState.settings.particleEffects = document.getElementById('particleToggle').checked;
    
    // Handle background music changes
    if (gameState.settings.backgroundMusic && !previousMusicSetting) {
        // Music was turned on
        backgroundMusic.play();
    } else if (!gameState.settings.backgroundMusic && previousMusicSetting) {
        // Music was turned off
        backgroundMusic.pause();
    }
    
    closeModal('settingsModal');
    saveGameState();
}





// Online Gift Functions
function showOnlineGiftModal() {
    showModal('onlineGiftModal');
    renderOnlineGiftRewards();
}

function renderOnlineGiftRewards() {
    const onlineRewardsList = document.getElementById('onlineRewardsList');
    const onlineTimeDisplay = document.getElementById('onlineTimeDisplay');
    
    if (!onlineRewardsList || !onlineTimeDisplay) return;
    
    // Ensure onlineGift structure exists
    if (!gameState.onlineGift) {
        gameState.onlineGift = {
            sessionStartTime: Date.now(),
            totalOnlineTime: 0,
            claimedRewards: {
                '5min': false,
                '15min': false,
                '30min': false
            },
            lastReset: Date.now()
        };
    }
    
    // Update online time display
    const onlineMinutes = Math.floor(gameState.onlineGift.totalOnlineTime / 60);
    const onlineSeconds = gameState.onlineGift.totalOnlineTime % 60;
    onlineTimeDisplay.textContent = `${onlineMinutes.toString().padStart(2, '0')}:${onlineSeconds.toString().padStart(2, '0')}`;
    
    // Clear previous rewards
    onlineRewardsList.innerHTML = '';
    
    // Render all online rewards
    onlineGiftRewards.forEach((reward) => {
        const rewardItem = document.createElement('div');
        const isAvailable = gameState.onlineGift.totalOnlineTime >= (reward.time * 60) && !gameState.onlineGift.claimedRewards[reward.id];
        const isClaimed = gameState.onlineGift.claimedRewards[reward.id];
        
        rewardItem.className = `online-reward-item ${isClaimed ? 'claimed' : (isAvailable ? 'available' : '')}`;
        
        let status, statusClass;
        if (isClaimed) {
            status = 'Claimed';
            statusClass = 'claimed';
        } else if (isAvailable) {
            status = 'Claim Now!';
            statusClass = 'available';
        } else {
            status = 'Locked';
            statusClass = 'locked';
        }
        
        let rewardText, amountText;
        if (reward.type === 'gold') {
            rewardText = '💰 Gold';
            amountText = `+${reward.amount}`;
        } else if (reward.type === 'exp') {
            rewardText = '⭐ Experience';
            amountText = `+${reward.amount}`;
        } else if (reward.type === 'both') {
            rewardText = '💰 Gold + ⭐ Experience';
            amountText = `+${reward.goldAmount} +${reward.expAmount}`;
        }
        
        rewardItem.innerHTML = `
            <div class="time">${reward.time} Minutes</div>
            <div class="reward">${rewardText}</div>
            <div class="amount">${amountText}</div>
            <div class="status ${statusClass}">${status}</div>
        `;
        
        if (isAvailable) {
            rewardItem.addEventListener('click', () => claimOnlineGift(reward.id));
        }
        
        onlineRewardsList.appendChild(rewardItem);
    });
    // Tampilkan tombol reset jika semua reward sudah di-claim
    const resetBtn = document.getElementById('resetOnlineGiftBtn');
    if (resetBtn) {
        resetBtn.style.display = allClaimed ? 'block' : 'none';
    }
}

function claimOnlineGift(rewardId) {
    const reward = onlineGiftRewards.find(r => r.id === rewardId);
    
    if (!reward) {
        showOnlineGiftResult('Invalid reward!', 'error');
        return;
    }
    
    if (gameState.onlineGift.claimedRewards[rewardId]) {
        showOnlineGiftResult('This reward has already been claimed!', 'error');
        return;
    }
    
    if (gameState.onlineGift.totalOnlineTime < (reward.time * 60)) {
        showOnlineGiftResult('Not enough online time to claim this reward!', 'error');
        return;
    }
    
    // Give the reward
    let rewardText = '';
    
    if (reward.type === 'gold') {
        gameState.gold += reward.amount;
        gameState.player.totalGold += reward.amount;
        rewardText = `+${reward.amount} Gold`;
    } else if (reward.type === 'exp') {
        gameState.player.experience += reward.amount;
        rewardText = `+${reward.amount} Player Experience`;
        checkPlayerLevelUp();
    } else if (reward.type === 'both') {
        gameState.gold += reward.goldAmount;
        gameState.player.totalGold += reward.goldAmount;
        gameState.player.experience += reward.expAmount;
        rewardText = `+${reward.goldAmount} Gold +${reward.expAmount} Player Experience`;
        checkPlayerLevelUp();
    }
    
    // Mark as claimed
    gameState.onlineGift.claimedRewards[rewardId] = true;
    
    // Save game state
    saveGameState();
    
    // Update UI
    updateUI();
    renderItemsList();
    
    // Show success message
    showOnlineGiftResult(`Online gift claimed! ${rewardText}`, 'success');
    
    // Refresh rewards display
    renderOnlineGiftRewards();
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeModal('onlineGiftModal');
    }, 3000);
}

function showOnlineGiftResult(message, type) {
    const result = document.getElementById('onlineGiftResult');
    result.textContent = message;
    result.className = `online-gift-result ${type}`;
    result.classList.remove('hidden');
}

function updateOnlineTime() {
    // Ensure onlineGift structure exists
    if (!gameState.onlineGift) {
        gameState.onlineGift = {
            sessionStartTime: Date.now(),
            totalOnlineTime: 0,
            claimedRewards: {
                '5min': false,
                '15min': false,
                '30min': false
            },
            lastReset: Date.now()
        };
        return;
    }

    const currentTime = Date.now();
    const sessionTime = Math.floor((currentTime - gameState.onlineGift.sessionStartTime) / 1000);
    gameState.onlineGift.totalOnlineTime += sessionTime;
    gameState.onlineGift.sessionStartTime = currentTime;

    // --- 1 hour reset logic ---
    const ONE_HOUR = 60 * 60 * 1000;
    if (!gameState.onlineGift.lastReset) {
        gameState.onlineGift.lastReset = Date.now();
    }
    if (currentTime - gameState.onlineGift.lastReset >= ONE_HOUR) {
        // Reset claimed rewards and timer
        gameState.onlineGift.claimedRewards = {
            '5min': false,
            '15min': false,
            '30min': false
        };
        gameState.onlineGift.totalOnlineTime = 0;
        gameState.onlineGift.lastReset = currentTime;
    }
    // --- end 1 hour reset logic ---

    // Update online gift button if rewards are available
    updateOnlineGiftButton();
}

function updateOnlineGiftButton() {
    const onlineGiftBtn = document.getElementById('onlineGiftBtn');
    if (!onlineGiftBtn) return;
    
    // Ensure onlineGift structure exists
    if (!gameState.onlineGift) {
        gameState.onlineGift = {
            sessionStartTime: Date.now(),
            totalOnlineTime: 0,
            claimedRewards: {
                '5min': false,
                '15min': false,
                '30min': false
            },
            lastReset: Date.now()
        };
        return;
    }
    
    let hasAvailableRewards = false;
    
    onlineGiftRewards.forEach((reward) => {
        if (gameState.onlineGift.totalOnlineTime >= (reward.time * 60) && !gameState.onlineGift.claimedRewards[reward.id]) {
            hasAvailableRewards = true;
        }
    });
    
    if (hasAvailableRewards) {
        onlineGiftBtn.classList.add('has-bonus');
    } else {
        onlineGiftBtn.classList.remove('has-bonus');
    }
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone!')) {
        // Clear all game data
        gameState = {
            player: {
                name: '',
                level: 1,
                experience: 0,
                totalClicks: 0,
                totalLove: 0,
                totalGold: 0,
                playTime: 0,
                startTime: Date.now()
            },
            characters: {},
            items: {},
            outfits: {},
            settings: {
                soundEffects: true,
                backgroundMusic: true,
                particleEffects: true
            },
            currentCharacter: null,
            lovePoints: 0,
            gold: 0,
            autoClicker: 0,
            crushCoin: 0, // currency baru
            onlineGift: {
                sessionStartTime: Date.now(),
                totalOnlineTime: 0,
                claimedRewards: {
                    '5min': false,
                    '15min': false,
                    '30min': false
                },
                lastReset: Date.now()
            },
            backgrounds: {
                default: true,
                room2: false
            },
            currentBackground: 'default'
        };
        
        // Clear local storage
        localStorage.removeItem('lunaVNE_save');
        
        // Reset UI
        document.getElementById('gameContainer').classList.add('hidden');
        document.getElementById('mainMenuModal').classList.add('active');
        document.getElementById('usernameModal').classList.remove('active');
        document.getElementById('usernameInput').value = '';
        
        // Reset settings checkboxes
        document.getElementById('soundToggle').checked = true;
        document.getElementById('musicToggle').checked = true;
        document.getElementById('particleToggle').checked = true;
        
        // Reset volume slider
        const volumeSlider = document.getElementById('musicVolumeSlider');
        const volumeDisplay = document.getElementById('volumeDisplay');
        if (volumeSlider && volumeDisplay) {
            volumeSlider.value = 30;
            volumeDisplay.textContent = '30%';
            backgroundMusic.setVolume(0.3);
        }
        
        // Stop background music
        backgroundMusic.stop();
        
        closeModal('settingsModal');
        
        alert('Progress has been reset! You can now start a new game.');
    }
}

// Statistics
function updateStatistics() {
    document.getElementById('statUsername').textContent = gameState.player.name;
    document.getElementById('statLevel').textContent = gameState.player.level;
    document.getElementById('statExperience').textContent = gameState.player.experience.toLocaleString();
    document.getElementById('statTotalClicks').textContent = gameState.player.totalClicks.toLocaleString();
    document.getElementById('statTotalLove').textContent = gameState.player.totalLove.toLocaleString();
    // Add gold statistics
    const statTotalGold = document.getElementById('statTotalGold');
    if (statTotalGold) {
        statTotalGold.textContent = gameState.player.totalGold.toLocaleString();
    }
    const playTime = Math.floor((Date.now() - gameState.player.startTime) / 1000);
    const hours = Math.floor(playTime / 3600);
    const minutes = Math.floor((playTime % 3600) / 60);
    const seconds = playTime % 60;
    document.getElementById('statPlayTime').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    // Tambahkan icon pada label statistik
    const statIcons = [
        '<i class="fa-solid fa-user"></i>',
        '<i class="fa-solid fa-star"></i>',
        '<i class="fa-solid fa-bolt"></i>',
        '<i class="fa-solid fa-mouse-pointer"></i>',
        '<i class="fa-solid fa-heart"></i>',
        '<i class="fa-solid fa-coins"></i>',
        '<i class="fa-solid fa-coins"></i>',
        '<i class="fa-solid fa-clock"></i>'
    ];
    const statLabels = document.querySelectorAll('.player-stats .stat-item span:first-child');
    statLabels.forEach((label, i) => {
        label.innerHTML = statIcons[i] + ' ' + label.textContent.replace(/^[^:]+/, label.textContent.split(':')[0]);
    });
    // Character statistics
    const characterStatsList = document.getElementById('characterStatsList');
    characterStatsList.innerHTML = '';
    characters.forEach(char => {
        const charData = gameState.characters[char.id];
        if (charData) {
            const statDiv = document.createElement('div');
            statDiv.className = 'char-progress-item';
            statDiv.innerHTML = `
                <div class="char-icon-wrapper">
                    <img class="char-icon" src="${char.image}" alt="${char.name}">
                </div>
                <div class="char-progress-info">
                    <div class="char-name">${char.name}</div>
                    <div class="char-level">Level ${charData.level}</div>
                    <div class="char-love">${charData.lovePoints} love</div>
                </div>
            `;
            characterStatsList.appendChild(statDiv);
        }
    });
    // Tambahkan crush coin ke statistik
    if (document.getElementById('statCrushCoin')) {
        document.getElementById('statCrushCoin').textContent = gameState.crushCoin.toLocaleString();
    }
}

// UI Updates
function updateUI() {
    if (document.getElementById('playerName'))
        document.getElementById('playerName').textContent = gameState.player.name;
    if (document.getElementById('playerLevel'))
        document.getElementById('playerLevel').textContent = gameState.player.level;
    // Update experience bar
    const expNeeded = gameState.player.level * 100;
    const expPercentage = (gameState.player.experience / expNeeded) * 100;
    if (document.getElementById('expFill'))
        document.getElementById('expFill').style.width = `${expPercentage}%`;
    if (document.getElementById('expText'))
        document.getElementById('expText').textContent = `${gameState.player.experience} / ${expNeeded}`;
    // Update gold displays
    if (document.getElementById('goldAmount'))
        document.getElementById('goldAmount').textContent = gameState.gold.toLocaleString();
    if (document.getElementById('goldAmountItems'))
        document.getElementById('goldAmountItems').textContent = gameState.gold.toLocaleString();
    if (document.getElementById('goldAmountBoosts')) {
        document.getElementById('goldAmountBoosts').textContent = gameState.gold.toLocaleString();
    }
    // Tambahkan crush coin
    if (document.getElementById('crushCoinAmount'))
        document.getElementById('crushCoinAmount').textContent = gameState.crushCoin.toLocaleString();
    // Update music button
    updateMusicButton();
    // Update online gift button
    updateOnlineGiftButton();
    if (gameState.currentCharacter) {
        updateCharacterInfo();
    }
    if (document.getElementById('crushCoinAmountItems')) {
        document.getElementById('crushCoinAmountItems').textContent = gameState.crushCoin.toLocaleString();
    }
    if (document.getElementById('crushCoinAmountBoosts')) {
        document.getElementById('crushCoinAmountBoosts').textContent = gameState.crushCoin.toLocaleString();
    }
}

// Render Background Modal (UI akan dihubungkan ke modal di index.html)
function renderBackgroundModal() {
    const bgList = document.getElementById('backgroundList');
    if (!bgList) return;
    bgList.innerHTML = '';
    backgrounds.forEach(bg => {
        const unlocked = gameState.backgrounds[bg.id];
        const isCurrent = gameState.currentBackground === bg.id;
        const card = document.createElement('div');
        card.className = 'background-card' + (unlocked ? ' unlocked' : ' locked') + (isCurrent ? ' selected' : '');
        card.innerHTML = `
            <img src="${bg.image}" alt="${bg.name}" class="background-thumb">
            <div class="bg-name">${bg.name}</div>
            <div class="bg-cost">
                <span><img src='assets/img/gold.png' class='gold-icon' style='width:18px;'> ${bg.costGold}</span>
                <span style='margin-left:8px;'><img src='assets/img/crushcoin2.png' class='crush-icon' style='width:18px;'> ${bg.costCrushCoin}</span>
            </div>
            <div class="bg-actions">
                ${unlocked ? (isCurrent ? '<span class="bg-selected">Selected</span>' : `<button class="menu-btn" onclick="selectBackground('${bg.id}')">Select</button>`) : `<button class="menu-btn" onclick="unlockBackground('${bg.id}')">Unlock</button>`}
            </div>
        `;
        bgList.appendChild(card);
    });
}

// Fungsi unlock background
function unlockBackground(bgId) {
    const bg = backgrounds.find(b => b.id === bgId);
    if (!bg) return;
    if (gameState.backgrounds[bgId]) return;
    if (gameState.gold < bg.costGold || gameState.crushCoin < bg.costCrushCoin) {
        showCenterToast('error', 'Not enough Gold or Crush Coin!');
        return;
    }
    gameState.gold -= bg.costGold;
    gameState.crushCoin -= bg.costCrushCoin;
    gameState.backgrounds[bgId] = true;
    saveGameState();
    renderBackgroundModal();
    updateUI();
    showCenterToast('success', 'Background unlocked!');
}

// Fungsi pilih background
function selectBackground(bgId) {
    if (!gameState.backgrounds[bgId]) return;
    gameState.currentBackground = bgId;
    updateBackgroundDisplay();
    saveGameState();
    renderBackgroundModal();
}

// Update tampilan background utama
function updateBackgroundDisplay() {
    const bg = backgrounds.find(b => b.id === gameState.currentBackground) || backgrounds[0];
    const bgImg = document.querySelector('.background');
    if (bgImg) {
        bgImg.src = bg.image;
    }
}

function showCenterToast(type, message) {
    // type: success, error, info, warning
    const icons = {
        success: '<i class="fa-solid fa-circle-check toast-icon"></i>',
        error: '<i class="fa-solid fa-circle-xmark toast-icon"></i>',
        info: '<i class="fa-solid fa-circle-info toast-icon"></i>',
        warning: '<i class="fa-solid fa-triangle-exclamation toast-icon"></i>'
    };
    let toast = document.createElement('div');
    toast.className = `center-toast ${type}`;
    toast.innerHTML = `${icons[type] || ''}<span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.pointerEvents = 'auto';
        toast.style.opacity = '1';
    }, 10);
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.5s forwards';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// Game Loop
function startGameLoop() {
    setInterval(() => {
        gameState.player.playTime = Math.floor((Date.now() - gameState.player.startTime) / 1000);
        
        // Update online time tracking
        updateOnlineTime();
        
        // Auto love per second from Prayer items
        if (gameState.currentCharacter) {
            const charData = gameState.characters[gameState.currentCharacter];
            let lovePerSecond = 0;
            let goldPerSecond = 0;
            
            Object.keys(gameState.items).forEach(itemId => {
                const item = items.find(i => i.id === itemId);
                const itemData = gameState.items[itemId];
                
                if (item.lovePerSecond && itemData.level > 0) {
                    lovePerSecond += item.lovePerSecond * itemData.level;
                }
                if (item.goldPerSecond && itemData.level > 0) {
                    goldPerSecond += item.goldPerSecond * itemData.level;
                }
            });
            
            if (lovePerSecond > 0) {
                gameState.lovePoints += lovePerSecond;
                gameState.player.totalLove += lovePerSecond;
                charData.lovePoints = gameState.lovePoints;
                
                const maxLove = 100 + (charData.level * 50);
                if (gameState.lovePoints >= maxLove) {
                    levelUpCharacter();
                }
                
                updateCharacterInfo();
                renderItemsList(); // Update displays
            }
            if (goldPerSecond > 0) {
                gameState.gold += goldPerSecond;
                gameState.player.totalGold += goldPerSecond;
                renderItemsList();
                updateUI();
            }
        }
    }, 1000);
}

// Save/Load Game State
function saveGameState() {
    localStorage.setItem('lunaVNE_save', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('lunaVNE_save');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            // Deep merge untuk setiap property utama
            Object.keys(loaded).forEach(key => {
                if (typeof loaded[key] === 'object' && loaded[key] !== null && gameState[key]) {
                    Object.assign(gameState[key], loaded[key]);
                } else {
                    gameState[key] = loaded[key];
                }
            });
            // Ensure onlineGift structure exists (for backward compatibility)
            if (!gameState.onlineGift) {
                gameState.onlineGift = {
                    sessionStartTime: Date.now(),
                    totalOnlineTime: 0,
                    claimedRewards: {
                        '5min': false,
                        '15min': false,
                        '30min': false
                    },
                    lastReset: Date.now()
                };
            }
            // Update settings checkboxes
            document.getElementById('soundToggle').checked = gameState.settings.soundEffects;
            document.getElementById('musicToggle').checked = gameState.settings.backgroundMusic;
            document.getElementById('particleToggle').checked = gameState.settings.particleEffects;
            // Update volume slider
            const volumeSlider = document.getElementById('musicVolumeSlider');
            const volumeDisplay = document.getElementById('volumeDisplay');
            if (volumeSlider && volumeDisplay) {
                const volumePercent = Math.round(backgroundMusic.volume * 100);
                volumeSlider.value = volumePercent;
                volumeDisplay.textContent = `${volumePercent}%`;
            }
            // Ensure shopItems array exists (for backward compatibility)
            if (!gameState.shopItems) {
                gameState.shopItems = [];
            }
            // Ensure usedRedeemCodes array exists (for backward compatibility)
            if (!gameState.usedRedeemCodes) {
                gameState.usedRedeemCodes = [];
            }
        } catch (e) {
            console.error('Failed to load save data:', e);
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    // Crush Coin icon click opens exchange modal
    const crushDisplay = document.querySelector('.crush-display');
    if (crushDisplay) {
        crushDisplay.style.cursor = 'pointer';
        crushDisplay.title = 'Exchange Crush Coin';
        crushDisplay.addEventListener('click', function() {
            showModal('exchangeModal');
            document.getElementById('exchangeInfo').textContent = '';
        });
    }
    // Exchange buttons
    document.querySelectorAll('.exchange-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cc = parseInt(btn.getAttribute('data-cc'));
            const gold = parseInt(btn.getAttribute('data-gold'));
            if (gameState.crushCoin >= cc) {
                gameState.crushCoin -= cc;
                gameState.gold += gold;
                gameState.player.totalGold += gold;
                updateUI();
                saveGameState();
                document.getElementById('exchangeInfo').textContent = `Exchanged ${cc} Crush Coin for ${gold.toLocaleString()} Gold!`;
                showCenterToast('success', `+${gold.toLocaleString()} Gold!`);
            } else {
                document.getElementById('exchangeInfo').textContent = 'Not enough Crush Coin!';
                showCenterToast('error', 'Not enough Crush Coin!');
            }
        });
    });
    // Attach event listeners for new interior action buttons (only in character-info)
    const characterInfo = document.querySelector('.character-info');
    if (characterInfo) {
        const shopBtn = characterInfo.querySelector('#shopBtn');
        if (shopBtn) shopBtn.onclick = renderShopModal;
        const interiorEditBtn = characterInfo.querySelector('#interiorEditBtn');
        if (interiorEditBtn) interiorEditBtn.onclick = showInteriorEditModal;
        const interiorDragBtn = characterInfo.querySelector('#interiorDragBtn');
        if (interiorDragBtn) interiorDragBtn.onclick = function() {
            interiorEditMode = !interiorEditMode;
            interiorDragBtn.style.background = interiorEditMode ? '#20c997' : '';
            renderInteriorItems();
            if (interiorEditMode) {
                showCenterToast('info', 'Drag mode ON. Drag items to reposition or right-click to hide.');
            } else {
                showCenterToast('success', 'Drag mode OFF.');
            }
        };
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause music
        backgroundMusic.pause();
    } else {
        // Page is visible again, resume music if it was playing
        if (gameState.settings.backgroundMusic && backgroundMusic.isPlaying) {
            backgroundMusic.play();
        }
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    backgroundMusic.stop();
});

// Global function for modal closing
window.closeModal = closeModal; 

// --- Random Gift Feature ---
let randomGiftTimeout = null;
let randomGiftActive = false;

function spawnRandomGift() {
    if (!gameState.currentCharacter || randomGiftActive) return;
    randomGiftActive = true;
    const characterDisplay = document.getElementById('characterDisplay');
    // Remove any existing gift
    const oldGift = document.getElementById('randomGift');
    if (oldGift) oldGift.remove();
    // Create gift element
    const gift = document.createElement('img');
    gift.src = 'assets/img/cc-gift.png';
    gift.id = 'randomGift';
    gift.alt = 'Crush Coin Gift';
    gift.style.position = 'absolute';
    gift.style.width = '64px';
    gift.style.height = '64px';
    gift.style.cursor = 'pointer';
    gift.style.zIndex = 10;
    // Random position near character (avoid center)
    const offsetX = (Math.random() * 180 - 90); // -90 to +90 px
    const offsetY = (Math.random() * 80 + 120); // 120 to 200 px below center
    gift.style.left = `calc(50% + ${offsetX}px)`;
    gift.style.top = `calc(50% + ${offsetY}px)`;
    gift.style.transform = 'translate(-50%, -50%) scale(1)';
    gift.style.transition = 'transform 0.2s';
    gift.addEventListener('mouseenter', () => { gift.style.transform = 'translate(-50%, -50%) scale(1.12)'; });
    gift.addEventListener('mouseleave', () => { gift.style.transform = 'translate(-50%, -50%) scale(1)'; });
    gift.addEventListener('click', () => {
        gameState.crushCoin += 10;
        updateUI();
        saveGameState();
        showCenterToast('success', '+10 Crush Coin!');
        gift.remove();
        randomGiftActive = false;
        scheduleRandomGift();
    });
    characterDisplay.appendChild(gift);
}

function scheduleRandomGift() {
    if (randomGiftTimeout) clearTimeout(randomGiftTimeout);
    // 20-40 seconds random interval
    const interval = Math.random() * 20000 + 20000;
    randomGiftTimeout = setTimeout(() => {
        if (!randomGiftActive && document.getElementById('gameContainer') && !document.getElementById('gameContainer').classList.contains('hidden')) {
            spawnRandomGift();
        } else {
            scheduleRandomGift(); // Try again later
        }
    }, interval);
}

// Call this after starting game and after character changes
function enableRandomGiftFeature() {
    randomGiftActive = false;
    if (randomGiftTimeout) clearTimeout(randomGiftTimeout);
    scheduleRandomGift();
}

// --- Hook into game start and character change ---
// After startGame and selectCharacter
const _originalStartGame = startGame;
startGame = function() {
    _originalStartGame.apply(this, arguments);
    enableRandomGiftFeature();
};
const _originalSelectCharacter = selectCharacter;
selectCharacter = function(characterId) {
    _originalSelectCharacter.apply(this, arguments);
    enableRandomGiftFeature();
}; 

// --- Online Gift Notification ---
let notifiedOnlineGift = { '5min': false, '15min': false, '30min': false};

function checkOnlineGiftNotification() {
    if (!gameState || !gameState.onlineGift) return;
    const rewards = [
        { id: '5min', time: 5 * 60 },
        { id: '15min', time: 15 * 60 },
        { id: '30min', time: 30 * 60 }
    ];
    rewards.forEach(reward => {
        const ready = gameState.onlineGift.totalOnlineTime >= reward.time && !gameState.onlineGift.claimedRewards[reward.id];
        if (ready && !notifiedOnlineGift[reward.id]) {
            showCenterToast('info', 'Online Gift ready to claim!');
            notifiedOnlineGift[reward.id] = true;
        }
        if (!ready) {
            notifiedOnlineGift[reward.id] = false;
        }
    });
} 

// Fungsi untuk membeli karakter dengan Gold
function buyCharacterWithGold(characterId) {
    const char = characters.find(c => c.id === characterId);
    const charData = gameState.characters[characterId];
    if (!char || !char.costGold) {
        showCenterToast('error', 'Invalid character!');
        return;
    }
    if (charData.unlocked) {
        showCenterToast('error', 'Character already unlocked!');
        return;
    }
    if (gameState.player.level < char.levelRequired) {
        showCenterToast('error', `Level ${char.levelRequired} required!`);
        return;
    }
    if (gameState.gold < char.costGold) {
        showCenterToast('error', 'Not enough Gold!');
        return;
    }
    gameState.gold -= char.costGold;
    charData.unlocked = true;
    saveGameState();
    renderCharacterList();
    updateUI();
    showCenterToast('success', `${char.name} unlocked!`);
}

// Fungsi untuk membeli karakter dengan Crush Coin (bypass syarat level/gold)
function buyCharacterWithCrushCoin(characterId) {
    const char = characters.find(c => c.id === characterId);
    const charData = gameState.characters[characterId];
    if (!char || !char.costCrushCoin) {
        showCenterToast('error', 'Invalid character!');
        return;
    }
    if (charData.unlocked) {
        showCenterToast('error', 'Character already unlocked!');
        return;
    }
    if (gameState.crushCoin < char.costCrushCoin) {
        showCenterToast('error', 'Not enough Crush Coin!');
        return;
    }
    gameState.crushCoin -= char.costCrushCoin;
    charData.unlocked = true;
    saveGameState();
    renderCharacterList();
    updateUI();
    showCenterToast('success', `${char.name} unlocked!`);
}

// === DEBUG PLAYER EDITOR ===
// Aktifkan fitur debug editor dengan mengubah ke true
const DEBUG_PLAYER_EDITOR = false; // Ubah ke true untuk mengedit player

// Contoh penggunaan:
// Jika DEBUG_PLAYER_EDITOR = true, kamu bisa set level, gold, dan crush coin player di bawah ini
if (DEBUG_PLAYER_EDITOR) {
    // Contoh: Set level player ke 20
    gameState.player.level = 3;
    // Contoh: Set gold player ke 999999
    gameState.gold = 999999;
    // Contoh: Set crush coin player ke 500
    gameState.crushCoin = 999999;
    // Simpan perubahan ke localStorage
    saveGameState();
    // Update UI
    updateUI();
    console.log('[DEBUG] Player editor applied:', {
        level: gameState.player.level,
        gold: gameState.gold,
        crushCoin: gameState.crushCoin
    });
}
// === END DEBUG PLAYER EDITOR ===

// --- ENCRYPTION UTILS ---
const SAVE_SECRET = 'mycrush2024'; // Ganti sesuai kebutuhan, harus sama dengan tool decrypt
function xorEncrypt(str, key) {
    let res = '';
    for (let i = 0; i < str.length; i++) {
        res += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return res;
}
function encryptSaveData(obj) {
    const json = JSON.stringify(obj);
    const encrypted = xorEncrypt(json, SAVE_SECRET);
    return btoa(unescape(encodeURIComponent(encrypted)));
}
function decryptSaveData(enc) {
    try {
        const decrypted = xorEncrypt(decodeURIComponent(escape(atob(enc))), SAVE_SECRET);
        return JSON.parse(decrypted);
    } catch (e) {
        return null;
    }
}
// --- END ENCRYPTION UTILS ---

// === GLOBAL SHORTCUTS & BLOCK DEV TOOLS ===

document.addEventListener('keydown', function(e) {
    // Block F12 (DevTools)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Ctrl+R: Refresh game (prevent default browser reload)
    if (e.ctrlKey && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        window.location.reload();
        return false;
    }
    // Ctrl+S: Export save
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        if (typeof exportSaveData === 'function') {
            exportSaveData();
        } else if (document.getElementById('exportSaveBtn')) {
            document.getElementById('exportSaveBtn').click();
        }
        return false;
    }
    // Ctrl+L: Import save
    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        if (typeof importSaveData === 'function') {
            importSaveData();
        } else if (document.getElementById('importSaveBtn')) {
            document.getElementById('importSaveBtn').click();
        }
        return false;
    }
    // === SCREENSHOT FEATURE ===
    if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        takeGameScreenshot();
    }
});
// Block right click context menu
window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// === SCREENSHOT FEATURE (CTRL+SHIFT+S) ===
// (Fitur screenshot mode dihapus sesuai permintaan)
// ... existing code ...

// === SHOP DATA ===
const shopItems = [
  { id: 'kulkas', name: 'Kulkas', image: 'assets/img/shop/kulkas.png', gold: 15000, crushCoin: 100 },
  { id: 'lampu', name: 'Lampu', image: 'assets/img/shop/lampu.png', gold: 7000, crushCoin: 50 },
  { id: 'lemari', name: 'Lemari', image: 'assets/img/shop/lemari.png', gold: 12000, crushCoin: 80 },
  { id: 'sofa', name: 'Sofa', image: 'assets/img/shop/sofa.png', gold: 10000, crushCoin: 70 },
  { id: 'sofa2', name: 'Sofa 2', image: 'assets/img/shop/sofa2.png', gold: 11000, crushCoin: 75 },
  { id: 'tanaman', name: 'Tanaman', image: 'assets/img/shop/tanaman.png', gold: 5000, crushCoin: 35 },
];

// Inisialisasi data shop & interior di gameState
if (!gameState.shop) gameState.shop = {};
if (!gameState.interior) gameState.interior = {};
shopItems.forEach(item => {
  if (!gameState.shop[item.id]) gameState.shop[item.id] = { owned: false };
  if (!gameState.interior[item.id]) gameState.interior[item.id] = { x: 0, y: 0, visible: false };
});

function renderShopModal() {
  const modal = document.getElementById('shopModal');
  const list = document.getElementById('shopItemList');
  list.innerHTML = '';
  shopItems.forEach(item => {
    const owned = gameState.shop[item.id]?.owned;
    const card = document.createElement('div');
    card.className = 'shop-item-card' + (owned ? ' owned' : '');
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="shop-item-name">${item.name}</div>
      <div class="shop-item-price">
        <button class="buy-gold" ${owned ? 'disabled' : ''}><img src='assets/img/gold.png' style='width:20px;vertical-align:middle;margin-right:6px;'>${item.gold}</button>
        <button class="buy-cc" ${owned ? 'disabled' : ''}><img src='assets/img/crushcoin2.png' style='width:20px;vertical-align:middle;margin-right:6px;'>${item.crushCoin}</button>
      </div>
      <div class="shop-item-status">${owned ? 'Owned' : ''}</div>
    `;
    card.querySelector('.buy-gold').onclick = () => buyShopItem(item.id, 'gold');
    card.querySelector('.buy-cc').onclick = () => buyShopItem(item.id, 'crushCoin');
    list.appendChild(card);
  });
  showModal('shopModal');
}

function buyShopItem(itemId, currency) {
  const item = shopItems.find(i => i.id === itemId);
  if (!item) return;
  if (gameState.shop[itemId]?.owned) return;
  if (currency === 'gold') {
    if (gameState.gold < item.gold) {
      showCenterToast('error', 'Not enough Gold!');
      return;
    }
    gameState.gold -= item.gold;
  } else if (currency === 'crushCoin') {
    if (gameState.crushCoin < item.crushCoin) {
      showCenterToast('error', 'Not enough Crush Coin!');
      return;
    }
    gameState.crushCoin -= item.crushCoin;
  }
  gameState.shop[itemId].owned = true;
  saveGameState();
  renderShopModal();
  updateUI();
  showCenterToast('success', 'Item berhasil dibeli!');
}

// === INTERIOR RENDER & DRAG ===
let interiorEditMode = false;

function renderInteriorItems() {
    const container = document.getElementById('interiorContainer');
    if (!container) return;
    container.innerHTML = '';
    shopItems.forEach(item => {
        if (gameState.shop[item.id]?.owned && gameState.interior[item.id]?.visible) {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.className = 'interior-item';
            img.style.position = 'absolute';
            img.style.left = (gameState.interior[item.id].x || 0) + 'px';
            img.style.top = (gameState.interior[item.id].y || 0) + 'px';
            img.style.width = (gameState.interior[item.id].width || 120) + 'px';
            img.style.cursor = interiorEditMode ? 'move' : 'pointer';
            img.draggable = interiorEditMode;
            img.dataset.itemId = item.id;
            // Resize handle
            if (interiorEditMode) {
                // Drag events
                img.addEventListener('dragstart', interiorDragStart);
                img.addEventListener('dragend', interiorDragEnd);
                // Add resize handle
                const resizeHandle = document.createElement('div');
                resizeHandle.className = 'resize-handle';
                resizeHandle.style.position = 'absolute';
                resizeHandle.style.right = '0';
                resizeHandle.style.bottom = '0';
                resizeHandle.style.width = '18px';
                resizeHandle.style.height = '18px';
                resizeHandle.style.background = 'rgba(32,201,151,0.7)';
                resizeHandle.style.borderRadius = '50%';
                resizeHandle.style.cursor = 'nwse-resize';
                resizeHandle.style.zIndex = '10';
                resizeHandle.addEventListener('mousedown', function(e) {
                    e.stopPropagation();
                    startResizeInteriorItem(e, item.id);
                });
                img.parentElement?.appendChild(resizeHandle); // fallback if needed
                // Instead, append to container and position absolutely
                container.appendChild(img);
                container.appendChild(resizeHandle);
                resizeHandle.style.left = (gameState.interior[item.id].x || 0) + (gameState.interior[item.id].width || 120) - 9 + 'px';
                resizeHandle.style.top = (gameState.interior[item.id].y || 0) + (img.offsetHeight || 120) - 9 + 'px';
                return;
            }
            // Toggle visibility on right click (in edit mode)
            img.addEventListener('contextmenu', function(e) {
                if (interiorEditMode) {
                    e.preventDefault();
                    gameState.interior[item.id].visible = false;
                    renderInteriorItems();
                    saveGameState();
                }
            });
            container.appendChild(img);
        }
    });
    // Sembunyikan/tampilkan karakter saat edit mode
    const charDisplay = document.querySelector('.character-display');
    if (charDisplay) {
        if (interiorEditMode) {
            charDisplay.style.display = 'none';
        } else {
            charDisplay.style.display = '';
        }
    }
}

let dragOffsetX = 0, dragOffsetY = 0, draggingItemId = null;
function interiorDragStart(e) {
    draggingItemId = this.dataset.itemId;
    const rect = this.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
}
function interiorDragEnd(e) {
    if (!draggingItemId) return;
    const container = document.getElementById('interiorContainer');
    const parentRect = container.parentElement.getBoundingClientRect();
    const x = e.clientX - parentRect.left - dragOffsetX;
    const y = e.clientY - parentRect.top - dragOffsetY;
    gameState.interior[draggingItemId].x = x; // Tidak dibatasi
    gameState.interior[draggingItemId].y = y; // Tidak dibatasi
    saveGameState();
    renderInteriorItems();
    draggingItemId = null;
}

// Toggle edit mode button (add to header for now)
function addInteriorEditButton() {
    if (document.getElementById('interiorEditBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'interiorEditBtn';
    btn.className = 'header-btn';
    btn.title = 'Edit Interior';
    btn.innerHTML = '🖼️';
    btn.onclick = function() {
        interiorEditMode = !interiorEditMode;
        btn.style.background = interiorEditMode ? '#20c997' : '';
        renderInteriorItems();
        if (interiorEditMode) {
            showCenterToast('info', 'Interior edit mode ON. Drag items or right-click to hide.');
        } else {
            showCenterToast('success', 'Interior edit mode OFF.');
        }
    };
    document.querySelector('.header-buttons').appendChild(btn);
}
addInteriorEditButton();

// Show all owned items (set visible=true) on first purchase
function showInteriorItem(itemId) {
    if (gameState.interior[itemId]) {
        gameState.interior[itemId].visible = true;
        saveGameState();
        renderInteriorItems();
    }
}
// Hook into buyShopItem to show item after purchase
const _originalBuyShopItem = buyShopItem;
buyShopItem = function(itemId, currency) {
    _originalBuyShopItem.apply(this, arguments);
    if (gameState.shop[itemId]?.owned) {
        showInteriorItem(itemId);
    }
};
// Render on game load
window.addEventListener('DOMContentLoaded', renderInteriorItems);
// Also render after background change, character change, etc.
const _originalUpdateBackgroundDisplay = updateBackgroundDisplay;
updateBackgroundDisplay = function() {
    _originalUpdateBackgroundDisplay.apply(this, arguments);
    renderInteriorItems();
};

// === INTERIOR EDIT & SAVE MENU ===
function showInteriorEditModal() {
    const modal = document.getElementById('interiorEditModal');
    const list = document.getElementById('interiorItemList');
    list.innerHTML = '';
    shopItems.forEach(item => {
        if (gameState.shop[item.id]?.owned) {
            const itemData = gameState.interior[item.id];
            const card = document.createElement('div');
            card.className = 'interior-edit-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="interior-item-info">
                    <div class="interior-item-name">${item.name}</div>
                    <div class="interior-item-status">
                        <label>
                            <input type="checkbox" ${itemData.visible ? 'checked' : ''} onchange="toggleInteriorVisibility('${item.id}', this.checked)">
                            Visible
                        </label>
                    </div>
                    <div class="interior-item-position">
                        Position: ${itemData.x || 0}, ${itemData.y || 0}
                    </div>
                    <div class="interior-item-actions">
                        <button onclick="resetInteriorPosition('${item.id}')" class="reset-btn">Reset Position</button>
                        <button onclick="hideInteriorItem('${item.id}')" class="hide-btn">Hide</button>
                    </div>
                </div>
            `;
            list.appendChild(card);
        }
    });
    
    showModal('interiorEditModal');
}

function toggleInteriorVisibility(itemId, visible) {
    if (gameState.interior[itemId]) {
        gameState.interior[itemId].visible = visible;
        saveGameState();
        renderInteriorItems();
    }
}

function resetInteriorPosition(itemId) {
    if (gameState.interior[itemId]) {
        gameState.interior[itemId].x = 0;
        gameState.interior[itemId].y = 0;
        saveGameState();
        renderInteriorItems();
        showInteriorEditModal(); // Refresh the modal
    }
}

function hideInteriorItem(itemId) {
    if (gameState.interior[itemId]) {
        gameState.interior[itemId].visible = false;
        saveGameState();
        renderInteriorItems();
        showInteriorEditModal(); // Refresh the modal
    }
}

// Update the edit button to show the modal instead of just toggling edit mode
function addInteriorEditButton() {
    if (document.getElementById('interiorEditBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'interiorEditBtn';
    btn.className = 'header-btn';
    btn.title = 'Edit Interior';
    btn.innerHTML = '🖼️';
    btn.onclick = function() {
        showInteriorEditModal();
    };
    document.querySelector('.header-buttons').appendChild(btn);
}

// Add a separate drag edit mode button
function addInteriorDragButton() {
    if (document.getElementById('interiorDragBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'interiorDragBtn';
    btn.className = 'header-btn';
    btn.title = 'Drag Mode';
    btn.innerHTML = '✋';
    btn.onclick = function() {
        interiorEditMode = !interiorEditMode;
        btn.style.background = interiorEditMode ? '#20c997' : '';
        renderInteriorItems();
        if (interiorEditMode) {
            showCenterToast('info', 'Drag mode ON. Drag items to reposition or right-click to hide.');
        } else {
            showCenterToast('success', 'Drag mode OFF.');
        }
    };
    document.querySelector('.header-buttons').appendChild(btn);
}

// Initialize both buttons
addInteriorEditButton();
addInteriorDragButton();

// Resize logic
let resizingItemId = null;
let resizeStartX = 0;
let resizeStartWidth = 0;
function startResizeInteriorItem(e, itemId) {
    resizingItemId = itemId;
    resizeStartX = e.clientX;
    resizeStartWidth = gameState.interior[itemId].width || 120;
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', stopResizeInteriorItem);
}
function handleResizeMove(e) {
    if (!resizingItemId) return;
    const dx = e.clientX - resizeStartX;
    let newWidth = Math.max(40, Math.min(400, resizeStartWidth + dx));
    gameState.interior[resizingItemId].width = newWidth;
    renderInteriorItems();
}
function stopResizeInteriorItem() {
    if (resizingItemId) {
        saveGameState();
    }
    resizingItemId = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', stopResizeInteriorItem);
}

function takeGameScreenshot() {
    // Ukuran screenshot
    const CANVAS_W = 1280, CANVAS_H = 800;
    // Ambil elemen
    const bgContainer = document.querySelector('.background-container');
    const bgImg = bgContainer.querySelector('.background');
    const charDisplay = bgContainer.querySelector('.character-display');
    const charImg = charDisplay ? charDisplay.querySelector('img') : null;
    const interiorItems = bgContainer.querySelectorAll('.interior-item');
    // Siapkan canvas
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    const ctx = canvas.getContext('2d');
    // Gambar background
    if (bgImg && bgImg.src) {
        const bg = new Image();
        bg.crossOrigin = 'anonymous';
        bg.src = bgImg.src;
        bg.onload = function() {
            ctx.drawImage(bg, 0, 0, CANVAS_W, CANVAS_H);
            drawInteriors();
        };
    } else {
        drawInteriors();
    }
    function drawInteriors() {
        // Gambar interior proporsional
        const parentRect = bgContainer.getBoundingClientRect();
        interiorItems.forEach(item => {
            if (!item.src) return;
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = item.src;
            // Hitung posisi & ukuran proporsional
            const rect = item.getBoundingClientRect();
            const relX = (rect.left - parentRect.left) / parentRect.width;
            const relY = (rect.top - parentRect.top) / parentRect.height;
            const relW = rect.width / parentRect.width;
            const relH = rect.height / parentRect.height;
            const x = relX * CANVAS_W;
            const y = relY * CANVAS_H;
            const w = relW * CANVAS_W;
            const h = relH * CANVAS_H;
            img.onload = function() {
                ctx.drawImage(img, x, y, w, h);
            };
        });
        drawCharacter();
    }
    function drawCharacter() {
        // Gambar karakter dengan width persentase (18% dari lebar canvas), height mengikuti aspect ratio asli, posisi tengah canvas
        if (charImg && charImg.src) {
            const char = new Image();
            char.crossOrigin = 'anonymous';
            char.src = charImg.src;
            char.onload = function() {
                const percent = 0.18; // 18% dari lebar canvas
                const charW = CANVAS_W * percent;
                // Hitung aspect ratio asli karakter
                const naturalW = charImg.naturalWidth || charImg.width;
                const naturalH = charImg.naturalHeight || charImg.height;
                const aspect = naturalH / naturalW;
                const charH = charW * aspect;
                const x = (CANVAS_W - charW) / 2;
                const y = (CANVAS_H - charH) / 2;
                ctx.drawImage(char, x, y, charW, charH);
                drawWatermark();
            };
        } else {
            drawWatermark();
        }
    }
    function drawWatermark() {
        // Watermark
        ctx.font = 'bold 20px Segoe UI, Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#fff';
        ctx.fillText('MyCrush - Idle Clicker © 2025 Cyberus Studio', CANVAS_W - 24, CANVAS_H - 16);
        // Download
        const link = document.createElement('a');
        link.download = 'mycrush_screenshot.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}

// Fungsi redeem code untuk unlock karakter spesial
/* function redeemCode(code) {
    if (code === 'PRE-REG-GHOST') {
        const bellaData = gameState.characters['sghost'];
        if (bellaData && !bellaData.unlocked) {
            bellaData.unlocked = true;
            showCenterToast('success', 'Cute Ghost unlocked!');
            renderCharacterList();
            saveGameState();
        } else {
            showCenterToast('error', 'Cute Ghost already unlocked!');
        }
    } else {
        showCenterToast('error', 'Invalid code!');
    }
} */


window.redeemCode = redeemCode; // Untuk testing dari console

function handleRedeemCodeSubmit() {
    const code = document.getElementById('redeemCodeInput').value.trim();
    if (!code) {
        document.getElementById('redeemCodeResult').textContent = 'Please enter a code!';
        document.getElementById('redeemCodeResult').style.color = '#ff6b9d';
        return;
    }
    // Intercept redeemCode to show result in UI
    let resultMsg = '';
    let success = false;
    const prevToast = window.showCenterToast;
    window.showCenterToast = function(type, msg) {
        resultMsg = msg;
        document.getElementById('redeemCodeResult').textContent = msg;
        document.getElementById('redeemCodeResult').style.color = (type === 'success') ? '#20c997' : '#ff6b9d';
        if (type === 'success') success = true;
    };
    redeemCode(code);
    window.showCenterToast = prevToast;
    if (success) {
        setTimeout(() => closeModal('redeemCodeModal'), 1500);
    }
}

// Sistem kode redeem dinamis
const redeemCodes = {
    // Unlock karakter
    'PRE-REG-BELLA': { character: 'bella' },
    'OPEN-GST': { character: 'sghost' },
    // Currency
    'CC100': { crushCoin: '100' },
    'GLD10K': { gold: '10000' },
    // Outfit
    'XMAS-LUNA': { character: 'luna', outfit: 'luna_halloween' },
    'XMAS-BELLA': { character: 'bella', outfit: 'bella_xmas' },
    'NKD-LUNA': { character: 'luna', outfit: 'luna_naked' },
    //Item SHop
    'KLKS1': { shopItems: 'tanaman' }
};
const usedRedeemCodes = new Set(gameState.usedRedeemCodes || []);

function addRedeemCode({ code, character, gold, crushCoin, outfit }) {
    if (!code) return false;
    redeemCodes[code] = {};
    if (character) redeemCodes[code].character = character;
    if (gold) redeemCodes[code].gold = gold;
    if (crushCoin) redeemCodes[code].crushCoin = crushCoin;
    if (outfit) redeemCodes[code].outfit = outfit; // { characterId, outfitId }
    return true;
}

function redeemCode(code) {
    if (!code || !redeemCodes[code]) {
        showCenterToast('error', 'Invalid code!');
        return;
    }
    if (!gameState.usedRedeemCodes) gameState.usedRedeemCodes = [];
    if (gameState.usedRedeemCodes.includes(code)) {
        showCenterToast('error', 'Code already used!');
        return;
    }
    const reward = redeemCodes[code];
    let msg = [];
    let success = false;
    // Karakter
    if (reward.character) {
        const charData = gameState.characters[reward.character];
        if (charData && !charData.unlocked) {
            charData.unlocked = true;
            let charName = reward.character;
            if (reward.character === 'sghost') charName = 'Cute Ghost';
            if (reward.character === 'bella') charName = 'Bella';
            msg.push(`Unlocked character: ${charName}`);
            success = true;
        } else if (charData && charData.unlocked) {
            let charName = reward.character;
            if (reward.character === 'sghost') charName = 'Cute Ghost';
            if (reward.character === 'bella') charName = 'Bella';
            msg.push(`${charName} already unlocked!`);
        }
    }
    // Gold
    if (reward.gold) {
        const gold = typeof reward.gold === 'string' ? parseInt(reward.gold, 10) : reward.gold;
        if (!isNaN(gold) && gold > 0) {
            gameState.gold = (gameState.gold || 0) + gold;
            msg.push(`+${gold} Gold`);
            success = true;
        }
    }
    // Crush Coin
    if (reward.crushCoin) {
        const cc = typeof reward.crushCoin === 'string' ? parseInt(reward.crushCoin, 10) : reward.crushCoin;
        if (!isNaN(cc) && cc > 0) {
            gameState.crushCoin = (gameState.crushCoin || 0) + cc;
            msg.push(`+${cc} Crush Coin`);
            success = true;
        }
    }
    // Outfit
    if (reward.outfit) {
        let charId = null, outfitId = null;
        if (typeof reward.outfit === 'object' && reward.outfit.characterId && reward.outfit.outfitId) {
            charId = reward.outfit.characterId;
            outfitId = reward.outfit.outfitId;
        } else if (typeof reward.outfit === 'string' && reward.character) {
            charId = reward.character;
            outfitId = reward.outfit;
        }
        if (charId && outfitId && gameState.outfits[charId] && !gameState.outfits[charId].unlocked.includes(outfitId)) {
            gameState.outfits[charId].unlocked.push(outfitId);
            msg.push(`Unlocked outfit: ${outfitId}`);
            success = true;
        }
    }
    // Interior
    if (reward.interior) {
        if (!gameState.interiorItems.includes(reward.interior)) {
            gameState.interiorItems.push(reward.interior);
            msg.push(`Unlocked interior: ${reward.interior}`);
            success = true;
        }
    }
    // Shop Items
    if (reward.shopItems) {
        if (!gameState.shop[reward.shopItems]?.owned) {
            // Pastikan struktur shop ada
            if (!gameState.shop[reward.shopItems]) {
                gameState.shop[reward.shopItems] = { owned: false };
            }
            gameState.shop[reward.shopItems].owned = true;
            // Tampilkan item di interior setelah unlock
            showInteriorItem(reward.shopItems);
            msg.push(`Unlocked shop item: ${reward.shopItems}`);
            success = true;
        } else {
            msg.push(`Shop item ${reward.shopItems} already unlocked!`);
        }
    }
    if (success) {
        gameState.usedRedeemCodes.push(code);
        saveGameState();
        updateUI();
        showCenterToast('success', msg.join(', '));
    } else {
        showCenterToast('error', 'Reward already claimed!');
    }
}
window.addRedeemCode = addRedeemCode; // Untuk admin/testing
