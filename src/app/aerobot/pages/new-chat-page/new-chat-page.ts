import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Shortcut {
  icon: string;
  label: string;
  action: string;
}

@Component({
  selector: 'app-new-chat-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-chat-page.html',
})
export default class NewChatPage {
  logoUrl = 'assets/images/logo.png';
  user = 'usuario';
  agente = 'deepSeek v4.0';

  message = signal('');
  isFocused = signal(false);
  isRecording = signal(false);
  showEmojiPicker = signal(false);

  shortcuts: Shortcut[] = [
    { icon: 'fa-solid fa-code', label: 'Escribir código', action: 'code' },
    { icon: 'fa-solid fa-wand-magic-sparkles', label: 'Generar idea', action: 'idea' },
    { icon: 'fa-solid fa-bug', label: 'Debuggear', action: 'debug' },
    { icon: 'fa-solid fa-calculator', label: 'Calcular', action: 'calculate' },
  ];

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }

  onShortcutClick(shortcut: Shortcut): void {
    this.message.set(`/${shortcut.action} `);
  }

  toggleRecording(): void {
    this.isRecording.update((v) => !v);
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker.update((v) => !v);
  }

  sendMessage(): void {
    if (this.message().trim()) {
      console.log('Sending:', this.message());
      this.message.set('');
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
