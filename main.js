// STALKER MMO - Main JavaScript File
// Core functionality and shared utilities

class StalkerMMO {
    constructor() {
        this.gameState = {
            player: {
                name: 'STALKER_47',
                level: 23,
                health: 85,
                radiation: 12,
                skillPoints: 5,
                position: { x: 0, y: 0, zone: 'Cordon' }
            },
            squad: [
                { name: 'Ghost', role: 'Leader', status: 'online', health: 95 },
                { name: 'Doc', role: 'Medic', status: 'online', health: 78 },
                { name: 'Reaper', role: 'Sniper', status: 'away', health: 45 },
                { name: 'Spark', role: 'Support', status: 'offline', health: 0 }
            ],
            inventory: [],
            missions: [],
            settings: {
                graphics: { quality: 'high', resolution: '1920x1080' },
                audio: { master: 75, sfx: 80, music: 60 },
                controls: {}
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startGameLoop();
        this.loadSettings();
    }

    setupEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleGlobalShortcuts(e);
        });

        // Window focus/blur
        window.addEventListener('focus', () => {
            this.onWindowFocus();
        });

        window.addEventListener('blur', () => {
            this.onWindowBlur();
        });

        // Before page unload
        window.addEventListener('beforeunload', () => {
            this.saveGameState();
        });
    }

    handleGlobalShortcuts(e) {
        // Function key shortcuts for navigation
        const keyMap = {
            'F1': 'game.html',
            'F2': 'inventory.html',
            'F3': 'map.html',
            'F4': 'character.html',
            'F5': 'social.html',
            'F6': 'settings.html',
            'Escape': 'index.html'
        };

        if (keyMap[e.key]) {
            e.preventDefault();
            this.navigateTo(keyMap[e.key]);
        }

        // Debug shortcuts
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
            this.showDebugInfo();
        }
    }

    navigateTo(page) {
        // Add transition effect before navigation
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black z-50 transition-opacity duration-300';
        overlay.style.opacity = '0';
        document.body.appendChild(overlay);

        // Animate out
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);

        // Navigate after animation
        setTimeout(() => {
            window.location.href = page;
        }, 300);
    }

    startGameLoop() {
        // Main game loop - runs every 100ms
        setInterval(() => {
            this.updateGameState();
            this.updateUI();
        }, 100);

        // Slower updates every 5 seconds
        setInterval(() => {
            this.updatePeriodicElements();
        }, 5000);
    }

    updateGameState() {
        // Update player vitals
        if (Math.random() < 0.001) { // 0.1% chance per tick
            this.gameState.player.health = Math.max(0, this.gameState.player.health - 1);
        }

        // Update radiation level
        if (Math.random() < 0.0005) { // 0.05% chance per tick
            this.gameState.player.radiation = Math.min(100, this.gameState.player.radiation + 0.5);
        }

        // Update squad member positions and status
        this.updateSquadMembers();

        // Update environment (time, weather, etc.)
        this.updateEnvironment();
    }

    updateSquadMembers() {
        this.gameState.squad.forEach(member => {
            // Random status changes
            if (Math.random() < 0.0002) {
                const statuses = ['online', 'away', 'offline'];
                member.status = statuses[Math.floor(Math.random() * statuses.length)];
            }

            // Health changes
            if (member.status === 'online' && Math.random() < 0.0001) {
                member.health = Math.max(0, Math.min(100, member.health + (Math.random() - 0.5) * 5));
            }
        });
    }

    updateEnvironment() {
        // Simulate time passing
        const now = new Date();
        const gameTime = new Date(now.getTime() + (now.getTime() % 86400000) * 0.1);
        
        // Weather changes
        if (Math.random() < 0.0001) {
            const weathers = ['Clear', 'Overcast', 'Rain', 'Storm'];
            // Weather update logic would go here
        }
    }

    updateUI() {
        // Update health displays
        const healthElements = document.querySelectorAll('[data-player-health]');
        healthElements.forEach(el => {
            el.textContent = `${Math.round(this.gameState.player.health)}/100`;
        });

        // Update radiation displays
        const radiationElements = document.querySelectorAll('[data-player-radiation]');
        radiationElements.forEach(el => {
            el.textContent = `${Math.round(this.gameState.player.radiation)}%`;
        });

        // Update squad displays
        this.updateSquadUI();
    }

    updateSquadUI() {
        const squadElements = document.querySelectorAll('.squad-member-card');
        squadElements.forEach((element, index) => {
            if (this.gameState.squad[index]) {
                const member = this.gameState.squad[index];
                
                // Update status indicator
                const statusIndicator = element.querySelector('.status-indicator');
                if (statusIndicator) {
                    statusIndicator.className = `status-indicator status-${member.status}`;
                }

                // Update health bar
                const healthBar = element.querySelector('.health-fill');
                if (healthBar) {
                    healthBar.style.width = `${member.health}%`;
                }

                // Update health text
                const healthText = element.querySelector('.health-text');
                if (healthText) {
                    healthText.textContent = `${Math.round(member.health)}%`;
                }
            }
        });
    }

    updatePeriodicElements() {
        // Update mission objectives
        this.updateMissions();

        // Update notifications
        this.checkForNotifications();

        // Update performance metrics
        this.updatePerformanceMetrics();
    }

    updateMissions() {
        // Simulate mission progress
        this.gameState.missions.forEach(mission => {
            if (mission.status === 'active' && Math.random() < 0.1) {
                mission.progress = Math.min(mission.maxProgress, mission.progress + 1);
            }
        });
    }

    checkForNotifications() {
        // Random game events
        if (Math.random() < 0.02) { // 2% chance every 5 seconds
            const events = [
                { title: 'ANOMALY DETECTED', message: 'Electrical anomaly nearby' },
                { title: 'MISSION UPDATE', message: 'New objective available' },
                { title: 'SQUAD COMMUNICATION', message: 'Incoming transmission' },
                { title: 'WEATHER CHANGE', message: 'Emission approaching' }
            ];
            
            const event = events[Math.floor(Math.random() * events.length)];
            this.showNotification(event.title, event.message);
        }
    }

    updatePerformanceMetrics() {
        // Simulate FPS and ping updates
        const fps = 120 + Math.random() * 40; // 120-160 FPS
        const ping = 20 + Math.random() * 10; // 20-30ms ping

        const fpsElements = document.querySelectorAll('[data-fps]');
        fpsElements.forEach(el => {
            el.textContent = Math.round(fps);
            el.className = `performance-indicator ${fps > 140 ? 'performance-excellent' : 'performance-good'}`;
        });

        const pingElements = document.querySelectorAll('[data-ping]');
        pingElements.forEach(el => {
            el.textContent = `${Math.round(ping)}ms`;
        });
    }

    showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        const borderColor = type === 'warning' ? 'border-yellow-500' : 
                           type === 'error' ? 'border-red-500' : 'border-green-500';
        
        notification.className = `fixed top-4 right-4 bg-black border-l-4 ${borderColor} p-4 text-white z-50 transform translate-x-full transition-transform duration-300`;
        notification.innerHTML = `
            <div class="font-bold text-green-400">${title}</div>
            <div class="text-sm text-gray-400">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    showDebugInfo() {
        const debugInfo = {
            player: this.gameState.player,
            squad: this.gameState.squad.length,
            time: new Date().toLocaleTimeString(),
            performance: {
                fps: Math.round(120 + Math.random() * 40),
                ping: Math.round(20 + Math.random() * 10),
                memory: Math.round(performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0)
            }
        };

        console.log('=== STALKER MMO DEBUG INFO ===');
        console.table(debugInfo);
        this.showNotification('DEBUG INFO', 'Check browser console for details', 'info');
    }

    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('stalker-mmo-settings');
            if (savedSettings) {
                this.gameState.settings = { ...this.gameState.settings, ...JSON.parse(savedSettings) };
            }
        } catch (error) {
            console.warn('Failed to load settings:', error);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('stalker-mmo-settings', JSON.stringify(this.gameState.settings));
        } catch (error) {
            console.warn('Failed to save settings:', error);
        }
    }

    saveGameState() {
        try {
            const saveData = {
                player: this.gameState.player,
                inventory: this.gameState.inventory,
                missions: this.gameState.missions,
                settings: this.gameState.settings,
                timestamp: Date.now()
            };
            localStorage.setItem('stalker-mmo-save', JSON.stringify(saveData));
        } catch (error) {
            console.warn('Failed to save game state:', error);
        }
    }

    loadGameState() {
        try {
            const saveData = localStorage.getItem('stalker-mmo-save');
            if (saveData) {
                const parsed = JSON.parse(saveData);
                // Check if save is not too old (max 7 days)
                if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
                    Object.assign(this.gameState, parsed);
                }
            }
        } catch (error) {
            console.warn('Failed to load game state:', error);
        }
    }

    onWindowFocus() {
        // Resume game activity
        console.log('Game window focused');
    }

    onWindowBlur() {
        // Pause non-essential activities
        console.log('Game window blurred');
    }

    // Utility functions
    formatTime(date) {
        return date.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    formatCoordinate(lat, lon) {
        const formatCoord = (coord, type) => {
            const degrees = Math.floor(coord);
            const minutes = Math.floor((coord - degrees) * 60);
            const seconds = Math.floor(((coord - degrees) * 60 - minutes) * 60);
            return `${type}${degrees}° ${minutes}' ${seconds}"`;
        };
        
        return `${formatCoord(Math.abs(lat), lat >= 0 ? 'N' : 'S')} ${formatCoord(Math.abs(lon), lon >= 0 ? 'E' : 'W')}`;
    }

    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

