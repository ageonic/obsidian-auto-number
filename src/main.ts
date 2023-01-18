import { Notice, Plugin } from 'obsidian';
import { AutoNumberSettings, DEFAULT_SETTINGS } from './settings';

export default class AutoNumber extends Plugin {
	settings: AutoNumberSettings;

	async onload() {
		this.loadSettings();
		
		new Notice("Loaded!");
	}

	onunload() {
		new Notice("Unloaded!");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
