import { Notice } from "obsidian";
import AutoNumber from "./main";

const moment = require('moment');

export default class AutoNumberApi {
    plugin: AutoNumber;

    constructor(plugin: AutoNumber) {
        this.plugin = plugin;
    }

    public getNext(identifier: string) {
        try {
            let config = this.plugin.settings.numbers.find(num => num.name === identifier);

            if (config) {
                config.max += 1;
                let result = config.format.replace(/{YYYY}/gi, moment().format('YYYY'))
                    .replace(/{YY}/gi, moment().format('YY'))
                    .replace(/{MM}/gi, moment().format('MM'))
                    .replace(/{DD}/gi, moment().format('DD'))
                    .replace(/{[0]{2}}/gi, config.max.toString().padStart(4, '0'));

                this.plugin.saveSettings();

                return result;
            } else {
                throw new Error(`AutoNumber configuration not found for "${identifier}"`);
            }
        } catch (error) {
            new Notice(`AutoNumber Error:\n${error}`);
        }
    }
}
