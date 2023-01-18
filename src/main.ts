import { Notice, Plugin } from 'obsidian';

export default class AutoNumber extends Plugin {
	async onload() {
		new Notice("Loaded!");
	}

	onunload() {
		new Notice("Unloaded!");
	}
}
