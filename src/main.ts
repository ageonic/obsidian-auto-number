import { Notice, Plugin } from 'obsidian';
import AutoNumberApi from './api';
import { AutoNumberSettings, AutoNumberSettingsTab, DEFAULT_SETTINGS } from './settings';

export default class AutoNumber extends Plugin {
	settings: AutoNumberSettings;

	get api(): AutoNumberApi {
		return new AutoNumberApi(this);
	}

	async onload() {
		this.loadSettings();
		this.addSettingTab(new AutoNumberSettingsTab(this.app, this));
		
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
