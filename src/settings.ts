export interface AutoNumberSettings {
    numbers: {
        [name: string]: {
            format: string,
            max: number,
        }
    }
}

export const DEFAULT_SETTINGS: Partial<AutoNumberSettings> = {
    numbers: {}
};
