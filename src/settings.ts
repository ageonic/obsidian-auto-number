import { App, ButtonComponent, PluginSettingTab, Setting } from "obsidian";
import AutoNumber from "./main";

const DEFAULT_NAME = "New AutoNumber";
const DEFAULT_FORMAT = "{00}";

export interface AutoNumberSettings {
    numbers: {
        name: string
        format: string,
        max: number,
    }[]
}

export const DEFAULT_SETTINGS: Partial<AutoNumberSettings> = {
    numbers: []
};

export class AutoNumberSettingsTab extends PluginSettingTab {
    plugin: AutoNumber;

    constructor(app: App, plugin: AutoNumber) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        this.containerEl.empty();
        this.renderNumberSettings(this.containerEl);
    }

    renderNumberSettings(containerEl: HTMLElement) {
        new Setting(this.containerEl)
            .setName("Add New AutoNumber")
            .addButton((button: ButtonComponent) => {
                button
                    .setTooltip("Add settings for a new AutoNumber")
                    .setButtonText("+")
                    .setCta()
                    .onClick(() => {
                        this.plugin.settings.numbers.push({
                            name: DEFAULT_NAME,
                            max: 0,
                            format: DEFAULT_FORMAT,
                        });
                        this.plugin.saveSettings();
                        this.display();
                    });
            });

        this.plugin.settings.numbers.forEach((num, index) => {
            new Setting(containerEl)
                .addText(text => text
                    .setPlaceholder("Unique Name")
                    .setValue(num.name)
                    .onChange((value) => {
                        this.plugin.settings.numbers[index].name = value;
                        this.plugin.saveSettings();
                    })
                )
                .addText(text => text
                    .setPlaceholder("Number Format")
                    .setValue(this.plugin.settings.numbers[index].format)
                    .onChange((value) => {
                        this.plugin.settings.numbers[index].format = value;
                        this.plugin.saveSettings();
                    })
                )
                .addExtraButton(button => {
                    button.setIcon("cross")
                        .setTooltip("Remove AutoNumber")
                        .onClick(() => {
                            this.plugin.settings.numbers.splice(index,1);
                            this.plugin.saveSettings();
                            this.display();
                        })
                })
        });
    }
}