// Audio Manager
class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.musicVolume = 0.6;
        this.sfxVolume = 0.8;
        this.masterVolume = 0.75;
    }

    loadSound(name, url) {
        // In a real implementation, this would load audio files
        this.sounds.set(name, { url, loaded: false });
    }

    playSound(name, volume = 1) {
        // Simulate audio playback
        console.log(`Playing sound: ${name} at volume ${volume * this.sfxVolume * this.masterVolume}`);
    }

    playMusic(name, volume = 1) {
        console.log(`Playing music: ${name} at volume ${volume * this.musicVolume * this.masterVolume}`);
    }

    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }

    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.active = true;
    }

    createParticle(x, y, type = 'default') {
        const particle = {
            x, y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1.0,
            decay: 0.02,
            type,
            size: Math.random() * 3 + 1
        };
        
        this.particles.push(particle);
        return particle;
    }

    update() {
        if (!this.active) return;

        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.vy += 0.1; // gravity
            
            return particle.life > 0;
        });
    }

    render(ctx) {
        this.particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = this.getParticleColor(particle.type);
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    getParticleColor(type) {
        const colors = {
            'default': '#10b981',
            'fire': '#f59e0b',
            'electric': '#3b82f6',
            'radiation': '#84cc16',
            'blood': '#ef4444'
        };
        return colors[type] || colors['default'];
    }
}

// Initialize the game when DOM is loaded
let game;
let audioManager;
let particleSystem;

document.addEventListener('DOMContentLoaded', () => {
    game = new StalkerMMO();
    audioManager = new AudioManager();
    particleSystem = new ParticleSystem();
    
    // Make globally available for debugging
    window.stalkerGame = game;
    window.audioManager = audioManager;
    window.particleSystem = particleSystem;
    
    console.log('STALKER MMO initialized successfully');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StalkerMMO, AudioManager, ParticleSystem };
}