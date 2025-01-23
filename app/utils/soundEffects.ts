class SoundEffects {
  private moveSound: HTMLAudioElement | null = null
  private winSound: HTMLAudioElement | null = null
  private isMuted = false

  constructor() {
    if (typeof window !== "undefined") {
      this.moveSound = new Audio("/sounds/move.mp3")
      this.winSound = new Audio("/sounds/win.mp3")
    }
  }

  playMove() {
    if (!this.isMuted && this.moveSound) {
      this.moveSound.play().catch((error) => console.error("Error playing move sound:", error))
    }
  }

  playWin() {
    if (!this.isMuted && this.winSound) {
      this.winSound.play().catch((error) => console.error("Error playing win sound:", error))
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    return this.isMuted
  }

  getMuteStatus() {
    return this.isMuted
  }
}

let soundEffects: SoundEffects

if (typeof window !== "undefined") {
  soundEffects = new SoundEffects()
}

export { soundEffects }


